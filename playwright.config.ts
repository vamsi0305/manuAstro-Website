import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for ManuAstro Website
 * 
 * Usage:
 * - npm run test           - Run all tests
 * - npm run test:headed    - Run tests with browser visible
 * - npm run test:report    - Show test report
 * - npm run test -- --grep "login"  - Run specific test
 */

export default defineConfig({
  testDir: './tests/e2e',

  // Run tests in parallel (set to false for sequential)
  fullyParallel: false,

  // Number of retries
  retries: 1,

  // Number of workers
  workers: 1,

  // Timeout for each test
  timeout: 60000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  // Shared configuration for all projects
  use: {
    // Base URL for local development
    baseURL: 'http://localhost:5173',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record trace on retry
    trace: 'on-first-retry',

    // Record video
    video: 'retain-on-failure',

    // Browser context options
    viewport: { width: 1920, height: 1080 },
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
        }
      },
    },

    // Test on mobile viewport
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },

    // Test on tablet viewport
    {
      name: 'iPad',
      use: {
        ...devices['iPad Pro'],
      },
    },
  ],

  // Web server configuration (optional - auto-starts dev server)
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: true,
  // },
})
