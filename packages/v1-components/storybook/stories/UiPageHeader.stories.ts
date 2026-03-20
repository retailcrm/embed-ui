import type { Meta, StoryObj } from '@storybook/vue3'

import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import UiButton from '@/host/components/button/UiButton.vue'
import UiPageHeader from '@/host/components/page-header/UiPageHeader.vue'

import { SIZE } from '@/common/components/textbox'

import page from './UiPageHeader.mdx'

const meta = {
  title: 'Components/UiPageHeader',

  component: UiPageHeader,

  args: {
    value: 'Новая рассылка',
    placeholder: 'Введите заголовок',
    size: SIZE.XL,
    autofocus: false,
    autoselect: true,
    readonly: false,
    disabled: false,
    invalid: false,
  },

  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },

  render: (args) => ({
    components: {
      UiPageHeader,
      IconCaretDown,
      UiButton,
    },

    setup () {
      return { args }
    },

    template: `
      <div style="width: 100%; max-width: 960px;">
          <UiPageHeader v-bind="args">
            <template #actions>
                <UiButton 
                    appearance="tertiary"
                >
                  Действия
                  <IconCaretDown aria-hidden="true"/>
                </UiButton>
            </template>
          </UiPageHeader>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<typeof UiPageHeader>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
