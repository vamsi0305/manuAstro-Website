from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import Wishlist, Product
from app.utils.dependencies import get_current_user
from app.utils.logger import logger
from pydantic import BaseModel

router = APIRouter(prefix="/wishlist", tags=["wishlist"])

class WishlistAdd(BaseModel):
    product_id: int

# 1. GET all wishlist items
@router.get("")
def get_wishlist(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    items = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id
    ).all()
    return [{
        "id": item.id,
        "product_id": item.product_id,
        "created_at": item.created_at,
        "product": {
            "id": item.product.id,
            "name": item.product.name,
            "slug": item.product.slug,
            "price": item.product.price,
            "image": item.product.thumbnail_url
        }
    } for item in items]

# 2. POST add to wishlist
@router.post("")
def add_to_wishlist(
    data: WishlistAdd,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    existing = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == data.product_id
    ).first()
    if existing:
        return {"message": "Already in wishlist"}
    item = Wishlist(user_id=current_user.id, product_id=data.product_id)
    db.add(item)
    db.commit()
    logger.info(f"Wishlist: user={current_user.email} added product_id={data.product_id}")
    return {"message": "Added to wishlist"}

# 3. GET check — MUST be registered BEFORE DELETE /{product_id}
@router.get("/check/{product_id}")
def check_wishlist(
    product_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).first()
    return {"is_wishlisted": bool(item)}

# 4. DELETE — MUST come AFTER /check/{product_id}
@router.delete("/{product_id}")
def remove_from_wishlist(
    product_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found in wishlist")
    db.delete(item)
    db.commit()
    return {"message": "Removed from wishlist"}
