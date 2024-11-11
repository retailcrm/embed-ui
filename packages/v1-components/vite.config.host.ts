import {
  defineConfig,
  mergeConfig,
} from 'vite'

import { resolve } from 'node:path'

import dts from 'vite-plugin-dts'

import basic from './vite.config.basic'

import {
  name,
  dependencies,
  peerDependencies,
} from './package.json'

// noinspection JSUnusedGlobalSymbols
export default mergeConfig(basic, defineConfig({
  build: {
    lib: {
      name: name + '/host',
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, './src/host.ts'),
      fileName: (format) => `host.${{
        es: 'js',
        cjs: 'cjs',
      }[format]}`,
    },
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
      output: {
        assetFileNames: 'host[extname]',
      },
    },
  },

  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
}))
