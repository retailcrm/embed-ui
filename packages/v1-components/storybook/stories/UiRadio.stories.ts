import type {
  Meta,
  StoryObj,
} from '@storybook/vue3'

import type { UiRadioProperties } from '@/common/components/radio'

import UiRadio from '@/host/components/radio/UiRadio.vue'

import { computed, ref } from 'vue'
import { without } from '@/common/utils'

import page from './UiRadio.mdx'

const meta = {
  title: 'Components/UiRadio',

  component: UiRadio,

  argTypes: {
    id: { control: false },
    model: { control: false },
  },

  render: (args: UiRadioProperties) => ({
    components: {
      UiRadio,
    },

    setup () {
      return {
        model: ref(args.model),
        props: computed(() => without(args, ['id', 'model'])),
      }
    },

    template: `
      <UiRadio
          id="radio"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="radio">
          Radio
      </label>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiRadio>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    value: 'radio',
  },
}
