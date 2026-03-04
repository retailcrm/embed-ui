import '@/host/components/field/field.less'

import type { Callable, Lifecycle } from '../endpoint'
import type { Meta, StoryObj } from '@storybook/vue3'

import { createEndpoint } from '@remote-ui/rpc'
import { createProvider, createReceiver, HostedTree } from '@omnicajs/vue-remote/host'
import { watch } from 'vue'

import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiPopperTarget from '@/host/components/popper/UiPopperTarget.vue'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'
import UiTooltip from '@/host/components/tooltip/UiTooltip.vue'

import { UiField } from '../../src/remote/components/field'

import page from './UiField.mdx'

type UiFieldProps = InstanceType<typeof UiField>['$props']
type UiFieldStoryExtras = {
  withAddon?: boolean;
  addonText?: string;
  customLabel?: boolean;
  customHint?: boolean;
  hideLabel?: boolean;
  textboxPlaceholder?: string;
  containerWidth?: number;
}
type UiFieldStoryArgs = UiFieldProps & UiFieldStoryExtras

const provider = createProvider({
  UiPopperConnector,
  UiPopperTarget,
  UiTextbox,
  UiTooltip,
})
const receiver = createReceiver()

const meta = {
  title: 'Components/UiField',

  component: UiField,

  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    hintAriaLabel: { control: 'text' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },

    withAddon: { control: 'boolean' },
    addonText: { control: 'text' },
    customLabel: { control: 'boolean' },
    customHint: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    textboxPlaceholder: { control: 'text' },
    containerWidth: { control: 'number' },
  },

  render: (args: UiFieldStoryArgs) => ({
    components: {
      HostedTree,
    },

    setup () {
      const worker = new Worker(new URL('./UiField.remote.ts', import.meta.url), { type: 'module' })
      const endpoint = createEndpoint<Callable & Lifecycle>(worker)

      endpoint.call.run(receiver.receive, args)

      watch(args, (next) => {
        endpoint.call.setProps(next)
      })

      return {
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
} satisfies Meta<UiFieldStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {
  args: {
    id: 'field-sandbox',
    label: 'Field label',
    hint: 'Hint tooltip text',
    hintAriaLabel: 'Show hint',
    invalid: false,
    required: false,
    disabled: false,
    readonly: false,
    withAddon: false,
    addonText: 'Optional',
    customLabel: false,
    customHint: false,
    hideLabel: false,
    textboxPlaceholder: 'Type value',
    containerWidth: 360,
  },
}

export const InvalidRequired: Story = {
  args: {
    id: 'field-invalid-required',
    label: 'Email',
    hint: 'Use a work email address',
    hintAriaLabel: 'Show hint',
    invalid: true,
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    id: 'field-disabled',
    label: 'Field label',
    hint: 'Hint tooltip text',
    disabled: true,
  },
}

export const Readonly: Story = {
  args: {
    id: 'field-readonly',
    label: 'API token',
    hint: 'Readonly field with generated value',
    readonly: true,
    textboxPlaceholder: 'Readonly value',
  },
}

export const CustomSlots: Story = {
  args: {
    id: 'field-custom-slots',
    customLabel: true,
    customHint: true,
    required: true,
  },
}

export const WithAddon: Story = {
  args: {
    id: 'field-addon',
    label: 'Name',
    hint: 'Your public name',
    withAddon: true,
    addonText: '3-32 chars',
  },
}

export const NoLabel: Story = {
  args: {
    id: 'field-no-label',
    hideLabel: true,
    hint: 'Label is hidden in this scenario',
    hintAriaLabel: 'Show hint',
  },
}
