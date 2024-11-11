import type { StorybookConfig } from '@storybook/vue3-vite'

import { createRequire } from 'module'
import {
  dirname,
  join,
} from 'path'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Because of PHPStorm tsconfig recognition issues for import.meta specifically
const require = createRequire(import.meta.url)

function getAbsolutePath (value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
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
    './docs/**/*.mdx',
    './**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  viteFinal: async (config) => {
    if (config.server) {
      config.server.hmr.clientPort = 80
    }
    return config
  },
}

export default config
