import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from app.models.all import User, Product, Category, Coupon, Blog
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Users
    if not db.query(User).filter(User.email == "admin@manuastro.com").first():
        admin = User(
            full_name="Er. Manu Gupta",
            email="admin@manuastro.com",
            hashed_password=pwd_context.hash("Admin@123456"),
            role="admin"
        )
        db.add(admin)
        print("✅ Admin user created")

    if not db.query(User).filter(User.email == "user@test.com").first():
        user = User(
            full_name="Test User",
            email="user@test.com",
            hashed_password=pwd_context.hash("Test@1234"),
            role="user"
        )
        db.add(user)
        print("✅ Test user created")

    # Categories
    categories = [
        {"name": "Gemstones", "slug": "gemstones"},
        {"name": "Rudraksha", "slug": "rudraksha"},
        {"name": "Yantra", "slug": "yantra"},
        {"name": "Vastu Products", "slug": "vastu-products"},
    ]
    for c in categories:
        if not db.query(Category).filter(Category.slug == c["slug"]).first():
            db.add(Category(**c))
    db.commit()
    print("✅ Categories created")

    gemstone_cat = db.query(Category).filter(Category.slug == "gemstones").first()
    rudraksha_cat = db.query(Category).filter(Category.slug == "rudraksha").first()
    yantra_cat = db.query(Category).filter(Category.slug == "yantra").first()

    # Products
    # Gemstone products
    gemstones = [
        {
            "name": "Premium Natural Ruby (Manik)",
            "slug": "premium-natural-ruby-manik",
            "description": "Natural Ruby gemstone for Sun. Enhances leadership, confidence and vitality.",
            "price": 15000,
            "image_url": "https://manuastro.com/cdn/shop/files/Vedic_Astrology_New_500x500_jpg.jpg?v=1770036692",
            "category_id": gemstone_cat.id,
            "is_featured": True,
            "stock": 10
        },
        {
            "name": "Zambian Emerald (Panna)",
            "slug": "zambian-emerald-panna",
            "description": "Natural Emerald for Mercury. Enhances intelligence, communication and business.",
            "price": 12000,
            "image_url": "https://manuastro.com/cdn/shop/files/Palm_Reading_New_500x500_jpg.jpg?v=1770036747",
            "category_id": gemstone_cat.id,
            "is_featured": True,
            "stock": 8
        },
        {
            "name": "Ceylon Yellow Sapphire (Pukhraj)",
            "slug": "ceylon-yellow-sapphire-pukhraj",
            "description": "Natural Yellow Sapphire for Jupiter. Attracts wealth, wisdom and spiritual growth.",
            "price": 18000,
            "image_url": "https://manuastro.com/cdn/shop/files/Personal_Consultation_New_500x500_jpg.jpg?v=1770036746",
            "category_id": gemstone_cat.id,
            "is_featured": True,
            "stock": 5
        },
    ]
    for p in gemstones:
        if not db.query(Product).filter(Product.slug == p["slug"]).first():
            images = [p["image_url"]]
            del p["image_url"] # removing image_url because the model only has images JSON and thumbnail_url
            p["thumbnail_url"] = images[0]
            p["images"] = images
            db.add(Product(**p))

    # Rudraksha products
    rudrakshas = [
        {
            "name": "5 Mukhi Nepali Rudraksha (5.65g)",
            "slug": "5-mukhi-nepali-rudraksha",
            "description": "Most auspicious Rudraksha. Suitable for everyone. Enhances health and peace of mind.",
            "price": 1320,
            "image_url": "https://manuastro.com/cdn/shop/files/01_11.jpg?v=1770928893",
            "category_id": rudraksha_cat.id,
            "is_featured": True,
            "stock": 50
        },
        {
            "name": "4 Mukhi Nepali Rudraksha (4.7g)",
            "slug": "4-mukhi-nepali-rudraksha",
            "description": "Rules Mercury. Enhances knowledge, intelligence and communication skills.",
            "price": 1200,
            "image_url": "https://manuastro.com/cdn/shop/files/01_10.jpg?v=1770927798",
            "category_id": rudraksha_cat.id,
            "is_featured": False,
            "stock": 40
        },
        {
            "name": "10 Mukhi Nepali Rudraksha (2.96g)",
            "slug": "10-mukhi-nepali-rudraksha",
            "description": "Rules Lord Vishnu. Provides protection and removes negative energies.",
            "price": 7150,
            "image_url": "https://manuastro.com/cdn/shop/files/10fr_1.jpg?v=1770986595",
            "category_id": rudraksha_cat.id,
            "is_featured": True,
            "stock": 20
        },
        {
            "name": "Gauri Shankar Rudraksha (3.67g)",
            "slug": "gauri-shankar-rudraksha",
            "description": "Represents union of Shiva and Parvati. Enhances relationships and family harmony.",
            "price": 9680,
            "image_url": "https://manuastro.com/cdn/shop/files/GSR.png?v=1770991378",
            "category_id": rudraksha_cat.id,
            "is_featured": True,
            "stock": 15
        },
    ]
    for p in rudrakshas:
        if not db.query(Product).filter(Product.slug == p["slug"]).first():
            images = [p["image_url"]]
            del p["image_url"]
            p["thumbnail_url"] = images[0]
            p["images"] = images
            db.add(Product(**p))

    # Yantra products
    yantras = [
        {
            "name": "Shree Yantra Copper",
            "slug": "shree-yantra-copper",
            "description": "Most powerful yantra for wealth and prosperity. Energised through Vedic rituals.",
            "price": 950,
            "image_url": "https://manuastro.com/cdn/shop/files/shriRahuyantra.jpg?v=1765297876",
            "category_id": yantra_cat.id,
            "is_featured": True,
            "stock": 30
        },
        {
            "name": "Surya Yantra",
            "slug": "surya-yantra",
            "description": "Yantra of the Sun God. Enhances confidence, leadership and good health.",
            "price": 750,
            "image_url": "https://manuastro.com/cdn/shop/files/SuryaYantra.jpg?v=1765298842",
            "category_id": yantra_cat.id,
            "is_featured": False,
            "stock": 25
        },
        {
            "name": "Mangal Yantra",
            "slug": "mangal-yantra",
            "description": "Yantra of Mars. Removes Mangal Dosha and enhances courage and energy.",
            "price": 850,
            "image_url": "https://manuastro.com/cdn/shop/files/Mangal_Yantra.jpg?v=1765298377",
            "category_id": yantra_cat.id,
            "is_featured": True,
            "stock": 20
        },
    ]
    for p in yantras:
        if not db.query(Product).filter(Product.slug == p["slug"]).first():
            images = [p["image_url"]]
            del p["image_url"]
            p["thumbnail_url"] = images[0]
            p["images"] = images
            db.add(Product(**p))

    db.commit()
    print("✅ Products created")

    # COUPONS
    coupons_data = [
        {"code": "WELCOME10", "discount_type": "percentage", "discount_value": 10, "min_order": 0, "max_uses": 1000},
        {"code": "ASTRO20", "discount_type": "percentage", "discount_value": 20, "min_order": 999, "max_uses": 500},
        {"code": "FLAT500", "discount_type": "flat", "discount_value": 500, "min_order": 2000, "max_uses": 200},
    ]
    for c in coupons_data:
        exists = db.query(Coupon).filter(Coupon.code == c["code"]).first()
        if not exists:
            db.add(Coupon(**c))
            print(f"Coupon seeded: {c['code']}")

    # BLOGS
    blogs_data = [
        {
            "title": "How to Choose the Right Gemstone for Your Zodiac Sign",
            "slug": "choose-gemstone-zodiac-sign",
            "excerpt": "A complete guide to selecting gemstones based on your birth chart and planetary positions.",
            "content": "Gemstones have been used in Vedic astrology for thousands of years to harness planetary energies...",
            "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=400&fit=crop",
            "tags": "gemstones,zodiac,astrology,vedic",
            "author": "Er. Manu Gupta"
        },
        {
            "title": "The Power of Rudraksha: Benefits and How to Wear Them",
            "slug": "power-of-rudraksha-benefits",
            "excerpt": "Discover the spiritual and healing benefits of different Rudraksha beads and the correct way to wear them.",
            "content": "Rudraksha beads are sacred seeds from the Elaeocarpus ganitrus tree, found primarily in Nepal and Indonesia...",
            "image_url": "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&h=400&fit=crop",
            "tags": "rudraksha,spiritual,healing,shiva",
            "author": "Er. Manu Gupta"
        },
        {
            "title": "Vastu Shastra Basics: Aligning Your Home with Cosmic Energy",
            "slug": "vastu-shastra-basics-home",
            "excerpt": "Learn the fundamental principles of Vastu Shastra and how to apply them to your living space.",
            "content": "Vastu Shastra is the ancient Indian science of architecture and space arrangement...",
            "image_url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=400&fit=crop",
            "tags": "vastu,home,energy,architecture,vedic",
            "author": "Er. Manu Gupta"
        },
    ]

    for b in blogs_data:
        exists = db.query(Blog).filter(Blog.slug == b["slug"]).first()
        if not exists:
            db.add(Blog(**b))
            print(f"Blog seeded: {b['title']}")

    db.commit()
    print("✅ All seed data added successfully")
    db.close()

if __name__ == "__main__":
    os.environ['DATABASE_URL'] = 'postgresql://neondb_owner:npg_DB9XIlbitU4W@ep-frosty-cloud-a1xe55wo-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
    seed_db()
