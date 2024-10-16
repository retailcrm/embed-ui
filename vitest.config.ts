import path from 'node:path'

import { defineConfig } from 'vitest/config'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, './src/'),
      '~tests': path.join(__dirname, './tests/'),
      '~types': path.join(__dirname, './types/'),
    },
  },
  plugins: [
    vue(),
  ],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
    },
  },
})
