from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "ManuAstro"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-very-secret-sacred-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # SQLite for development, can be easily changed to PostgreSQL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./manuastro.db")
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    RESEND_API_KEY: Optional[str] = None
    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None
    RAZORPAY_KEY_ID: Optional[str] = None
    RAZORPAY_KEY_SECRET: Optional[str] = None
    SENTRY_DSN: Optional[str] = None
    ENVIRONMENT: str = "development"
    ADMIN_EMAIL: str = "admin@manuastro.com"
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()
