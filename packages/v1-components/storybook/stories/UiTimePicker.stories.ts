import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiTimePickerProperties } from '@/common/components/time-picker'

import { computed, ref, watch } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

import { omit } from '@/common/utils'

import page from './UiTimePicker.mdx'

const meta = {
  title: 'Components/UiTimePicker',

  component: UiTimePicker,

  args: {
    id: 'time-picker-sandbox',
    value: '10:30',
    placeholder: 'Select time',
    interval: 30,
    disabled: false,
    readonly: false,
    container: null,
    timeVariants: [],
    minTime: null,
    maxTime: null,
    textboxOptions: {},
  },

  argTypes: {
    value: { control: false },
    interval: { control: { type: 'number', min: 1, step: 1 } },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    timeVariants: { control: 'object' },
    minTime: { control: 'object' },
    maxTime: { control: 'object' },
    textboxOptions: { control: 'object' },
  },

  render: (args: UiTimePickerProperties) => ({
    components: {
      UiTimePicker,
    },

    setup () {
      const value = ref(args.value ?? '')

      watch(() => args.value, (next) => {
        value.value = next ?? ''
      })

      return {
        value,
        props: computed(() => omit(args, ['value'])),
      }
    },

    template: `
      <div style="display: grid; gap: 8px;">
          <UiTimePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="font-size: 12px; color: #666;">
              Value: {{ value || '—' }}
          </div>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiTimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const QuarterHour: Story = {
  args: {
    interval: 15,
    value: '09:45',
  },
}

export const Bounds: Story = {
  args: {
    minTime: [9, 30],
    maxTime: [18, 0],
    value: '11:00',
  },
}

export const CustomVariants: Story = {
  args: {
    timeVariants: ['09:00', '09:30', '10:00', '12:25', '16:00'],
    value: '12:25',
  },
}

export const Disabled: Story = {
  args: {
    value: '10:30',
    disabled: true,
  },
}

export const Readonly: Story = {
  args: {
    value: '14:00',
    readonly: true,
  },
}
