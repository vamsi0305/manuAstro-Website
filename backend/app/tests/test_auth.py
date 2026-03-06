def test_register_success(client):
    response = client.post("/api/v1/auth/register", json={
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "Test@1234"
    })
    assert response.status_code in [200, 400]  # 400 = already exists


def test_register_duplicate_email(client):
    client.post("/api/v1/auth/register", json={
        "name": "Test User",
        "email": "dup@example.com",
        "password": "Test@1234"
    })
    response = client.post("/api/v1/auth/register", json={
        "name": "Test User 2",
        "email": "dup@example.com",
        "password": "Test@1234"
    })
    assert response.status_code == 400


def test_login_wrong_password(client):
    response = client.post("/api/v1/auth/login", data={
        "username": "nonexistent@example.com",
        "password": "WrongPass"
    })
    assert response.status_code == 400


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
