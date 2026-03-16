import pytest
from httpx import AsyncClient, ASGITransport
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

BASE = "http://test"

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

@pytest.mark.asyncio
async def test_get_products():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/products/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_login_success():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.post("/api/v1/auth/login", json={
            "email": "user@test.com",
            "password": "Test@1234"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "user" in data

@pytest.mark.asyncio
async def test_login_wrong_password():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.post("/api/v1/auth/login", json={
            "email": "user@test.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401

@pytest.mark.asyncio
async def test_register():
    import time
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.post("/api/v1/auth/register", json={
            "full_name": "Test User",
            "email": f"testuser{int(time.time())}@test.com",
            "password": "Test@1234"
        })
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_get_blogs():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/blogs/")
        assert response.status_code == 200

@pytest.mark.asyncio
async def test_cart_requires_auth():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/cart/")
        assert response.status_code == 401

@pytest.mark.asyncio
async def test_wishlist_requires_auth():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/wishlist/")
        assert response.status_code == 401
