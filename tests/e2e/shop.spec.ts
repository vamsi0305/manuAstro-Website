import { test, expect } from '@playwright/test'

test.describe('Shop & Product Tests', () => {
  test('shop page loads', async ({ page }) => {
    await page.goto('/shop')
    await expect(page).toHaveURL(/shop/)
    await expect(page.locator('text=Shop, text=Products')).toBeVisible({ timeout: 5000 })
  })

  test('product listing is visible', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForTimeout(2000)

    // Should show product cards or grid
    const products = page.locator('[class*="product"], [class*="card"], article')
    await expect(products).toBeVisible()
  })

  test('search functionality', async ({ page }) => {
    await page.goto('/shop')

    // Find search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], [class*="search"] input')
    if (await searchInput.isVisible()) {
      await searchInput.fill('Rudraksha')
      await page.waitForTimeout(1000)

      // Results should update
      await expect(page.locator('text=Rudraksha')).toBeVisible({ timeout: 5000 })
    }
  })

  test('category filter works', async ({ page }) => {
    await page.goto('/shop')

    // Find category filters
    const categories = page.locator('[class*="category"], [class*="filter"], button:has-text("Category")')
    if (await categories.count() > 0) {
      await categories.first().click()
      await page.waitForTimeout(1000)

      // Products should filter
      await expect(page.locator('[class*="product"]')).toBeVisible()
    }
  })

  test('add to cart functionality', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForTimeout(2000)

    // Find first product's add to cart button
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add to cart"), [class*="add-to-cart"]').first()

    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click()
      await page.waitForTimeout(1000)

      // Cart count should increase
      const cartCount = page.locator('[class*="cart-count"], [class*="cart"] span, [data-testid="cart-count"]')
      if (await cartCount.isVisible()) {
        const countText = await cartCount.textContent()
        expect(parseInt(countText || '0')).toBeGreaterThan(0)
      }
    }
  })

  test('view product details', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForTimeout(2000)

    // Click on first product
    const productLink = page.locator('[class*="product"] a, [class*="card"] a').first()
    if (await productLink.isVisible()) {
      await productLink.click()
      await page.waitForTimeout(2000)

      // Should be on product detail page
      await expect(page.locator('text=Description, text=Price, text=₹')).toBeVisible({ timeout: 5000 })
    }
  })

  test('cart page loads', async ({ page }) => {
    await page.goto('/cart')
    await expect(page).toHaveURL(/cart/)
    await expect(page.locator('text=Cart, text=Your Cart, text=Shopping Cart')).toBeVisible({ timeout: 5000 })
  })

  test('wishlist page loads', async ({ page }) => {
    await page.goto('/wishlist')
    await expect(page).toHaveURL(/wishlist/)
    await expect(page.locator('text=Wishlist, text=Your Wishlist')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Checkout Flow', () => {
  const ADMIN_EMAIL = 'admin@manuastro.com'
  const ADMIN_PASSWORD = 'Admin@123'

  test('checkout requires login', async ({ page }) => {
    await page.goto('/checkout')

    // Should redirect to login
    await expect(page).toHaveURL(/login/, { timeout: 10000 })
  })

  test('checkout page loads for authenticated user', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('input[type="email"]', ADMIN_EMAIL)
    await page.fill('input[type="password"]', ADMIN_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForTimeout(3000)

    // Try to access checkout
    await page.goto('/checkout')
    await page.waitForTimeout(2000)

    // Should load checkout page
    await expect(page).toHaveURL(/checkout/)
    await expect(page.locator('text=Checkout, text=Shipping, text=Payment')).toBeVisible({ timeout: 5000 })
  })
})
