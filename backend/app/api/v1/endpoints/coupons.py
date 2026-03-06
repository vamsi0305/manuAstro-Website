from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import Coupon
from app.utils.dependencies import get_admin_user
from app.utils.logger import logger
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/coupons", tags=["coupons"])

class CouponValidate(BaseModel):
    code: str
    order_amount: float = 0

class CouponCreate(BaseModel):
    code: str
    discount_type: str
    discount_value: float
    min_order: float = 0
    max_uses: int = 100
    active: bool = True
    expires_at: Optional[datetime] = None

@router.post("/validate")
def validate_coupon(
    data: CouponValidate,
    db: Session = Depends(get_db)
):
    coupon = db.query(Coupon).filter(
        Coupon.code == data.code.upper(),
        Coupon.active == True
    ).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Invalid coupon code")
    if coupon.expires_at and coupon.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="This coupon has expired")
    if coupon.used_count >= coupon.max_uses:
        raise HTTPException(status_code=400, detail="Coupon usage limit has been reached")
    if data.order_amount > 0 and data.order_amount < coupon.min_order:
        raise HTTPException(
            status_code=400,
            detail=f"Minimum order amount for this coupon is ₹{int(coupon.min_order)}"
        )
    discount = 0
    if coupon.discount_type == "percentage":
        discount = (data.order_amount * coupon.discount_value) / 100
    else:
        discount = coupon.discount_value
    logger.info(f"Coupon validated: {data.code} discount=₹{discount}")
    return {
        "valid": True,
        "code": coupon.code,
        "discount_type": coupon.discount_type,
        "discount_value": coupon.discount_value,
        "discount_amount": round(discount, 2),
        "final_amount": round(max(data.order_amount - discount, 0), 2)
    }

@router.get("")
def get_all_coupons(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    return db.query(Coupon).all()

@router.post("")
def create_coupon(
    data: CouponCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    existing = db.query(Coupon).filter(Coupon.code == data.code.upper()).first()
    if existing:
        raise HTTPException(status_code=400, detail="Coupon code already exists")
    coupon = Coupon(**data.dict())
    coupon.code = coupon.code.upper()
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    logger.info(f"Coupon created: {coupon.code}")
    return coupon

@router.put("/{coupon_id}")
def update_coupon(
    coupon_id: int,
    data: CouponCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    for key, value in data.dict().items():
        setattr(coupon, key, value)
    db.commit()
    return coupon

@router.delete("/{coupon_id}")
def deactivate_coupon(
    coupon_id: int,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    coupon.active = False
    db.commit()
    return {"message": "Coupon deactivated"}
