import type { Meta, StoryObj } from '@storybook/vue3'

import { createProvider } from '@omnicajs/vue-remote/host'

import UiRadioSwitchOptionShell from '@/host/components/radio-switch/UiRadioSwitchOptionShell.vue'
import UiRadioSwitchRoot from '@/host/components/radio-switch/UiRadioSwitchRoot.vue'

import { APPEARANCE, SIZE } from '@/common/components/radio-switch'

import { UiRadioSwitch } from '@/remote/components/radio-switch'

import UiRadioSwitchWorker from './UiRadioSwitch.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { docsOnlyStory } from '../docsOnlyStory'

import page from './UiRadioSwitch.mdx'

type UiRadioSwitchProps = InstanceType<typeof UiRadioSwitch>['$props']
type UiRadioSwitchStoryExtras = {
  withSlots?: boolean;
}
type UiRadioSwitchStoryArgs = UiRadioSwitchProps & UiRadioSwitchStoryExtras

const provider = createProvider({
  UiRadioSwitchOptionShell,
  UiRadioSwitchRoot,
})

const meta = {
  title: 'Components/UiRadioSwitch',

  component: UiRadioSwitch,

  argTypes: {
    value: { control: false },
    options: { control: false },
    equalFn: { control: false },

    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },

    rubber: { control: 'boolean' },
    withSlots: { control: 'boolean' },
  },

  render: createRemoteStoryRender({
    provider,
    worker: UiRadioSwitchWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<UiRadioSwitchStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false,
  },
}

export const Default: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false,
  },
})

export const StandaloneCards: Story = docsOnlyStory({
  args: {
    appearance: APPEARANCE.SECTION,
    size: SIZE.MD,
    rubber: true,
    withSlots: true,
  },
})
