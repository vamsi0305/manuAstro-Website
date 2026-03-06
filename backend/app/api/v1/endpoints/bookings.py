from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import Booking, User
from app.utils.dependencies import get_admin_user
from app.utils.logger import logger
from app.core.config import settings
from pydantic import BaseModel, EmailStr
from typing import Optional
from jose import jwt

router = APIRouter(prefix="/bookings", tags=["bookings"])

class BookingCreate(BaseModel):
    service_type: str
    name: str
    email: EmailStr
    phone: str
    date: str
    time_slot: str
    message: Optional[str] = None


def _try_get_user_id(request: Request, db: Session) -> Optional[int]:
    """Try to extract user_id from cookie — returns None for guest requests."""
    try:
        token = request.cookies.get("access_token")
        if not token:
            return None
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            return None
        user = db.query(User).filter(User.id == int(user_id)).first()
        return user.id if user else None
    except Exception:
        return None


@router.post("")
def create_booking(
    data: BookingCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    # Auth is optional — guests can book too (user_id = None)
    user_id = _try_get_user_id(request, db)

    booking = Booking(
        user_id=user_id,
        service_type=data.service_type,
        name=data.name,
        email=data.email,
        phone=data.phone,
        date=data.date,
        time_slot=data.time_slot,
        message=data.message,
        status="pending"
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    logger.info(f"Booking created: id={booking.id} service={data.service_type} user_id={user_id}")
    return {
        "message": "Booking confirmed successfully",
        "booking_id": booking.id,
        "status": booking.status
    }


@router.get("/my")
def get_my_bookings(
    request: Request,
    db: Session = Depends(get_db)
):
    user_id = _try_get_user_id(request, db)
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    bookings = db.query(Booking).filter(
        Booking.user_id == user_id
    ).order_by(Booking.created_at.desc()).all()
    return bookings


@router.get("/admin")
def get_all_bookings(
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()


@router.put("/admin/{booking_id}/status")
def update_booking_status(
    booking_id: int,
    status: str,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = status
    db.commit()
    logger.info(f"Booking {booking_id} status → {status}")
    return {"message": f"Booking status updated to {status}"}
