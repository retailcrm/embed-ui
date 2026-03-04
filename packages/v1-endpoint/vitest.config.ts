import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['packages/v1-endpoint/tests/**/*.e2e.ts'],
  },
})
