import type { Meta, StoryObj } from '@storybook/vue3'

import page from './UiSelect.mdx'

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
    multiple: false,
    opened: false,
    clearable: false,
    placeholder: 'test',
    readonly: false,
    disabled: false,
    inputSize: SIZE.SM,
  },

  argTypes: {
    value: { control: 'text' },
    multiple: { control: 'boolean' },
    opened: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
      return { args }
    },

    template: `
      <UiPopperConnector>
        <UiSelectTrigger v-bind="args" />
        
        <UiSelectPopper v-bind="args" >
            <UiMenuItem :value="'option1'">Option 1</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 2</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 3</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 4</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 5</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 6</UiMenuItem>
            <UiMenuItem :value="'option1'">Option 7</UiMenuItem>
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

export const Sandbox: Story = {
  args: {
    expandable: true
  },
}
