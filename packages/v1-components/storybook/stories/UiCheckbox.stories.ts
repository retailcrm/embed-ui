import type {
  Meta,
  StoryObj,
} from '@storybook/vue3'

import type { UiCheckboxProperties } from '@/common/components/checkbox'

import UiCheckbox from '@/host/components/checkbox/UiCheckbox.vue'

import { computed, ref } from 'vue'

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
      const props = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { model: _, ...props } = args

        return { ...props }
      })

      return {
        props,
        model: ref(args.model),
      }
    },

    template: `
      <UiCheckbox v-model:model="model" v-bind="props" aria-label="checkbox" />
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
