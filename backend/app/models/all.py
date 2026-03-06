from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, JSON, Index, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user") # user, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    slug = Column(String, unique=True)
    description = Column(String)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    slug = Column(String, unique=True)
    description = Column(String)
    price = Column(Float)
    compare_price = Column(Float, nullable=True)
    thumbnail_url = Column(String)
    images = Column(JSON) # List of image URLs
    category_id = Column(Integer, ForeignKey("categories.id"))
    stock = Column(Integer, default=0)
    rating = Column(Float, default=4.5)
    reviews_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    category = relationship("Category")
    __table_args__ = (
        Index('ix_products_slug', 'slug'),
        Index('ix_products_category_id', 'category_id'),
        Index('ix_products_is_featured', 'is_featured'),
    )

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String, default="pending") # pending, processing, shipped, delivered, cancelled
    shipping_address = Column(JSON)
    payment_method = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User")
    items = relationship("OrderItem", back_populates="order")
    __table_args__ = (
        Index('ix_orders_user_id', 'user_id'),
        Index('ix_orders_status', 'status'),
    )

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
    price_at_purchase = Column(Float)
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    items = relationship("CartItem", back_populates="cart", cascade="all, delete")
    user = relationship("User")

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("carts.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    cart = relationship("Cart", back_populates="items")
    product = relationship("Product")

class Wishlist(Base):
    __tablename__ = "wishlists"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    product = relationship("Product")
    __table_args__ = (Index('ix_wishlist_user_product', 'user_id', 'product_id'),)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    service_type = Column(String)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    date = Column(String)
    time_slot = Column(String)
    message = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    __table_args__ = (Index('ix_bookings_status', 'status'),)

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    slug = Column(String, unique=True)
    content = Column(Text)
    excerpt = Column(String)
    image_url = Column(String)
    author = Column(String, default="Er. Manu Gupta")
    tags = Column(String, nullable=True)
    published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    __table_args__ = (
        Index('ix_blogs_slug', 'slug'),
        Index('ix_blogs_published', 'published'),
    )

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Coupon(Base):
    __tablename__ = "coupons"
    id = Column(Integer, primary_key=True)
    code = Column(String, unique=True)
    discount_type = Column(String)
    discount_value = Column(Float)
    min_order = Column(Float, default=0)
    max_uses = Column(Integer, default=100)
    used_count = Column(Integer, default=0)
    active = Column(Boolean, default=True)
    expires_at = Column(DateTime, nullable=True)

