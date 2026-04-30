import type { Meta } from '@storybook/vue3'
import type { StoryObj } from '@storybook/vue3'

import { PLACEMENT } from '@/common/components/select'
import { SIZE } from '@/common/components/select'

import { UiSelect } from '../../src/remote/components/select'
import UiSelectWorker from './UiSelect.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'
import page from './UiSelect.mdx'

const meta = {
  title: 'Components/UiSelect',

  component: UiSelect,

  argTypes: {
    id: { control: false },
    value: { control: false },
    expanded: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    filterable: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholderOnly: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    ticker: { control: 'boolean' },
    width: { control: 'text' },

    textboxSize: {
      options: Object.values(SIZE),
    },

    placement: {
      options: Object.values(PLACEMENT),
    },

    popperFitTrigger: { control: 'boolean' },
    popperClass: { control: 'text' },
    popperOptions: { control: false },
    targetTriggers: { control: false },
    popperTriggers: { control: false },
  },

  render: createRemoteStoryRender({
    worker: UiSelectWorker,
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
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    width: 'fit',
  },
}

export const BasicSingle: Story = docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
  },
})

export const MultipleClearable: Story = docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false,
  },
})

export const FilterableSearch: Story = docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true,
  },
})

export const InvalidState: Story = docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true,
  },
})

export const ReadonlyState: Story = docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false,
  },
})

export const DisabledState: Story = docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false,
  },
})
