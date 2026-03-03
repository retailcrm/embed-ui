import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiAddButtonProperties } from '@/common/components/add-button'

import UiAddButton from '@/host/components/add-button/UiAddButton.vue'

import { COLOR } from '@/common/components/add-button'

import page from './UiAddButton.mdx'

const meta = {
  title: 'Components/UiAddButton',

  component: UiAddButton,

  args: {
    type: 'button',
    small: false,
    color: COLOR.GREEN,
    disabled: false,
    height: 80,
  },

  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLOR),
    },

    height: {
      control: { type: 'text' },
    },
  },

  render: (args: UiAddButtonProperties) => ({
    components: {
      UiAddButton,
    },

    setup: () => ({ args }),

    template: `
      <div style="width: 420px;">
          <UiAddButton v-bind="args">
              Add Button

              <template #description>
                  Description
              </template>
          </UiAddButton>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiAddButton>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Small: Story = {
  args: {
    small: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Blue: Story = {
  args: {
    color: COLOR.BLUE,
  },
}

export const CustomHeight: Story = {
  args: {
    height: 120,
  },
}
