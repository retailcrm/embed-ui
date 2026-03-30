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

export const UiLogicTreeRoot = defineRemoteComponent(
  UiLogicTreeRootType,
  ['default']
)

export const UiLogicTreeRowType = 'UiLogicTreeRow' as SchemaType<
  'UiLogicTreeRow',
  RemoteProperties<UiLogicTreeRowProperties>
>

export const UiLogicTreeRow = defineRemoteComponent(
  UiLogicTreeRowType,
  ['prefix', 'default', 'trailing']
)
