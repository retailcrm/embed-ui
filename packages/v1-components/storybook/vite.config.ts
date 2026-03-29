import { defineConfig, mergeConfig } from 'vite'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import vueRemote from '@omnicajs/vue-remote/vite-plugin'

import common from '../vite.config.basic'

export default mergeConfig(common, defineConfig({
  worker: {
    plugins: () => [
      svg(),
      vueRemote(),
      vue(),
    ],
  },
}))
