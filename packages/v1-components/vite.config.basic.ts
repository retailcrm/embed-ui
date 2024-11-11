import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    svg(),
    vue(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~assets': resolve(__dirname, './assets'),
    },
  },
})