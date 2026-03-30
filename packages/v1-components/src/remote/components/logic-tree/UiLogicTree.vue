<template>
    <UiLogicTreeRoot :surface="surface">
        <UiLogicTreeRow
            v-for="row in rows"
            :key="row.node.id"
            :class="{
                'ui-v1-logic-tree__surface-row_dragging': dragState.pathKey === pathToKey(row.path),
                'ui-v1-logic-tree__surface-row_drop-before': isDropTarget(row, DROP_MODE.BEFORE),
                'ui-v1-logic-tree__surface-row_drop-inside': isDropTarget(row, DROP_MODE.INSIDE),
            }"
            :connectors="row.connectors"
            :draggable="isRowDraggable(row.node)"
            :highlighted="Boolean(row.node.highlighted)"
            :path-key="pathToKey(row.path)"
            :relation="row.node.relation"
            :relation-tone="row.relationTone"
            :row-kind="resolveRowKind(row.node)"
            :selected="isRowSelected(row)"
            :surface="resolveRowSurface(row.node)"
            @row-click="onRowClick(row)"
            @row-drag-end="onRowDragEnd(row, $event)"
            @row-drag-move="onRowDragMove(row, $event)"
            @row-drag-start="onRowDragStart(row, $event)"
        >
            <span
                v-if="isRowDraggable(row.node)"
                class="ui-v1-logic-tree__handle"
            >
                <IconDrag aria-hidden="true" />
            </span>

            <span
                v-else-if="row.node.kind === UI_LOGIC_TREE_NODE_KIND.GROUP"
                class="ui-v1-logic-tree__folder"
            >
                <IconFolderOutlined aria-hidden="true" />
            </span>

            <UiButton
                v-if="row.node.collapsible && row.hasChildren"
                appearance="tertiary"
                class="ui-v1-logic-tree__toggle"
                size="xs"
                @click="onToggle(row)"
            >
                <IconCaretDown
                    aria-hidden="true"
                    :class="{
                        'ui-v1-logic-tree__toggle-icon': true,
                        'ui-v1-logic-tree__toggle-icon_collapsed': !row.expanded,
                    }"
                />
            </UiButton>

            <template v-if="resolveRowKind(row.node) === UI_LOGIC_TREE_ROW_KIND.ACTIONS">
                <UiButton
                    v-for="action in row.node.actions ?? []"
                    :key="action.id"
                    appearance="tertiary"
                    class="ui-v1-logic-tree__action-button"
                    size="sm"
                    @click="onAction(row, action)"
                >
                    <IconAdd aria-hidden="true" />
                    {{ action.label }}
                </UiButton>
            </template>

            <template v-else-if="resolveRowKind(row.node) === UI_LOGIC_TREE_ROW_KIND.EDITOR">
                <div class="ui-v1-logic-tree__controls">
                    <template
                        v-for="control in row.node.controls ?? []"
                        :key="control.id"
                    >
                        <UiSelect
                            v-if="control.kind === UI_LOGIC_TREE_CONTROL_KIND.SELECT"
                            :class="[
                                'ui-v1-logic-tree__control',
                                'ui-v1-logic-tree__control_select',
                            ]"
                            :clearable="control.clearable"
                            :disabled="control.disabled"
                            :invalid="control.invalid"
                            :placeholder="control.placeholder ?? control.label"
                            :popper-fit-trigger="true"
                            :readonly="control.readonly"
                            :style="resolveWidth(control.width)"
                            :value="resolveControlValue(control)"
                            @update:value="onControlUpdate(row.path, control.id, $event)"
                        >
                            <UiSelectOption
                                v-for="option in resolveOptions(control)"
                                :key="option.id"
                                :label="option.label"
                                :value="option.value"
                            />
                        </UiSelect>

                        <UiTextbox
                            v-else-if="control.kind === UI_LOGIC_TREE_CONTROL_KIND.INPUT"
                            :class="[
                                'ui-v1-logic-tree__control',
                                'ui-v1-logic-tree__control_input',
                            ]"
                            :disabled="control.disabled"
                            :invalid="control.invalid"
                            :placeholder="control.placeholder ?? control.label"
                            :readonly="control.readonly"
                            :style="resolveWidth(control.width)"
                            :value="resolveTextboxValue(control)"
                            @update:value="onControlUpdate(row.path, control.id, $event)"
                        />

                        <UiButton
                            v-else
                            appearance="tertiary"
                            :class="[
                                'ui-v1-logic-tree__control',
                                'ui-v1-logic-tree__control_icon',
                            ]"
                            size="xs"
                            @click="emit('control-action', {
                                controlId: control.id,
                                nodeId: row.node.id,
                            })"
                        >
                            <component
                                :is="resolveIcon(control.icon)"
                                aria-hidden="true"
                                class="ui-v1-logic-tree__control-icon"
                            />
                        </UiButton>
                    </template>
                </div>
            </template>

            <template v-else>
                <div class="ui-v1-logic-tree__content">
                    <span class="ui-v1-logic-tree__title">
                        {{ row.node.title }}
                    </span>

                    <span
                        v-for="item in resolveRowInlineContent(row.node)"
                        :key="item.id"
                        :class="{
                            'ui-v1-logic-tree__inline': true,
                            'ui-v1-logic-tree__inline_muted': item.tone === 'muted',
                            'ui-v1-logic-tree__inline_separated': item.separated,
                            'ui-v1-logic-tree__inline_semibold': item.weight === 'semibold',
                            [`ui-v1-logic-tree__inline_${item.tone}`]: Boolean(item.tone) && item.tone !== 'default' && item.tone !== 'muted',
                        }"
                    >
                        {{ item.text }}
                    </span>
                </div>
            </template>

            <UiButton
                v-if="props.editable && row.node.removable"
                appearance="tertiary"
                class="ui-v1-logic-tree__icon-button ui-v1-logic-tree__icon-button_remove"
                size="xs"
                @click="onRemove(row.path, row.node.id)"
            >
                <IconDeleteOutlined aria-label="Удалить" />
            </UiButton>
        </UiLogicTreeRow>
    </UiLogicTreeRoot>
</template>

<script lang="ts" remote setup>
import type { Component, CSSProperties, PropType } from 'vue'

import type {
  UiLogicTreeAction,
  UiLogicTreeConnector,
  UiLogicTreeControl,
  UiLogicTreeIcon,
  UiLogicTreeInlineText,
  UiLogicTreeNode,
  UiLogicTreeOption,
  UiLogicTreeProperties,
  UiLogicTreeRowKind,
  UiLogicTreeTone,
} from '@/common/components/logic-tree'

import {
  computed,
  reactive,
  ref,
  watch,
} from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'
import IconDrag from '~assets/sprites/arrows/double-caret-vertical.svg'
import IconFolderOutlined from '~assets/sprites/files/folder-outlined.svg'
import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import {
  UI_LOGIC_TREE_ACTION_KIND,
  UI_LOGIC_TREE_CONTROL_KIND,
  UI_LOGIC_TREE_ICON,
  UI_LOGIC_TREE_NODE_KIND,
  UI_LOGIC_TREE_RELATION,
  UI_LOGIC_TREE_ROW_KIND,
  UI_LOGIC_TREE_TONE,
} from '@/common/components/logic-tree'

import { UiButton } from '@/remote/components/button'
import { UiSelect, UiSelectOption } from '@/remote/components/select'
import { UiTextbox } from '@/remote/components/textbox'

import { UiLogicTreeRoot, UiLogicTreeRow } from './parts'

type DropMode = 'before' | 'inside'

type FlattenedRow = {
  connectors: UiLogicTreeConnector[];
  expanded: boolean;
  hasChildren: boolean;
  node: UiLogicTreeNode;
  parentPath: number[];
  path: number[];
  relationTone: UiLogicTreeTone;
}

const DROP_MODE = {
  BEFORE: 'before',
  INSIDE: 'inside',
} as const satisfies Record<string, DropMode>

type UiLogicTreeRowDragEvent = {
  clientX: number;
  clientY: number;
  sourcePathKey: string;
  targetPathKey: string;
}

const props = defineProps({
  /** Разрешает интерактивное редактирование дерева: editor-строки, drag&drop, удаление и строки действий */
  editable: {
    type: Boolean,
    default: true,
  },

  /** Набор корневых узлов логического дерева */
  items: {
    type: Array as PropType<UiLogicTreeProperties['items']>,
    default: () => [],
  },

  /** Оборачивает дерево в карточку с рамкой и внутренними отступами */
  surface: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  'action': [payload: { actionId: string; nodeId: string }];
  'control-action': [payload: { controlId: string; nodeId: string }];
  'control:update': [payload: { controlId: string; nodeId: string; value: string | number | null }];
  'move': [payload: { mode: DropMode; nodeId: string; targetNodeId: string }];
  'remove': [nodeId: string];
  'toggle': [payload: { expanded: boolean; nodeId: string }];
  'update:items': [items: UiLogicTreeNode[]];
}>()

const itemsState = ref<UiLogicTreeNode[]>([])
const activePathKey = ref('')
const dragState = reactive({
  nodeId: '',
  path: [] as number[],
  pathKey: '',
})
const dropState = reactive({
  mode: '' as DropMode | '',
  pathKey: '',
})

let uid = 0

const fallbackTone = (node: UiLogicTreeNode): UiLogicTreeTone => (
  node.tone
  ?? (node.kind === UI_LOGIC_TREE_NODE_KIND.GROUP
    ? UI_LOGIC_TREE_TONE.GREEN
    : UI_LOGIC_TREE_TONE.BLUE)
)

const resolveRelationTone = (
  relation: UiLogicTreeNode['relation'],
  fallback: UiLogicTreeTone
): UiLogicTreeTone => {
  if (relation === UI_LOGIC_TREE_RELATION.OR) {
    return UI_LOGIC_TREE_TONE.YELLOW
  }

  if (relation === UI_LOGIC_TREE_RELATION.AND) {
    return UI_LOGIC_TREE_TONE.BLUE
  }

  return fallback
}

const pathToKey = (path: number[]): string => path.join('.')

const cloneNodes = (nodes: UiLogicTreeNode[]): UiLogicTreeNode[] => nodes.map((node) => ({
  ...node,
  actions: node.actions?.map((action) => ({ ...action })),
  children: node.children ? cloneNodes(node.children) : undefined,
  controls: node.controls?.map((control) => ({
    ...control,
    options: control.options?.map((option) => ({ ...option })),
  })),
}))

const normalizeRelations = (nodes: UiLogicTreeNode[]): UiLogicTreeNode[] => {
  let contentIndex = 0

  for (const node of nodes) {
    if (node.rowKind === UI_LOGIC_TREE_ROW_KIND.ACTIONS) {
      delete node.relation
    } else if (contentIndex === 0) {
      delete node.relation
      contentIndex += 1
    } else {
      node.relation ??= UI_LOGIC_TREE_RELATION.AND
      contentIndex += 1
    }

    if (node.children?.length) {
      normalizeRelations(node.children)
    }
  }

  return nodes
}

const resolveRowKind = (node: UiLogicTreeNode): UiLogicTreeRowKind => {
  if (!props.editable && node.rowKind === UI_LOGIC_TREE_ROW_KIND.EDITOR) {
    return UI_LOGIC_TREE_ROW_KIND.SUMMARY
  }

  return node.rowKind ?? UI_LOGIC_TREE_ROW_KIND.SUMMARY
}

watch(() => props.items, (items) => {
  itemsState.value = normalizeRelations(cloneNodes(items ?? []))
}, { deep: true, immediate: true })

const withItemsMutation = (mutator: (items: UiLogicTreeNode[]) => void) => {
  const nextItems = cloneNodes(itemsState.value)

  mutator(nextItems)

  itemsState.value = normalizeRelations(nextItems)
  emit('update:items', cloneNodes(itemsState.value))
}

const nextId = (prefix: string): string => {
  uid += 1

  return `${prefix}-${uid}`
}

const createActionRow = (tone: UiLogicTreeTone): UiLogicTreeNode => ({
  actions: [
    {
      id: nextId('add-condition'),
      kind: UI_LOGIC_TREE_ACTION_KIND.CONDITION,
      label: 'Условие',
    },
    {
      id: nextId('add-group'),
      kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
      label: 'Группа',
    },
  ],
  id: nextId('actions'),
  rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
  title: 'Добавить в ветку',
  tone,
})

const createConditionNode = (tone: UiLogicTreeTone): UiLogicTreeNode => ({
  controls: [
    {
      id: nextId('field'),
      kind: UI_LOGIC_TREE_CONTROL_KIND.SELECT,
      label: 'Поле',
      options: [
        { id: nextId('field-option'), label: 'Тип доставки', value: 'Тип доставки' },
        { id: nextId('field-option'), label: 'Заказ клиента', value: 'Заказ клиента' },
        { id: nextId('field-option'), label: 'Список обращений', value: 'Список обращений' },
      ],
      value: 'Тип доставки',
      width: 198,
    },
    {
      id: nextId('operator'),
      kind: UI_LOGIC_TREE_CONTROL_KIND.SELECT,
      label: 'Оператор',
      options: [
        { id: nextId('operator-option'), label: 'Равно', value: 'Равно' },
        { id: nextId('operator-option'), label: 'Не равно', value: 'Не равно' },
        { id: nextId('operator-option'), label: 'Есть такие', value: 'Есть такие' },
      ],
      value: 'Равно',
      width: 110,
    },
    {
      id: nextId('value'),
      kind: UI_LOGIC_TREE_CONTROL_KIND.INPUT,
      label: 'Значение',
      placeholder: 'Введите значение',
      value: '',
      width: 198,
    },
    {
      icon: UI_LOGIC_TREE_ICON.MORE,
      id: nextId('menu'),
      kind: UI_LOGIC_TREE_CONTROL_KIND.ICON,
      label: 'Дополнительно',
    },
  ],
  draggable: true,
  id: nextId('condition'),
  removable: true,
  rowKind: UI_LOGIC_TREE_ROW_KIND.EDITOR,
  title: 'Новое условие',
  tone,
})

const createGroupNode = (tone: UiLogicTreeTone): UiLogicTreeNode => ({
  children: [
    createActionRow(tone),
  ],
  collapsible: true,
  expanded: true,
  id: nextId('group'),
  kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
  meta: 'Новая ветка',
  removable: true,
  rowKind: UI_LOGIC_TREE_ROW_KIND.SUMMARY,
  subtitle: 'Последовательное применение',
  title: 'Новая группа',
  tone,
})

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

const removeNodeAtPath = (nodes: UiLogicTreeNode[], path: number[]): UiLogicTreeNode | null => {
  const branch = getBranchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)

  if (!branch || index === undefined) {
    return null
  }

  const [removedNode] = branch.splice(index, 1)

  return removedNode ?? null
}

const insertNodeAtPath = (
  nodes: UiLogicTreeNode[],
  parentPath: number[],
  index: number,
  node: UiLogicTreeNode
) => {
  const branch = getBranchAtPath(nodes, parentPath, true)

  branch?.splice(index, 0, node)
}

const findActionIndex = (nodes: UiLogicTreeNode[]): number => nodes.findIndex((node) => {
  return node.rowKind === UI_LOGIC_TREE_ROW_KIND.ACTIONS
})

const findInsertionIndex = (nodes: UiLogicTreeNode[]): number => {
  const actionIndex = findActionIndex(nodes)

  return actionIndex === -1 ? nodes.length : actionIndex
}

const flatten = (
  nodes: UiLogicTreeNode[],
  ancestors: UiLogicTreeConnector[] = [],
  parentPath: number[] = [],
  parentTone: UiLogicTreeTone | null = null
): FlattenedRow[] => nodes.flatMap((node, index, siblings) => {
  const isLast = index === siblings.length - 1
  const path = [...parentPath, index]
  const expanded = node.expanded !== false
  const hasChildren = Boolean(node.children?.length)
  const inheritedTone = parentTone ?? fallbackTone(node)
  const branchTone = resolveRelationTone(node.relation, inheritedTone)
  const connectors = [
    ...ancestors,
    ...(parentTone
      ? [{
        continues: !isLast,
        tone: branchTone,
        visible: true,
      } satisfies UiLogicTreeConnector]
      : []),
  ]

  const rows: FlattenedRow[] = [{
    connectors,
    expanded,
    hasChildren,
    node,
    parentPath,
    path,
    relationTone: branchTone,
  }]

  if (hasChildren && expanded) {
    rows.push(...flatten(
      node.children ?? [],
      [
        ...ancestors,
        ...(parentTone
          ? [{
            continues: !isLast,
            tone: branchTone,
            visible: !isLast,
          } satisfies UiLogicTreeConnector]
          : []),
      ],
      path,
      fallbackTone(node)
    ))
  }

  return rows
})

const rows = computed(() => flatten(itemsState.value).filter((row) => {
  return props.editable || row.node.rowKind !== UI_LOGIC_TREE_ROW_KIND.ACTIONS
}))

const isSamePath = (left: number[], right: number[]): boolean => (
  left.length === right.length
  && left.every((segment, index) => segment === right[index])
)

const isAncestorPath = (ancestorPath: number[], path: number[]): boolean => (
  ancestorPath.length < path.length
  && ancestorPath.every((segment, index) => segment === path[index])
)

const resolveControlValue = (control: UiLogicTreeControl): string | number | null => (
  control.value ?? null
)

const resolveTextboxValue = (control: UiLogicTreeControl): string | number | null => (
  resolveControlValue(control)
)

const resolveIcon = (icon?: UiLogicTreeIcon): Component => {
  if (icon === UI_LOGIC_TREE_ICON.MORE) {
    return IconMoreHorizontal
  }

  return IconAdd
}

const resolveOptions = (control: UiLogicTreeControl): UiLogicTreeOption[] => {
  if (control.options?.length) {
    return control.options
  }

  const value = resolveControlValue(control)

  if (value === null || value === undefined) {
    return []
  }

  return [{
    id: `${control.id}-option`,
    label: String(value),
    value,
  }]
}

const resolveWidth = (width?: number | string): CSSProperties | undefined => {
  if (width === undefined) {
    return undefined
  }

  return {
    width: typeof width === 'number' ? `${width}px` : width,
  }
}

const resolveInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  if (node.inline?.length) {
    return node.inline
  }

  const items: UiLogicTreeInlineText[] = []

  if (node.subtitle) {
    items.push({
      id: `${node.id}-subtitle`,
      text: node.subtitle,
      tone: node.tone ?? UI_LOGIC_TREE_TONE.BLUE,
    })
  }

  if (node.meta) {
    items.push({
      id: `${node.id}-meta`,
      separated: items.length > 0,
      text: node.meta,
      tone: 'muted',
    })
  }

  return items
}

const resolveControlDisplayValue = (control: UiLogicTreeControl): string => {
  const value = resolveControlValue(control)

  if (value === null || value === undefined || value === '') {
    return control.placeholder ?? control.label
  }

  return String(value)
}

const resolveReadonlyInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  const textualControls = (node.controls ?? [])
    .filter((control) => control.kind !== UI_LOGIC_TREE_CONTROL_KIND.ICON)
    .map((control) => resolveControlDisplayValue(control))
    .filter(Boolean)

  const [first, ...rest] = textualControls
  const shouldSkipFirst = typeof first === 'string' && first.trim() === node.title.trim()
  const values = shouldSkipFirst ? rest : textualControls

  return values.map((text, index) => ({
    id: `${node.id}-readonly-${index + 1}`,
    text,
  }))
}

const resolveRowInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  if (!props.editable && node.rowKind === UI_LOGIC_TREE_ROW_KIND.EDITOR) {
    return resolveReadonlyInlineContent(node)
  }

  return resolveInlineContent(node)
}

const isRowDraggable = (node: UiLogicTreeNode): boolean => (
  props.editable
  && Boolean(node.draggable)
  && node.rowKind !== UI_LOGIC_TREE_ROW_KIND.ACTIONS
)

const resolveRowSurface = (node: UiLogicTreeNode): boolean => (
  node.surface ?? true
)

const isRowSelected = (row: FlattenedRow): boolean => (
  Boolean(row.node.selected)
  || activePathKey.value === pathToKey(row.path)
)

const clearDropState = () => {
  dropState.mode = ''
  dropState.pathKey = ''
}

const clearDragState = () => {
  dragState.nodeId = ''
  dragState.path = []
  dragState.pathKey = ''
  clearDropState()
}

const resolveDropMode = (row: FlattenedRow): DropMode => {
  if (row.node.kind === UI_LOGIC_TREE_NODE_KIND.GROUP) {
    return DROP_MODE.INSIDE
  }

  return DROP_MODE.BEFORE
}

const resolveDropLocation = (
  nodes: UiLogicTreeNode[],
  row: FlattenedRow,
  mode: DropMode
): { index: number; parentPath: number[] } | null => {
  if (mode === DROP_MODE.INSIDE) {
    const targetNode = getNodeAtPath(nodes, row.path)

    if (!targetNode) {
      return null
    }

    const children = targetNode.children ?? []

    return {
      index: findInsertionIndex(children),
      parentPath: row.path,
    }
  }

  const index = row.path.at(-1)

  if (index === undefined) {
    return null
  }

  return {
    index,
    parentPath: row.parentPath,
  }
}

const canDrop = (row: FlattenedRow, mode: DropMode): boolean => {
  if (!dragState.path.length || isSamePath(dragState.path, row.path)) {
    return false
  }

  const location = resolveDropLocation(itemsState.value, row, mode)

  if (!location) {
    return false
  }

  return !isAncestorPath(dragState.path, location.parentPath)
}

const isDropTarget = (row: FlattenedRow, mode: DropMode): boolean => (
  dropState.mode === mode
  && dropState.pathKey === pathToKey(row.path)
)

const onControlUpdate = (path: number[], controlId: string, value: string | number) => {
  if (!props.editable) {
    return
  }

  const currentNode = getNodeAtPath(itemsState.value, path)

  withItemsMutation((nextItems) => {
    const nextNode = getNodeAtPath(nextItems, path)
    const nextControl = nextNode?.controls?.find((control) => control.id === controlId)

    if (nextControl) {
      nextControl.value = value
    }
  })

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
  if (!props.editable) {
    return
  }

  withItemsMutation((nextItems) => {
    removeNodeAtPath(nextItems, path)
  })

  emit('remove', nodeId)
}

const onAction = (row: FlattenedRow, action: UiLogicTreeAction) => {
  if (!props.editable || resolveRowKind(row.node) !== UI_LOGIC_TREE_ROW_KIND.ACTIONS) {
    return
  }

  withItemsMutation((nextItems) => {
    const branch = getBranchAtPath(nextItems, row.parentPath)
    const actionIndex = row.path.at(-1)

    if (!branch || actionIndex === undefined) {
      return
    }

    const tone = row.node.tone ?? UI_LOGIC_TREE_TONE.BLUE
    const nextNode = action.kind === UI_LOGIC_TREE_ACTION_KIND.GROUP
      ? createGroupNode(tone)
      : createConditionNode(tone)

    branch.splice(actionIndex, 0, nextNode)
  })

  emit('action', {
    actionId: action.id,
    nodeId: row.node.id,
  })
}

const onRowClick = (row: FlattenedRow) => {
  if (resolveRowKind(row.node) === UI_LOGIC_TREE_ROW_KIND.ACTIONS) {
    return
  }

  activePathKey.value = pathToKey(row.path)
}

const findRowByPathKey = (pathKey: string): FlattenedRow | null => (
  rows.value.find((row) => pathToKey(row.path) === pathKey) ?? null
)

const updateDropTarget = (targetPathKey: string): { mode: DropMode; row: FlattenedRow } | null => {
  const targetRow = findRowByPathKey(targetPathKey)

  if (!targetRow) {
    clearDropState()
    return null
  }

  const mode = resolveDropMode(targetRow)

  if (!canDrop(targetRow, mode)) {
    clearDropState()
    return null
  }

  dropState.mode = mode
  dropState.pathKey = targetPathKey

  return {
    mode,
    row: targetRow,
  }
}

const applyDrop = (row: FlattenedRow, mode: DropMode) => {
  if (!dragState.nodeId) {
    return
  }

  const sourcePath = [...dragState.path]
  const sourceParentPath = sourcePath.slice(0, -1)
  const sourceIndex = sourcePath.at(-1)
  const location = resolveDropLocation(itemsState.value, row, mode)

  if (!location || sourceIndex === undefined) {
    return
  }

  withItemsMutation((nextItems) => {
    const movedNode = removeNodeAtPath(nextItems, sourcePath)

    if (!movedNode) {
      return
    }

    let targetIndex = location.index

    if (
      isSamePath(sourceParentPath, location.parentPath)
      && sourceIndex < targetIndex
    ) {
      targetIndex -= 1
    }

    if (mode === DROP_MODE.INSIDE) {
      const targetNode = getNodeAtPath(nextItems, row.path)

      if (!targetNode?.children) {
        targetNode!.children = [createActionRow(fallbackTone(targetNode!))]
      }
    }

    insertNodeAtPath(nextItems, location.parentPath, targetIndex, movedNode)
  })

  emit('move', {
    mode,
    nodeId: dragState.nodeId,
    targetNodeId: row.node.id,
  })
}

const onRowDragStart = (row: FlattenedRow) => {
  if (!isRowDraggable(row.node)) {
    return
  }

  activePathKey.value = pathToKey(row.path)
  dragState.nodeId = row.node.id
  dragState.path = [...row.path]
  dragState.pathKey = pathToKey(row.path)
}

const onRowDragMove = (_row: FlattenedRow, event: UiLogicTreeRowDragEvent) => {
  if (!dragState.path.length || dragState.pathKey !== event.sourcePathKey) {
    return
  }

  if (!event.targetPathKey || event.targetPathKey === event.sourcePathKey) {
    clearDropState()
    return
  }

  updateDropTarget(event.targetPathKey)
}

const onRowDragEnd = (_row: FlattenedRow, event: UiLogicTreeRowDragEvent) => {
  if (dragState.pathKey !== event.sourcePathKey) {
    clearDragState()
    return
  }

  const nextDropTarget = updateDropTarget(event.targetPathKey)

  if (nextDropTarget) {
    applyDrop(nextDropTarget.row, nextDropTarget.mode)
  }
  clearDragState()
}
</script>
