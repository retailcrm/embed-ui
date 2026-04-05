import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiSkeletonProperties } from '@/common/components/skeleton'

import UiSkeleton from '@/host/components/skeleton/UiSkeleton.vue'

import { ANIMATION, APPEARANCE, SIZE } from '@/common/components/skeleton'

import page from './UiSkeleton.mdx'

const meta = {
  title: 'Components/UiSkeleton',

  component: UiSkeleton,

  args: {
    appearance: APPEARANCE.RECTANGLE,
    size: SIZE.MD,
    animation: ANIMATION.SHIMMER,
    width: null,
    height: null,
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

    animation: {
      control: 'select',
      options: Object.values(ANIMATION),
    },
  },

  render: (args: UiSkeletonProperties) => ({
    components: { UiSkeleton },

    setup () {
      return { args }
    },

    template: `
      <div style="width: 320px">
          <UiSkeleton v-bind="args" />
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiSkeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Text: Story = {
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.SM,
  },
}

export const Circle: Story = {
  args: {
    appearance: APPEARANCE.CIRCLE,
    size: SIZE.SM,
    width: 48,
    height: 48,
  },
}
