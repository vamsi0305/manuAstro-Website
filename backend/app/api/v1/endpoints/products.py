from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.all import Product, Category
from app.schemas.all import ProductSchema, CategorySchema
from app.utils.cache import products_cache, categories_cache, invalidate_products_cache

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
def get_products(
    category_id: Optional[int] = None,
    q: Optional[str] = None,
    db: Session = Depends(get_db)
):
    cache_key = f"products_{category_id or 'all'}_{q or 'all'}"
    if cache_key in products_cache:
        return products_cache[cache_key]
        
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if q:
        query = query.filter(Product.name.contains(q))
    
    result = query.all()
    products_cache[cache_key] = result
    return result

@router.get("/slug/{slug}", response_model=ProductSchema)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/categories", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    if "all_categories" in categories_cache:
        return categories_cache["all_categories"]
        
    result = db.query(Category).all()
    categories_cache["all_categories"] = result
    return result

