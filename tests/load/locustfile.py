from locust import HttpUser, task, between

class ManuAstroUser(HttpUser):
    wait_time = between(1, 3)
    host = "https://manuastro-website.onrender.com"
    token = None

    def on_start(self):
        response = self.client.post("/api/v1/auth/login", json={
            "email": "user@test.com",
            "password": "Test@1234"
        })
        if response.status_code == 200:
            self.token = response.json().get("access_token")

    @task(3)
    def get_products(self):
        self.client.get("/api/v1/products/")

    @task(2)
    def get_blogs(self):
        self.client.get("/api/v1/blogs/")

    @task(1)
    def get_health(self):
        self.client.get("/health")

    @task(1)
    def get_cart(self):
        if self.token:
            self.client.get(
                "/api/v1/cart/",
                headers={"Authorization": f"Bearer {self.token}"}
            )
