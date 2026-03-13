import type { RemoteCallable } from '@remote-ui/rpc'
import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type { SerializedEvent } from '@omnicajs/vue-remote/types/events'

import type {
  UiTableBodyCellProperties,
  UiTableColProperties,
  UiTableFooterButtonProperties,
  UiTableFooterSectionProperties,
  UiTableHeadCellProperties,
  UiTableRootProperties,
  UiTableRowProperties,
  UiTableSectionProperties,
  UiTableSorterProperties,
} from '@/common/components/table'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiTableRootType = 'UiTableRoot' as SchemaType<
  'UiTableRoot',
  RemoteProperties<UiTableRootProperties>
>

export const UiTableRoot = defineRemoteComponent(UiTableRootType)

export const UiTableSectionType = 'UiTableSection' as SchemaType<
  'UiTableSection',
  RemoteProperties<UiTableSectionProperties>
>

export const UiTableSection = defineRemoteComponent(UiTableSectionType)

export const UiTableRowType = 'UiTableRow' as SchemaType<
  'UiTableRow',
  RemoteProperties<UiTableRowProperties>,
  RemoteCallable<Record<string, never>>
>

export const UiTableRow = defineRemoteComponent(
  UiTableRowType,
  ['click'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
  }
)

export const UiTableColType = 'UiTableCol' as SchemaType<
  'UiTableCol',
  RemoteProperties<UiTableColProperties>
>

export const UiTableCol = defineRemoteComponent(UiTableColType)

export const UiTableFooterSectionType = 'UiTableFooterSection' as SchemaType<
  'UiTableFooterSection',
  RemoteProperties<UiTableFooterSectionProperties>
>

export const UiTableFooterSection = defineRemoteComponent(UiTableFooterSectionType)

export const UiTableFooterButtonType = 'UiTableFooterButton' as SchemaType<
  'UiTableFooterButton',
  RemoteProperties<UiTableFooterButtonProperties>,
  RemoteCallable<Record<string, never>>
>

export const UiTableFooterButton = defineRemoteComponent(
  UiTableFooterButtonType,
  ['click'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
  }
)

export const UiTableHeadCellType = 'UiTableHeadCell' as SchemaType<
  'UiTableHeadCell',
  RemoteProperties<UiTableHeadCellProperties>
>

export const UiTableHeadCell = defineRemoteComponent(UiTableHeadCellType)

export const UiTableBodyCellType = 'UiTableBodyCell' as SchemaType<
  'UiTableBodyCell',
  RemoteProperties<UiTableBodyCellProperties>
>

export const UiTableBodyCell = defineRemoteComponent(UiTableBodyCellType)

export const UiTableSorterType = 'UiTableSorter' as SchemaType<
  'UiTableSorter',
  RemoteProperties<UiTableSorterProperties>,
  RemoteCallable<Record<string, never>>
>

export const UiTableSorter = defineRemoteComponent(
  UiTableSorterType,
  ['click'] as unknown as {
    'click': (event: SerializedEvent) => boolean,
  }
)
