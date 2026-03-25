"""
Script to reset admin password for ManuAstro
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from app.models.all import User
from app.core.security import get_password_hash

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def reset_admin_password():
    db = SessionLocal()
    try:
        # Check if admin exists
        admin = db.query(User).filter(User.email == "admin@manuastro.com").first()
        
        if not admin:
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
            print("✅ Admin user CREATED successfully!")
        else:
            # Reset password
            admin.hashed_password = get_password_hash("Admin@123")
            admin.is_admin = True
            admin.is_active = True
            db.commit()
            print("✅ Admin password RESET successfully!")
        
        print("\n" + "="*50)
        print("🔐 ADMIN LOGIN CREDENTIALS:")
        print("="*50)
        print(f"📧 Email:    admin@manuastro.com")
        print(f"🔑 Password: Admin@123")
        print("="*50)
        print("\n⚠️  Please change the password after first login!")
        
        # Show all users
        print("\n📋 All users in database:")
        users = db.query(User).all()
        for u in users:
            print(f"  - {u.email} (Admin: {u.is_admin}, Active: {u.is_active})")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin_password()
