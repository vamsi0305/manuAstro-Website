from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.all import Blog
from app.utils.dependencies import get_admin_user
from app.utils.logger import logger
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/blogs", tags=["blogs"])

class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    image_url: str
    tags: Optional[str] = None
    published: bool = True

@router.get("")
def get_blogs(db: Session = Depends(get_db)):
    return db.query(Blog).filter(
        Blog.published == True
    ).order_by(Blog.created_at.desc()).all()

@router.get("/{slug}")
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(
        Blog.slug == slug,
        Blog.published == True
    ).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog

@router.post("")
def create_blog(
    data: BlogCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    existing = db.query(Blog).filter(Blog.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Blog with this slug already exists")
    blog = Blog(**data.dict())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    logger.info(f"Blog created: {blog.title}")
    return blog

@router.put("/{blog_id}")
def update_blog(
    blog_id: int,
    data: BlogCreate,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    for key, value in data.dict().items():
        setattr(blog, key, value)
    db.commit()
    db.refresh(blog)
    return blog

@router.delete("/{blog_id}")
def delete_blog(
    blog_id: int,
    admin=Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    logger.info(f"Blog deleted: id={blog_id}")
    return {"message": "Blog deleted successfully"}
