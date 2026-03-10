@echo off
echo.
echo  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo  Starting ManuAstro Platform
echo  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo  [1/3] Starting PostgreSQL Service...
net start postgresql-x64-18
timeout /t 3 /nobreak > nul
echo  ✅ PostgreSQL Ready
echo.

echo  [2/3] Starting Backend API...
start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 4 /nobreak > nul
echo  ✅ Backend Ready at http://localhost:8000
echo.

echo  [3/3] Starting Frontend...
start cmd /k "npm run dev"
timeout /t 3 /nobreak > nul
echo  ✅ Frontend Ready at http://localhost:5173
echo.

echo  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo  ManuAstro is Live!
echo.
echo  Frontend  →  http://localhost:5173
echo  Backend   →  http://localhost:8000
echo  API Docs  →  http://localhost:8000/docs
echo  Health    →  http://localhost:8000/health
echo.
echo  Admin  →  admin@manuastro.com / Admin@123456
echo  User   →  user@test.com / Test@1234
echo  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
