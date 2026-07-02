import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

import basic from './vite.config.basic'

const fixtureBaseUrl = process.env.SANDBOX_FIXTURE_BASE_URL?.trim() || 'http://127.0.0.1:4274'

export default mergeConfig(basic, defineConfig({
  root: __dirname,
  server: {
    allowedHosts: true,
  },
  test: {
    globalSetup: ['./tests/__fixtures__/setup-browser-fixture.mjs'],
    include: ['tests/**/*.browser.test.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          channel: 'chromium',
        },
      }),
      headless: true,
      screenshotFailures: true,
      screenshotDirectory: 'artifacts/browser/screenshots',
      instances: [{ browser: 'chromium' }],
    },
  },
  define: {
    __SANDBOX_FIXTURE_BASE_URL__: JSON.stringify(fixtureBaseUrl),
  },
}))
