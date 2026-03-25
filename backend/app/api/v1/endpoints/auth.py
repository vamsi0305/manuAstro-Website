from datetime import timedelta
from typing import Optional

from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response
from jose import jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.session import get_db
from app.models.all import User
from app.schemas.all import UserCreate
from app.schemas.auth_schemas import LoginSchema
from app.utils.limiter import limiter
from app.utils.logger import logger

router = APIRouter()

COOKIE_SECURE = settings.ENVIRONMENT.lower() == "production"
COOKIE_SAMESITE = "none" if COOKIE_SECURE else "lax"


def _set_auth_cookies(response: Response, access_token: str, refresh_token: str) -> None:
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        path="/",
    )


def _serialize_user(user: User) -> dict:
    return {
        "id": user.id,
        "name": user.full_name,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "is_admin": user.is_admin,
        "is_active": user.is_active,
        "role": "admin" if user.is_admin else "user",
        "created_at": user.created_at.isoformat() if user.created_at else None,
    }


def _build_auth_payload(user: User) -> dict:
    access_token = create_access_token(subject=user.id)
    refresh_token = create_access_token(
        subject=user.id,
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": _serialize_user(user),
    }


@router.post("/register", response_model=dict)
@limiter.limit("30/minute")
def register(
    request: Request,
    response: Response,
    user_in: UserCreate,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        phone=user_in.phone if hasattr(user_in, "phone") else None,
        hashed_password=get_password_hash(user_in.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    auth_payload = _build_auth_payload(db_user)
    _set_auth_cookies(response, auth_payload["access_token"], auth_payload["refresh_token"])
    logger.info(f"New user registered: {user_in.email}")
    return auth_payload


@router.post("/login", response_model=dict)
@limiter.limit("30/minute")
def login(request: Request, response: Response, login_data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        logger.warning(f"Failed login attempt: {login_data.email}")
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    auth_payload = _build_auth_payload(user)
    _set_auth_cookies(response, auth_payload["access_token"], auth_payload["refresh_token"])
    logger.info(f"User logged in: {user.email}")
    return auth_payload


@router.post("/refresh")
def refresh_token(
    response: Response,
    refresh_token: Optional[str] = Cookie(None),
    db: Session = Depends(get_db),
):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token provided")

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")

    auth_payload = _build_auth_payload(user)
    _set_auth_cookies(response, auth_payload["access_token"], auth_payload["refresh_token"])
    logger.info(f"Token refreshed for user: {user.email}")
    return {
        "message": "Token refreshed successfully",
        "access_token": auth_payload["access_token"],
        "token_type": auth_payload["token_type"],
        "user": auth_payload["user"],
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}
