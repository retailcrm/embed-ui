import type { Meta, StoryObj } from '@storybook/vue3'

import IconAdd from '~assets/sprites/actions/add.svg'
import UiButton from '@/host/components/button/UiButton.vue'

import page from './UiButton.mdx'

import {
  APPEARANCE,
  SIZE,
  VARIANT,
} from '@/common/components/button'

const meta = {
  title: 'Components/UiButton',

  component: UiButton,

  args: {
    appearance: APPEARANCE.PRIMARY,
    size: SIZE.SM,
    variant: VARIANT.DEFAULT,
  },

  argTypes: {
    href: { control: 'text' },

    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },

    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
  },

  render: (args: unknown) => ({
    components: {
      IconAdd,
      UiButton,
    },

    setup () {
      return { args }
    },

    template: `
      <h3>Button with text</h3>

      <UiButton v-bind="args">
          Create
      </UiButton>

      <h3>Button with text & leading icon</h3>

      <UiButton v-bind="args">
          <IconAdd aria-hidden="true" /> Create
      </UiButton>

      <h3>Button with icon</h3>

      <UiButton v-bind="args">
          <IconAdd aria-label="Create" />
      </UiButton>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiButton>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
