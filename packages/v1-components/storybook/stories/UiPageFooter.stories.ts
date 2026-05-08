import type { Meta, StoryObj } from '@storybook/vue3'

import { UiPageFooter } from '@/remote/components/page-footer'

import styles from './UiPageFooter.example.module.less'
import UiPageFooterWorker from './UiPageFooter.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import page from './UiPageFooter.mdx'

type UiPageFooterStoryArgs = InstanceType<typeof UiPageFooter>['$props'] & {
  disabled?: boolean;
  locked?: boolean;
  showAside?: boolean;
  showSecondary?: boolean;
  styles?: Record<string, string>;
}

const meta = {
  title: 'Components/UiPageFooter',

  component: UiPageFooter,

  argTypes: {
    disabled: { control: 'boolean' },
    locked: { control: 'boolean' },
    showAside: { control: 'boolean' },
    showSecondary: { control: 'boolean' },
    styles: { control: false },
  },

  render: createRemoteStoryRender({
    worker: UiPageFooterWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<UiPageFooterStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    disabled: false,
    locked: false,
    showAside: true,
    showSecondary: true,
    styles,
  },
}

export const PrimaryOnly: Story = {
  args: {
    showAside: false,
    showSecondary: false,
    styles,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    showAside: true,
    showSecondary: true,
    styles,
  },
}
