import type { Meta, StoryObj } from '@storybook/vue3'

import { APPEARANCE, SIZE, VARIANT } from '@/common/components/button'

import { UiPopconfirm } from '../../src/remote/components/popconfirm'
import UiPopconfirmWorker from './UiPopconfirm.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import page from './UiPopconfirm.mdx'

const placements = ['top', 'right', 'bottom', 'left'].reduce((all, side) => all.concat([
  side,
  `${side}-start`,
  `${side}-end`,
]), [] as string[])

const meta = {
  title: 'Components/UiPopconfirm',

  component: UiPopconfirm,

  args: {
    title: 'Подтвердить действие?',
    okVariant: VARIANT.DEFAULT,
    cancelAppearance: APPEARANCE.SECONDARY,
    cancelVariant: VARIANT.DEFAULT,
    buttonSize: SIZE.XS,
    placement: 'bottom-start',
    locale: 'ru-RU',
  },

  argTypes: {
    buttonSize: {
      control: 'select',
      options: Object.values(SIZE),
    },
    cancelAppearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    cancelVariant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
    okVariant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
    placement: {
      control: 'select',
      options: placements,
    },
    title: { control: 'text' },
  },

  render: createRemoteStoryRender({
    worker: UiPopconfirmWorker,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiPopconfirm>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
