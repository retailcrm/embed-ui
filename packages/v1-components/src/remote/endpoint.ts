import type { Channel, RemoteRoot, SchemaOf } from '@omnicajs/vue-remote/remote'

import { createRemoteRoot } from '@omnicajs/vue-remote/remote'

export const createEndpointRoot = async (
  channel: Channel
): Promise<RemoteRoot<SchemaOf<string>>> => {
  const defaultRemoteEndpointComponents = [
    'UiAddButton',
    'UiAvatar',
    'UiAvatarList',
    'UiAlert',
    'UiButton',
    'UiCheckbox',
    'UiCollapse',
    'UiCollapseBox',
    'UiCollapseGroup',
    'UiCopyButton',
    'UiDate',
    'UiDatePicker',
    'UiError',
    'UiImage',
    'UiInfobox',
    'UiLink',
    'UiLoader',
    'UiMenuItem',
    'UiMenuItemGroup',
    'UiModalSidebar',
    'UiModalWindow',
    'UiModalWindowSurface',
    'UiNumberStepper',
    'UiPageHeader',
    'UiPageHeaderTitle',
    'UiPopper',
    'UiPopperConnector',
    'UiPopperTarget',
    'UiRadio',
    'UiRadioSwitchOptionShell',
    'UiRadioSwitchRoot',
    'UiScrollBox',
    'UiSlider',
    'UiSwitch',
    'UiSelectPopper',
    'UiSelectTrigger',
    'UiTableBodyCell',
    'UiTableCol',
    'UiTableFooterButton',
    'UiTableFooterSection',
    'UiTableHeadCell',
    'UiTableRoot',
    'UiTableRow',
    'UiTableSection',
    'UiTableSorter',
    'UiTag',
    'UiTextbox',
    'UiTimePicker',
    'UiToolbarButton',
    'UiToolbarLink',
    'UiTooltip',
    'UiTransition',
    'UiYandexMap',
  ]

  return createRemoteRoot(channel, {
    components: defaultRemoteEndpointComponents,
  })
}

export const mountEndpointRoot = async (
  channel: Channel
): Promise<RemoteRoot<SchemaOf<string>>> => {
  const root = await createEndpointRoot(channel)
  await root.mount()
  return root
}
