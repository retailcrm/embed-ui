import {
  defineConfig,
  mergeConfig,
} from 'vite'

import common from '../vite.config.basic'

export default mergeConfig(common, defineConfig({}))
