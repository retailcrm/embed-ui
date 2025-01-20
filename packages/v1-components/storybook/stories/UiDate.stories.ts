import type { Meta, StoryObj } from '@storybook/vue3'

import UiDate from '@/host/components/date/UiDate.vue'

import page from './UiDate.mdx'

const meta = {
  title: 'Components/UiDate',

  component: UiDate,

  args: {
    date: new Date('2024-05-30T15:30:00'),
    locale: 'en-GB',
    withTime: false,
  },

  argTypes: {
    date: {
      control: 'date',
    },
    locale: {
      control: 'select',
      options: Object.values(['en-GB', 'es-ES', 'ru-RU']),
    },
    withTime: {
      control: 'boolean',
    },
  },

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiDate>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
