import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  // Test credentials
  const ADMIN_EMAIL = 'admin@manuastro.com'
  const ADMIN_PASSWORD = 'Admin@123'
  const USER_EMAIL = 'testuser@manuastro.com'
  const USER_PASSWORD = 'Test@123'

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      localStorage.clear()
    })
  })

  test.describe('Login Tests', () => {
    test('login page loads with all elements', async ({ page }) => {
      await page.goto('/login')

      // Check page title
      await expect(page).toHaveTitle(/Login|Sign In/i)

      // Check form elements
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()
      await expect(page.locator('text=Sign In')).toBeVisible()
    })

    test('login with valid admin credentials', async ({ page }) => {
      await page.goto('/login')

      // Fill credentials
      await page.fill('input[type="email"]', ADMIN_EMAIL)
      await page.fill('input[type="password"]', ADMIN_PASSWORD)
      await page.click('button[type="submit"]')

      // Wait for redirect (with 2 second delay from login)
      await page.waitForTimeout(3000)

      // Should redirect to admin dashboard
      await expect(page).toHaveURL(/admin/, { timeout: 15000 })

      // Verify admin dashboard loads
      await expect(page.locator('text=Admin Dashboard')).toBeVisible({ timeout: 5000 })
    })

    test('login with invalid credentials shows error', async ({ page }) => {
      await page.goto('/login')

      await page.fill('input[type="email"]', ADMIN_EMAIL)
      await page.fill('input[type="password"]', 'WrongPassword123')
      await page.click('button[type="submit"]')

      // Should show error message
      await expect(page.locator('text=/invalid|incorrect|error/i')).toBeVisible({ timeout: 5000 })
    })

    test('login with empty fields shows validation', async ({ page }) => {
      await page.goto('/login')
      await page.click('button[type="submit"]')

      // Form should not submit or show validation
      await expect(page.locator('input[type="email"]')).toBeFocused()
    })

    test('login redirects to dashboard for regular user', async ({ page }) => {
      await page.goto('/login')

      await page.fill('input[type="email"]', USER_EMAIL)
      await page.fill('input[type="password"]', USER_PASSWORD)
      await page.click('button[type="submit"]')

      await page.waitForTimeout(3000)

      // Regular user should go to /dashboard
      await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })
    })
  })

  test.describe('Registration Tests', () => {
    test('register page loads', async ({ page }) => {
      await page.goto('/register')

      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('input[type="text"]')).toBeVisible()
    })

    test('register with valid data', async ({ page }) => {
      const randomEmail = `test${Date.now()}@manuastro.com`

      await page.goto('/register')
      await page.fill('input[type="text"]', 'Test User')
      await page.fill('input[type="email"]', randomEmail)
      await page.fill('input[type="password"]', 'Test@123')
      await page.click('button[type="submit"]')

      // Should redirect to dashboard or login
      await page.waitForTimeout(3000)
      await expect(page).toHaveURL(/dashboard|login/, { timeout: 15000 })
    })

    test('register with existing email shows error', async ({ page }) => {
      await page.goto('/register')
      await page.fill('input[type="text"]', 'Existing User')
      await page.fill('input[type="email"]', ADMIN_EMAIL)
      await page.fill('input[type="password"]', 'Test@123')
      await page.click('button[type="submit"]')

      // Should show "already registered" error
      await expect(page.locator('text=/already|registered|exists/i')).toBeVisible({ timeout: 5000 })
    })
  })

  test.describe('Authentication State Tests', () => {
    test('logged in user stays logged in after refresh', async ({ page }) => {
      // Login
      await page.goto('/login')
      await page.fill('input[type="email"]', ADMIN_EMAIL)
      await page.fill('input[type="password"]', ADMIN_PASSWORD)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(3000)
      await expect(page).toHaveURL(/admin/, { timeout: 15000 })

      // Refresh page
      await page.reload()

      // Should still be on admin page (not redirected to login)
      await expect(page).toHaveURL(/admin/, { timeout: 10000 })
      await expect(page.locator('text=Admin Dashboard')).toBeVisible({ timeout: 5000 })
    })

    test('unauthenticated user redirected to login', async ({ page }) => {
      // Try to access protected route directly
      await page.goto('/admin')

      // Should redirect to login
      await expect(page).toHaveURL(/login/, { timeout: 10000 })
    })

    test('Account button shows user name when logged in', async ({ page }) => {
      // Login
      await page.goto('/login')
      await page.fill('input[type="email"]', ADMIN_EMAIL)
      await page.fill('input[type="password"]', ADMIN_PASSWORD)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(3000)

      // Go to home to check navbar
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Account button should show user name
      await expect(page.locator('text=/Admin|Account/i')).toBeVisible()
    })
  })
})
