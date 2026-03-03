import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiNumberStepperProperties } from '@/common/components/number-stepper'

import { computed, ref, watch } from 'vue'

import UiNumberStepper from '@/host/components/number-stepper/UiNumberStepper.vue'

import { DIRECTION } from '@/common/components/number-stepper'
import { omit } from '@/common/utils'
import { SIZE } from '@/common/components/textbox'

import page from './UiNumberStepper.mdx'

const meta = {
  title: 'Components/UiNumberStepper',

  component: UiNumberStepper,

  args: {
    id: 'number-stepper-sandbox',
    value: 10,
    min: 0,
    max: 100,
    step: 1,
    decimals: '*',
    clamp: true,
    nullable: false,
    disabled: false,
    readonly: false,
    required: false,
    direction: DIRECTION.HORIZONTAL,
    size: 'sm',
    outlined: true,
    textboxOptions: {},
  },

  argTypes: {
    value: { control: false },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: { type: 'number', min: 0.0001 } },
    decimals: { control: 'text' },
    clamp: { control: 'boolean' },
    nullable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    outlined: { control: 'boolean' },
    direction: {
      control: 'inline-radio',
      options: Object.values(DIRECTION),
    },
    textboxOptions: { control: 'object' },
  },

  render: (args: UiNumberStepperProperties) => ({
    components: {
      UiNumberStepper,
    },

    setup () {
      const value = ref<number | null>(typeof args.value === 'number' ? args.value : null)
      const violation = ref('[]')

      watch(() => args.value, (next) => {
        value.value = typeof next === 'number'
          ? next
          : null
      })

      return {
        value,
        violation,
        props: computed(() => omit(args, ['value'])),
        onViolation: (payload: unknown) => {
          violation.value = JSON.stringify(payload, null, 2)
        },
      }
    },

    template: `
      <div style="display: grid; gap: 8px; min-width: 220px;">
          <UiNumberStepper
              v-model:value="value"
              v-bind="props"
              @violation="onViolation"
          />

          <div style="font-size: 12px; color: #666;">
              Value: {{ value === null ? 'null' : value }}
          </div>

          <pre style="margin: 0; font-size: 12px; color: #666; white-space: pre-wrap;">Violation: {{ violation }}</pre>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiNumberStepper>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Nullable: Story = {
  args: {
    nullable: true,
    value: null,
  },
}

export const FreeRange: Story = {
  args: {
    clamp: false,
    value: 120,
    min: 0,
    max: 100,
  },
}

export const Decimal: Story = {
  args: {
    value: 2.5,
    step: 0.25,
    decimals: 2,
    min: -10,
    max: 10,
  },
}

export const Vertical: Story = {
  args: {
    direction: DIRECTION.VERTICAL,
    value: 5,
    min: 0,
    max: 10,
  },
}

export const Inline: Story = {
  args: {
    outlined: false,
    size: 'sm',
    value: 5,
    min: 0,
    max: 20,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 10,
  },
}
