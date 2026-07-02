import * as path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        'node/index': path.resolve(__dirname, './src/node/index.ts'),
      },
      fileName: (format, name) => `${name}.${{
        es: 'js',
        cjs: 'cjs',
      }[format as 'es' | 'cjs']}`,
      formats: ['es', 'cjs'],
    },
    minify: false,
    outDir: path.join(__dirname, '/dist'),
    rollupOptions: {
      external: id => id.startsWith('node:'),
      output: {
        exports: 'named',
      },
    },
    ssr: true,
  },
  publicDir: false,
})
