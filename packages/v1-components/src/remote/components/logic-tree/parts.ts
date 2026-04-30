import type { RemoteProperties } from '@/remote/scaffolding'
import type { SchemaType } from '@omnicajs/vue-remote/remote'

import type {
  UiLogicTreeCaretProperties,
  UiLogicTreeNodeProperties,
  UiLogicTreeRootProperties,
} from '@/common/components/logic-tree'

import { defineRemoteComponent } from '@omnicajs/vue-remote/remote'

export const UiLogicTreeRootType = 'UiLogicTreeRoot' as SchemaType<
  'UiLogicTreeRoot',
  RemoteProperties<UiLogicTreeRootProperties>
>

export const UiLogicTreeRoot = defineRemoteComponent(UiLogicTreeRootType, {
  emits: [
    'outsideClick',
  ] as unknown as {
    'outsideClick': () => boolean,
  },
  slots: ['default'],
})

export const UiLogicTreeNodeType = 'UiLogicTreeNode' as SchemaType<
  'UiLogicTreeNode',
  RemoteProperties<UiLogicTreeNodeProperties>
>

export const UiLogicTreeNode = defineRemoteComponent(UiLogicTreeNodeType, {
  emits: [
    'nodeClick',
    'nodeEdit',
  ] as unknown as {
    'nodeClick': (pathKey: string) => boolean,
    'nodeEdit': (value: boolean) => boolean,
  },
  slots: ['conjunction-poppers', 'prefix', 'content', 'trailing'],
})

export const UiLogicTreeCaretType = 'UiLogicTreeCaret' as SchemaType<
  'UiLogicTreeCaret',
  RemoteProperties<UiLogicTreeCaretProperties>
>

export const UiLogicTreeCaret = defineRemoteComponent(UiLogicTreeCaretType)

export const UiLogicTreeNodeItemType = 'UiLogicTreeNodeItem' as SchemaType<
  'UiLogicTreeNodeItem'
>

export const UiLogicTreeNodeItem = defineRemoteComponent(UiLogicTreeNodeItemType, {
  slots: ['default', 'headline', 'title', 'trailing'],
})

export const UiLogicTreeNodeIconType = 'UiLogicTreeNodeIcon' as SchemaType<
  'UiLogicTreeNodeIcon'
>

export const UiLogicTreeNodeIcon = defineRemoteComponent(UiLogicTreeNodeIconType, {
  slots: ['default'],
})
