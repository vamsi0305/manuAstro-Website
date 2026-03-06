from fastapi import APIRouter, Depends, HTTPException, status, Request, Response, Cookie
from sqlalchemy.orm import Session
from typing import Optional
from app.db.session import get_db
from app.models.all import User
from app.schemas.all import UserCreate, UserSchema, Token
from app.schemas.auth_schemas import LoginSchema
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.limiter import limiter
from app.utils.logger import logger
from jose import jwt
from datetime import timedelta

router = APIRouter()


@router.post("/register", response_model=UserSchema)
@limiter.limit("3/minute")
def register(request: Request, user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        name=user_in.full_name,  # backward compat
        hashed_password=get_password_hash(user_in.password),
        role="user"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    logger.info(f"New user registered: {user_in.email}")
    return db_user


@router.post("/login", response_model=dict)
@limiter.limit("5/minute")
def login(request: Request, response: Response, login_data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        logger.warning(f"Failed login attempt: {login_data.email}")
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(subject=user.id)
    refresh_token = create_access_token(
        subject=user.id,
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=1800
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    )

    logger.info(f"User logged in: {user.email}")
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "full_name": user.full_name or user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat()
        }
    }


@router.post("/refresh")
def refresh_token(
    response: Response,
    refresh_token: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
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

    new_access_token = create_access_token(subject=user.id)
    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=1800
    )
    logger.info(f"Token refreshed for user: {user.email}")
    return {"message": "Token refreshed successfully"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}
