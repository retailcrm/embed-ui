import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiLogicTreeRootProperties,
  UiLogicTreeRowProperties,
} from '@/common/components/logic-tree'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiLogicTreeRootType = 'UiLogicTreeRoot' as SchemaType<
  'UiLogicTreeRoot',
  RemoteProperties<UiLogicTreeRootProperties>
>

export const UiLogicTreeRoot = defineRemoteComponent(UiLogicTreeRootType, {
  emits: {
    'outside-click': () => true,
  },
  slots: ['default'],
})

export const UiLogicTreeRowType = 'UiLogicTreeRow' as SchemaType<
  'UiLogicTreeRow',
  RemoteProperties<UiLogicTreeRowProperties>
>

export const UiLogicTreeRow = defineRemoteComponent(UiLogicTreeRowType, {
  emits: {
    'row-click': () => true,
    'row-drag-end': () => true,
    'row-drag-move': () => true,
    'row-drag-start': () => true,
  },
  slots: ['prefix', 'content', 'trailing'],
})
