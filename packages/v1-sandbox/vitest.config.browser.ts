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
    watch: null,
  },
  test: {
    fileParallelism: false,
    name: '@retailcrm/embed-ui-v1-sandbox:browser',
    include: ['tests/**/*.test.browser.ts'],
    reporters: ['dot'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          channel: 'chromium',
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      }),
      headless: true,
      screenshotFailures: true,
      screenshotDirectory: 'artifacts/browser/screenshots',
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      provider: 'istanbul',
      exclude: ['src/**/*.d.ts'],
      reportsDirectory: 'artifacts/coverage/vitest-browser',
      reporter: [
        'html',
        'json',
        'text-summary',
      ],
    },
  },
}))
