import type { Meta, StoryObj } from '@storybook/vue3'

import { UiPageHeader } from '@/remote/components/page-header'

import UiPageHeaderWorker from './UiPageHeader.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import page from './UiPageHeader.mdx'

const meta = {
  title: 'Components/UiPageHeader',

  component: UiPageHeader,

  argTypes: {
    id: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    editable: { control: 'boolean' },
    autofocus: { control: 'boolean' },
    autoselect: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },

  render: createRemoteStoryRender({
    worker: UiPageHeaderWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<typeof UiPageHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    value: 'Новая рассылка',
    placeholder: 'Введите заголовок',
    error: '',
    editable: true,
    autofocus: false,
    autoselect: true,
    readonly: false,
    disabled: false,
    invalid: false,
  },
}

export const Invalid: Story = {
  args: {
    value: '',
    placeholder: 'Введите заголовок',
    error: 'Заголовок обязателен',
    editable: true,
    invalid: true,
  },
}
