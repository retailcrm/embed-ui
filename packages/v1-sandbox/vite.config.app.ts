import * as path from 'node:path'

import { defineConfig, mergeConfig } from 'vite'

import basic from './vite.config.basic'

const resolveManualChunk = (id: string): string | undefined => {
  const normalizedId = id.replaceAll(path.sep, '/')

  if (
    !normalizedId.includes('node_modules')
    && !normalizedId.includes('/packages/v1-components/')
    && !normalizedId.includes('/packages/v1-contexts/')
    && !normalizedId.includes('/packages/v1-endpoint/')
    && !normalizedId.includes('/packages/v1-types/')
  ) {
    return undefined
  }

  if (
    normalizedId.includes('/@retailcrm/embed-ui-v1-components/')
    || normalizedId.includes('/packages/v1-components/')
  ) {
    return 'vendor-v1-components'
  }

  return 'vendor'
}

export default mergeConfig(basic, defineConfig({
  build: {
    emptyOutDir: false,
    outDir: path.resolve(__dirname, 'dist/app'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks: resolveManualChunk,
      },
    },
  },
  root: __dirname,
  server: {
    allowedHosts: true,
  },
}))
