import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'packages/v1-endpoint/tests/**/*.e2e.ts',
    ],
  },
})
