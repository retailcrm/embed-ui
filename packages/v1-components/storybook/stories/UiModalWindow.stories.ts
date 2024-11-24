import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiModalWindow from '@/host/components/modal-window/UiModalWindow.vue'

import page from './UiModalWindow.mdx'

import {
  APPEARANCE,
  SCROLLING,
} from '@/common/components/modal-window'

import '@/host/components/modal/modal.less'
import '@/host/components/modal-window/modal-window.less'
import '@/host/components/transition/transition.less'

const meta = {
  title: 'Components/UiModalWindow',

  component: UiModalWindow,

  args: {
    appearance: APPEARANCE.POPUP,
    scrolling: SCROLLING.NORMAL,
  },

  argTypes: {
    id: { control: false },
    opened: { control: false },

    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    
    scrolling: {
      control: 'select',
      options: Object.values(SCROLLING),
    },

    title: { control: false },
    default: { control: false },
    footer: { control: false },
  },
  
  render: (args: unknown) => ({
    components: {
      UiButton,
      UiModalWindow,
    },
    
    setup () {
      return {
        args,
        open: ref(false),
      }
    },
    
    template: `
      <UiButton appearance="secondary" @click="open = true">
        Открыть
      </UiButton>

      <UiModalWindow v-bind="args" v-model:opened="open">
        <template #title>
          Заголовок окна
        </template>

        <div style="height: 1500px;">
          Контент высотой 1500px
        </div>

        <template #footer>
          <UiButton appearance="secondary" @click="open = false">
            Закрыть
          </UiButton>
        </template>
      </UiModalWindow>
    `,
  }),

  decorators: [() => ({
    template: '<div style="height: 500px"><story /></div>',
  })],

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiModalWindow>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
