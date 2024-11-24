import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiModalSidebar from '@/host/components/modal-sidebar/UiModalSidebar.vue'

import page from './UiModalSidebar.mdx'

import {
  DIRECTION,
  SCROLLING,
  SIZE,
} from '@/common/components/modal-sidebar'

import '@/host/components/modal/modal.less'
import '@/host/components/modal-sidebar/modal-sidebar.less'
import '@/host/components/transition/transition.less'

const meta = {
  title: 'Components/UiModalSidebar',

  component: UiModalSidebar,

  args: {
    direction: DIRECTION.RIGHT,
    fixed: false,
    scrolling: SCROLLING.NORMAL,
    size: SIZE.SM,
  },

  argTypes: {
    opened: { control: false },
    id: { control: false },

    direction: {
      control: 'select',
      options: Object.values(DIRECTION),
    },

    scrolling: {
      control: 'select',
      options: Object.values(SCROLLING),
    },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },

  render: (args: unknown) => ({
    components: {
      UiButton,
      UiModalSidebar,
    },

    setup () {
      return {
        args,
        opened: ref(false),
      }
    },

    template: `
      <div>
        <UiButton @click="opened = true">
          Open
        </UiButton>

        <UiModalSidebar
            v-model:opened="opened"
            v-bind="args"
        >
          <template #title>
            Title
          </template>

          Content

          <template #footer>
            <UiButton style="margin-right: 10px" @click="opened = false">
              Save
            </UiButton>

            <UiButton appearance="secondary" @click="opened = false">
              Close
            </UiButton>
          </template>
        </UiModalSidebar>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiModalSidebar>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
