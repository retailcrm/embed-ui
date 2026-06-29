import { join } from 'node:path'

import { defineConfig } from 'vite'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import vueRemoteVitePlugin from '@omnicajs/vue-remote/vite-plugin'

export default defineConfig({
  plugins: [
    vueRemoteVitePlugin(),
    svg(),
    vue(),
    vueI18n({
      defaultSFCLang: 'json',
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
})
