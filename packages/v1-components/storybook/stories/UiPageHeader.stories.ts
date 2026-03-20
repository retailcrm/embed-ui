import type { Meta, StoryObj } from '@storybook/vue3'

import { createProvider } from '@omnicajs/vue-remote/host'

import UiButton from '@/host/components/button/UiButton.vue'
import UiLink from '@/host/components/link/UiLink.vue'
import UiPageHeaderTitle from '@/host/components/page-header/UiPageHeaderTitle.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'
import UiTooltip from '@/host/components/tooltip/UiTooltip.vue'

import { UiPageHeader } from '@/remote/components/page-header'

import UiPageHeaderWorker from './UiPageHeader.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import page from './UiPageHeader.mdx'

const provider = createProvider({
  UiButton,
  UiLink,
  UiPageHeaderTitle,
  UiPopperConnector,
  UiPopperTarget,
  UiTooltip,
})

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
    provider,
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
