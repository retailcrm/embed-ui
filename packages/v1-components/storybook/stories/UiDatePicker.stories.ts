import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiDatePickerProperties } from '@/common/components/date-picker'

import { computed, ref, watch } from 'vue'

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

import { APPEARANCE } from '@/common/components/calendar'
import { omit } from '@/common/utils'
import { SYNCHRONIZATION } from '@/common/components/date-picker'
import { TYPE } from '@/common/components/calendar'

import page from './UiDatePicker.mdx'

const previewDate = (value: Date | Date[] | null): string => {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return `[${value.map((date) => date.toISOString()).join(', ')}]`
  }

  return value.toISOString()
}

const meta = {
  title: 'Components/UiDatePicker',

  component: UiDatePicker,

  args: {
    id: 'date-picker-sandbox',
    value: new Date('2024-11-21T00:00:00'),
    type: TYPE.SINGLE,
    appearance: APPEARANCE.SINGLE,
    synchronization: SYNCHRONIZATION.INSTANT,
    nullable: false,
    disabled: false,
    readonly: false,
    omitYear: false,
    placeholder: 'Select date',
    minDate: null,
    maxDate: null,
    locale: 'en-GB',
    firstDayOfWeek: null,
    quickOptions: [],
    textboxOptions: {},
    popperOptions: {},
    popperClass: null,
    container: null,
    placement: 'bottom',
  },

  argTypes: {
    value: { control: false },
    type: {
      control: 'select',
      options: Object.values(TYPE),
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    synchronization: {
      control: 'select',
      options: Object.values(SYNCHRONIZATION),
    },
    nullable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    omitYear: { control: 'boolean' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    locale: {
      control: 'select',
      options: ['en-GB', 'es-ES', 'ru-RU', undefined],
    },
    firstDayOfWeek: {
      control: 'select',
      options: [null, 0, 1, 2, 3, 4, 5, 6],
    },
    quickOptions: { control: 'object' },
    textboxOptions: { control: 'object' },
    popperOptions: { control: 'object' },
    popperClass: { control: 'text' },
    container: { control: 'text' },
    placement: { control: 'text' },
  },

  render: (args: UiDatePickerProperties) => ({
    components: {
      UiDatePicker,
    },

    setup () {
      const value = ref<Date | Date[] | null>(args.value ?? null)

      watch(() => args.value, (next) => {
        value.value = next ?? null
      })

      return {
        value,
        props: computed(() => omit(args, ['value'])),
        preview: computed(() => previewDate(value.value)),
      }
    },

    template: `
      <div style="display: inline-block; width: 320px;">
          <UiDatePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="margin-top: 8px; font-size: 12px; color: #666;">
              Value: {{ preview }}
          </div>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiDatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Range: Story = {
  args: {
    type: TYPE.RANGE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-11-19T00:00:00')],
  },
}

export const Confirmed: Story = {
  args: {
    synchronization: SYNCHRONIZATION.CONFIRMED,
    value: null,
  },
}

export const QuickOptions: Story = {
  args: {
    synchronization: SYNCHRONIZATION.CONFIRMED,
    quickOptions: [
      { label: 'Today', value: new Date('2024-11-21T00:00:00') },
      { label: 'This week', value: [new Date('2024-11-18T00:00:00'), new Date('2024-11-24T00:00:00')] },
      { label: 'This month', value: [new Date('2024-11-01T00:00:00'), new Date('2024-11-30T00:00:00')] },
    ],
  },
}

export const Bounds: Story = {
  args: {
    value: new Date('2024-11-14T00:00:00'),
    minDate: new Date('2024-11-05T00:00:00'),
    maxDate: new Date('2024-11-25T00:00:00'),
  },
}

export const RussianLocale: Story = {
  args: {
    locale: 'ru-RU',
    firstDayOfWeek: 1,
    value: new Date('2024-11-21T00:00:00'),
  },
}
