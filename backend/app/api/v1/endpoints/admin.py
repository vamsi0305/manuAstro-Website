from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
import shutil, os, uuid
from app.db.session import get_db
from app.models.all import User, Product, Category, Order, Booking, Blog, ContactSubmission, Coupon, DiscountType
from app.utils.dependencies import get_admin_user as get_current_admin_user
from app.utils.cache import invalidate_categories_cache, invalidate_products_cache
from app.utils.catalog import ensure_default_categories
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ── Image Upload ──────────────────────────────────────────────────────────────
@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_admin_user)
):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = f"{UPLOAD_DIR}/{filename}"
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/static/uploads/{filename}", "filename": filename}

# ── Dashboard Stats ───────────────────────────────────────────────────────────
@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    total_products = db.query(Product).count()
    total_orders = db.query(Order).count()
    total_users = db.query(User).filter(User.is_admin == False).count()
    total_bookings = db.query(Booking).count()
    total_revenue = db.query(Order).filter(Order.payment_status == "paid").all()
    revenue = sum(o.total or 0 for o in total_revenue)
    pending_orders = db.query(Order).filter(Order.status == "pending").count()
    unread_contacts = db.query(ContactSubmission).filter(ContactSubmission.is_read == False).count()
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_users": total_users,
        "total_bookings": total_bookings,
        "total_revenue": revenue,
        "pending_orders": pending_orders,
        "unread_contacts": unread_contacts
    }

# ── Products CRUD ─────────────────────────────────────────────────────────────
@router.get("/products")
def get_all_products(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    products = db.query(Product).order_by(Product.created_at.desc()).all()
    return products

@router.post("/products")
async def create_product(
    name: str = Form(...),
    description: str = Form(""),
    price: float = Form(...),
    compare_price: Optional[float] = Form(None),
    discount_type: Optional[str] = Form(None),
    discount_value: Optional[float] = Form(None),
    stock: int = Form(0),
    category_id: Optional[int] = Form(None),
    is_featured: bool = Form(False),
    weight: Optional[str] = Form(None),
    material: Optional[str] = Form(None),
    origin: Optional[str] = Form(None),
    sku: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    import re
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    existing = db.query(Product).filter(Product.slug == slug).first()
    if existing:
        slug = f"{slug}-{uuid.uuid4().hex[:6]}"
    
    image_url = None
    if image and image.filename:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = f"{UPLOAD_DIR}/{filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/static/uploads/{filename}"

    product = Product(
        name=name,
        slug=slug,
        description=description,
        price=price,
        compare_price=compare_price,
        discount_type=DiscountType(discount_type) if discount_type else None,
        discount_value=discount_value,
        stock=stock,
        category_id=category_id,
        is_featured=is_featured,
        weight=weight,
        material=material,
        origin=origin,
        sku=sku,
        image_url=image_url,
        thumbnail_url=image_url,
        images=[image_url] if image_url else []
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.put("/products/{product_id}")
async def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(""),
    price: float = Form(...),
    compare_price: Optional[float] = Form(None),
    discount_type: Optional[str] = Form(None),
    discount_value: Optional[float] = Form(None),
    stock: int = Form(0),
    category_id: Optional[int] = Form(None),
    is_featured: bool = Form(False),
    is_active: bool = Form(True),
    weight: Optional[str] = Form(None),
    material: Optional[str] = Form(None),
    origin: Optional[str] = Form(None),
    sku: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if image and image.filename:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = f"{UPLOAD_DIR}/{filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        product.image_url = f"/static/uploads/{filename}"
        product.thumbnail_url = product.image_url
        product.images = [product.image_url]

    product.name = name
    product.description = description
    product.price = price
    product.compare_price = compare_price
    product.discount_type = DiscountType(discount_type) if discount_type else None
    product.discount_value = discount_value
    product.stock = stock
    product.category_id = category_id
    product.is_featured = is_featured
    product.is_active = is_active
    product.weight = weight
    product.material = material
    product.origin = origin
    product.sku = sku
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}

# ── Categories CRUD ───────────────────────────────────────────────────────────
@router.get("/categories")
def get_categories(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return ensure_default_categories(db)


@router.post("/categories/bootstrap")
def bootstrap_categories(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    categories = ensure_default_categories(db)
    invalidate_categories_cache()
    invalidate_products_cache()
    return categories

@router.post("/categories")
async def create_category(
    name: str = Form(...),
    description: str = Form(""),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    import re
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    image_url = None
    if image and image.filename:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = f"{UPLOAD_DIR}/{filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/static/uploads/{filename}"
    category = Category(name=name, slug=slug, description=description, image_url=image_url)
    db.add(category)
    db.commit()
    db.refresh(category)
    invalidate_categories_cache()
    invalidate_products_cache()
    return category

@router.put("/categories/{category_id}")
async def update_category(
    category_id: int,
    name: str = Form(...),
    description: str = Form(""),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    cat = db.query(Category).filter(Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    cat.name = name
    cat.description = description
    if image and image.filename:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        with open(f"{UPLOAD_DIR}/{filename}", "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        cat.image_url = f"/static/uploads/{filename}"
    db.commit()
    db.refresh(cat)
    invalidate_categories_cache()
    invalidate_products_cache()
    return cat

@router.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    cat = db.query(Category).filter(Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(cat)
    db.commit()
    invalidate_categories_cache()
    invalidate_products_cache()
    return {"message": "Category deleted"}

# ── Orders ────────────────────────────────────────────────────────────────────
@router.get("/orders")
def get_all_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(Order).order_by(Order.created_at.desc()).all()

@router.patch("/orders/{order_id}")
def update_order_status(
    order_id: int,
    status: str,
    payment_status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    if payment_status:
        order.payment_status = payment_status
    db.commit()
    return order

# ── Users ─────────────────────────────────────────────────────────────────────
@router.get("/users")
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(User).filter(User.is_admin == False).order_by(User.created_at.desc()).all()

@router.patch("/users/{user_id}/toggle-active")
def toggle_user_active(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = not user.is_active
    db.commit()
    return user

# ── Coupons CRUD ──────────────────────────────────────────────────────────────
@router.get("/coupons")
def get_coupons(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(Coupon).all()

class CouponCreate(BaseModel):
    code: str
    discount_type: str
    discount_value: float
    min_order_amount: float = 0
    max_uses: Optional[int] = None
    is_active: bool = True
    expiry_date: Optional[str] = None

@router.post("/coupons")
def create_coupon(data: CouponCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    coupon = Coupon(
        code=data.code.upper(),
        discount_type=DiscountType(data.discount_type),
        discount_value=data.discount_value,
        min_order_amount=data.min_order_amount,
        max_uses=data.max_uses,
        is_active=data.is_active,
        expiry_date=datetime.fromisoformat(data.expiry_date) if data.expiry_date else None
    )
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return coupon

@router.delete("/coupons/{coupon_id}")
def delete_coupon(coupon_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    db.delete(coupon)
    db.commit()
    return {"message": "Coupon deleted"}

# ── Blogs CRUD ────────────────────────────────────────────────────────────────
@router.get("/blogs")
def get_all_blogs(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(Blog).order_by(Blog.created_at.desc()).all()

class BlogCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = []
    is_published: bool = True

@router.post("/blogs")
def create_blog(data: BlogCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    import re
    slug = re.sub(r'[^a-z0-9]+', '-', data.title.lower()).strip('-')
    existing = db.query(Blog).filter(Blog.slug == slug).first()
    if existing:
        slug = f"{slug}-{uuid.uuid4().hex[:6]}"
    blog = Blog(
        title=data.title,
        slug=slug,
        content=data.content,
        excerpt=data.excerpt,
        image_url=data.image_url,
        tags=data.tags,
        is_published=data.is_published
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog

@router.put("/blogs/{blog_id}")
def update_blog(blog_id: int, data: BlogCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog.title = data.title
    blog.content = data.content
    blog.excerpt = data.excerpt
    blog.image_url = data.image_url
    blog.tags = data.tags
    blog.is_published = data.is_published
    db.commit()
    db.refresh(blog)
    return blog

@router.delete("/blogs/{blog_id}")
def delete_blog(blog_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    return {"message": "Blog deleted"}

# ── Contacts ──────────────────────────────────────────────────────────────────
@router.get("/contacts")
def get_contacts(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).all()

@router.patch("/contacts/{contact_id}/read")
def mark_contact_read(contact_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    contact.is_read = True
    db.commit()
    return contact

# ── Bookings ──────────────────────────────────────────────────────────────────
@router.get("/bookings")
def get_all_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()

@router.patch("/bookings/{booking_id}")
def update_booking_status(booking_id: int, status: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = status
    db.commit()
    return booking
