from pydantic import BaseModel, EmailStr, Field, validator
import re
from typing import Optional


class RegisterSchema(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+?[0-9]{10,15}$')
    password: str = Field(..., min_length=8, max_length=100)

    @validator('password')
    def password_strength(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain an uppercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain a number')
        return v


class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
