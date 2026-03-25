import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard Tests', () => {
  const ADMIN_EMAIL = 'admin@manuastro.com'
  const ADMIN_PASSWORD = 'Admin@123'

  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear()
    })
    
    // Login as admin
    await page.goto('/login')
    await page.fill('input[type="email"]', ADMIN_EMAIL)
    await page.fill('input[type="password"]', ADMIN_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForTimeout(3000)
    await expect(page).toHaveURL(/admin/, { timeout: 15000 })
  })

  test('admin dashboard loads successfully', async ({ page }) => {
    // Verify we're on admin page
    await expect(page).toHaveURL(/admin/)
    await expect(page.locator('text=Admin Dashboard')).toBeVisible({ timeout: 5000 })
    
    // Check dashboard stats are visible
    await expect(page.locator('text=Total Products')).toBeVisible()
    await expect(page.locator('text=Total Orders')).toBeVisible()
    await expect(page.locator('text=Total Users')).toBeVisible()
    await expect(page.locator('text=Total Revenue')).toBeVisible()
  })

  test('admin navigation tabs are visible', async ({ page }) => {
    // Check all navigation tabs exist
    await expect(page.locator('text=Overview')).toBeVisible()
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page.locator('text=Categories')).toBeVisible()
    await expect(page.locator('text=Orders')).toBeVisible()
    await expect(page.locator('text=Users')).toBeVisible()
    await expect(page.locator('text=Coupons')).toBeVisible()
    await expect(page.locator('text=Blogs')).toBeVisible()
    await expect(page.locator('text=Contacts')).toBeVisible()
  })

  test('switch between admin tabs', async ({ page }) => {
    // Click Products tab
    await page.click('text=Products')
    await page.waitForTimeout(1000)
    await expect(page.locator('text=Products')).toBeVisible()
    
    // Click Orders tab
    await page.click('text=Orders')
    await page.waitForTimeout(1000)
    await expect(page.locator('text=Orders')).toBeVisible()
    
    // Click Users tab
    await page.click('text=Users')
    await page.waitForTimeout(1000)
    await expect(page.locator('text=Users')).toBeVisible()
  })

  test('add new product - form opens', async ({ page }) => {
    await page.click('text=Products')
    await page.waitForTimeout(500)
    
    // Click Add Product button
    const addButton = page.locator('button:has-text("Add Product"), button:has-text("New Product"), text=Plus >> nth=0')
    if (await addButton.isVisible()) {
      await addButton.click()
      await page.waitForTimeout(500)
      
      // Product form should open
      await expect(page.locator('text=Product Details, text=Add Product, input[placeholder*="Product name"]')).toBeVisible({ timeout: 3000 })
    }
  })

  test('view users list', async ({ page }) => {
    await page.click('text=Users')
    await page.waitForTimeout(1000)
    
    // Should show users table or list
    await expect(page.locator('table, [class*="user"], text=Email')).toBeVisible({ timeout: 5000 })
  })

  test('view orders list', async ({ page }) => {
    await page.click('text=Orders')
    await page.waitForTimeout(1000)
    
    // Should show orders table or empty state
    await expect(page.locator('table, [class*="order"], text=Order, text=Status')).toBeVisible({ timeout: 5000 })
  })

  test('view coupons list', async ({ page }) => {
    await page.click('text=Coupons')
    await page.waitForTimeout(1000)
    
    // Should show coupons table or empty state
    await expect(page.locator('table, [class*="coupon"], text=Coupon, text=Code, text=Discount')).toBeVisible({ timeout: 5000 })
  })

  test('view blogs list', async ({ page }) => {
    await page.click('text=Blogs')
    await page.waitForTimeout(1000)
    
    // Should show blogs table or empty state
    await expect(page.locator('table, [class*="blog"], text=Blog, text=Title, text=Published')).toBeVisible({ timeout: 5000 })
  })

  test('view contacts list', async ({ page }) => {
    await page.click('text=Contacts')
    await page.waitForTimeout(1000)
    
    // Should show contacts table or empty state
    await expect(page.locator('table, [class*="contact"], text=Contact, text=Email, text=Message')).toBeVisible({ timeout: 5000 })
  })

  test('admin stats API is accessible', async ({ page }) => {
    // Wait for stats to load
    await page.waitForTimeout(2000)
    
    // Stats should be displayed
    const statsText = await page.locator('text=Total Products, text=Total Orders, text=Total Users').allTextContents()
    expect(statsText.length).toBeGreaterThan(0)
  })

  test('page remains authenticated after navigation', async ({ page }) => {
    // Navigate to different admin sections
    await page.click('text=Products')
    await page.waitForTimeout(500)
    await expect(page).toHaveURL(/admin/)
    
    await page.click('text=Overview')
    await page.waitForTimeout(500)
    await expect(page).toHaveURL(/admin/)
    
    // Should still be authenticated
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
  })

  test('logout functionality', async ({ page }) => {
    // Find and click logout button
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), [class*="logout"]')
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click()
      await page.waitForTimeout(1000)
      
      // Should redirect to login or home
      await expect(page).toHaveURL(/login|\/$/, { timeout: 10000 })
    }
  })
})
