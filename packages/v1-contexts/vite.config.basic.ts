import { defineConfig } from 'vite'
import {
  join,
  resolve,
} from 'node:path'

export default defineConfig({
  plugins: [],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~types': join(__dirname, './types/'),
    },
  },
})