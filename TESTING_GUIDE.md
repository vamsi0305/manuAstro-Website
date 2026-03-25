# ManuAstro Website - Automated Testing Guide

## 📋 Overview

This project uses **Playwright** for end-to-end (E2E) testing and API testing. The tests cover:

- ✅ Authentication (Login/Register)
- ✅ Admin Dashboard
- ✅ Shop & Products
- ✅ Backend API Endpoints
- ✅ User Flows

## 🚀 Quick Start

### Prerequisites

Make sure both servers are running:

```bash
# Terminal 1 - Backend
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 - Frontend
npm run dev
```

### Install Playwright Browsers (First Time Only)

```bash
npx playwright install
npx playwright install-deps
```

### Run Tests

```bash
# Run all tests
npm run test

# Run tests with browser visible (headed mode)
npm run test:headed

# Run specific test file
npm run test -- auth.spec.ts

# Run tests matching a pattern
npm run test -- --grep "login"

# Run tests on specific browser
npm run test -- --project chromium

# Run tests in debug mode
npm run test -- --debug

# Show test report
npm run test:report
```

## 📁 Test Files

### E2E Tests (`tests/e2e/`)

| File | Description |
|------|-------------|
| `auth.spec.ts` | Login, Register, Authentication state tests |
| `admin.spec.ts` | Admin dashboard, CRUD operations |
| `shop.spec.ts` | Shop, Products, Cart, Checkout |
| `api.spec.ts` | Backend API endpoint tests |
| `homepage.spec.ts` | Homepage navigation and layout |

## 🧪 Test Coverage

### Authentication Tests
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Login with empty fields
- ✅ Register new user
- ✅ Register with existing email
- ✅ Auth state persistence (stay logged in after refresh)
- ✅ Protected route redirects
- ✅ Account button shows user name

### Admin Dashboard Tests
- ✅ Dashboard loads with stats
- ✅ All navigation tabs visible
- ✅ Switch between tabs
- ✅ View products, orders, users, coupons, blogs, contacts
- ✅ Add new product form
- ✅ Admin remains authenticated
- ✅ Logout functionality

### API Tests
- ✅ Health check endpoint
- ✅ Login API
- ✅ Register API
- ✅ Admin stats API
- ✅ Admin products/orders/users API
- ✅ Protected endpoints require authentication
- ✅ Product listing API

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

This opens a browser with:
- ✅ Pass/Fail status for each test
- 📸 Screenshots on failure
- 🎥 Video recordings
- 📈 Execution time

## 🔧 Configuration

Edit `playwright.config.ts` to customize:

```typescript
{
  baseURL: 'http://localhost:5173',  // Change base URL
  timeout: 60000,                     // Test timeout
  retries: 1,                         // Retry failed tests
  workers: 1,                         // Parallel workers
}
```

## 🐛 Debugging Tests

### Run in Debug Mode

```bash
npm run test -- --debug
```

This opens Playwright Inspector with:
- Step-through debugging
- Actionability logs
- Live DOM inspection

### Add Console Logs

In your test file:

```typescript
test('example test', async ({ page }) => {
  await page.goto('/login')
  console.log('On login page')
  // ... rest of test
})
```

### Record Test Execution

```bash
npm run test -- --video=on
```

## 📝 Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate
    await page.goto('/url')
    
    // Interact
    await page.fill('input[name="email"]', 'test@example.com')
    await page.click('button[type="submit"]')
    
    // Assert
    await expect(page.locator('text=Success')).toBeVisible()
  })
})
```

### Useful Playwright Commands

```typescript
// Click
await page.click('button')

// Fill input
await page.fill('input[name="email"]', 'test@example.com')

// Wait for element
await page.waitForSelector('.element')

// Wait for navigation
await page.waitForNavigation()

// Get text
const text = await page.locator('.element').textContent()

// Take screenshot
await page.screenshot({ path: 'screenshot.png' })
```

## 🎯 Test Best Practices

1. **Use `beforeEach` for setup**
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.goto('/login')
   })
   ```

2. **Use descriptive test names**
   ```typescript
   test('login with valid credentials redirects to dashboard', async ({ page }) => {
     // ...
   })
   ```

3. **Wait for elements properly**
   ```typescript
   await expect(page.locator('text=Success')).toBeVisible({ timeout: 5000 })
   ```

4. **Clean up state**
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.addInitScript(() => localStorage.clear())
   })
   ```

## 🔍 Common Issues & Solutions

### Issue: Tests fail with "Timeout"
**Solution:** Increase timeout or add proper waits
```typescript
await expect(page.locator('text=Element')).toBeVisible({ timeout: 10000 })
```

### Issue: "Not authenticated" errors
**Solution:** Clear localStorage before tests
```typescript
await page.addInitScript(() => localStorage.clear())
```

### Issue: Tests pass locally but fail in CI
**Solution:** Add retries and proper waits
```typescript
retries: 2,
waitForTimeout: 1000
```

## 📈 Running Tests in CI/CD

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Start backend
  run: cd backend && python -m uvicorn main:app &

- name: Start frontend
  run: npm run dev &

- name: Run tests
  run: npm run test
```

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Examples](https://github.com/microsoft/playwright-test-examples)
- [Playwright VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## 📞 Need Help?

Check the test output for error messages, or run in debug mode:
```bash
npm run test -- --debug
```
