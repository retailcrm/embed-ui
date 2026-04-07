import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'
import type { SerializedEvent } from '@omnicajs/vue-remote/types/events'

import type {
  UiLogicTreeRootProperties,
  UiLogicTreeRowProperties,
} from '@/common/components/logic-tree'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiLogicTreeRootType = 'UiLogicTreeRoot' as SchemaType<
  'UiLogicTreeRoot',
  RemoteProperties<UiLogicTreeRootProperties>
>

export const UiLogicTreeRoot = defineRemoteComponent(
  UiLogicTreeRootType,
  {
    slots: ['default'],
  },
  ['outside-click'] as unknown as {
    'outside-click': (event: SerializedEvent) => boolean,
  }
)

export const UiLogicTreeRowType = 'UiLogicTreeRow' as SchemaType<
  'UiLogicTreeRow',
  RemoteProperties<UiLogicTreeRowProperties>
>

export const UiLogicTreeRow = defineRemoteComponent(
  UiLogicTreeRowType,
  {
    slots: ['prefix', 'content', 'trailing'],
  },
  ['row-click', 'row-edit'] as unknown as {
    'row-click': (event: SerializedEvent) => boolean,
    'row-edit': (event: SerializedEvent) => boolean,
  }
)
