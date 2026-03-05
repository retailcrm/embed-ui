import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { mergeConfig } from 'vite'

import basic from './vite.config.basic'
import { formatDeclarationFile } from './vite.dts-format'

import { dependencies, name, peerDependencies } from './package.json'

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
]

const isPackageExternal = (id: string): boolean => externalPackages.some(
  packageName => id === packageName || id.startsWith(`${packageName}/`)
)

// noinspection JSUnusedGlobalSymbols
export default mergeConfig(basic, defineConfig({
  build: {
    lib: {
      name: name + '/remote',
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, './src/remote.ts'),
      fileName: (format) => `remote.${{
        es: 'js',
        cjs: 'cjs',
      }[format]}`,
    },
    minify: false,
    rollupOptions: {
      external: id => isPackageExternal(id),
      output: {
        assetFileNames: 'remote[extname]',
      },
    },
    emptyOutDir: false,
    outDir: resolve(__dirname, './dist/remote'),
  },

  plugins: [
    dts({
      rollupTypes: true,
      beforeWriteFile: (filePath, content) => {
        if (!filePath.endsWith('.d.ts')) {
          return
        }

        return {
          filePath,
          content: formatDeclarationFile(content),
        }
      },
    }),
  ],
}))
