import type { ViteUserConfig } from 'vitest/config'

import { defineConfig, mergeConfig } from 'vitest/config'

import basic from './vite.config.basic'

export default mergeConfig(basic as ViteUserConfig, defineConfig({
  root: __dirname,
  test: {
    environment: 'jsdom',
    exclude: ['tests/**/*.browser.test.ts'],
    include: ['tests/**/*.test.ts'],
    reporters: ['dot'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/**/*.d.ts'],
      reportsDirectory: 'artifacts/coverage/vitest',
      reporter: [
        'html',
        'json',
        'text-summary',
      ],
    },
  },
}))
