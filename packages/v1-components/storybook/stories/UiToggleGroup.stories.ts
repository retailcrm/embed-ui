import type { Meta, StoryObj } from '@storybook/vue3'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

import { UiToggleGroup } from '@/remote/components/toggle-group'

import UiToggleGroupWorker from './UiToggleGroup.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'

import page from './UiToggleGroup.mdx'

type UiToggleGroupProps = InstanceType<typeof UiToggleGroup>['$props']
type UiToggleGroupStoryExtras = {
  withSlots?: boolean;
}
type UiToggleGroupStoryArgs = UiToggleGroupProps & UiToggleGroupStoryExtras

const meta = {
  title: 'Components/UiToggleGroup',

  component: UiToggleGroup,

  argTypes: {
    model: { control: false },
    options: { control: false },
    equalFn: { control: false },

    size: {
      control: 'select',
      options: Object.values(UiToggleButtonSize),
    },

    disabled: { control: 'boolean' },
    rubber: { control: 'boolean' },
    withSlots: { control: 'boolean' },
  },

  render: createRemoteStoryRender({
    worker: UiToggleGroupWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<UiToggleGroupStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: false,
  },
}

export const Weekdays: Story = docsOnlyStory({
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: false,
  },
})

export const WithIcons: Story = docsOnlyStory({
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: true,
  },
})
