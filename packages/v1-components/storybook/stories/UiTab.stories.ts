import type { Meta, StoryObj } from '@storybook/vue3'

import { APPEARANCE, SIZE } from '@/common/components/tab'

import { UiTabGroup as RemoteUiTabGroup } from '@/remote/components/tab'

import UiTabWorker from './UiTab.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'

import page from './UiTab.mdx'

type UiTabGroupProps = InstanceType<typeof RemoteUiTabGroup>['$props']
type UiTabStoryExtras = {
  containerWidth?: number;
  withSlots?: boolean;
  withContent?: boolean;
}
type UiTabStoryArgs = UiTabGroupProps & UiTabStoryExtras

const meta = {
  title: 'Components/UiTab',

  component: RemoteUiTabGroup,

  argTypes: {
    activeId: { control: false },
    items: { control: false },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    overflowing: { control: 'boolean' },
    withSlots: { control: 'boolean' },
    withContent: { control: 'boolean' },
    containerWidth: {
      control: {
        type: 'number',
        min: 240,
        max: 960,
        step: 20,
      },
    },
  },

  render: createRemoteStoryRender({
    worker: UiTabWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<UiTabStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 560,
  },
}

export const BasicTabs: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: false,
    withContent: false,
    containerWidth: 560,
  },
})

export const IconTabs: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 560,
  },
})

export const OverflowMenu: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 320,
  },
})

export const FilledTabs: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.FILLED,
    size: SIZE.MD,
    overflowing: false,
    withSlots: true,
    withContent: true,
    containerWidth: 560,
  },
})
