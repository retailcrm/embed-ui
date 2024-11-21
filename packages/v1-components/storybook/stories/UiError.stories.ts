import type { Meta, StoryObj } from '@storybook/vue3'

import UiError from '@/host/components/error/UiError.vue'

import page from './UiError.mdx'

import { ALIGN } from '@/common/components/error'

const meta = {
  title: 'Components/UiError',

  component: UiError,

  args: {
    align: ALIGN.LEFT,
  },

  argTypes: {
    align: {
      control: 'select',
      options: Object.values(ALIGN),
    },

    default: { control: false },
  },

  render: (args: unknown) => ({
    components: { UiError },

    setup () {
      return { args }
    },

    template: `
        <UiError v-bind="args">
            Error message
        </UiError>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiError>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
