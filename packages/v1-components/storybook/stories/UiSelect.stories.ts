import type { Meta, StoryObj } from '@storybook/vue3'

import page from './UiSelect.mdx'

import { ref } from 'vue'

import { SIZE } from '@/common/components/select'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiSelectPopper from '@/host/components/select/UiSelectPopper.vue'
import UiSelectTrigger from '@/host/components/select/UiSelectTrigger.vue'

const meta = {
  title: 'Components/UiSelect',

  component: UiSelectTrigger,

  args: {
    value: '',
    opened: false,
    clearable: false,
    placeholder: 'test',
    readonly: false,
    disabled: false,
    inputSize: SIZE.SM,
    multiple: false,
  },

  argTypes: {
    value: { control: 'text' },
    opened: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    inputSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },

  render: (args) => ({
    components: {
      UiSelectTrigger,
      UiPopperConnector,
      UiSelectPopper,
      UiMenuItem,
    },

    setup () {
      const expanded = ref(false)
      const value = ref<unknown>('')

      const onSelect = (val: unknown) => {
        value.value = val
        expanded.value = false
      }

      const isSelected = (val: unknown) => {
        return value.value === val
      }

      const options = ref<string[]>(
        [
          'option1',
          'option2',
          'option3',
          'option4',
          'option5',
          'option6',
          'option7',
          'option8',
          'option9',
        ])

      return {
        args,
        expanded,
        value,
        options,
        isSelected,
        onSelect,
      }
    },

    template: `
      <UiPopperConnector>
        <UiSelectTrigger
            v-bind="args"
            :value="value"
            :expanded
            @update:expanded="expanded = $event"
        />
        
        <UiSelectPopper 
            v-bind="args"
            :opened="expanded"
            @hide="expanded = false"
        >
            <UiMenuItem 
                v-for="option in options"
                v-bind="args"
                :key="option"
                :value="option"
                :selected="isSelected(option)"
                @click="onSelect(option)"
            >
              {{ option }}
            </UiMenuItem>  
        </UiSelectPopper>
      </UiPopperConnector>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiSelectTrigger>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>;

export const Sandbox: Story = {}
