import pytest
from httpx import AsyncClient, ASGITransport
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

BASE = "http://test"

@pytest.mark.asyncio
async def test_products_list_not_empty():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/products/")
        assert response.status_code == 200
        products = response.json()
        assert len(products) > 0

@pytest.mark.asyncio
async def test_product_has_required_fields():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/products/")
        products = response.json()
        if len(products) > 0:
            product = products[0]
            assert "id" in product
            assert "name" in product
            assert "price" in product

@pytest.mark.asyncio
async def test_product_by_slug():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        # Get first product slug
        r = await client.get("/api/v1/products/")
        products = r.json()
        if products:
            slug = products[0]["slug"]
            response = await client.get(f"/api/v1/products/slug/{slug}")
            assert response.status_code == 200
            assert response.json()["slug"] == slug

@pytest.mark.asyncio
async def test_categories():
    async with AsyncClient(transport=ASGITransport(app=app), base_url=BASE, follow_redirects=True) as client:
        response = await client.get("/api/v1/products/categories/")
        assert response.status_code == 200
