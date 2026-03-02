import type { Channel, RemoteRoot, SchemaOf } from '@omnicajs/vue-remote/remote'

import { createRemoteRoot } from '@omnicajs/vue-remote/remote'

type EndpointRemoteComponent = string

export interface EndpointRootOptions {
  components?: EndpointRemoteComponent[];
}

export const defaultRemoteEndpointComponents: EndpointRemoteComponent[] = [
  'UiAvatar',
  'UiAvatarList',
  'UiButton',
  'UiCheckbox',
  'UiCopyButton',
  'UiDate',
  'UiError',
  'UiImage',
  'UiLink',
  'UiLoader',
  'UiMenuItem',
  'UiMenuItemGroup',
  'UiModalSidebar',
  'UiModalWindow',
  'UiModalWindowSurface',
  'UiPopper',
  'UiPopperConnector',
  'UiPopperTarget',
  'UiRadio',
  'UiScrollBox',
  'UiSelectPopper',
  'UiSelectTrigger',
  'UiTag',
  'UiTextbox',
  'UiToolbarButton',
  'UiToolbarLink',
  'UiTooltip',
  'UiTransition',
  'UiYandexMap',
]

export const createEndpointRoot = async (
  channel: Channel,
  options: EndpointRootOptions = {}
): Promise<RemoteRoot<SchemaOf<string>>> => {
  return createRemoteRoot(channel, {
    components: options.components ?? defaultRemoteEndpointComponents,
  })
}

export const mountEndpointRoot = async (
  channel: Channel,
  options: EndpointRootOptions = {}
): Promise<RemoteRoot<SchemaOf<string>>> => {
  const root = await createEndpointRoot(channel, options)
  await root.mount()
  return root
}
