import type { Meta, StoryObj } from '@storybook/vue3'

import UiCopyButton from '@/host/components/copy-button/UiCopyButton.vue'

import { SIZE } from '@/common/components/button'

import page from './UiCopyButton.mdx'

const meta = {
  title: 'Components/UiCopyButton',

  component: UiCopyButton,

  args: {
    text: 'Long enough text worth to be copied',
  },

  argTypes: {
    size: {
      options: Object.values(SIZE),
    },
  },

  render: (args) => ({
    components: {
      UiCopyButton,
    },

    setup: () => ({ args }),

    template: `
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiCopyButton>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
