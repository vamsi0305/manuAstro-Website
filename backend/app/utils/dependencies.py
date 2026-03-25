from fastapi import Cookie, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from jose import jwt
from app.db.session import get_db
from app.models.all import User
from app.core.config import settings
from typing import Optional

def get_current_user(
    access_token: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    # Try to get token from Authorization header first (Bearer token)
    token = access_token
    if not token and authorization:
        if authorization.startswith("Bearer "):
            token = authorization.split(" ")[1]
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print(f"Token decode error: {e}")
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

def get_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
