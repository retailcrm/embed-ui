import * as path from 'node:path'

import { defineConfig, mergeConfig } from 'vite'

import dts from 'vite-plugin-dts'

import { dependencies, name, peerDependencies } from './package.json'

import basic from './vite.config.basic'

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
]

const isPackageExternal = (id: string): boolean => externalPackages.some(
  packageName => id === packageName || id.startsWith(`${packageName}/`)
)

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
      external: id => isPackageExternal(id),
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
      'generated/**/*.*',
      'scripts/**/*.*',
      'tests/**/*.*',
    ],
    insertTypesEntry: true,
    staticImport: true,
  })],
}))
