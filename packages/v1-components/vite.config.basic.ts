import { join, resolve } from 'node:path'

import { defineConfig } from 'vite'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import vueRemoteVitePlugin from '@omnicajs/vue-remote/vite-plugin'

export default defineConfig({
  plugins: [
    svg(),
    vueRemoteVitePlugin(),
    vue(),
  ],

  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
      '~assets': resolve(__dirname, './assets'),
    },
  },
})
