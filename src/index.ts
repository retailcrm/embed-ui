import type { Channel } from '@omnicajs/vue-remote/remote'

import type {
  Endpoint,
  MessageEndpoint,
} from '@remote-ui/rpc'

import type { ContextAccessor } from '~types/context/schema'
import type { SchemaList } from '~types/context'

import type {
  WidgetRunner,
  WidgetTarget,
} from '~types/widget'

import {
  createEndpoint,
  release,
  retain,
} from '@remote-ui/rpc'

import { createPinia } from 'pinia'

import {
  createRemoteRenderer,
  createRemoteRoot,
} from '@omnicajs/vue-remote/remote'

import { injectAccessor } from '@/context/store'

export {
  schema as customerCardSchema,
  useContext as useCustomerCardContext,
} from '@/context/customer/card'

export {
  schema as customerCardPhoneSchema,
  useContext as useCustomerCardPhoneContext,
} from '@/context/customer/card-phone'

export {
  schema as orderCardSchema,
  useContext as useOrderCardContext,
} from '@/context/order/card'

export {
  schema as settingsSchema,
  useContext as useSettingsContext,
} from '@/context/settings'

export { useField } from '@/context/store'

const createRoot = async (channel: Channel) => {
  const root = createRemoteRoot(channel, {
    components: [
      'UiButton',
      'UiError',
      'UiLink',
      'UiLoader',
      'UiMenuItem',
      'UiMenuItemGroup',
      'UiModalSidebar',
      'UiModalWindow',
      'UiModalWindowSurface',
      'UiScrollbar',
      'UiTag',
      'UiTransition',
      'CrmYandexMap',
    ],
  })

  await root.mount()

  return root
}

export const createWidgetEndpoint = (
  widget: WidgetRunner,
  messenger: MessageEndpoint
): Endpoint<ContextAccessor<SchemaList>> => {
  const endpoint = createEndpoint<ContextAccessor<SchemaList>>(messenger)
  const pinia = createPinia()

  pinia.use(injectAccessor(endpoint))

  let onRelease = () => {}

  endpoint.expose({
    async run (channel: Channel, target: WidgetTarget) {
      retain(channel)

      const root = await createRoot(channel)
      await root.mount()

      const { createApp } = createRemoteRenderer(root)

      const destroy = await widget.run(createApp, root, pinia, target)

      onRelease = () => {
        destroy()
        release(channel)
      }
    },

    release () {
      onRelease()
      onRelease = () => {}
    },
  })

  return endpoint
}
