import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiSwitchProperties } from '@/common/components/switch'

import { computed, ref, watch } from 'vue'

import UiSwitch from '@/host/components/switch/UiSwitch.vue'

import { omit } from '@/common/utils'

import page from './UiSwitch.mdx'

const meta = {
  title: 'Components/UiSwitch',

  component: UiSwitch,

  args: {
    id: 'switch-sandbox',
    value: false,
    disabled: false,
    square: false,
  },

  argTypes: {
    value: { control: false },
  },

  render: (args: UiSwitchProperties) => ({
    components: {
      UiSwitch,
    },

    setup () {
      const value = ref(args.value ?? false)

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
      <div style="display: inline-flex; align-items: center; gap: 8px">
          <UiSwitch
              v-model:value="value"
              v-bind="props"
          />

          <label :for="props.id">
              Switch
          </label>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiSwitch>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Checked: Story = {
  args: {
    value: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Square: Story = {
  args: {
    square: true,
  },
}
