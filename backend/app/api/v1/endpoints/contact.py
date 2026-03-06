from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import ContactSubmission
from app.utils.logger import logger
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, pattern=r'^\+?[0-9]{10,15}$')
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

@router.post("")
def submit_contact(
    data: ContactSchema,
    db: Session = Depends(get_db)
):
    submission = ContactSubmission(
        name=data.name,
        email=data.email,
        phone=data.phone,
        subject=data.subject,
        message=data.message
    )
    db.add(submission)
    db.commit()
    logger.info(f"Contact form submitted: {data.name} <{data.email}>")
    return {
        "message": "Thank you for reaching out. We will get back to you within 24 hours."
    }

@router.get("/admin")
def get_all_contacts(db: Session = Depends(get_db)):
    return db.query(ContactSubmission).order_by(
        ContactSubmission.created_at.desc()
    ).all()
