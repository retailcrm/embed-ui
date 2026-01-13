import type { Meta, StoryObj } from '@storybook/vue3'

import UiSelect from '@/host/components/select/UiSelect.vue'

import page from './UiSelect.mdx'

import { STATUS, SIZE } from '@/common/components/avatar'

import UiSelectTrigger from '../../src/host/components/select/UiSelectTrigger.vue'

const meta = {
  title: 'Components/UiSelectTrigger',

  component: UiSelectTrigger,

  args: {
    value: '',
    multiple: false,
    opened: false,
    clearable: false,
    placeholder: 'test',
    readonly: false,
    disabled: false,
    leadingIcon: '',
    trailingIcon: '',
    inputSize: 'sm',
  },

  argTypes: {
    value: { control: 'text' },
    multiple: { control: 'boolean' },
    opened: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },

  render: (args: unknown) => ({
    components: {
      UiSelectTrigger,
    },

    setup() {
      return { props:args }
    },

    template: `
      <UiSelectTrigger v-bind="props" />
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
