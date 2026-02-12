import {
  defineConfig,
  mergeConfig,
} from 'vite'
import svg from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

import common from '../vite.config.basic'

export default mergeConfig(common, defineConfig({
  worker: {
    plugins: () => [
      svg(),
      vue(),
    ],
  },
}))
