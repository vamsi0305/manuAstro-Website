def test_contact_form_too_short_message(client):
    """message below min_length=10 should fail"""
    response = client.post("/api/v1/contact", json={
        "name": "Test",
        "email": "test@test.com",
        "message": "Hi"
    })
    assert response.status_code == 422


def test_contact_invalid_email(client):
    response = client.post("/api/v1/contact", json={
        "name": "Test",
        "email": "not-an-email",
        "message": "This is a valid message length for the test"
    })
    assert response.status_code == 422
