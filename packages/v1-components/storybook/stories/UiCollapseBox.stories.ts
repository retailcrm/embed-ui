import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiCollapseBoxProperties } from '@/common/components/collapse-box'

import { computed, ref, watch } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'
import UiCollapseGroup from '@/host/components/collapse-box/UiCollapseGroup.vue'

import IconCode from '~assets/sprites/technology-and-data/code.svg'
import IconSettingsOutlined from '~assets/sprites/ui/settings-outlined.svg'

import { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'
import { COLOR } from '@/common/components/collapse-box'
import { omit } from '@/common/utils'
import { SIZE } from '@/common/components/collapse-box'

import page from './UiCollapseBox.mdx'

const meta = {
  title: 'Components/UiCollapseBox',

  component: UiCollapseBox,

  args: {
    id: 'collapse-box-sandbox',
    expanded: false,
    expandable: true,
    collapsible: true,
    toggleable: true,
    collapseBehaviour: COLLAPSE_BEHAVIOUR.HIDE,
    collapseDuration: 0.75,
    disabled: false,
    color: COLOR.BLUE,
    iconSize: SIZE.SM,
    bordered: false,
  },

  argTypes: {
    id: { control: 'text' },
    expanded: { control: false },
    collapseBehaviour: {
      control: 'select',
      options: Object.values(COLLAPSE_BEHAVIOUR),
    },
    color: {
      control: 'select',
      options: Object.values(COLOR),
    },
    iconSize: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },

  render: (args: UiCollapseBoxProperties) => ({
    components: {
      UiButton,
      UiCollapseBox,
      IconSettingsOutlined,
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
      <div style="width: 640px;">
          <UiCollapseBox
              v-model:expanded="expanded"
              v-bind="props"
          >
              <template #title>
                  Connection settings
              </template>

              <template #icon>
                  <IconSettingsOutlined />
              </template>

              <template #description>
                  Configure API credentials and synchronization parameters.
              </template>

              <template #body-content>
                  <p>
                      Keep credentials secure and rotate them regularly.
                  </p>

                  <p>
                      You can keep this section collapsed by default and open it on demand.
                  </p>
              </template>

              <template #footer-content>
                  <UiButton
                      appearance="secondary"
                      style="flex: none; align-self: flex-start;"
                      @click="expanded = false"
                  >
                      Collapse
                  </UiButton>
              </template>
          </UiCollapseBox>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiCollapseBox>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Expanded: Story = {
  args: {
    expanded: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    expanded: false,
  },
}

export const Bordered: Story = {
  args: {
    bordered: true,
    color: COLOR.GREEN,
  },
}

export const Group: Story = {
  render: () => ({
    components: {
      UiCollapseBox,
      UiCollapseGroup,
      IconCode,
      IconSettingsOutlined,
    },

    setup () {
      return {
        activeBoxId: ref<string | null>('security'),
      }
    },

    template: `
      <div style="width: 640px;">
          <UiCollapseGroup v-model:activeBoxId="activeBoxId">
              <UiCollapseBox id="security" color="blue">
                  <template #title>
                      Security
                  </template>

                  <template #icon>
                      <IconSettingsOutlined />
                  </template>

                  <template #description>
                      Authentication and access control.
                  </template>

                  <template #body-content>
                      Enable two-factor authentication and configure token lifetime.
                  </template>
              </UiCollapseBox>

              <UiCollapseBox id="integration" color="green">
                  <template #title>
                      Integration
                  </template>

                  <template #icon>
                      <IconCode />
                  </template>

                  <template #description>
                      API endpoints and webhook delivery.
                  </template>

                  <template #body-content>
                      Manage callback URL and request signing settings.
                  </template>
              </UiCollapseBox>
          </UiCollapseGroup>
      </div>
    `,
  }),
}
