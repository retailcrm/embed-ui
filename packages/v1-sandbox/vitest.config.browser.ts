import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

import basic from './vite.config.basic'

export default mergeConfig(basic, defineConfig({
  root: __dirname,
  optimizeDeps: {
    include: [
      '@omnicajs/symfony-router',
      '@omnicajs/vue-remote/remote',
    ],
  },
  server: {
    allowedHosts: true,
  },
  test: {
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
}))
