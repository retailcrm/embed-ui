import * as path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { mergeConfig } from 'vite'

import basic from './vite.config.basic'
import { dependencies, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(peerDependencies ?? {}),
  ...Object.keys(dependencies ?? {}),
]

const isPackageExternal = (id: string): boolean => externalPackages.some(
  packageName => id === packageName || id.startsWith(`${packageName}/`)
)

export default mergeConfig(basic, defineConfig({
  plugins: [dts({
    tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
    entryRoot: path.resolve(__dirname, './src'),
    include: [path.resolve(__dirname, './src')],
    exclude: [
      path.resolve(__dirname, './tests'),
      path.resolve(__dirname, './scripts'),
      path.resolve(__dirname, './dist'),
    ],
    outDir: path.resolve(__dirname, './dist'),
    insertTypesEntry: true,
    staticImport: true,
  })],
  build: {
    lib: {
      entry: {
        common: path.resolve(__dirname, './src/common.ts'),
        'common/targets': path.resolve(__dirname, './src/common/targets.ts'),
        remote: path.resolve(__dirname, './src/remote.ts'),
        'remote/widgets': path.resolve(__dirname, './src/remote/widgets.ts'),
        'remote/pages': path.resolve(__dirname, './src/remote/pages.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${{
        es: 'js',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    rollupOptions: {
      external: id =>
        isPackageExternal(id)
        || /^@omnicajs\/vue-remote\/.*/.test(id),
      output: {
        exports: 'named',
        dir: path.join(__dirname, '/dist'),
        chunkFileNames: '[name].[format].js',
      },
    },
    minify: false,
  },
}))
