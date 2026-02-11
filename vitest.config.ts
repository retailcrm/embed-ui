import {
  defineConfig,
  defaultExclude,
} from 'vitest/config'

import { join } from 'node:path'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, './src/'),
      '~tests': join(__dirname, './tests/'),
      '~types': join(__dirname, './types/'),
    },
  },
  plugins: [
    vue(),
  ],
  test: {
    environment: 'jsdom',
    exclude: [...defaultExclude, './packages/**'],
    coverage: {
      provider: 'istanbul',
      all: true,
      include: [
        'src/**/*.{ts,tsx,vue}',
        'packages/*/src/**/*.{ts,tsx,vue}',
      ],
      exclude: [
        'src/**/*.d.ts',
        'packages/*/src/**/*.d.ts',
      ],
    },
    projects: [
      '.',
      'packages/v1-contexts',
      'packages/v1-components',
    ],
  },
})
