import type { Preview } from '@storybook/vue3'

export default {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        return a.id.endsWith('docs') && !b.id.endsWith('docs')
          ? -1
          : !a.id.endsWith('docs') && b.id.endsWith('docs')
            ? 1
            : a.id === b.id
              ? 0
              : a.id.localeCompare(b.id, undefined, { numeric: true })
      },
    },
  },
  decorators: [],
  tags: ['autodocs'],
} as Preview
