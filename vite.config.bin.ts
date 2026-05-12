import { builtinModules } from 'node:module'
import { chmodSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'

const nodeBuiltins = new Set([
  ...builtinModules,
  ...builtinModules.map(moduleName => `node:${moduleName}`),
])

export default defineConfig({
  plugins: [
    {
      name: 'embed-ui-bin-permissions',
      closeBundle() {
        chmodSync(resolve(__dirname, './bin/embed-ui.mjs'), 0o755)
      },
    },
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, './src/cmd/embed-ui/index.ts'),
      fileName: () => 'embed-ui.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: resolve(__dirname, './bin'),
    rollupOptions: {
      external: id => nodeBuiltins.has(id) || id === 'yargs',
      output: {
        banner: '#!/usr/bin/env node',
      },
    },
  },
})
