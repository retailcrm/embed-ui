import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiYandexMapProperties } from '@/common/components/yandex-map'

import { ref } from 'vue'

import UiYandexMap from '@/host/components/yandex-map/UiYandexMap.vue'

import page from './UiYandexMap.mdx'

const meta = {
  title: 'Experimental/UiYandexMap',

  component: UiYandexMap,

  args: {
    apiKey: 'dd51f938-0693-457d-ae62-6d50fa668d0a',
    address: '',
    plugins: [],
  },

  argTypes: {
    apiKey: { control: false },
    address: { control: false },
    plugins: { control: false },
  },

  render: (args: UiYandexMapProperties) => ({
    components: {
      UiYandexMap,
    },

    setup () {
      const { apiKey, address, plugins } = args

      return {
        apiKey,
        address: ref(address),
        plugins,
      }
    },

    template: `
        <div class="mb-4" style="width: 640px; max-width: 100%;">
            <UiYandexMap
                v-model:address="address"
                :api-key="apiKey"
                :plugins="plugins"
            />
        </div>

        <p>Выбранный адрес:</p>

        {{ address }}
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiYandexMap>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
