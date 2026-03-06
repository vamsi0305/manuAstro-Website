from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import Cart, CartItem, Product
from app.utils.dependencies import get_current_user
from app.utils.logger import logger
from pydantic import BaseModel

router = APIRouter(prefix="/cart", tags=["cart"])

class CartItemAdd(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

@router.get("")
def get_cart(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        return {"items": [], "total": 0}
    items = []
    total = 0
    for item in cart.items:
        product = item.product
        item_data = {
            "id": item.id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "product": {
                "id": product.id,
                "name": product.name,
                "slug": product.slug,
                "price": product.price,
                "image": product.thumbnail_url
            },
            "subtotal": item.quantity * product.price
        }
        items.append(item_data)
        total += item.quantity * product.price
    return {"items": items, "total": round(total, 2)}

@router.post("/items")
def add_to_cart(
    data: CartItemAdd,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        cart = Cart(user_id=current_user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    existing = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == data.product_id
    ).first()
    if existing:
        existing.quantity += data.quantity
    else:
        new_item = CartItem(
            cart_id=cart.id,
            product_id=data.product_id,
            quantity=data.quantity
        )
        db.add(new_item)
    db.commit()
    logger.info(f"Cart updated: user={current_user.email} product_id={data.product_id}")
    return {"message": "Added to cart successfully"}

@router.put("/items/{item_id}")
def update_cart_item(
    item_id: int,
    data: CartItemUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    if data.quantity <= 0:
        db.delete(item)
    else:
        item.quantity = data.quantity
    db.commit()
    return {"message": "Cart updated"}

@router.delete("/items/{item_id}")
def remove_cart_item(
    item_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Item removed from cart"}

@router.delete("/clear")
def clear_cart(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if cart:
        db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        db.commit()
    return {"message": "Cart cleared"}
