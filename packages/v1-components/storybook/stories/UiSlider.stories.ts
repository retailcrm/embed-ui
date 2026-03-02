import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiSliderProperties } from '@/common/components/slider'

import { computed, ref, watch } from 'vue'

import UiSlider from '@/host/components/slider/UiSlider.vue'

import { omit } from '@/common/utils'
import { TYPE } from '@/common/components/slider'

import page from './UiSlider.mdx'

const meta = {
  title: 'Components/UiSlider',

  component: UiSlider,

  args: {
    value: 20,
    type: TYPE.SINGLE,
    min: 0,
    max: 100,
    labelled: false,
  },

  argTypes: {
    value: { control: false },
    type: {
      control: 'select',
      options: Object.values(TYPE),
    },
    min: { control: 'number' },
    max: { control: 'number' },
    labelled: { control: 'boolean' },
    label: { control: false },
    handle: { control: false },
  },

  render: (args: UiSliderProperties) => ({
    components: {
      UiSlider,
    },

    setup () {
      const value = ref<number | number[]>(args.value ?? 20)

      watch(() => args.type, (type) => {
        if (type === TYPE.RANGE && !Array.isArray(value.value)) {
          value.value = [args.min ?? 0, args.max ?? 100]
        }

        if (type === TYPE.SINGLE && Array.isArray(value.value)) {
          value.value = value.value[0] ?? (args.min ?? 0)
        }
      }, { immediate: true })

      watch(() => args.value, (next) => {
        if (typeof next !== 'undefined') {
          value.value = next
        }
      })

      return {
        value,
        props: computed(() => omit(args, ['value'])),
      }
    },

    template: `
      <div style="width: 360px">
          <UiSlider v-model:value="value" v-bind="props">
              <template v-if="props.labelled" #label="{ boundary }">
                  {{ boundary }}%
              </template>

              <template v-if="props.labelled" #handle="{ boundary }">
                  {{ boundary }}%
              </template>
          </UiSlider>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiSlider>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Range: Story = {
  args: {
    type: TYPE.RANGE,
    value: [20, 80],
  },
}

export const Labelled: Story = {
  args: {
    labelled: true,
  },
}

export const LabelledRange: Story = {
  args: {
    labelled: true,
    type: TYPE.RANGE,
    value: [25, 65],
  },
}

export const BoundedRange: Story = {
  args: {
    type: TYPE.RANGE,
    min: 10,
    max: 60,
    value: [0, 80],
  },
}
