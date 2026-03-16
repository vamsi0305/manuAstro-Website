import { test, expect } from '@playwright/test'

test.describe('Shop', () => {
  test('shop page loads', async ({ page }) => {
    await page.goto('/shop')
    await expect(page).toHaveURL(/shop/)
  })

  test('products are visible', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForTimeout(3000)
    const products = page.locator('.card, [class*="product"], [class*="card"]')
    const count = await products.count()
    expect(count).toBeGreaterThan(0)
  })

  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL(/about/)
  })

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact')
    await expect(page).toHaveURL(/contact/)
  })

  test('blogs page loads', async ({ page }) => {
    await page.goto('/blogs')
    await expect(page).toHaveURL(/blog/)
  })
})
