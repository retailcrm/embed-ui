import { createRequire } from 'module'
import { dirname } from 'node:path'
import { defineMain } from '@storybook/vue3-vite/node'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import remarkGfm from 'remark-gfm'

const __dirname = dirname(fileURLToPath(import.meta.url))

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Because of PHPStorm tsconfig recognition issues for import.meta specifically
const _require = createRequire(import.meta.url)

function getAbsolutePath(value: string): string {
  return dirname(_require.resolve(join(value, 'package.json')))
}

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineMain({
  addons: [
    ...(isDevelopment ? [getAbsolutePath('@storybook/addon-a11y')] : []),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: join(__dirname, './vite.config.ts'),
      },
    },
  },
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  stories: [
    './Intro.mdx',
    './docs/**/*.mdx',
    './**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  viteFinal: async (config) => {
    if (config.server) {
      config.server.allowedHosts = true
      config.server.hmr.clientPort = 80
    }
    return config
  },
})
