import { join, resolve } from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~types': join(__dirname, './types/'),
    },
  },
})