import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

import basic from './vite.config.basic'

export default mergeConfig(
  basic,
  defineConfig({
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    optimizeDeps: {
      include: [
        '@omnicajs/vue-remote/host',
        '@omnicajs/vue-remote/remote',
        '@remote-ui/rpc',
        '@retailcrm/image-preview',
        'date-fns',
        'lodash.isequal',
        'pinia',
        'vue3-perfect-scrollbar',
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
)
