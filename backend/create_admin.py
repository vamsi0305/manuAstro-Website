"""
Script to create admin user for ManuAstro
Run this script to create an admin user for local development
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from app.models.all import User
from app.core.security import get_password_hash

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def create_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.email == "admin@manuastro.com").first()
        if admin:
            print("⚠️  Admin user already exists!")
            print(f"\n📧 Email: admin@manuastro.com")
            print(f"🔑 Password: Admin@123")
            print("\nUse these credentials to login.")
            return
        
        # Create admin user
        admin_user = User(
            email="admin@manuastro.com",
            full_name="Admin User",
            name="Admin",
            hashed_password=get_password_hash("Admin@123"),
            is_admin=True,
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("✅ Admin user created successfully!")
        print("\n" + "="*50)
        print("🔐 ADMIN LOGIN CREDENTIALS:")
        print("="*50)
        print(f"📧 Email:    admin@manuastro.com")
        print(f"🔑 Password: Admin@123")
        print("="*50)
        print("\n⚠️  Please change the password after first login!")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
