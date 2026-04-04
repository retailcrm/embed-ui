import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import UiToggleButton from '@/host/components/toggle-button/UiToggleButton.vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

import page from './UiToggleButton.mdx'

const meta = {
  title: 'Components/UiToggleButton',

  component: UiToggleButton,

  args: {
    pressed: false,
    disabled: false,
    grouped: false,
    size: UiToggleButtonSize.SM,
  },

  argTypes: {
    size: {
      control: 'select',
      options: Object.values(UiToggleButtonSize),
    },
  },

  render: (args: InstanceType<typeof UiToggleButton>['$props']) => ({
    components: {
      UiToggleButton,
    },

    setup () {
      const singlePressed = ref(args.pressed ?? false)
      const segmentedPressed = ref<string[]>(['tags'])

      return {
        args,
        segmentedPressed,
        singlePressed,
      }
    },

    template: `
      <div style="display: inline-grid; gap: 16px;">
        <UiToggleButton
            v-bind="args"
            :pressed="singlePressed"
            @click="singlePressed = !singlePressed"
        >
            Фильтр
        </UiToggleButton>

        <div style="display: flex; max-width: 360px;">
          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('tags')"
              @click="segmentedPressed = segmentedPressed.includes('tags') ? segmentedPressed.filter((value) => value !== 'tags') : [...segmentedPressed, 'tags']"
          >
              Теги
          </UiToggleButton>

          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('notes')"
              @click="segmentedPressed = segmentedPressed.includes('notes') ? segmentedPressed.filter((value) => value !== 'notes') : [...segmentedPressed, 'notes']"
          >
              Заметки
          </UiToggleButton>

          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('files')"
              @click="segmentedPressed = segmentedPressed.includes('files') ? segmentedPressed.filter((value) => value !== 'files') : [...segmentedPressed, 'files']"
          >
              Файлы
          </UiToggleButton>
        </div>
      </div>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiToggleButton>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
