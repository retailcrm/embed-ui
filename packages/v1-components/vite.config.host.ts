import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { mergeConfig } from 'vite'

import basic from './vite.config.basic'
import { formatDeclarationFile } from './vite.dts-format'

import { dependencies, name, peerDependencies } from './package.json'

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
      cleanVueFileName: true,
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
