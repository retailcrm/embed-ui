import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  root: __dirname,
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  optimizeDeps: {
    include: [
      'pinia',
      '@omnicajs/vue-remote/remote',
      'fast-deep-equal',
      '@retailcrm/image-preview',
      'date-fns',
      'date-fns/locale',
    ],
  },
  server: {
    watch: null,
  },
  test: {
    fileParallelism: false,
    name: '@retailcrm/embed-ui-v1-endpoint:browser',
    include: ['tests/**/*.test.browser.ts'],
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
      screenshotDirectory: 'artifacts/playwright/screenshots',
      instances: [{ browser: 'chromium' }],
    },
  },
})
