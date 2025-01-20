import type { Meta, StoryObj } from '@storybook/vue3'

import UiImage from '@/host/components/image/UiImage.vue'

import page from './UiImage.mdx'

const meta = {
  title: 'Components/UiImage',

  component: UiImage,

  args: {
    src: 'https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg',
    resize: '200x-',
  },

  render: (args) => ({
    components: {
      UiImage,
    },

    setup: () => ({ args }),

    template: '<UiImage v-bind="args" />',
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiImage>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
