import { test, expect } from '@playwright/test'

/**
 * API Tests for ManuAstro Backend
 * Tests backend endpoints directly without UI
 */

test.describe('Backend API Tests', () => {
  const API_BASE = 'http://localhost:8000/api/v1'
  const ADMIN_EMAIL = 'admin@manuastro.com'
  const ADMIN_PASSWORD = 'Admin@123'
  
  let adminToken: string

  test.beforeAll(async ({ request }) => {
    // Login and get admin token
    const response = await request.post(`${API_BASE}/auth/login`, {
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
    })
    
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    adminToken = data.access_token
    expect(adminToken).toBeTruthy()
  })

  test.describe('Public Endpoints', () => {
    test('health check endpoint', async ({ request }) => {
      const response = await request.get(`${API_BASE}/health`)
      expect(response.ok()).toBeTruthy()
      
      const data = await response.json()
      expect(data.status).toBe('healthy')
    })

    test('root endpoint', async ({ request }) => {
      const response = await request.get('http://localhost:8000/')
      expect(response.ok()).toBeTruthy()
      
      const data = await response.json()
      expect(data.message).toContain('Welcome')
    })
  })

  test.describe('Authentication API', () => {
    test('login with valid credentials', async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/login`, {
        data: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      
      expect(data.access_token).toBeTruthy()
      expect(data.token_type).toBe('bearer')
      expect(data.user).toBeTruthy()
      expect(data.user.email).toBe(ADMIN_EMAIL)
      expect(data.user.is_admin).toBe(true)
    })

    test('login with invalid credentials', async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/login`, {
        data: {
          email: ADMIN_EMAIL,
          password: 'WrongPassword',
        },
      })
      
      expect(response.status()).toBe(401)
    })

    test('register new user', async ({ request }) => {
      const randomEmail = `test${Date.now()}@api.com`
      
      const response = await request.post(`${API_BASE}/auth/register`, {
        data: {
          full_name: 'API Test User',
          email: randomEmail,
          password: 'Test@123',
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(data.email).toBe(randomEmail)
    })

    test('register with existing email fails', async ({ request }) => {
      const response = await request.post(`${API_BASE}/auth/register`, {
        data: {
          full_name: 'Test User',
          email: ADMIN_EMAIL,
          password: 'Test@123',
        },
      })
      
      expect(response.status()).toBe(400)
    })
  })

  test.describe('Protected Admin Endpoints', () => {
    test('admin stats - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      
      expect(data).toHaveProperty('total_products')
      expect(data).toHaveProperty('total_orders')
      expect(data).toHaveProperty('total_users')
      expect(data).toHaveProperty('total_revenue')
    })

    test('admin stats - unauthenticated fails', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/stats`)
      expect(response.status()).toBe(401)
    })

    test('admin products - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/products`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('admin users - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('admin orders - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('admin coupons - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/coupons`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('admin blogs - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/blogs`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('admin contacts - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })
  })

  test.describe('Product Endpoints', () => {
    test('get all products', async ({ request }) => {
      const response = await request.get(`${API_BASE}/products`)
      expect(response.ok()).toBeTruthy()
      
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })

    test('get product categories', async ({ request }) => {
      const response = await request.get(`${API_BASE}/products/categories`)
      expect(response.ok()).toBeTruthy()
      
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })
  })

  test.describe('Order Endpoints', () => {
    test('get my orders - unauthenticated fails', async ({ request }) => {
      const response = await request.get(`${API_BASE}/orders/my-orders`)
      expect(response.status()).toBe(401)
    })

    test('get my orders - authenticated', async ({ request }) => {
      const response = await request.get(`${API_BASE}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })
      
      expect(response.ok()).toBeTruthy()
      const data = await response.json()
      expect(Array.isArray(data)).toBeTruthy()
    })
  })
})
