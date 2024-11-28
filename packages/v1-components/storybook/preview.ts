import type { Preview } from '@storybook/vue3'

import theme from './theme'

export default {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
  },
  decorators: [],
  tags: ['autodocs'],
} as Preview
