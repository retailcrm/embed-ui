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
    'UiCalendar',
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
    'UiLogicTreeRoot',
    'UiLogicTreeRow',
    'UiMenuItem',
    'UiMenuItemGroup',
    'UiModalSidebar',
    'UiModalWindow',
    'UiModalWindowSurface',
    'UiNumberStepper',
    'UiPageHeader',
    'UiPageHeaderLayout',
    'UiPageHeaderTitle',
    'UiPopper',
    'UiPopperConnector',
    'UiPopperTarget',
    'UiRadio',
    'UiRadioSwitchOptionShell',
    'UiRadioSwitchRoot',
    'UiScrollBox',
    'UiSkeleton',
    'UiSlider',
    'UiSwitch',
    'UiTab',
    'UiTabGroup',
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
    'UiToggleButton',
    'UiToggleGroupRoot',
    // UiToolbar is host-only: remote trees can render toolbar items, but cannot create the toolbar container.
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
