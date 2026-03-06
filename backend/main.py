from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.responses import JSONResponse
from datetime import datetime
import os
import uvicorn

from app.api.v1.endpoints import (
    auth, products, orders, cart, wishlist, 
    bookings, blogs, contact, coupons, admin
)
from app.db.session import get_db

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.utils.limiter import limiter

# ── Sentry ────────────────────────────────────────────────────────────────────
import sentry_sdk
try:
    from sentry_sdk.integrations.fastapi import FastApiIntegration
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN", ""),
        integrations=[FastApiIntegration()],
        traces_sample_rate=0.1,
        environment=os.getenv("ENVIRONMENT", "development")
    )
except ImportError:
    pass  # sentry-sdk not yet installed, safe to skip

# ── Logger ────────────────────────────────────────────────────────────────────
from app.utils.logger import logger

app = FastAPI(title="ManuAstro API", version="1.0.0")

# Rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── Security Headers Middleware ───────────────────────────────────────────────
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=()"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# ── Error Logging Middleware ──────────────────────────────────────────────────
class ErrorLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        if response.status_code >= 400:
            logger.error(
                f"Error Response: {response.status_code} "
                f"Method: {request.method} "
                f"Path: {request.url.path}"
            )
        return response

app.add_middleware(ErrorLoggingMiddleware)


# ── GZip Compression ──────────────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)

# ── CORS ──────────────────────────────────────────────────────────────────────
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
    "http://127.0.0.1:5177",
    "https://manuastro.com",
    "https://www.manuastro.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────────
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["orders"])
app.include_router(cart.router, prefix="/api/v1", tags=["cart"])
app.include_router(wishlist.router, prefix="/api/v1", tags=["wishlist"])
app.include_router(bookings.router, prefix="/api/v1", tags=["bookings"])
app.include_router(blogs.router, prefix="/api/v1", tags=["blogs"])
app.include_router(contact.router, prefix="/api/v1", tags=["contact"])
app.include_router(coupons.router, prefix="/api/v1", tags=["coupons"])
app.include_router(admin.router, prefix="/api/v1", tags=["admin"])

@app.get("/")
async def root():
    return {"message": "Welcome to ManuAstro API"}

@app.get("/api/v1/health")
async def health():
    return {"status": "healthy"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat(),
            "version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "database": "disconnected",
                "error": str(e)
            }
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
