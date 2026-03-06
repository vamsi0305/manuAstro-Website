from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class ContactSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, pattern=r'^\+?[0-9]{10,15}$')
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
