import pytest
from app.models.all import Blog, Coupon

@pytest.fixture(autouse=True)
def seed_test_data():
    from app.tests.conftest import TestingSessionLocal
    db = TestingSessionLocal()
    
    # Check if already seeded to avoid duplicates in module scope
    if not db.query(Blog).filter(Blog.slug == "choose-gemstone-zodiac-sign").first():
        db.add(Blog(
            title="How to Choose the Right Gemstone",
            slug="choose-gemstone-zodiac-sign",
            content="Full content...",
            excerpt="Excerpt...",
            image_url="http://example.com/img.jpg",
            published=True
        ))
        db.add(Blog(title="Blog 2", slug="blog-2", content="Content", published=True))
        db.add(Blog(title="Blog 3", slug="blog-3", content="Content", published=True))
        
        db.add(Coupon(
            code="WELCOME10",
            discount_type="percentage",
            discount_value=10.0,
            active=True
        ))
        db.commit()
    db.close()

def test_get_blogs(client):
    response = client.get("/api/v1/blogs")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3

def test_get_blog_by_slug(client):
    slug = "choose-gemstone-zodiac-sign"
    response = client.get(f"/api/v1/blogs/{slug}")
    assert response.status_code == 200
    assert response.json()["slug"] == slug

def test_validate_coupon_success(client):
    response = client.post("/api/v1/coupons/validate", json={
        "code": "WELCOME10",
        "order_amount": 1000
    })
    assert response.status_code == 200
    data = response.json()
    assert data["valid"] is True
    assert data["discount_amount"] == 100.0
