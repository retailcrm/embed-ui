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
                :accepts="[entry.containerId]"
                :container-id="entry.containerId"
                :on-drop="onGroupedDrop"
            >
                <RemoteSortableItem
                    v-for="(row, index) in entry.itemRows"
                    :key="row.node.id"
                    as="div"
                    class="ui-v1-logic-tree__grouped-sortable-item"
                    :container-id="entry.containerId"
                    :disabled="!isGroupedDraggableRow(row)"
                    :index="index"
                    :item-id="row.node.id"
                    :payload="{ nodeId: row.node.id, pathKey: pathToKey(row.path) }"
                    :type="entry.containerId"
                >
                    <UiLogicTreeRow
                        :connectors="row.connectors"
                        :editable="row.node.row.editable"
                        :grouped="Boolean(row.sectionKey)"
                        :grouped-position="row.groupedPosition || undefined"
                        :highlighted="Boolean(row.node.row.highlighted)"
                        :path-key="pathToKey(row.path)"
                        :conjunction="row.conjunction"
                        :conjunction-end-path-key="row.conjunctionEndPathKey"
                        :conjunction-label="resolveConjunctionLabel(row.conjunction)"
                        :conjunction-offset="row.conjunctionOffset"
                        :conjunction-start-path-key="row.conjunctionStartPathKey"
                        :conjunction-tone="row.conjunctionTone"
                        :grouped-header="row.node.childrenView === LogicTreeChildrenView.GROUPED"
                        :row-view="resolveRowView(row)"
                        :selected="isRowSelected(row)"
                        @row-click="onRowClick(row)"
                        @row-edit="setRowEditable(row, $event)"
                    >
                        <template #prefix>
                            <slot
                                name="row-prefix"
                                v-bind="resolveRowSlotProps(row)"
                            />
                        </template>

                        <template #content>
                            <div
                                v-if="resolveRowView(row) === LogicTreeRowView.ACTIONS"
                                class="ui-v1-logic-tree__slot-content ui-v1-logic-tree__slot-content_actions"
                            >
                                <slot
                                    name="row-actions"
                                    v-bind="resolveRowSlotProps(row)"
                                />
                            </div>

                            <div
                                v-else
                                class="ui-v1-logic-tree__slot-content"
                            >
                                <slot
                                    :name="resolveContentSlotName(row)"
                                    v-bind="resolveRowSlotProps(row)"
                                >
                                    <div
                                        :class="resolveContentPlaceholderClass(row)"
                                        data-ui-logic-tree-slot="content"
                                    />
                                </slot>
                            </div>
                        </template>

                        <template #trailing>
                            <slot
                                name="row-trailing"
                                v-bind="resolveRowSlotProps(row)"
                            />
                        </template>
                    </UiLogicTreeRow>
                </RemoteSortableItem>

                <UiLogicTreeRow
                    v-for="row in entry.footerRows"
                    :key="row.node.id"
                    :connectors="row.connectors"
                    :editable="row.node.row.editable"
                    :grouped="Boolean(row.sectionKey)"
                    :grouped-position="row.groupedPosition || undefined"
                    :highlighted="Boolean(row.node.row.highlighted)"
                    :path-key="pathToKey(row.path)"
                    :conjunction="row.conjunction"
                    :conjunction-end-path-key="row.conjunctionEndPathKey"
                    :conjunction-label="resolveConjunctionLabel(row.conjunction)"
                    :conjunction-offset="row.conjunctionOffset"
                    :conjunction-start-path-key="row.conjunctionStartPathKey"
                    :conjunction-tone="row.conjunctionTone"
                    :grouped-header="row.node.childrenView === LogicTreeChildrenView.GROUPED"
                    :row-view="resolveRowView(row)"
                    :selected="isRowSelected(row)"
                    @row-click="onRowClick(row)"
                    @row-edit="setRowEditable(row, $event)"
                >
                    <template #prefix>
                        <slot
                            name="row-prefix"
                            v-bind="resolveRowSlotProps(row)"
                        />
                    </template>

                    <template #content>
                        <div
                            v-if="resolveRowView(row) === LogicTreeRowView.ACTIONS"
                            class="ui-v1-logic-tree__slot-content ui-v1-logic-tree__slot-content_actions"
                        >
                            <slot
                                name="row-actions"
                                v-bind="resolveRowSlotProps(row)"
                            />
                        </div>

                        <div
                            v-else
                            class="ui-v1-logic-tree__slot-content"
                        >
                            <slot
                                :name="resolveContentSlotName(row)"
                                v-bind="resolveRowSlotProps(row)"
                            >
                                <div
                                    :class="resolveContentPlaceholderClass(row)"
                                    data-ui-logic-tree-slot="content"
                                />
                            </slot>
                        </div>
                    </template>

                    <template #trailing>
                        <slot
                            name="row-trailing"
                            v-bind="resolveRowSlotProps(row)"
                        />
                    </template>
                </UiLogicTreeRow>
            </RemoteSortableContainer>

            <UiLogicTreeRow
                v-else
                :connectors="entry.row.connectors"
                :editable="entry.row.node.row.editable"
                :grouped="Boolean(entry.row.sectionKey)"
                :grouped-position="entry.row.groupedPosition || undefined"
                :highlighted="Boolean(entry.row.node.row.highlighted)"
                :path-key="pathToKey(entry.row.path)"
                :conjunction="entry.row.conjunction"
                :conjunction-end-path-key="entry.row.conjunctionEndPathKey"
                :conjunction-label="resolveConjunctionLabel(entry.row.conjunction)"
                :conjunction-offset="entry.row.conjunctionOffset"
                :conjunction-start-path-key="entry.row.conjunctionStartPathKey"
                :conjunction-tone="entry.row.conjunctionTone"
                :grouped-header="entry.row.node.childrenView === LogicTreeChildrenView.GROUPED"
                :row-view="resolveRowView(entry.row)"
                :selected="isRowSelected(entry.row)"
                @row-click="onRowClick(entry.row)"
                @row-edit="setRowEditable(entry.row, $event)"
            >
                <template #prefix>
                    <slot
                        name="row-prefix"
                        v-bind="resolveRowSlotProps(entry.row)"
                    />
                </template>

                <template #content>
                    <div
                        v-if="resolveRowView(entry.row) === LogicTreeRowView.ACTIONS"
                        class="ui-v1-logic-tree__slot-content ui-v1-logic-tree__slot-content_actions"
                    >
                        <slot
                            name="row-actions"
                            v-bind="resolveRowSlotProps(entry.row)"
                        />
                    </div>

                    <div
                        v-else
                        class="ui-v1-logic-tree__slot-content"
                    >
                        <slot
                            :name="resolveContentSlotName(entry.row)"
                            v-bind="resolveRowSlotProps(entry.row)"
                        >
                            <div
                                :class="resolveContentPlaceholderClass(entry.row)"
                                data-ui-logic-tree-slot="content"
                            />
                        </slot>
                    </div>
                </template>

                <template #trailing>
                    <slot
                        name="row-trailing"
                        v-bind="resolveRowSlotProps(entry.row)"
                    />
                </template>
            </UiLogicTreeRow>
        </template>
    </UiLogicTreeRoot>
</template>

<script lang="ts" remote setup>
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type { RemoteSortableEvent } from '@omnicajs/vue-remote/remote'
import type {
  UiLogicTreeAction,
  UiLogicTreeConnector,
  UiLogicTreeDropPayload,
  UiLogicTreeNode,
  UiLogicTreeProperties,
  UiLogicTreeRowAddPayload,
  UiLogicTreeRowEditPayload,
  UiLogicTreeRowRemovePayload,
  UiLogicTreeRowSlotProps,
} from '@/common/components/logic-tree'

import { computed, inject, ref } from 'vue'
import { RemoteSortableContainer, RemoteSortableItem } from '@omnicajs/vue-remote/remote'
import { watch } from 'vue'

import {
  LogicTreeActionKind,
  LogicTreeChildrenView,
  LogicTreeConjunction,
  LogicTreeNodeKind,
  LogicTreeRowView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import _i18n from '@/host/components/logic-tree/i18n'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { UiLogicTreeRoot, UiLogicTreeRow } from './parts'

type FlattenedRow = {
  conjunction: UiLogicTreeNode['conjunction'];
  conjunctionEndPathKey: string | undefined;
  conjunctionOffset: number | undefined;
  conjunctionStartPathKey: string | undefined;
  connectors: UiLogicTreeConnector[];
  expanded: boolean;
  groupedPosition: '' | 'end' | 'middle' | 'single' | 'start';
  hasChildren: boolean;
  node: UiLogicTreeNode;
  parentPath: number[];
  path: number[];
  conjunctionTone: LogicTreeTone;
  sectionKey: string;
}

type RenderEntry = {
  id: string;
  row: FlattenedRow;
  kind: 'row';
} | {
  containerId: string;
  footerRows: FlattenedRow[];
  id: string;
  itemRows: FlattenedRow[];
  kind: 'grouped';
}

const props = defineProps({
  /** Набор корневых узлов логического древа */
  items: {
    type: Array as PropType<UiLogicTreeProperties['items']>,
    default: () => [],
  },
})

defineSlots<{
  'row-actions'?: (props: UiLogicTreeRowSlotProps) => unknown;
  'row-edit'?: (props: UiLogicTreeRowSlotProps) => unknown;
  'row-prefix'?: (props: UiLogicTreeRowSlotProps) => unknown;
  'row-summary'?: (props: UiLogicTreeRowSlotProps) => unknown;
  'row-trailing'?: (props: UiLogicTreeRowSlotProps) => unknown;
}>()

const emit = defineEmits<{
  'action': [payload: { actionId: string; nodeId: string }];
  'control-action': [payload: { controlId: string; nodeId: string }];
  'control:update': [payload: { controlId: string; nodeId: string; value: string | number | null }];
  'drop': [payload: UiLogicTreeDropPayload];
  'remove': [nodeId: string];
  'row:add': [payload: UiLogicTreeRowAddPayload];
  'row:edit': [payload: UiLogicTreeRowEditPayload];
  'row:remove': [payload: UiLogicTreeRowRemovePayload];
  'toggle': [payload: { expanded: boolean; nodeId: string }];
  'update:items': [items: UiLogicTreeNode[]];
}>()

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const resolveConjunctionLabel = (conjunction: UiLogicTreeNode['conjunction']): string => {
  if (conjunction === LogicTreeConjunction.AND) {
    return i18n.value.t('relationAnd')
  }

  if (conjunction === LogicTreeConjunction.OR) {
    return i18n.value.t('relationOr')
  }

  return String(conjunction ?? '')
}
const itemsState = ref<UiLogicTreeNode[]>([])
const activePathKey = ref('')

const fallbackTone = (node: UiLogicTreeNode): LogicTreeTone => (
  node.tone
  ?? (node.kind === LogicTreeNodeKind.GROUP
    ? LogicTreeTone.GREEN
    : LogicTreeTone.BLUE)
)

const resolveConjunctionTone = (
  conjunction: UiLogicTreeNode['conjunction'],
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

const DEFAULT_ROW_GAP = 16

const resolveRowConjunction = (
  node: UiLogicTreeNode,
  index: number,
  isGroupedSectionRow: boolean,
  parentNode: UiLogicTreeNode | null
): UiLogicTreeNode['conjunction'] => {
  if (isGroupedSectionRow || !isConjunctionContentNode(node)) {
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

const resolveConjunctionOffset = (conjunction: UiLogicTreeNode['conjunction']): number | undefined => {
  if (!conjunction) {
    return undefined
  }

  return -(DEFAULT_ROW_GAP / 2)
}

const resolveSubtreeEndPathKey = (source: FlattenedRow[], rowIndex: number): string => {
  const row = source[rowIndex]
  const rowPathKey = pathToKey(row.path)
  const subtreePrefix = `${rowPathKey}.`
  let endIndex = rowIndex

  for (let index = rowIndex + 1; index < source.length; index += 1) {
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
  source: FlattenedRow[],
  rowIndex: number
): string | undefined => {
  const row = source[rowIndex]
  const siblingIndex = row.path.at(-1)

  if (siblingIndex === undefined) {
    return undefined
  }

  let lastSiblingRowIndex = rowIndex

  source.forEach((candidate, candidateIndex) => {
    const candidateSiblingIndex = candidate.path.at(-1)

    if (
      candidate.path.length === row.path.length
      && candidateSiblingIndex !== undefined
      && candidateSiblingIndex >= siblingIndex
      && candidate.parentPath.length === row.parentPath.length
      && candidate.parentPath.every((segment, index) => segment === row.parentPath[index])
    ) {
      lastSiblingRowIndex = candidateIndex
    }
  })

  return resolveSubtreeEndPathKey(source, lastSiblingRowIndex)
}

const applyConjunctionToneToConnectors = (
  connectors: UiLogicTreeConnector[],
  conjunction: UiLogicTreeNode['conjunction'],
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
  row: FlattenedRow,
  connectorIndex: number,
  tone: LogicTreeTone
): FlattenedRow => {
  if (!row.connectors[connectorIndex]) {
    return row
  }

  return {
    ...row,
    connectors: row.connectors.map((connector, index) => (
      index === connectorIndex
        ? {
          ...connector,
          tone,
        }
        : connector
    )),
  }
}

const applyConjunctionBranchTones = (source: FlattenedRow[]): FlattenedRow[] => {
  const rows = source.map((row) => ({
    ...row,
    connectors: row.connectors.map((connector) => ({ ...connector })),
  }))

  const startsWithPath = (path: number[], prefix: number[]) => (
    prefix.length <= path.length
    && prefix.every((segment, index) => path[index] === segment)
  )

  const recolorBranchLevel = (parentPath: number[], connectorIndex: number, tone: LogicTreeTone) => {
    rows.forEach((candidate, index) => {
      if (!startsWithPath(candidate.path, parentPath)) {
        return
      }

      if (!candidate.connectors[connectorIndex]) {
        return
      }

      rows[index] = setConnectorToneAtIndex(candidate, connectorIndex, tone)
    })
  }

  rows.forEach((row) => {
    if (!row.conjunction) {
      return
    }

    const connectorIndex = Math.max(0, row.connectors.length - 1)

    recolorBranchLevel(row.parentPath, connectorIndex, row.conjunctionTone)
  })

  return rows
}

const applyConjunctionRanges = (source: FlattenedRow[]): FlattenedRow[] => source.map((row, rowIndex) => {
  if (!row.conjunction) {
    return row
  }

  const siblingIndex = row.path.at(-1)
  const parentPathKey = row.parentPath.length > 0 ? pathToKey(row.parentPath) : undefined
  const parentRow = parentPathKey
    ? source.find((candidate) => pathToKey(candidate.path) === parentPathKey)
    : undefined

  if (siblingIndex === undefined) {
    return row
  }

  if (siblingIndex === 0) {
    return {
      ...row,
      conjunctionEndPathKey: resolveConjunctionRangeEndPathKey(source, rowIndex),
      conjunctionStartPathKey: parentRow ? pathToKey(parentRow.path) : undefined,
    }
  }

  return {
    ...row,
    conjunctionEndPathKey: resolveConjunctionRangeEndPathKey(source, rowIndex),
    conjunctionStartPathKey: pathToKey([...row.parentPath, siblingIndex - 1]),
  }
})

const pathToKey = (path: number[]): string => path.join('.')

const cloneNodes = (nodes: UiLogicTreeNode[]): UiLogicTreeNode[] => nodes.map((node) => ({
  ...node,
  children: node.children ? cloneNodes(node.children) : undefined,
  row: {
    ...node.row,
    actions: node.row.actions?.map((action) => ({ ...action })),
    controls: node.row.controls?.map((control) => ({
      ...control,
      options: control.options?.map((option) => ({ ...option })),
    })),
    inline: node.row.inline?.map((item) => ({ ...item })),
  },
}))

const resolveConfiguredRowView = (node: UiLogicTreeNode): LogicTreeRowView => (
  node.row.view
)

const isConjunctionContentNode = (node: UiLogicTreeNode): boolean => (
  resolveConfiguredRowView(node) !== LogicTreeRowView.ACTIONS
  && node.kind !== LogicTreeNodeKind.BRANCH
)

const countConjunctionContentChildren = (node: UiLogicTreeNode | null): number => (
  node?.children?.filter((child) => isConjunctionContentNode(child)).length ?? 0
)

const hasEditableContent = (node: UiLogicTreeNode): boolean => (
  Boolean(node.row.controls?.length)
)

const canSetRowEditable = (row: FlattenedRow): boolean => (
  resolveConfiguredRowView(row.node) !== LogicTreeRowView.ACTIONS
  && hasEditableContent(row.node)
)

const isRowEditing = (row: FlattenedRow): boolean => (
  canSetRowEditable(row)
  && Boolean(row.node.row.editable)
)

const setRowEditable = (row: FlattenedRow, value: boolean) => {
  if (!canSetRowEditable(row)) {
    return
  }

  withItemsMutation((nextItems) => {
    setEditableState(nextItems, value ? row.path : null)
  })
}

const resolveRowView = (row: FlattenedRow): LogicTreeRowView => {
  const configuredRowView = resolveConfiguredRowView(row.node)

  if (configuredRowView === LogicTreeRowView.ACTIONS) {
    return configuredRowView
  }

  return configuredRowView
}

const resolveContentSlotName = (row: FlattenedRow): 'row-actions' | 'row-edit' | 'row-summary' => {
  if (resolveRowView(row) === LogicTreeRowView.ACTIONS) {
    return 'row-actions'
  }

  if (isRowEditing(row)) {
    return 'row-edit'
  }

  return 'row-summary'
}

const resolveContentPlaceholderClass = (row: FlattenedRow) => ({
  'ui-v1-logic-tree__slot-placeholder': true,
  'ui-v1-logic-tree__slot-placeholder_actions': resolveContentSlotName(row) === 'row-actions',
  'ui-v1-logic-tree__slot-placeholder_editor': resolveContentSlotName(row) === 'row-edit',
})

watch(() => props.items, (items) => {
  itemsState.value = cloneNodes(items ?? [])
}, { deep: true, immediate: true })

const withItemsMutation = (mutator: (items: UiLogicTreeNode[]) => void) => {
  const nextItems = cloneNodes(itemsState.value)

  mutator(nextItems)

  itemsState.value = nextItems
  emit('update:items', cloneNodes(itemsState.value))
}

const getBranchAtPath = (
  nodes: UiLogicTreeNode[],
  parentPath: number[],
  create = false
): UiLogicTreeNode[] | null => {
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

const getNodeAtPath = (nodes: UiLogicTreeNode[], path: number[]): UiLogicTreeNode | null => {
  const branch = getBranchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)

  if (index === undefined) {
    return null
  }

  return branch?.[index] ?? null
}

const setEditableState = (
  nodes: UiLogicTreeNode[],
  editablePath: number[] | null = null
) => {
  const editablePathKey = editablePath ? pathToKey(editablePath) : ''

  const walk = (branch: UiLogicTreeNode[], parentPath: number[] = []) => {
    branch.forEach((node, index) => {
      const path = [...parentPath, index]
      node.row.editable = editablePathKey !== '' && pathToKey(path) === editablePathKey

      if (node.children?.length) {
        walk(node.children, path)
      }
    })
  }

  walk(nodes)
}

const resolveParentMeta = (nodes: UiLogicTreeNode[], path: number[]) => {
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
  nodes: UiLogicTreeNode[],
  ancestors: UiLogicTreeConnector[] = [],
  parentPath: number[] = [],
  parentTone: LogicTreeTone | null = null,
  currentSectionKey = '',
  parentNode: UiLogicTreeNode | null = null
): FlattenedRow[] => nodes.flatMap((node, index, siblings) => {
  const isLast = index === siblings.length - 1
  const path = [...parentPath, index]
  const expanded = node.expanded !== false
  const hasChildren = Boolean(node.children?.length)
  const shouldPreserveChildLevel = node.kind === LogicTreeNodeKind.BRANCH && ancestors.length === 0
  const descendsIntoChildren = hasChildren && expanded
  const isGroupedSectionRow = Boolean(currentSectionKey)
  const conjunction = resolveRowConjunction(node, index, isGroupedSectionRow, parentNode)
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
    placeholder: isGroupedSectionRow && connectorIndex === source.length - 1,
  })), conjunction, conjunctionTone)
  const conjunctionOffset = resolveConjunctionOffset(conjunction)

  const rows: FlattenedRow[] = [{
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

    rows.push(...flatten(
      node.children ?? [],
      childAncestors,
      path,
      childParentTone,
      nextSectionKey,
      node
    ))
  }

  return rows
})

const rows = computed(() => applyConjunctionRanges(applyConjunctionBranchTones(flatten(itemsState.value))))

const rowsWithGrouping = computed<FlattenedRow[]>(() => rows.value.map((row, index, source) => {
  if (!row.sectionKey) {
    return row
  }

  const prev = source[index - 1]
  const next = source[index + 1]
  const hasPrev = prev?.sectionKey === row.sectionKey
  const hasNext = next?.sectionKey === row.sectionKey
  const parentNode = row.parentPath.length > 0
    ? getNodeAtPath(itemsState.value, row.parentPath)
    : null
  const hasGroupedHeader = parentNode?.childrenView === LogicTreeChildrenView.GROUPED

  let groupedPosition: FlattenedRow['groupedPosition'] = 'single'

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
    ...row,
    groupedPosition,
  }
}))

const renderEntries = computed<RenderEntry[]>(() => {
  const nextEntries: RenderEntry[] = []

  for (let index = 0; index < rowsWithGrouping.value.length; index += 1) {
    const row = rowsWithGrouping.value[index]

    if (!row.sectionKey) {
      nextEntries.push({
        id: `row:${pathToKey(row.path)}`,
        kind: 'row',
        row,
      })
      continue
    }

    const sectionRows = [row]
    let cursor = index + 1

    while (rowsWithGrouping.value[cursor]?.sectionKey === row.sectionKey) {
      sectionRows.push(rowsWithGrouping.value[cursor])
      cursor += 1
    }

    nextEntries.push({
      containerId: row.sectionKey,
      footerRows: sectionRows.filter((sectionRow) => resolveConfiguredRowView(sectionRow.node) === LogicTreeRowView.ACTIONS),
      id: `group:${row.sectionKey}`,
      itemRows: sectionRows.filter((sectionRow) => resolveConfiguredRowView(sectionRow.node) !== LogicTreeRowView.ACTIONS),
      kind: 'grouped',
    })

    index = cursor - 1
  }

  return nextEntries
})

const isRowDraggable = (node: UiLogicTreeNode): boolean => (
  Boolean(node.row.draggable)
  && resolveConfiguredRowView(node) !== LogicTreeRowView.ACTIONS
)

const isGroupedDraggableRow = (row: FlattenedRow): boolean => (
  Boolean(row.sectionKey)
  && isRowDraggable(row.node)
)

const isRowSelected = (row: FlattenedRow): boolean => (
  Boolean(row.node.row.selected)
  || activePathKey.value === pathToKey(row.path)
  || isRowEditing(row)
)

const resolveRowSlotProps = (row: FlattenedRow): UiLogicTreeRowSlotProps => ({
  editing: isRowEditing(row),
  expanded: row.expanded,
  grouped: Boolean(row.sectionKey),
  groupedHeader: row.node.childrenView === LogicTreeChildrenView.GROUPED,
  groupedPosition: row.groupedPosition || undefined,
  hasChildren: row.hasChildren,
  highlighted: Boolean(row.node.row.highlighted),
  node: row.node,
  onAction: (action: UiLogicTreeAction) => {
    onAction(row, action)
  },
  onControlAction: (controlId: string) => {
    emit('control-action', {
      controlId,
      nodeId: row.node.id,
    })
  },
  onControlUpdate: (controlId: string, value: string | number | null) => {
    onControlUpdate(row.path, controlId, value)
  },
  onRemove: () => {
    onRemove(row.path, row.node.id)
  },
  onToggle: () => {
    onToggle(row)
  },
  path: [...row.path],
  pathKey: pathToKey(row.path),
  rowView: resolveRowView(row),
  selected: isRowSelected(row),
})

const onControlUpdate = (path: number[], controlId: string, value: string | number | null) => {
  const currentNode = getNodeAtPath(itemsState.value, path)
  const currentControl = currentNode?.row.controls?.find((control) => control.id === controlId)
  const previousValue = currentControl?.value ?? null

  if (currentControl && currentNode) {
    emit('row:edit', {
      controlId,
      nodeId: currentNode.id,
      pathKey: pathToKey(path),
      previousValue,
      value,
    })
  }

  emit('control:update', {
    controlId,
    nodeId: currentNode?.id ?? '',
    value,
  })
}

const onToggle = (row: FlattenedRow) => {
  const nextExpanded = !row.expanded

  withItemsMutation((nextItems) => {
    const nextNode = getNodeAtPath(nextItems, row.path)

    if (nextNode) {
      nextNode.expanded = nextExpanded
    }
  })

  emit('toggle', {
    expanded: nextExpanded,
    nodeId: row.node.id,
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
    emit('row:remove', {
      index,
      nodeId,
      parentNodeId: parentNode?.id ?? null,
      parentPathKey,
      pathKey,
    })
  }

  emit('remove', nodeId)
}

const onAction = (row: FlattenedRow, action: UiLogicTreeAction) => {
  if (resolveRowView(row) !== LogicTreeRowView.ACTIONS) {
    return
  }

  const { parentNode, parentPathKey } = resolveParentMeta(itemsState.value, row.path)

  emit('row:add', {
    actionId: action.id,
    kind: action.kind === LogicTreeActionKind.GROUP
      ? LogicTreeNodeKind.GROUP
      : LogicTreeNodeKind.CONDITION,
    parentNodeId: parentNode?.id ?? null,
    parentPathKey,
    triggerNodeId: row.node.id,
  })

  emit('action', {
    actionId: action.id,
    nodeId: row.node.id,
  })
}

const onRowClick = (row: FlattenedRow) => {
  if (resolveRowView(row) === LogicTreeRowView.ACTIONS) {
    return
  }

  if (!canSetRowEditable(row)) {
    withItemsMutation((nextItems) => {
      setEditableState(nextItems, null)
    })
  }

  activePathKey.value = pathToKey(row.path)
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

    const sortableChildren = children.filter((child) => resolveConfiguredRowView(child) !== LogicTreeRowView.ACTIONS)
    const footerChildren = children.filter((child) => resolveConfiguredRowView(child) === LogicTreeRowView.ACTIONS)
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
