import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173'
const extensionBaseURL = 'http://127.0.0.1:4175'
process.env.SANDBOX_EXTENSION_URL = new URL('/extension/', extensionBaseURL).href
process.env.SANDBOX_RUNTIME_EXTENSION_URL = extensionBaseURL

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  outputDir: 'artifacts/playwright/results',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'yarn vite --host 127.0.0.1 --port 4173 --strictPort',
      url: baseURL,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'yarn build:e2e-extensions && yarn serve:e2e-extensions',
      url: new URL('/runtime/promoModule/entrypoint.js', extensionBaseURL).href,
      reuseExistingServer: !process.env.CI,
    },
  ],
})
