import type { Meta, StoryObj } from '@storybook/vue3'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'

import page from './UiMenuItem.mdx'

import { SIZE } from '@/common/components/menu'

const meta = {
  id: 'UiMenuItem',

  title: 'Components/UiMenuItem',

  component: UiMenuItem,

  argTypes: {
    size: {
      options: Object.values(SIZE),
    },

    counter: {
      control: { type: 'number' },
    },
  },

  render: (args) => ({
    components: {
      UiMenuItem,
    },

    setup: () => ({ args }),

    template: `
      <UiMenuItem v-bind="args">
          Audrey Robertson
      </UiMenuItem>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiMenuItem>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    size: 'md',
    description: '',
    counter: 0,
    accent: true,
    active: false,
    danger: false,
  },
}