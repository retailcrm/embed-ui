import { dirname } from 'path'
import { fileURLToPath } from 'url'

import path from 'path'

import dotenv from 'dotenv'

import { defineConfig, devices } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

const readEnv = (key: string): string | undefined => {
  const value = process.env[key]?.trim()

  return value || undefined
}

const sandboxBaseURL = readEnv('SANDBOX_BASE_URL')
const baseURL = sandboxBaseURL ?? 'http://127.0.0.1:4173'
const useExternalSandbox = Boolean(sandboxBaseURL)
const extensionFixtureBaseURL = readEnv('SANDBOX_FIXTURE_BASE_URL') ?? 'http://127.0.0.1:4274'
const useExternalFixture = Boolean(readEnv('SANDBOX_FIXTURE_BASE_URL'))

const webServer = [
  ...useExternalSandbox
    ? []
    : [{
      command: 'yarn workspace @retailcrm/embed-ui-v1-sandbox run build'
          + ' && yarn workspace @retailcrm/embed-ui-v1-sandbox run serve --host 127.0.0.1 --port 4173',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      url: 'http://127.0.0.1:4173',
    }],
  ...useExternalFixture
    ? []
    : [{
      command: 'yarn workspace @retailcrm/embed-ui-v1-sandbox run serve:fixture'
          + ' --fixture example-order-sidebar --host 127.0.0.1 --port 4274',
      reuseExistingServer: false,
      url: extensionFixtureBaseURL,
    }],
]

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
  webServer: webServer.length > 0 ? webServer : undefined,
})
