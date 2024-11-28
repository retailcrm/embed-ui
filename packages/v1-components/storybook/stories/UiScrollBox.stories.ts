import type { Meta, StoryObj } from '@storybook/vue3'

import UiScrollBox from '@/host/components/scroll-box/UiScrollBox.vue'

import page from './UiScrollBox.mdx'

const meta = {
  title: 'Components/UiScrollBox',

  component: UiScrollBox,

  argTypes: {
    default: { control: false },
  },

  render: (args: unknown) => ({
    components: { UiScrollBox },

    setup () {
      return { args }
    },

    data: () => ({
      styles: {
        height: '250px',
        width: '300px',
        padding: '0px 16px 16px',
        border: '1px solid rgba(30, 34, 72, 0.16)',
        borderRadius: '4px',
      },
    }),

    template: `
      <UiScrollBox v-bind="args" :style="styles">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>
      </UiScrollBox>
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiScrollBox>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}
