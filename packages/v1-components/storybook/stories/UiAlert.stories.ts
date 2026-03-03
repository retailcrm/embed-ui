import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiAlertProperties } from '@/common/components/alert'

import UiAlert from '@/host/components/alert/UiAlert.vue'

import { VARIANT } from '@/common/components/alert'

import page from './UiAlert.mdx'

const meta = {
  title: 'Components/UiAlert',

  component: UiAlert,

  args: {
    variant: VARIANT.PRIMARY,
    text: 'Basic alert',
    shown: true,
    closable: false,
    ellipsis: false,
    small: false,
    scrollToAlert: false,
    scrollBehavior: 'smooth',
    fluid: false,
  },

  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
  },

  render: (args: UiAlertProperties) => ({
    components: {
      UiAlert,
    },

    setup () {
      return {
        args,
      }
    },

    template: `
      <div style="width: 520px">
          <UiAlert v-bind="args" />
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiAlert>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Warning: Story = {
  args: {
    variant: VARIANT.WARNING,
    text: 'Warning alert',
  },
}

export const Success: Story = {
  args: {
    variant: VARIANT.SUCCESS,
    text: 'Success alert',
  },
}

export const Danger: Story = {
  args: {
    variant: VARIANT.DANGER,
    text: 'Danger alert',
  },
}
