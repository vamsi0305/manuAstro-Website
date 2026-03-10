
import os
import sys
from sqlalchemy import text

# Add current directory to sys.path
sys.path.append(os.getcwd())

from database import engine, Base
from app.models.all import *

def create_tables():
    print("Checking connection...")
    try:
        with engine.connect() as conn:
            print("Connection successful.")
            result = conn.execute(text("SELECT 1"))
            print(f"Test query result: {result.fetchone()}")
            
            print(f"Found {len(Base.metadata.tables)} tables in metadata.")
            for table_name in Base.metadata.tables.keys():
                print(f" - {table_name}")
            
            print("Creating tables...")
            Base.metadata.create_all(bind=engine)
            print("✅ Tables created successfully.")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    create_tables()
