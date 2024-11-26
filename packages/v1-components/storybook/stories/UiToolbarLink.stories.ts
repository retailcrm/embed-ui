import type { Meta, StoryObj } from '@storybook/vue3'

import UiToolbarLink from '@/host/components/toolbar-link/UiToolbarLink.vue'

import page from './UiToolbarLink.mdx'

import { APPEARANCE } from '@/common/components/link'

const meta = {
  title: 'Components/UiToolbarLink',

  component: UiToolbarLink,

  args: {
    appearance: APPEARANCE.DEFAULT,
  },

  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },

    default: { control: false },
    icon: { control: false },
  },

  render: (args: unknown) => ({
    components: {
      UiToolbarLink,
    },

    setup () {
      return { args }
    },

    template: `
      <UiToolbarLink v-bind="args">
          Hyperlink
      </UiToolbarLink>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiToolbarLink>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
