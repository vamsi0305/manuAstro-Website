from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    role: Optional[str] = "user"

class UserCreate(UserBase):
    password: str

class UserSchema(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ProductBase(BaseModel):
    name: str
    slug: str
    description: str
    price: float
    compare_price: Optional[float] = None
    thumbnail_url: str
    images: List[str]
    category_id: int
    stock: int

class ProductSchema(ProductBase):
    id: int
    rating: float
    reviews_count: int
    class Config:
        from_attributes = True

class CategorySchema(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemBase]
    shipping_address: dict
    payment_method: str

class OrderSchema(BaseModel):
    id: int
    total_amount: float
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
