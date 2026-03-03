import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiCollapseProperties } from '@/common/components/collapse'

import { computed, ref, watch } from 'vue'

import UiCollapse from '@/host/components/collapse/UiCollapse.vue'

import { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'
import { omit } from '@/common/utils'

import page from './UiCollapse.mdx'

const meta = {
  title: 'Components/UiCollapse',

  component: UiCollapse,

  args: {
    expanded: false,
    collapseBehaviour: COLLAPSE_BEHAVIOUR.HIDE,
    duration: 0.25,
  },

  argTypes: {
    expanded: { control: false },
    collapseBehaviour: {
      control: 'select',
      options: Object.values(COLLAPSE_BEHAVIOUR),
    },
    duration: {
      control: 'text',
    },
  },

  render: (args: UiCollapseProperties) => ({
    components: {
      UiCollapse,
    },

    setup () {
      const expanded = ref(args.expanded ?? false)

      watch(() => args.expanded, (next) => {
        if (typeof next !== 'undefined') {
          expanded.value = next
        }
      })

      return {
        expanded,
        props: computed(() => omit(args, ['expanded'])),
      }
    },

    template: `
      <div style="width: 520px; display: grid; gap: 12px;">
          <button type="button" @click="expanded = !expanded">
              {{ expanded ? 'Hide content' : 'Show content' }}
          </button>

          <UiCollapse
              :expanded="expanded"
              v-bind="props"
          >
              <div style="padding: 12px; border: 1px solid #d5dbe3; border-radius: 8px; background: #f7f9fc;">
                  Content inside UiCollapse. You can place any custom layout here.
              </div>
          </UiCollapse>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiCollapse>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Expanded: Story = {
  args: {
    expanded: true,
  },
}

export const Dispose: Story = {
  args: {
    collapseBehaviour: COLLAPSE_BEHAVIOUR.DISPOSE,
  },
}
