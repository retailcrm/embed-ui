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
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        bridge: path.resolve(__dirname, './src/core/bridge.ts'),
        controller: path.resolve(__dirname, './src/core/controller.ts'),
        host: path.resolve(__dirname, './src/core/host.ts'),
        index: path.resolve(__dirname, './src/index.ts'),
        rpc: path.resolve(__dirname, './src/core/rpc.ts'),
        state: path.resolve(__dirname, './src/core/state.ts'),
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
        chunkFileNames: '[name].[format].js',
      },
    },
  },
  plugins: [dts({
    insertTypesEntry: true,
    staticImport: true,
  })],
  server: {
    allowedHosts: ['v1.embed-ui-sandbox.local'],
  },
}))
