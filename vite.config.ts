import { join, resolve } from 'node:path'

import { defineConfig } from 'vite'

import { dependencies, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
]

const isPackageExternal = (id: string): boolean => externalPackages.some(
  packageName => id === packageName || id.startsWith(`${packageName}/`)
)

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
      external: id =>
        isPackageExternal(id)
        || /^@retailcrm\/embed-ui-v1-contexts\/.*/.test(id),
      output: {
        exports: 'named',
        dir: join(__dirname, '/dist'),
        globals: { vue: 'Vue' },
      },
    },
  },
})
