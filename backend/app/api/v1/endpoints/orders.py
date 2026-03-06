from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.all import Order, OrderItem, Product
from app.schemas.all import OrderCreate, OrderSchema
from app.utils.dependencies import get_current_user, get_admin_user
from app.utils.logger import logger

router = APIRouter()


@router.post("/", response_model=OrderSchema)
def create_order(
    order_in: OrderCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_order = Order(
        user_id=current_user.id,
        total_amount=0,
        shipping_address=order_in.shipping_address,
        payment_method=order_in.payment_method
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    total_amount = 0
    for item in order_in.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            total_amount += product.price * item.quantity
            db_item = OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price_at_purchase=product.price
            )
            db.add(db_item)

    db_order.total_amount = total_amount
    db.commit()
    db.refresh(db_order)
    logger.info(f"Order created: id={db_order.id} user={current_user.email}")
    return db_order


@router.get("/my-orders", response_model=List[OrderSchema])
def get_my_orders(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Order).filter(
        Order.user_id == current_user.id
    ).order_by(Order.created_at.desc()).all()


@router.get("/admin", response_model=List[OrderSchema])
def get_all_orders(
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.get("/{order_id}", response_model=OrderSchema)
def get_order_by_id(
    order_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return order


@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    logger.info(f"Order {order_id} status updated to {status}")
    return {"message": f"Order status updated to {status}"}
