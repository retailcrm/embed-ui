import type { Meta, StoryObj } from '@storybook/vue3'

import UiLink from '@/host/components/link/UiLink.vue'

import page from './UiLink.mdx'

import {
  APPEARANCE,
  SIZE,
} from '@/common/components/link'

const meta = {
  title: 'Components/UiLink',

  component: UiLink,

  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.BODY,
  },

  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },

  render: (args: unknown) => ({
    components: {
      UiLink,
    },

    setup () {
      return { args }
    },

    template: `
      <UiLink v-bind="args">
          Hyperlink
      </UiLink>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiLink>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
