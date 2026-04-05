import type { Meta, StoryObj } from '@storybook/vue3'

import { computed } from 'vue'

import { ref } from 'vue'

import IconCaret from '~assets/sprites/arrows/caret-down.svg'
import IconSearch from '~assets/sprites/actions/search.svg'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { omit } from '@/common/utils'

import { INPUTMODE } from '@/common/components/textbox'
import { SIZE } from '@/common/components/textbox'
import { TYPE } from '@/common/components/textbox'
import { WIDTH } from '@/common/components/width'

import page from './UiTextbox.mdx'

const meta = {
  title: 'Components/UiTextbox',

  component: UiTextbox,

  args: {
    id: undefined,
    type: TYPE.TEXT,
    value: '',
    placeholder: 'Enter text',
    size: SIZE.SM,
    width: WIDTH.FIT,
    prefix: 'https://',
    suffix: '₽',
    active: false,
    invalid: false,
    multiline: false,
    autofit: false,
  },

  argTypes: {
    id: { control: false },

    type: {
      control: 'select',
      options: Object.values(TYPE),
    },

    value: { control: 'text' },
    width: { control: 'text' },

    size: {
      control: 'select',
      options: Object.values(SIZE),
    },

    inputmode: {
      control: 'select',
      options: Object.values(INPUTMODE),
    },
  },

  render: (args) => ({
    components: {
      IconCaret,
      IconSearch,
      UiTextbox,
    },

    setup () {
      const { value } = args

      return {
        value: ref(String(value)),
        props: computed(() => omit(args, ['value'])),
      }
    },

    template: `
      <UiTextbox
          v-model:value="value"
          v-bind="props"
      >
          <template #leading-icon>
              <IconSearch aria-hidden="true" />
          </template>

          <template #trailing-icon>
              <IconCaret aria-hidden="true" />
          </template>
      </UiTextbox>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiTextbox>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
