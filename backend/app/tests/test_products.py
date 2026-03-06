def test_get_all_products(client):
    response = client.get("/api/v1/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_product_invalid_slug(client):
    response = client.get("/api/v1/products/slug/nonexistent-xyz-123")
    assert response.status_code == 404


def test_get_categories(client):
    response = client.get("/api/v1/products/categories")
    assert response.status_code == 200


def test_get_products_by_category(client):
    response = client.get("/api/v1/products/?category_id=1")
    assert response.status_code == 200
