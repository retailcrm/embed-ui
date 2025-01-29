import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from '@/host/components/button/UiButton.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'

import page from './UiPopper.mdx'

const meta = {
  title: 'Components/UiPopper',

  component: UiPopper,

  args: {
    visible: false,
    targetTriggers: ['click'],
    popperTriggers: [],
    globalTriggers: ['miss-click'],
    placement: 'bottom',
  },

  argTypes: {
    target: {
      table: {
        disable: true,
      },
    },

    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'].reduce((all, s) => all.concat([
        s,
        `${s}-start`,
        `${s}-end`,
      ]), [] as string[]),
    },
  },

  render: (args) => ({
    components: {
      UiButton,
      UiPopper,
      UiPopperConnector,
      UiPopperTarget,
    },

    setup () {
      return { args }
    },

    template: `
      <div class="mb-4">
          <UiPopperConnector>
              <UiButton>
                  I have a popper
              </UiButton>

              <UiPopper v-bind="args">
                  Popper content
              </UiPopper>
          </UiPopperConnector>
      </div>

      <div>
          <UiPopperConnector>
              <UiPopperTarget tag="a" href="javascript:void(0);">
                  I also have a popper
              </UiPopperTarget>

              <UiPopper v-bind="args">
                  Popper content
              </UiPopper>
          </UiPopperConnector>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiPopper>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
