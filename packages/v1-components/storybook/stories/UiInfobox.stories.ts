import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiInfoboxProperties } from '@/common/components/infobox'

import { computed, ref, watch } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

import { omit } from '@/common/utils'

import page from './UiInfobox.mdx'

const meta = {
  title: 'Components/UiInfobox',

  component: UiInfobox,

  args: {
    id: 'infobox-sandbox',
    title: 'Important information',
    shown: true,
    expanded: false,
    expandable: false,
    closable: false,
    warning: false,
  },

  argTypes: {
    shown: { control: false },
    expanded: { control: false },
    expandable: { control: 'boolean' },
    closable: { control: 'boolean' },
    warning: { control: 'boolean' },
  },

  render: (args: UiInfoboxProperties) => ({
    components: {
      UiInfobox,
    },

    setup () {
      const shown = ref(args.shown ?? true)
      const expanded = ref(args.expanded ?? false)

      watch(() => args.shown, (next) => {
        shown.value = next ?? true
      })

      watch(() => args.expanded, (next) => {
        expanded.value = next ?? false
      })

      return {
        expanded,
        props: computed(() => omit(args, ['shown', 'expanded'])),
        shown,
      }
    },

    template: `
      <div style="width: 680px;">
          <UiInfobox
              v-model:shown="shown"
              v-model:expanded="expanded"
              v-bind="props"
          >
              <template #title>
                  {{ props.title }}
              </template>

              Some list:

              <ul>
                  <li>First line</li>
                  <li>Second line</li>
                  <li>Third line</li>
              </ul>
          </UiInfobox>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiInfobox>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Warning: Story = {
  args: {
    warning: true,
    title: 'Warning',
  },
}

export const Expandable: Story = {
  args: {
    expandable: true,
    expanded: false,
    title: 'Expandable details',
  },
}

export const Closable: Story = {
  args: {
    closable: true,
    title: 'Closable infobox',
  },
}
