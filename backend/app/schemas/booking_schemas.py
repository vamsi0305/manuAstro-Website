from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class BookingCreateSchema(BaseModel):
    service_type: str = Field(..., min_length=2)
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+?[0-9]{10,15}$')
    date: str
    time_slot: str
    message: Optional[str] = Field(None, max_length=500)
