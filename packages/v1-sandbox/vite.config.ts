import * as path from 'node:path'

import { defineConfig, mergeConfig } from 'vite'

import dts from 'vite-plugin-dts'

import basic from './vite.config.basic'
import { dependencies, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
]

const bundledPackages = new Set([
  '@retailcrm/embed-ui-v1-testing',
])

const isPackageExternal = (id: string): boolean => (
  id.startsWith('node:')
  || externalPackages.some(packageName =>
    !bundledPackages.has(packageName)
    && (id === packageName || id.startsWith(`${packageName}/`))
  )
)

export default mergeConfig(basic, defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        'app/index': path.resolve(__dirname, './src/app/index.ts'),
        'automation/browser': path.resolve(__dirname, './src/automation/browser.ts'),
        'automation/index': path.resolve(__dirname, './src/automation/index.ts'),
        'automation/playwright': path.resolve(__dirname, './src/automation/playwright.ts'),
        'core/index': path.resolve(__dirname, './src/core/index.ts'),
        index: path.resolve(__dirname, './src/index.ts'),
        'runtime/index': path.resolve(__dirname, './src/runtime/index.ts'),
        'scenario/index': path.resolve(__dirname, './src/scenario/index.ts'),
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
    beforeWriteFile: (filePath, content) => {
      const fileName = path.basename(filePath)

      if (fileName.startsWith('shims-') && fileName.endsWith('.d.ts')) {
        return {
          content,
          filePath: path.join(__dirname, 'dist', fileName),
        }
      }
    },
    copyDtsFiles: true,
    entryRoot: 'src',
    exclude: [
      'src/app/**/*.vue',
      'src/app/i18n/**/*.ts',
      'src/app/main.ts',
      'src/app/predicates.ts',
      'src/components/**/*.vue',
      'src/runtime/remoteBootstrap.worker.ts',
    ],
    include: ['src', 'shims-*.d.ts'],
    insertTypesEntry: true,
    staticImport: true,
  })],
  publicDir: false,
  server: {
    allowedHosts: true,
  },
}))
