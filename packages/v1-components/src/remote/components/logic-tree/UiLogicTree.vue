<template>
    <UiLogicTreeRoot @outside-click="onOutsideClick">
        <template
            v-for="entry in renderEntries"
            :key="entry.id"
        >
            <RemoteSortableContainer
                v-if="entry.kind === 'grouped'"
                as="div"
                class="ui-v1-logic-tree__grouped-sortable"
                :container-id="entry.containerId"
                :accepts="[entry.containerId]"
                :on-drop="onGroupedDrop"
            >
                <RemoteSortableItem
                    v-for="(nodeEntry, index) in entry.itemNodes"
                    :key="nodeEntry.node.id"
                    as="div"
                    class="ui-v1-logic-tree__grouped-sortable-item"
                    :item-id="nodeEntry.node.id"
                    :container-id="entry.containerId"
                    :type="entry.containerId"
                    :index="index"
                    :payload="{ nodeId: nodeEntry.node.id, pathKey: pathToKey(nodeEntry.path) }"
                    :disabled="!isGroupedDraggableNode(nodeEntry)"
                >
                    <UiLogicTreeNode
                        :path-key="pathToKey(nodeEntry.path)"
                        :node-view="resolveNodeView(nodeEntry)"
                        :connectors="nodeEntry.connectors"
                        :conjunction="nodeEntry.conjunction"
                        :conjunction-end-path-key="nodeEntry.conjunctionEndPathKey"
                        :conjunction-label="resolveConjunctionLabel(nodeEntry.conjunction)"
                        :conjunction-offset="nodeEntry.conjunctionOffset"
                        :conjunction-start-path-key="nodeEntry.conjunctionStartPathKey"
                        :conjunction-tone="nodeEntry.conjunctionTone"
                        :grouped="Boolean(nodeEntry.sectionKey)"
                        :grouped-header="nodeEntry.node.childrenView === LogicTreeChildrenView.GROUPED"
                        :grouped-position="nodeEntry.groupedPosition || undefined"
                        :editable="nodeEntry.node.data.editable"
                        :selected="isNodeSelected(nodeEntry)"
                        :highlighted="Boolean(nodeEntry.node.data.highlighted)"
                        :disabled="Boolean(nodeEntry.node.data.disabled)"
                        @node-click="onNodeClick(nodeEntry)"
                        @node-edit="setNodeEditable(nodeEntry, $event)"
                    >
                        <template #conjunction-poppers>
                            <slot
                                name="conjunction-poppers"
                                v-bind="resolveNodeSlotProps(nodeEntry)"
                            />
                        </template>

                        <template #prefix>
                            <slot
                                name="node-prefix"
                                v-bind="resolveNodeSlotProps(nodeEntry)"
                            />
                        </template>

                        <template #content>
                            <div class="ui-v1-logic-tree__slot-content">
                                <slot
                                    name="node"
                                    v-bind="resolveNodeSlotProps(nodeEntry)"
                                >
                                    <div
                                        class="ui-v1-logic-tree__slot-placeholder"
                                        data-ui-logic-tree-slot="node"
                                    />
                                </slot>
                            </div>
                        </template>

                        <template #trailing>
                            <slot
                                name="node-trailing"
                                v-bind="resolveNodeSlotProps(nodeEntry)"
                            />
                        </template>
                    </UiLogicTreeNode>
                </RemoteSortableItem>

                <UiLogicTreeNode
                    v-for="nodeEntry in entry.footerNodes"
                    :key="nodeEntry.node.id"
                    :path-key="pathToKey(nodeEntry.path)"
                    :node-view="resolveNodeView(nodeEntry)"
                    :connectors="nodeEntry.connectors"
                    :conjunction="nodeEntry.conjunction"
                    :conjunction-end-path-key="nodeEntry.conjunctionEndPathKey"
                    :conjunction-label="resolveConjunctionLabel(nodeEntry.conjunction)"
                    :conjunction-offset="nodeEntry.conjunctionOffset"
                    :conjunction-start-path-key="nodeEntry.conjunctionStartPathKey"
                    :conjunction-tone="nodeEntry.conjunctionTone"
                    :grouped="Boolean(nodeEntry.sectionKey)"
                    :grouped-header="nodeEntry.node.childrenView === LogicTreeChildrenView.GROUPED"
                    :grouped-position="nodeEntry.groupedPosition || undefined"
                    :editable="nodeEntry.node.data.editable"
                    :selected="isNodeSelected(nodeEntry)"
                    :highlighted="Boolean(nodeEntry.node.data.highlighted)"
                    :disabled="Boolean(nodeEntry.node.data.disabled)"
                    @node-click="onNodeClick(nodeEntry)"
                    @node-edit="setNodeEditable(nodeEntry, $event)"
                >
                    <template #conjunction-poppers>
                        <slot
                            name="conjunction-poppers"
                            v-bind="resolveNodeSlotProps(nodeEntry)"
                        />
                    </template>

                    <template #prefix>
                        <slot
                            name="node-prefix"
                            v-bind="resolveNodeSlotProps(nodeEntry)"
                        />
                    </template>

                    <template #content>
                        <div class="ui-v1-logic-tree__slot-content">
                            <slot
                                name="node"
                                v-bind="resolveNodeSlotProps(nodeEntry)"
                            >
                                <div
                                    class="ui-v1-logic-tree__slot-placeholder"
                                    data-ui-logic-tree-slot="node"
                                />
                            </slot>
                        </div>
                    </template>

                    <template #trailing>
                        <slot
                            name="node-trailing"
                            v-bind="resolveNodeSlotProps(nodeEntry)"
                        />
                    </template>
                </UiLogicTreeNode>
            </RemoteSortableContainer>

            <UiLogicTreeNode
                v-else
                :path-key="pathToKey(entry.item.path)"
                :node-view="resolveNodeView(entry.item)"
                :connectors="entry.item.connectors"
                :conjunction="entry.item.conjunction"
                :conjunction-end-path-key="entry.item.conjunctionEndPathKey"
                :conjunction-label="resolveConjunctionLabel(entry.item.conjunction)"
                :conjunction-offset="entry.item.conjunctionOffset"
                :conjunction-start-path-key="entry.item.conjunctionStartPathKey"
                :conjunction-tone="entry.item.conjunctionTone"
                :grouped="Boolean(entry.item.sectionKey)"
                :grouped-header="entry.item.node.childrenView === LogicTreeChildrenView.GROUPED"
                :grouped-position="entry.item.groupedPosition || undefined"
                :editable="entry.item.node.data.editable"
                :selected="isNodeSelected(entry.item)"
                :highlighted="Boolean(entry.item.node.data.highlighted)"
                :disabled="Boolean(entry.item.node.data.disabled)"
                @node-click="onNodeClick(entry.item)"
                @node-edit="setNodeEditable(entry.item, $event)"
            >
                <template #conjunction-poppers>
                    <slot
                        name="conjunction-poppers"
                        v-bind="resolveNodeSlotProps(entry.item)"
                    />
                </template>

                <template #prefix>
                    <slot
                        name="node-prefix"
                        v-bind="resolveNodeSlotProps(entry.item)"
                    />
                </template>

                <template #content>
                    <div class="ui-v1-logic-tree__slot-content">
                        <slot
                            name="node"
                            v-bind="resolveNodeSlotProps(entry.item)"
                        >
                            <div
                                class="ui-v1-logic-tree__slot-placeholder"
                                data-ui-logic-tree-slot="node"
                            />
                        </slot>
                    </div>
                </template>

                <template #trailing>
                    <slot
                        name="node-trailing"
                        v-bind="resolveNodeSlotProps(entry.item)"
                    />
                </template>
            </UiLogicTreeNode>
        </template>
    </UiLogicTreeRoot>
</template>

<script
  lang="ts"
  generic="TNodeData extends object = Record<string, never>"
  remote
  setup
>
import type { I18nLocalized } from '@/host/i18n'
import type { RemoteSortableEvent } from '@omnicajs/vue-remote/remote'
import type {
  UiLogicTreeConnector,
  UiLogicTreeDropPayload,
  UiLogicTreeNode as UiLogicTreeNodeType,
  UiLogicTreeNodeAddPayload,
  UiLogicTreeNodeEditPayload,
  UiLogicTreeNodeRemovePayload,
  UiLogicTreeNodeSlotProps,
  UiLogicTreeProperties,
} from '@/common/components/logic-tree'

import { RemoteSortableContainer, RemoteSortableItem } from '@omnicajs/vue-remote/remote'

import {
  computed,
  inject,
  ref,
  shallowRef,
  watch,
} from 'vue'

import {
  LogicTreeChildrenView,
  LogicTreeConjunction,
  LogicTreeNodeKind,
  LogicTreeNodeView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import _i18n from '@/host/components/logic-tree/i18n'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { UiLogicTreeNode, UiLogicTreeRoot } from './parts'

type TreeNode = UiLogicTreeNodeType<TNodeData>
type TreeProperties = UiLogicTreeProperties<TNodeData>
type TreeNodeSlotProps = UiLogicTreeNodeSlotProps<TNodeData>

type FlattenedNode = {
  conjunction: TreeNode['conjunction'];
  conjunctionEndPathKey: string | undefined;
  conjunctionOffset: number | undefined;
  conjunctionStartPathKey: string | undefined;
  connectors: UiLogicTreeConnector[];
  expanded: boolean;
  groupedPosition: '' | 'end' | 'middle' | 'single' | 'start';
  hasChildren: boolean;
  node: TreeNode;
  parentPath: number[];
  path: number[];
  conjunctionTone: LogicTreeTone;
  sectionKey: string;
}

type RenderEntry = {
  id: string;
  kind: 'node';
  item: FlattenedNode;
} | {
  containerId: string;
  footerNodes: FlattenedNode[];
  id: string;
  itemNodes: FlattenedNode[];
  kind: 'grouped';
}

const props = withDefaults(defineProps<TreeProperties>(), {
  items: () => [],
})

defineSlots<{
  'conjunction-poppers'?: (props: TreeNodeSlotProps) => unknown;
  'node'?: (props: TreeNodeSlotProps) => unknown;
  'node-prefix'?: (props: TreeNodeSlotProps) => unknown;
  'node-trailing'?: (props: TreeNodeSlotProps) => unknown;
}>()

const emit = defineEmits<{
  'action': [payload: { actionId: string; nodeId: string }];
  'control-action': [payload: { controlId: string; nodeId: string }];
  'control:update': [payload: { controlId: string; nodeId: string; value: string | number | null }];
  'drop': [payload: UiLogicTreeDropPayload];
  'remove': [nodeId: string];
  'node:add': [payload: UiLogicTreeNodeAddPayload];
  'node:edit': [payload: UiLogicTreeNodeEditPayload];
  'node:remove': [payload: UiLogicTreeNodeRemovePayload];
  'toggle': [payload: { expanded: boolean; nodeId: string }];
  'update:items': [items: TreeNode[]];
}>()

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const resolveConjunctionLabel = (conjunction: TreeNode['conjunction']): string => {
  if (conjunction === LogicTreeConjunction.AND) {
    return i18n.value.t('relationAnd')
  }

  if (conjunction === LogicTreeConjunction.OR) {
    return i18n.value.t('relationOr')
  }

  return String(conjunction ?? '')
}
const itemsState = shallowRef<TreeNode[]>([])
const activePathKey = ref('')

const fallbackTone = (node: TreeNode): LogicTreeTone => (
  node.tone
  ?? (node.kind === LogicTreeNodeKind.GROUP
    ? LogicTreeTone.GREEN
    : LogicTreeTone.BLUE)
)

const resolveConjunctionTone = (
  conjunction: TreeNode['conjunction'],
  fallback: LogicTreeTone
): LogicTreeTone => {
  if (conjunction === LogicTreeConjunction.OR) {
    return LogicTreeTone.YELLOW
  }

  if (conjunction === LogicTreeConjunction.AND) {
    return LogicTreeTone.BLUE
  }

  return fallback
}

const DEFAULT_NODE_GAP = 16

const resolveNodeConjunction = (
  node: TreeNode,
  index: number,
  isGroupedSectionNode: boolean,
  parentNode: TreeNode | null
): TreeNode['conjunction'] => {
  if (isGroupedSectionNode || !isConjunctionContentNode(node)) {
    return ''
  }

  if (index === 0) {
    return parentNode
      && isConjunctionContentNode(parentNode)
      && countConjunctionContentChildren(parentNode) >= 2
      ? (node.conjunction ?? '')
      : ''
  }

  return node.conjunction ?? ''
}

const resolveConjunctionOffset = (conjunction: TreeNode['conjunction']): number | undefined => {
  if (!conjunction) {
    return undefined
  }

  return -(DEFAULT_NODE_GAP / 2)
}

const resolveSubtreeEndPathKey = (source: FlattenedNode[], nodeIndex: number): string => {
  const nodeEntry = source[nodeIndex]
  const nodePathKey = pathToKey(nodeEntry.path)
  const subtreePrefix = `${nodePathKey}.`
  let endIndex = nodeIndex

  for (let index = nodeIndex + 1; index < source.length; index += 1) {
    const candidatePathKey = pathToKey(source[index].path)

    if (candidatePathKey.startsWith(subtreePrefix)) {
      endIndex = index
      continue
    }

    break
  }

  return pathToKey(source[endIndex].path)
}

const resolveConjunctionRangeEndPathKey = (
  source: FlattenedNode[],
  nodeIndex: number
): string | undefined => {
  const nodeEntry = source[nodeIndex]
  const siblingIndex = nodeEntry.path.at(-1)

  if (siblingIndex === undefined) {
    return undefined
  }

  let lastSiblingNodeIndex = nodeIndex

  source.forEach((candidate, candidateIndex) => {
    const candidateSiblingIndex = candidate.path.at(-1)

    if (
      candidate.path.length === nodeEntry.path.length
      && candidateSiblingIndex !== undefined
      && candidateSiblingIndex >= siblingIndex
      && candidate.parentPath.length === nodeEntry.parentPath.length
      && candidate.parentPath.every((segment, index) => segment === nodeEntry.parentPath[index])
    ) {
      lastSiblingNodeIndex = candidateIndex
    }
  })

  return resolveSubtreeEndPathKey(source, lastSiblingNodeIndex)
}

const applyConjunctionToneToConnectors = (
  connectors: UiLogicTreeConnector[],
  conjunction: TreeNode['conjunction'],
  conjunctionTone: LogicTreeTone
): UiLogicTreeConnector[] => {
  if (!conjunction || connectors.length === 0) {
    return connectors
  }

  return connectors.map((connector, connectorIndex, source) => (
    connectorIndex === source.length - 1
      ? {
        ...connector,
        tone: conjunctionTone,
      }
      : connector
  ))
}

const setConnectorToneAtIndex = (
  nodeEntry: FlattenedNode,
  connectorIndex: number,
  tone: LogicTreeTone
): FlattenedNode => {
  if (!nodeEntry.connectors[connectorIndex]) {
    return nodeEntry
  }

  return {
    ...nodeEntry,
    connectors: nodeEntry.connectors.map((connector, index) => (
      index === connectorIndex
        ? {
          ...connector,
          tone,
        }
        : connector
    )),
  }
}

const applyConjunctionBranchTones = (source: FlattenedNode[]): FlattenedNode[] => {
  const nodes = source.map((nodeEntry) => ({
    ...nodeEntry,
    connectors: nodeEntry.connectors.map((connector) => ({ ...connector })),
  }))

  const startsWithPath = (path: number[], prefix: number[]) => (
    prefix.length <= path.length
    && prefix.every((segment, index) => path[index] === segment)
  )

  const recolorBranchLevel = (parentPath: number[], connectorIndex: number, tone: LogicTreeTone) => {
    nodes.forEach((candidate, index) => {
      if (!startsWithPath(candidate.path, parentPath)) {
        return
      }

      if (!candidate.connectors[connectorIndex]) {
        return
      }

      nodes[index] = setConnectorToneAtIndex(candidate, connectorIndex, tone)
    })
  }

  nodes.forEach((nodeEntry) => {
    if (!nodeEntry.conjunction) {
      return
    }

    const connectorIndex = Math.max(0, nodeEntry.connectors.length - 1)

    recolorBranchLevel(nodeEntry.parentPath, connectorIndex, nodeEntry.conjunctionTone)
  })

  return nodes
}

const applyConjunctionRanges = (source: FlattenedNode[]): FlattenedNode[] => source.map((nodeEntry, nodeIndex) => {
  if (!nodeEntry.conjunction) {
    return nodeEntry
  }

  const siblingIndex = nodeEntry.path.at(-1)
  const parentPathKey = nodeEntry.parentPath.length > 0 ? pathToKey(nodeEntry.parentPath) : undefined
  const parentEntry = parentPathKey
    ? source.find((candidate) => pathToKey(candidate.path) === parentPathKey)
    : undefined

  if (siblingIndex === undefined) {
    return nodeEntry
  }

  if (siblingIndex === 0) {
    return {
      ...nodeEntry,
      conjunctionEndPathKey: resolveConjunctionRangeEndPathKey(source, nodeIndex),
      conjunctionStartPathKey: parentEntry ? pathToKey(parentEntry.path) : undefined,
    }
  }

  return {
    ...nodeEntry,
    conjunctionEndPathKey: resolveConjunctionRangeEndPathKey(source, nodeIndex),
    conjunctionStartPathKey: pathToKey([...nodeEntry.parentPath, siblingIndex - 1]),
  }
})

const pathToKey = (path: number[]): string => path.join('.')

const cloneNodes = (nodes: TreeNode[]): TreeNode[] => nodes.map((node) => ({
  ...node,
  children: node.children ? cloneNodes(node.children) : undefined,
  data: { ...node.data },
}))

const resolveConfiguredNodeView = (node: TreeNode): LogicTreeNodeView => (
  node.data.view
)

const isConjunctionContentNode = (node: TreeNode): boolean => (
  resolveConfiguredNodeView(node) !== LogicTreeNodeView.ACTIONS
  && node.kind !== LogicTreeNodeKind.BRANCH
)

const countConjunctionContentChildren = (node: TreeNode | null): number => (
  node?.children?.filter((child) => isConjunctionContentNode(child)).length ?? 0
)

const resolveNodeView = (nodeEntry: FlattenedNode): LogicTreeNodeView => {
  const configuredNodeView = resolveConfiguredNodeView(nodeEntry.node)

  if (configuredNodeView === LogicTreeNodeView.ACTIONS) {
    return configuredNodeView
  }

  return configuredNodeView
}

const canToggleNode = (nodeEntry: FlattenedNode): boolean => (
  Boolean(nodeEntry.node.collapsible)
  && nodeEntry.hasChildren
)

const canSetNodeEditable = (nodeEntry: FlattenedNode): boolean => (
  resolveConfiguredNodeView(nodeEntry.node) !== LogicTreeNodeView.ACTIONS
  && !canToggleNode(nodeEntry)
)

const isNodeEditing = (nodeEntry: FlattenedNode): boolean => (
  canSetNodeEditable(nodeEntry)
  && Boolean(nodeEntry.node.data.editable)
)

const setNodeEditable = (nodeEntry: FlattenedNode, value: boolean) => {
  if (!canSetNodeEditable(nodeEntry)) {
    return
  }

  withItemsMutation((nextItems) => {
    setEditableState(nextItems, value ? nodeEntry.path : null)
  })
}

watch(() => props.items, (items) => {
  itemsState.value = cloneNodes(items ?? [])
}, { deep: true, immediate: true })

const withItemsMutation = (mutator: (items: TreeNode[]) => void) => {
  const nextItems = cloneNodes(itemsState.value)

  mutator(nextItems)

  itemsState.value = nextItems
  emit('update:items', cloneNodes(itemsState.value))
}

const getBranchAtPath = (
  nodes: TreeNode[],
  parentPath: number[],
  create = false
): TreeNode[] | null => {
  let branch = nodes

  for (const index of parentPath) {
    const node = branch[index]

    if (!node) {
      return null
    }

    if (!node.children) {
      if (!create) {
        return null
      }

      node.children = []
    }

    branch = node.children
  }

  return branch
}

const getNodeAtPath = (nodes: TreeNode[], path: number[]): TreeNode | null => {
  const branch = getBranchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)

  if (index === undefined) {
    return null
  }

  return branch?.[index] ?? null
}

const setEditableState = (
  nodes: TreeNode[],
  editablePath: number[] | null = null
) => {
  const editablePathKey = editablePath ? pathToKey(editablePath) : ''

  const walk = (branch: TreeNode[], parentPath: number[] = []) => {
    branch.forEach((node, index) => {
      const path = [...parentPath, index]
      node.data.editable = editablePathKey !== '' && pathToKey(path) === editablePathKey

      if (node.children?.length) {
        walk(node.children, path)
      }
    })
  }

  walk(nodes)
}

const resolveParentMeta = (nodes: TreeNode[], path: number[]) => {
  const parentPath = path.slice(0, -1)
  const parentNode = parentPath.length > 0
    ? getNodeAtPath(nodes, parentPath)
    : null

  return {
    parentNode,
    parentPath,
    parentPathKey: parentPath.length > 0 ? pathToKey(parentPath) : null,
  }
}

const flatten = (
  nodes: TreeNode[],
  ancestors: UiLogicTreeConnector[] = [],
  parentPath: number[] = [],
  parentTone: LogicTreeTone | null = null,
  currentSectionKey = '',
  parentNode: TreeNode | null = null
): FlattenedNode[] => nodes.flatMap((node, index, siblings) => {
  const isLast = index === siblings.length - 1
  const path = [...parentPath, index]
  const expanded = node.expanded !== false
  const hasChildren = Boolean(node.children?.length)
  const shouldPreserveChildLevel = node.kind === LogicTreeNodeKind.BRANCH && ancestors.length === 0
  const descendsIntoChildren = hasChildren && expanded
  const isGroupedSectionNode = Boolean(currentSectionKey)
  const conjunction = resolveNodeConjunction(node, index, isGroupedSectionNode, parentNode)
  const connectorTone = parentTone ?? fallbackTone(node)
  const conjunctionTone = resolveConjunctionTone(conjunction, connectorTone)
  const connectorContinues = !isLast || descendsIntoChildren
  const connectors = applyConjunctionToneToConnectors([
    ...ancestors,
    ...(parentTone
      ? [{
        continues: connectorContinues,
        tone: connectorTone,
        visible: true,
      } satisfies UiLogicTreeConnector]
      : []),
  ].map((connector, connectorIndex, source) => ({
    ...connector,
    placeholder: isGroupedSectionNode && connectorIndex === source.length - 1,
  })), conjunction, conjunctionTone)
  const conjunctionOffset = resolveConjunctionOffset(conjunction)

  const flattenedNodes: FlattenedNode[] = [{
    conjunction,
    conjunctionEndPathKey: undefined,
    conjunctionOffset,
    conjunctionStartPathKey: undefined,
    connectors,
    expanded,
    groupedPosition: '',
    hasChildren,
    node,
    parentPath,
    path,
    conjunctionTone,
    sectionKey: currentSectionKey,
  }]

  if (hasChildren && expanded) {
    const childAncestors = shouldPreserveChildLevel
      ? ancestors
      : [
        ...ancestors,
        ...(parentTone
          ? [{
            continues: connectorContinues,
            tone: connectorTone,
            visible: true,
          } satisfies UiLogicTreeConnector]
          : []),
      ]
    const childParentTone = shouldPreserveChildLevel
      ? parentTone ?? fallbackTone(node)
      : fallbackTone(node)
    const nextSectionKey = node.childrenView === LogicTreeChildrenView.GROUPED ? pathToKey(path) : ''

    flattenedNodes.push(...flatten(
      node.children ?? [],
      childAncestors,
      path,
      childParentTone,
      nextSectionKey,
      node
    ))
  }

  return flattenedNodes
})

const flattenedNodes = computed(() => applyConjunctionRanges(applyConjunctionBranchTones(flatten(itemsState.value))))

const nodesWithGrouping = computed<FlattenedNode[]>(() => flattenedNodes.value.map((nodeEntry, index, source) => {
  if (!nodeEntry.sectionKey) {
    return nodeEntry
  }

  const prev = source[index - 1]
  const next = source[index + 1]
  const hasPrev = prev?.sectionKey === nodeEntry.sectionKey
  const hasNext = next?.sectionKey === nodeEntry.sectionKey
  const parentNode = nodeEntry.parentPath.length > 0
    ? getNodeAtPath(itemsState.value, nodeEntry.parentPath)
    : null
  const hasGroupedHeader = parentNode?.childrenView === LogicTreeChildrenView.GROUPED

  let groupedPosition: FlattenedNode['groupedPosition'] = 'single'

  if (!hasPrev && hasNext) {
    groupedPosition = 'start'
  } else if (hasPrev && hasNext) {
    groupedPosition = 'middle'
  } else if (hasPrev && !hasNext) {
    groupedPosition = 'end'
  } else if (!hasPrev && !hasNext && hasGroupedHeader) {
    groupedPosition = 'end'
  }

  return {
    ...nodeEntry,
    groupedPosition,
  }
}))

const renderEntries = computed<RenderEntry[]>(() => {
  const nextEntries: RenderEntry[] = []

  for (let index = 0; index < nodesWithGrouping.value.length; index += 1) {
    const nodeEntry = nodesWithGrouping.value[index]

    if (!nodeEntry.sectionKey) {
      nextEntries.push({
        id: `node:${pathToKey(nodeEntry.path)}`,
        kind: 'node',
        item: nodeEntry,
      })
      continue
    }

    const sectionNodes = [nodeEntry]
    let cursor = index + 1

    while (nodesWithGrouping.value[cursor]?.sectionKey === nodeEntry.sectionKey) {
      sectionNodes.push(nodesWithGrouping.value[cursor])
      cursor += 1
    }

    nextEntries.push({
      containerId: nodeEntry.sectionKey,
      footerNodes: sectionNodes.filter((sectionNode) => resolveConfiguredNodeView(sectionNode.node) === LogicTreeNodeView.ACTIONS),
      id: `group:${nodeEntry.sectionKey}`,
      itemNodes: sectionNodes.filter((sectionNode) => resolveConfiguredNodeView(sectionNode.node) !== LogicTreeNodeView.ACTIONS),
      kind: 'grouped',
    })

    index = cursor - 1
  }

  return nextEntries
})

const isNodeDraggable = (node: TreeNode): boolean => (
  Boolean(node.data.draggable)
  && !node.data.disabled
  && resolveConfiguredNodeView(node) !== LogicTreeNodeView.ACTIONS
)

const isGroupedDraggableNode = (nodeEntry: FlattenedNode): boolean => (
  Boolean(nodeEntry.sectionKey)
  && isNodeDraggable(nodeEntry.node)
)

const isNodeSelected = (nodeEntry: FlattenedNode): boolean => (
  Boolean(nodeEntry.node.data.selected)
  || activePathKey.value === pathToKey(nodeEntry.path)
  || isNodeEditing(nodeEntry)
)

const resolveNodeSlotProps = (nodeEntry: FlattenedNode): TreeNodeSlotProps => ({
  editing: isNodeEditing(nodeEntry),
  expanded: nodeEntry.expanded,
  grouped: Boolean(nodeEntry.sectionKey),
  groupedHeader: nodeEntry.node.childrenView === LogicTreeChildrenView.GROUPED,
  groupedPosition: nodeEntry.groupedPosition || undefined,
  hasChildren: nodeEntry.hasChildren,
  highlighted: Boolean(nodeEntry.node.data.highlighted),
  disabled: Boolean(nodeEntry.node.data.disabled),
  node: nodeEntry.node,
  onAction: (actionId, kind) => {
    onAction(nodeEntry, actionId, kind)
  },
  onControlAction: (controlId: string) => {
    emit('control-action', {
      controlId,
      nodeId: nodeEntry.node.id,
    })
  },
  onControlUpdate: (controlId: string, value: string | number | null) => {
    onControlUpdate(nodeEntry.path, controlId, value)
  },
  onRemove: () => {
    onRemove(nodeEntry.path, nodeEntry.node.id)
  },
  onToggle: () => {
    onToggle(nodeEntry)
  },
  path: [...nodeEntry.path],
  pathKey: pathToKey(nodeEntry.path),
  nodeView: resolveNodeView(nodeEntry),
  selected: isNodeSelected(nodeEntry),
})

const onControlUpdate = (path: number[], controlId: string, value: string | number | null) => {
  const currentNode = getNodeAtPath(itemsState.value, path)

  if (currentNode) {
    emit('node:edit', {
      controlId,
      nodeId: currentNode.id,
      pathKey: pathToKey(path),
      value,
    })
  }

  emit('control:update', {
    controlId,
    nodeId: currentNode?.id ?? '',
    value,
  })
}

const onToggle = (nodeEntry: FlattenedNode) => {
  const nextExpanded = !nodeEntry.expanded

  withItemsMutation((nextItems) => {
    const nextNode = getNodeAtPath(nextItems, nodeEntry.path)

    if (nextNode) {
      nextNode.expanded = nextExpanded
    }
  })

  emit('toggle', {
    expanded: nextExpanded,
    nodeId: nodeEntry.node.id,
  })
}

const onRemove = (path: number[], nodeId: string) => {
  const pathKey = pathToKey(path)
  const index = path.at(-1)
  const { parentNode, parentPathKey } = resolveParentMeta(itemsState.value, path)

  if (activePathKey.value === pathKey) {
    activePathKey.value = ''
  }

  if (index !== undefined) {
    emit('node:remove', {
      index,
      nodeId,
      parentNodeId: parentNode?.id ?? null,
      parentPathKey,
      pathKey,
    })
  }

  emit('remove', nodeId)
}

const onAction = (
  nodeEntry: FlattenedNode,
  actionId: string,
  kind: Exclude<TreeNode['kind'], LogicTreeNodeKind.BRANCH>
) => {
  if (resolveNodeView(nodeEntry) !== LogicTreeNodeView.ACTIONS) {
    return
  }

  const { parentNode, parentPathKey } = resolveParentMeta(itemsState.value, nodeEntry.path)

  emit('node:add', {
    actionId,
    kind,
    parentNodeId: parentNode?.id ?? null,
    parentPathKey,
    triggerNodeId: nodeEntry.node.id,
  })

  emit('action', {
    actionId,
    nodeId: nodeEntry.node.id,
  })
}

const onNodeClick = (nodeEntry: FlattenedNode) => {
  if (resolveNodeView(nodeEntry) === LogicTreeNodeView.ACTIONS) {
    return
  }

  if (canToggleNode(nodeEntry)) {
    onToggle(nodeEntry)
    activePathKey.value = pathToKey(nodeEntry.path)

    return
  }

  if (!canSetNodeEditable(nodeEntry)) {
    withItemsMutation((nextItems) => {
      setEditableState(nextItems, null)
    })
  }

  activePathKey.value = pathToKey(nodeEntry.path)
}

const onOutsideClick = () => {
  activePathKey.value = ''

  withItemsMutation((nextItems) => {
    setEditableState(nextItems, null)
  })
}

const resolveGroupedDropPayload = (event: RemoteSortableEvent): UiLogicTreeDropPayload | null => {
  if (
    !event.accepted
    || !event.targetContainerId
    || event.sourceContainerId !== event.targetContainerId
    || (event.placement !== 'before' && event.placement !== 'after')
  ) {
    return null
  }

  return {
    itemId: event.itemId,
    payload: event.payload,
    placement: event.placement,
    sourceContainerId: event.sourceContainerId,
    targetContainerId: event.targetContainerId,
    targetIndex: event.targetIndex,
    targetItemId: event.targetItemId,
  }
}

const onGroupedDrop = (event: RemoteSortableEvent) => {
  const payload = resolveGroupedDropPayload(event)

  if (!payload) {
    return
  }

  const parentPath = payload.sourceContainerId
    .split('.')
    .filter(Boolean)
    .map((segment) => Number(segment))

  withItemsMutation((nextItems) => {
    const branchNode = getNodeAtPath(nextItems, parentPath)
    const children = branchNode?.children

    if (!children?.length) {
      return
    }

    const sortableChildren = children.filter((child) => resolveConfiguredNodeView(child) !== LogicTreeNodeView.ACTIONS)
    const footerChildren = children.filter((child) => resolveConfiguredNodeView(child) === LogicTreeNodeView.ACTIONS)
    const movedNodeIndex = sortableChildren.findIndex((child) => child.id === payload.itemId)

    if (movedNodeIndex === -1) {
      return
    }

    const [movedNode] = sortableChildren.splice(movedNodeIndex, 1)

    if (!movedNode) {
      return
    }

    const targetIndex = Math.min(
      Math.max(payload.targetIndex ?? sortableChildren.length, 0),
      sortableChildren.length
    )

    sortableChildren.splice(targetIndex, 0, movedNode)
    branchNode!.children = [...sortableChildren, ...footerChildren]
  })

  emit('drop', payload)
}

</script>
