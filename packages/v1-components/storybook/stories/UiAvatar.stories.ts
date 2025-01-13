import type { Meta, StoryObj } from '@storybook/vue3'

import UiAvatar from '@/host/components/avatar/UiAvatar.vue'

import page from './UiAvatar.mdx'

import { STATUS, SIZE } from '@/common/components/avatar'

const meta = {
  title: 'Components/UiAvatar',

  component: UiAvatar,

  args: {
    src: 'https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg',
    size: SIZE.SM,
    status: STATUS.NONE,
  },

  argTypes: {
    status: {
      control: 'select',
      options: Object.values(STATUS),
    },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },

  render: (args: unknown) => ({
    components: {
      UiAvatar,
    },

    setup() {
      return { props:args }
    },

    template: `
     <UiAvatar v-bind="props" />
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiAvatar>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>;

export const Sandbox: Story = {}
