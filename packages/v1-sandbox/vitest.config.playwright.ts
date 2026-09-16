import { dirname } from 'path'
import { fileURLToPath } from 'url'

import path from 'path'

import dotenv from 'dotenv'

import { defineConfig, devices } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: path.resolve(__dirname, '.env.sandbox'),
  quiet: true,
})

const baseURL = process.env.SANDBOX_BASE_URL?.trim() || 'http://127.0.0.1:4173'
process.env.SANDBOX_EXTENSION_URL = new URL('/extension/', baseURL).href
process.env.SANDBOX_RUNTIME_EXTENSION_URL = baseURL

const webServer = [
  ...(process.env.SANDBOX_BASE_URL?.trim() ? [] : [{
    command: 'yarn dev:e2e',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  }]),
]

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
  webServer,
})
