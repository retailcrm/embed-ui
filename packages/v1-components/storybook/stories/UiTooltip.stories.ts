import type { Meta, StoryObj } from '@storybook/vue3'

import UiButton from '@/host/components/button/UiButton.vue'
import UiLink from '@/host/components/link/UiLink.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'
import UiTooltip from '@/host/components/tooltip/UiTooltip.vue'

import page from './UiTooltip.mdx'

const meta = {
  title: 'Components/UiTooltip',

  component: UiTooltip,

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
      UiLink,
      UiPopperConnector,
      UiPopperTarget,
      UiTooltip,
    },

    setup () {
      return { args }
    },

    template: `
      <div class="mb-4">
          <UiPopperConnector>
              <UiButton>
                  I have a tooltip
              </UiButton>

              <UiTooltip v-bind="args">
                  Tooltip content
              </UiTooltip>
          </UiPopperConnector>
      </div>

      <div class="mb-4">
          <UiPopperConnector>
              <UiPopperTarget tag="a" href="javascript:void(0);">
                  [UiPopperTarget]
              </UiPopperTarget>

              <UiTooltip v-bind="args">
                  Tooltip content that is very long and has a lot of text.
              </UiTooltip>
          </UiPopperConnector>
      </div>

      <div>
          <UiPopperConnector>
              <UiLink>
                  [UiLink]
              </UiLink>

              <UiTooltip v-bind="args">
                  Tooltip content that contains a long words inside, like
                  <b style="color: #6CADFF">"characterization"</b>
              </UiTooltip>
          </UiPopperConnector>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiTooltip>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
