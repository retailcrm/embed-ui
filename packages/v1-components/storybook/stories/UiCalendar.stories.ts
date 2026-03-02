import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiCalendarProperties } from '@/common/components/calendar'

import { computed, ref, watch } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

import { APPEARANCE } from '@/common/components/calendar'
import { omit } from '@/common/utils'
import { TYPE } from '@/common/components/calendar'

import page from './UiCalendar.mdx'

const meta = {
  title: 'Components/UiCalendar',

  component: UiCalendar,

  args: {
    value: new Date('2024-11-21T15:30:00'),
    type: TYPE.SINGLE,
    appearance: APPEARANCE.SINGLE,
    nullable: false,
    locale: 'en-GB',
    minDate: null,
    maxDate: null,
    firstDayOfWeek: undefined,
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
    nullable: { control: 'boolean' },
    locale: {
      control: 'select',
      options: ['en-GB', 'es-ES', 'ru-RU'],
    },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    firstDayOfWeek: {
      control: 'select',
      options: [undefined, 0, 1, 2, 3, 4, 5, 6],
    },
  },

  render: (args: UiCalendarProperties) => ({
    components: {
      UiCalendar,
    },

    setup () {
      const value = ref(args.value ?? null)

      watch(() => args.value, (next) => {
        value.value = next ?? null
      })

      return {
        value,
        props: computed(() => omit(args, ['value'])),
      }
    },

    template: `
      <UiCalendar
          v-model:value="value"
          v-bind="props"
      />
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiCalendar>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Range: Story = {
  args: {
    type: TYPE.RANGE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-11-19T00:00:00')],
  },
}

export const Double: Story = {
  args: {
    appearance: APPEARANCE.DOUBLE,
  },
}

export const Nullable: Story = {
  args: {
    value: new Date('2024-11-21T00:00:00'),
    nullable: true,
  },
}

export const Bounded: Story = {
  args: {
    value: new Date('2024-11-14T00:00:00'),
    minDate: new Date('2024-11-05T00:00:00'),
    maxDate: new Date('2024-11-25T00:00:00'),
  },
}

export const RangeDouble: Story = {
  args: {
    type: TYPE.RANGE,
    appearance: APPEARANCE.DOUBLE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-12-08T00:00:00')],
  },
}

export const FirstDayMonday: Story = {
  args: {
    firstDayOfWeek: 1,
  },
}

export const RussianLocale: Story = {
  args: {
    locale: 'ru-RU',
  },
}
