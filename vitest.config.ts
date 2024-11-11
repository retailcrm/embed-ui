import { defineConfig } from 'vitest/config'
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
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
    },
  },
})
