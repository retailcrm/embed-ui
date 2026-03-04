import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  optimizeDeps: {
    include: [
      'pinia',
      '@omnicajs/vue-remote/remote',
      'lodash.isequal',
      '@retailcrm/image-preview',
      'date-fns',
    ],
  },
  test: {
    include: ['tests/**/*.e2e.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          channel: 'chromium',
        },
      }),
      headless: true,
      screenshotFailures: true,
      screenshotDirectory: 'artifacts/playwright/screenshots',
      instances: [{ browser: 'chromium' }],
    },
  },
})
