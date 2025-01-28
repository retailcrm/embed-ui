import type { Channel } from '@omnicajs/vue-remote/remote'

import type {
  Endpoint,
  MessageEndpoint,
} from '@remote-ui/rpc'

import type { Callable } from '~types/host/callable'

import type {
  ContextAccessor,
  ContextSchemaList,
  CustomContextAccessor,
} from '@retailcrm/embed-ui-v1-types/context'

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
import { injectAccessor } from '@retailcrm/embed-ui-v1-contexts/remote/custom'

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

export * from '@/composables'

const createRoot = async (channel: Channel) => {
  const root = createRemoteRoot(channel, {
    components: [
      'UiAvatar',
      'UiAvatarList',
      'UiButton',
      'UiCheckbox',
      'UiDate',
      'UiError',
      'UiImage',
      'UiLink',
      'UiLoader',
      'UiModalSidebar',
      'UiModalWindow',
      'UiModalWindowSurface',
      'UiRadio',
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

type HostCallable<M extends ContextSchemaList = ContextSchemaList> = ContextAccessor<M> & CustomContextAccessor & Callable

export const createWidgetEndpoint = (
  widget: WidgetRunner,
  messenger: MessageEndpoint
): Endpoint<ContextAccessor<SchemaList>> => {
  const endpoint = createEndpoint<HostCallable>(messenger)
  const pinia = createPinia()

  pinia.use(injectEndpoint(endpoint as Endpoint<ContextAccessor<SchemaList>>))
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
