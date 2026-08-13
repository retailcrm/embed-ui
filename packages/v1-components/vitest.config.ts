import { join } from 'node:path'

import { defaultExclude, defineConfig, mergeConfig } from 'vitest/config'

import basic from './vite.config.basic'

export default mergeConfig(
  basic,
  defineConfig({
    root: __dirname,
    resolve: {
      alias: {
        '~tests': join(__dirname, './tests/'),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...defaultExclude, '**/*.test.browser.ts'],
      coverage: {
        provider: 'istanbul',
        all: true,
        include: ['src/**/*.{ts,tsx,vue}'],
        exclude: ['src/**/*.d.ts'],
      },
    },
  })
)
