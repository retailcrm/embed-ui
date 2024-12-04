import type { Channel } from '@omnicajs/vue-remote/remote'

import type {
  Endpoint,
  MessageEndpoint,
} from '@remote-ui/rpc'

import type { Callable } from '~types/host/callable'
import type { ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { SchemaList } from '@retailcrm/embed-ui-v1-contexts/types'

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

import { injectEndpoint } from '@retailcrm/embed-ui-v1-contexts/remote'

export {
  schema as customerCardSchema,
  useContext as useCustomerCardContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/customer/card'

export {
  schema as customerCardPhoneSchema,
  useContext as useCustomerCardPhoneContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/customer/card-phone'

export {
  schema as orderCardSchema,
  useContext as useOrderCardContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

export {
  schema as currentUserSchema,
  useContext as useCurrentUserContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/user/current'

export {
  schema as settingsSchema,
  useContext as useSettingsContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/settings'

export { useHost } from '@/composables'
export { useField } from '@/composables'

const createRoot = async (channel: Channel) => {
  const root = createRemoteRoot(channel, {
    components: [
      'UiButton',
      'UiError',
      'UiLink',
      'UiLoader',
      'UiModalSidebar',
      'UiModalWindow',
      'UiModalWindowSurface',
      'UiScrollBox',
      'UiTag',
      'UiToolbarButton',
      'UiToolbarLink',
      'UiTransition',
      'UiYandexMap',
    ],
  })

  await root.mount()

  return root
}

export const createWidgetEndpoint = (
  widget: WidgetRunner,
  messenger: MessageEndpoint
): Endpoint<ContextAccessor<SchemaList>> => {
  const endpoint = createEndpoint<ContextAccessor<SchemaList> & Callable>(messenger)
  const pinia = createPinia()

  pinia.use(injectEndpoint(endpoint as Endpoint<ContextAccessor<SchemaList>>))

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
