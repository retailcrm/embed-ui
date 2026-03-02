import type { Meta, StoryObj } from '@storybook/vue3'

import type { UiCheckboxProperties } from '@/common/components/checkbox'

import { computed, ref } from 'vue'

import UiCheckbox from '@/host/components/checkbox/UiCheckbox.vue'

import { without } from '@/common/utils'

import page from './UiCheckbox.mdx'

const meta = {
  title: 'Components/UiCheckbox',

  component: UiCheckbox,

  argTypes: {
    id: { control: false },
  },

  render: (args: UiCheckboxProperties) => ({
    components: {
      UiCheckbox,
    },

    setup () {
      return {
        model: ref(args.model),
        props: computed(() => without(args, ['id', 'model'])),
      }
    },

    template: `
      <UiCheckbox
          id="checkbox"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="checkbox">
          Checkbox
      </label>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiCheckbox>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
