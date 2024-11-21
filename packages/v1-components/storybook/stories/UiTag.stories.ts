import type { Meta, StoryObj } from '@storybook/vue3'

import UiTag from '@/host/components/tag/UiTag.vue'

import page from './UiTag.mdx'

import { SIZE } from '@/common/components/tag'

const meta = {
  title: 'Components/UiTag',

  component: UiTag,

  args: {
    size: SIZE.LG,
    background: '#66d2b6',
    saturated: true,
  },

  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },

    icon: { control: false },
    default: { control: false },
    'remove-icon': { control: false },
  },

  render: (args: unknown) => ({
    components: { UiTag },

    setup () {
      return { args }
    },

    template: `
      <UiTag v-bind="args">
        Free text
      </UiTag>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiTag>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
