import type { Channel, RemoteRoot, SchemaOf } from '@omnicajs/vue-remote/remote'

import { createRemoteRoot } from '@omnicajs/vue-remote/remote'

export const createEndpointRoot = async (
  channel: Channel
): Promise<RemoteRoot<SchemaOf<string>>> => {
  return createRemoteRoot(channel, {
    components: [
      'UiAvatar',
      'UiAvatarList',
      'UiAlert',
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
      'UiSlider',
      'UiSwitch',
      'UiSelectPopper',
      'UiSelectTrigger',
      'UiTag',
      'UiTextbox',
      'UiToolbarButton',
      'UiToolbarLink',
      'UiTooltip',
      'UiTransition',
      'UiYandexMap',
    ],
  })
}

export const mountEndpointRoot = async (
  channel: Channel
): Promise<RemoteRoot<SchemaOf<string>>> => {
  const root = await createEndpointRoot(channel)
  await root.mount()
  return root
}
