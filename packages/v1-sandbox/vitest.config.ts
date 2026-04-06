import { defineConfig, mergeConfig } from 'vitest/config'

import basic from './vite.config.basic'

export default mergeConfig(basic, defineConfig({
  root: __dirname,
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'istanbul',
      all: true,
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/**/*.d.ts'],
    },
  },
}))
