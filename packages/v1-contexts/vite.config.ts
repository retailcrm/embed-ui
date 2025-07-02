import {
  defineConfig,
  mergeConfig,
} from 'vite'

import dts from 'vite-plugin-dts'

import path from 'node:path'

import {
  name,
  peerDependencies,
} from './package.json'

import basic from './vite.config.basic'

export default mergeConfig(basic, defineConfig({
  build: {
    lib: {
      name,
      formats: ['es', 'cjs'],
      entry: {
        'host': path.resolve(__dirname, './src/host.ts'),
        'remote': path.resolve(__dirname, './src/remote.ts'),
        'remote/customer/card': path.resolve(__dirname, './src/remote/customer/card.ts'),
        'remote/customer/card-phone': path.resolve(__dirname, './src/remote/customer/card-phone.ts'),
        'remote/order/card': path.resolve(__dirname, './src/remote/order/card.ts'),
        'remote/order/card-items': path.resolve(__dirname, './src/remote/order/card-items.ts'),
        'remote/order/card-settings': path.resolve(__dirname, './src/remote/order/card-settings.ts'),
        'remote/user/current': path.resolve(__dirname, './src/remote/user/current.ts'),
        'remote/settings': path.resolve(__dirname, './src/remote/settings.ts'),
        'remote/custom': path.resolve(__dirname, './src/remote/custom.ts'),
      },
      fileName: (format, name) => `${name}.${{
        es: 'js',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
      ],
      output: {
        exports: 'named',
        dir: path.join(__dirname, '/dist'),
        globals: { vue: 'Vue' },
        chunkFileNames: '[name].[format].js',
      },
    },
  },

  plugins: [dts({
    exclude: [
      'scripts/**/*.*',
      'tests/**/*.*',
    ],
    insertTypesEntry: true,
    staticImport: true,
  })],
}))