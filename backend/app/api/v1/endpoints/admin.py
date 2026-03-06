from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.all import User, Order, Booking, Product, ContactSubmission, Coupon
from app.utils.dependencies import get_admin_user
from app.utils.logger import logger
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/admin", tags=["admin"])

class ProductCreate(BaseModel):
    name: str
    slug: str
    description: str
    price: float
    image_url: str
    category_id: int
    is_featured: bool = False
    stock: int = 100

class OrderStatusUpdate(BaseModel):
    status: str

@router.get("/stats")
def get_stats(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_orders = db.query(Order).count()
    total_bookings = db.query(Booking).count()
    total_products = db.query(Product).count()
    revenue = db.query(func.sum(Order.total_amount)).scalar() or 0
    pending_bookings = db.query(Booking).filter(Booking.status == "pending").count()
    recent_contacts = db.query(ContactSubmission).count()
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "total_bookings": total_bookings,
        "total_products": total_products,
        "total_revenue": round(revenue, 2),
        "pending_bookings": pending_bookings,
        "total_contacts": recent_contacts
    }

@router.get("/orders")
def get_all_orders(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    return orders

@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    data: OrderStatusUpdate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = data.status
    db.commit()
    logger.info(f"Admin: Order {order_id} status → {data.status}")
    return {"message": f"Order status updated to {data.status}"}

@router.get("/users")
def get_all_users(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [{
        "id": u.id,
        "email": u.email,
        "name": u.name,
        "is_admin": u.role == "admin",
        "created_at": u.created_at
    } for u in users]

@router.get("/bookings")
def get_all_bookings(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()

@router.get("/contacts")
def get_all_contacts(admin=Depends(get_admin_user), db: Session = Depends(get_db)):
    return db.query(ContactSubmission).order_by(
        ContactSubmission.created_at.desc()
    ).all()

@router.post("/products")
def create_product(
    data: ProductCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    existing = db.query(Product).filter(Product.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product with this slug already exists")
    # Map image_url to thumbnail_url for compatibility with Product model
    product_data = data.dict()
    product_data["thumbnail_url"] = product_data.pop("image_url")
    product = Product(**product_data)
    db.add(product)
    db.commit()
    db.refresh(product)
    logger.info(f"Admin: Product created: {product.name}")
    return product

@router.put("/products/{product_id}")
def update_product(
    product_id: int,
    data: ProductCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in data.dict().items():
        if key == "image_url":
            setattr(product, "thumbnail_url", value)
        else:
            setattr(product, key, value)
    db.commit()
    db.refresh(product)
    logger.info(f"Admin: Product updated: {product.name}")
    return product

@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    logger.info(f"Admin: Product deleted: id={product_id}")
    return {"message": "Product deleted successfully"}
