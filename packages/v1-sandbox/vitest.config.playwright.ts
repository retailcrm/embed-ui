import { dirname } from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'

import { defineConfig, devices } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: path.resolve(__dirname, '.env.sandbox'),
  quiet: true,
})

const sandboxBaseURL = process.env.SANDBOX_BASE_URL
const baseURL = sandboxBaseURL || 'http://127.0.0.1:4173'
const configuredExtensionBaseURL = process.env.SANDBOX_EXTENSION_URL
const extensionBaseURL = configuredExtensionBaseURL || 'http://127.0.0.1:4175/extension/'
const promoModule = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, 'tests/__fixtures__/extensions/promoModule/extensionrc.json'),
  'utf8'
)) as { uuid: string }

process.env.SANDBOX_EXTENSION_URL = extensionBaseURL

const webServer = [
  ...(sandboxBaseURL ? [] : [{
    command: 'yarn vite --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  }]),
  ...(configuredExtensionBaseURL ? [] : [{
    command: 'yarn build:e2e-extensions && yarn serve:e2e-extensions',
    url: new URL(promoModule.uuid, extensionBaseURL).href,
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
