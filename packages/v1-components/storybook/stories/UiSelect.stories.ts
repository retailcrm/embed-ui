import type { Callable } from '../endpoint'
import type { Lifecycle } from '../endpoint'
import type { Meta } from '@storybook/vue3'
import type { StoryObj } from '@storybook/vue3'

import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiMenuItemGroup from '@/host/components/menu/UiMenuItemGroup.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiSelectPopper from '@/host/components/select/UiSelectPopper.vue'
import UiSelectTrigger from '@/host/components/select/UiSelectTrigger.vue'

import { UiSelect } from '../../src/remote/components/select'

import { HostedTree } from '@omnicajs/vue-remote/host'
import { createEndpoint } from '@remote-ui/rpc'
import { createProvider } from '@omnicajs/vue-remote/host'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { watch } from 'vue'

import page from './UiSelect.mdx'

import { SIZE } from '@/common/components/select'
import { PLACEMENT } from '@/common/components/select'

const provider = createProvider({
  UiMenuItem,
  UiMenuItemGroup,
  UiPopperConnector,
  UiSelectPopper,
  UiSelectTrigger,
})
const receiver = createReceiver()

const meta = {
  title: 'Components/UiSelect',

  component: UiSelect,

  argTypes: {
    id: { control: false },
    value: { control: false },
    expanded: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    filterable: { control: 'boolean' },
    invalid: { control: 'boolean' },
    onlyPlaceholder: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    ticker: { control: 'boolean' },

    inputSize: {
      options: Object.values(SIZE),
    },

    placement: {
      options: Object.values(PLACEMENT),
    },

    popperFitTrigger: { control: 'boolean' },
    popperClass: { control: 'text' },
    popperOptions: { control: false },
    targetTriggers: { control: false },
    popperTriggers: { control: false },
  },

  render: (args) => ({
    components: {
      HostedTree,
      UiMenuItem,
      UiMenuItemGroup,
      UiPopperConnector,
      UiSelectPopper,
      UiSelectTrigger,
    },

    setup () {
      const worker = new Worker(new URL('./UiSelect.remote.ts', import.meta.url), { type: 'module'})

      const endpoint = createEndpoint<Callable & Lifecycle>(worker)

      endpoint.call.run(receiver.receive, args)

      watch(args, (newArgs) => {
        endpoint.call.setProps(newArgs)
      })

      return {
        args,
        provider,
        receiver,
      }
    },

    template: `
      <HostedTree :provider="provider" :receiver="receiver" />
    `,
  }),

  parameters: {
    docs: { page },
    layout: 'centered',
  },
} satisfies Meta<typeof UiSelectTrigger>

// noinspection JSUnusedGlobalSymbols
export default meta

type Story = StoryObj<typeof meta>;

export const Sandbox: Story = {
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
  },
}
