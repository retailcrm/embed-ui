import { dirname } from 'path'
import { fileURLToPath } from 'url'

import path from 'path'

import dotenv from 'dotenv'

import { defineConfig, devices } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

const baseURL = process.env.SANDBOX_BASE_URL ?? 'http://127.0.0.1:4173'
const useExternalSandbox = Boolean(process.env.SANDBOX_BASE_URL)
const extensionURL = process.env.SANDBOX_EXTENSION_URL
const extensionPageCode = process.env.SANDBOX_EXTENSION_PAGE_CODE
const extensionTarget = process.env.SANDBOX_EXTENSION_TARGET

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
    extensionURL,
    extensionPageCode,
    extensionTarget,
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
