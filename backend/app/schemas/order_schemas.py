from pydantic import BaseModel, Field
from typing import List, Optional


class OrderItemSchema(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0, le=10)


class OrderCreateSchema(BaseModel):
    items: List[OrderItemSchema]
    coupon_code: Optional[str] = None
    shipping_address: str = Field(..., min_length=10)
