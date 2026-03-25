import os, sys, py_compile

print("--- PY_COMPILE ---")
for root, dirs, files in os.walk(r'.'):
    if 'venv' in dirs: dirs.remove('venv')
    if '.venv' in dirs: dirs.remove('.venv')
    if '__pycache__' in dirs: dirs.remove('__pycache__')
    for f in files:
        if f.endswith('.py'):
            path = os.path.join(root, f)
            try:
                py_compile.compile(path, doraise=True)
            except Exception as e:
                print(f"ERROR: {path} - {e}")
print("PY_COMPILE DONE")

print("--- IMPORTS ---")
try:
    from main import app
    print("✅ Backend imports OK")
except Exception as e:
    print(f"Import error: {e}")

print("--- DB ---")
try:
    from app.db.session import engine
    from sqlalchemy import text
    with engine.connect() as conn:
        print("Users:", conn.execute(text("SELECT COUNT(*) FROM users")).scalar())
        print("Products:", conn.execute(text("SELECT COUNT(*) FROM products")).scalar())
        print("Categories:", conn.execute(text("SELECT COUNT(*) FROM categories")).scalar())
    print("✅ DB Connected.")
except Exception as e:
    print(f"DB Error: {e}")

print("--- ROUTES ---")
try:
    from main import app
    print("=== ALL REGISTERED ROUTES ===")
    for route in app.routes:
        path = getattr(route, 'path', '')
        methods = getattr(route, 'methods', '')
        print(f"{methods} {path}")
except Exception as e:
    print(f"Routes Error: {e}")

print("--- PIP CHECK ---")
os.system(f'"{sys.executable}" -m pip check')
