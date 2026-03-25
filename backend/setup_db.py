import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add current directory to path so we can import app
sys.path.append(os.getcwd())

from database import Base, engine, SessionLocal
from app.models.all import User
from app.core.security import get_password_hash

def setup():
    print("Starting database setup...")
    
    # Recreate tables
    print("Dropping and recreating all tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Tables recreated successfully.")
    
    # Seed admin user
    db = SessionLocal()
    try:
        admin_email = "admin@manuastro.com"
        admin_user = db.query(User).filter(User.email == admin_email).first()
        if not admin_user:
            print(f"Creating admin user: {admin_email}")
            db_admin = User(
                full_name="Admin ManuAstro",
                email=admin_email,
                phone="+919999999999",
                hashed_password=get_password_hash("Admin@123456"),
                is_admin=True,
                is_active=True
            )
            db.add(db_admin)
            db.commit()
            print("Admin user created successfully.")
        else:
            print("Admin user already exists.")
    except Exception as e:
        print(f"Error seeding admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    setup()
