import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/ManuAstro/)
  })

  test('navbar is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('shop link works', async ({ page }) => {
    await page.goto('/')
    await page.goto('/shop')
    await expect(page).toHaveURL(/shop/)
  })
})
