import {
  dirname,
  join,
  resolve,
} from 'node:path'

import * as url from 'node:url'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import {
  dependencies,
  peerDependencies,
} from './package.json'

const __dirname = dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    lib: {
      name: '@retailcrm/embed-ui',
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (format, name) => `${name}.${{
        es: 'mjs',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        '@omnicajs/vue-remote/remote',
      ],
      output: {
        exports: 'named',
        dir: join(__dirname, '/dist'),
        globals: { vue: 'Vue' },
      },
    },
  },

  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
})