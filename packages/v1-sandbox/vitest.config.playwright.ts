import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.SANDBOX_BASE_URL ?? 'http://127.0.0.1:4173'
const useExternalSandbox = Boolean(process.env.SANDBOX_BASE_URL)

export default defineConfig({
  testDir: './e2e',
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
  webServer: useExternalSandbox ? undefined : [
    {
      command: 'yarn dev:e2e',
      url: 'http://127.0.0.1:4173',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
