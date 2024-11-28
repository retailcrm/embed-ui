import type { Preview } from '@storybook/vue3'

import theme from './theme'

import './utilities.less'

const preview: Preview = {
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
    options: {
      storySort: (a, b) => {
        const rules = [
          id => id.includes('intro'),
          id => id.endsWith('docs'),
        ]

        if (a.id === b.id) return 0

        for (const rule of rules) {
          if (rule(a.id) && !rule(b.id)) return -1
          if (!rule(a.id) && rule(b.id)) return 1
        }

        return a.id.localeCompare(b.id, undefined, { numeric: true })
      },
    },
  },
  decorators: [],
  tags: ['autodocs'],
}

export default preview
