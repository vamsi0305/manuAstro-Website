# ManuAstro Setup Guide

## Prerequisites
1. Node.js v18+ → https://nodejs.org
2. Python 3.10+ → https://python.org
3. Git → https://git-scm.com
4. PostgreSQL 18 → https://postgresql.org/download/windows

## Setup Steps

### 1. Clone Repository
```bash
git clone https://github.com/vamsi0305/manuAstro-Website.git
cd manuAstro-Website
```

### 2. Setup PostgreSQL
```bash
# Open psql and run:
psql -U postgres -h localhost
CREATE DATABASE manuastro;
\q
```

### 3. Setup Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install "bcrypt==3.2.2"
pip install "passlib[bcrypt]==1.7.4"
pip install -r requirements.txt

# Create .env file (copy from .env.example)
copy .env.example .env
# Edit .env and set your PostgreSQL password

# Create tables and seed data
python -c "from database import engine, Base; from models.all import *; Base.metadata.create_all(bind=engine)"
python seed_safe.py
```

### 4. Setup Frontend
```bash
cd ..
npm install
```

### 5. Run Project
```bash
# Option 1 — Double click start.bat
# Option 2 — Manual:
# Terminal 1:
cd backend && venv\Scripts\activate && uvicorn main:app --reload --port 8000
# Terminal 2:
npm run dev
```

## Login Credentials
- Admin: admin@manuastro.com / Admin@123456
- User: user@test.com / Test@1234
