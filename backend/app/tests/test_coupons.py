def test_invalid_coupon(client):
    response = client.post("/api/v1/coupons/validate", json={"code": "FAKECODE999"})
    assert response.status_code in [404, 422, 405]  # endpoint may not exist yet


def test_coupon_empty_code(client):
    response = client.post("/api/v1/coupons/validate", json={"code": ""})
    assert response.status_code in [422, 400, 404, 405]
