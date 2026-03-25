import fastapi, sqlalchemy, psycopg2
print('✅ fastapi OK')
print('✅ sqlalchemy OK')  
print('✅ psycopg2 OK')

from main import app
print('✅ main.py imports OK')

from app.db.session import engine
from sqlalchemy import text
try:
    with engine.connect() as conn:
        print('✅ DB Connected')
        print('Users:', conn.execute(text('SELECT COUNT(*) FROM users')).scalar())
        print('Products:', conn.execute(text('SELECT COUNT(*) FROM products')).scalar())
        print('Categories:', conn.execute(text('SELECT COUNT(*) FROM categories')).scalar())
except Exception as e:
    print('DB Connection error:', e)

print('=== ALL ROUTES ===')
for route in app.routes:
    path = getattr(route, 'path', '')
    methods = getattr(route, 'methods', set())
    if path:
        print(f'{list(methods)} {path}')
