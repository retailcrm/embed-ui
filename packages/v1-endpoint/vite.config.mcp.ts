import { builtinModules } from 'node:module'
import * as path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import { dependencies, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(peerDependencies ?? {}),
  ...Object.keys(dependencies ?? {}),
]

const builtinPackageNames = new Set([
  ...builtinModules,
  ...builtinModules.map(module => `node:${module}`),
])

const isPackageExternal = (id: string): boolean =>
  builtinPackageNames.has(id)
  || externalPackages.some(packageName => id === packageName || id.startsWith(`${packageName}/`))

export default defineConfig({
  plugins: [dts({
    tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
    entryRoot: path.resolve(__dirname, './src/mcp'),
    include: [path.resolve(__dirname, './src/mcp')],
    outDir: path.resolve(__dirname, './dist/mcp'),
    insertTypesEntry: false,
    staticImport: true,
  })],
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        server: path.resolve(__dirname, './src/mcp/server.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${{
        es: 'js',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
    },
    rollupOptions: {
      external: isPackageExternal,
      output: {
        exports: 'named',
        dir: path.join(__dirname, '/dist/mcp'),
      },
    },
    minify: false,
    ssr: true,
    target: 'node22',
  },
})
