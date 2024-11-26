import type { Meta, StoryObj } from '@storybook/vue3'

import IconAdd from '~assets/sprites/actions/add.svg'
import UiToolbarButton from '@/host/components/toolbar-button/UiToolbarButton.vue'

import page from './UiToolbarButton.mdx'

import { VARIANT } from '@/common/components/button'

const meta = {
  title: 'Components/UiToolbarButton',

  component: UiToolbarButton,

  args: {
    variant: VARIANT.DEFAULT,
  },

  argTypes: {
    href: { control: 'text' },

    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },

    default: { control: false },
  },

  render: (args: unknown) => ({
    components: {
      IconAdd,
      UiToolbarButton,
    },

    setup () {
      return { args }
    },

    template: `
      <UiToolbarButton v-bind="args">
          <IconAdd aria-hidden="true" /> Create
      </UiToolbarButton>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiToolbarButton>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
