import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: __dirname,
  test: {
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.test.browser.ts',
    ],
  },
})
