import { defineConfig, mergeConfig } from 'vitest/config'

import { join } from 'node:path'

import basic from './vite.config.basic'

export default mergeConfig(
  basic,
  defineConfig({
    resolve: {
      alias: {
        '~tests': join(__dirname, './tests/'),
      },
    },
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'istanbul',
        include: ['src/**'],
      },
    },
  })
)
