import * as path from 'node:path'

import { defineConfig, mergeConfig } from 'vite'

import dts from 'vite-plugin-dts'

import basic from './vite.config.basic'
import { dependencies, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
]

const isPackageExternal = (id: string): boolean => externalPackages.some(
  packageName => id === packageName || id.startsWith(`${packageName}/`)
)

export default mergeConfig(basic, defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        bridge: path.resolve(__dirname, './src/bridge.ts'),
        controller: path.resolve(__dirname, './src/controller.ts'),
        host: path.resolve(__dirname, './src/host.ts'),
        index: path.resolve(__dirname, './src/index.ts'),
        rpc: path.resolve(__dirname, './src/rpc.ts'),
        state: path.resolve(__dirname, './src/state.ts'),
      },
      fileName: (format, name) => `${name}.${{
        es: 'js',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    minify: false,
    outDir: path.join(__dirname, '/dist'),
    rollupOptions: {
      external: id => isPackageExternal(id),
      output: {
        chunkFileNames: '[name].[format].js',
        exports: 'named',
      },
    },
  },
  plugins: [dts({
    copyDtsFiles: true,
    entryRoot: 'src',
    exclude: [
      'src/app/**/*.vue',
      'src/app/host-components.ts',
      'src/app/i18n/**/*.ts',
      'src/app/main.ts',
      'src/app/predicates.ts',
      'src/app/runtime/**/*.ts',
    ],
    include: ['src'],
    insertTypesEntry: true,
    staticImport: true,
  })],
  publicDir: false,
  server: {
    allowedHosts: true,
  },
}))
