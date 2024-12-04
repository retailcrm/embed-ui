import {
  join,
  resolve,
} from 'node:path'

import { defineConfig } from 'vite'

import {
  dependencies,
  peerDependencies,
} from './package.json'

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
        /^@omnicajs\/vue-remote\/.*/,
        /^@retailcrm\/embed-ui-v1-contexts\/.*/,
      ],
      output: {
        exports: 'named',
        dir: join(__dirname, '/dist'),
        globals: { vue: 'Vue' },
      },
    },
  },
})