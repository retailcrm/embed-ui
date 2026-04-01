<template>
    <UiLogicTreeRoot :surface="surface" @outside-click="onOutsideClick">
        <UiLogicTreeRow
            v-for="row in rowsWithGrouping"
            :key="row.node.id"
            :class="{
                'ui-v1-logic-tree__surface-row_dragging': dragState.pathKey === pathToKey(row.path),
                'ui-v1-logic-tree__surface-row_drop-before': isDropTarget(row, DROP_MODE.BEFORE),
                'ui-v1-logic-tree__surface-row_drop-inside': isDropTarget(row, DROP_MODE.INSIDE),
            }"
            :connectors="row.connectors"
            :draggable="isRowDraggable(row.node)"
            :editing="isRowEditing(row)"
            :grouped="Boolean(row.sectionKey)"
            :grouped-position="row.groupedPosition || undefined"
            :highlighted="Boolean(row.node.highlighted)"
            :node-kind="row.node.kind"
            :path-key="pathToKey(row.path)"
            :conjunction="row.conjunction"
            :conjunction-label="resolveConjunctionLabel(row.conjunction)"
            :conjunction-tone="row.conjunctionTone"
            :row-kind="resolveRowKind(row)"
            :selected="isRowSelected(row)"
            :surface="resolveRowSurface(row.node)"
            @row-click="onRowClick(row)"
            @row-drag-end="onRowDragEnd(row, $event)"
            @row-drag-move="onRowDragMove(row, $event)"
            @row-drag-start="onRowDragStart(row, $event)"
        >
            <template #prefix>
                <span
                    v-if="isRowDraggable(row.node)"
                    class="ui-v1-logic-tree__handle"
                >
                    <IconDrag aria-hidden="true" />
                </span>

                <span
                    v-else-if="row.node.kind === LogicTreeNodeKind.GROUP"
                    class="ui-v1-logic-tree__folder"
                >
                    <IconFolderOutlined aria-hidden="true" />
                </span>
            </template>

            <template #content>
                <template v-if="resolveRowKind(row) === LogicTreeRowKind.ACTIONS">
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

                <template v-else-if="resolveRowKind(row) === LogicTreeRowKind.EDITOR">
                    <div class="ui-v1-logic-tree__controls">
                        <template
                            v-for="control in row.node.controls ?? []"
                            :key="control.id"
                        >
                            <UiSelect
                                v-if="control.kind === LogicTreeControlKind.SELECT"
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
                                @update:value="onControlUpdate(row.path, control.id, $event ?? '')"
                            >
                                <UiSelectOption
                                    v-for="option in resolveOptions(control)"
                                    :key="option.id"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </UiSelect>

                            <UiTextbox
                                v-else-if="control.kind === LogicTreeControlKind.INPUT"
                                :class="[
                                    'ui-v1-logic-tree__control',
                                    'ui-v1-logic-tree__control_input',
                                ]"
                                :disabled="control.disabled"
                                :invalid="control.invalid"
                                :placeholder="control.placeholder ?? control.label"
                                :readonly="control.readonly"
                                :style="resolveWidth(control.width)"
                                :value="resolveControlValue(control)"
                                @update:value="onControlUpdate(row.path, control.id, $event ?? '')"
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
                        <span class="ui-v1-logic-tree__headline">
                            <span class="ui-v1-logic-tree__title">
                                {{ row.node.title }}
                            </span>

                            <UiButton
                                v-if="row.node.collapsible && row.hasChildren"
                                appearance="tertiary"
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
            </template>

            <template #trailing>
                <UiButton
                    v-if="resolveRowKind(row) !== LogicTreeRowKind.SUMMARY && row.node.collapsible && row.hasChildren"
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

                <UiPopperConnector>
                    <UiButton
                        v-if="props.editable && row.node.removable"
                        :aria-label="deleteText"
                        class="ui-v1-logic-tree__delete"
                        appearance="tertiary"
                        size="sm"
                        variant="danger"
                        @click="onRemove(row.path, row.node.id)"
                    >
                        <IconDeleteOutlined aria-hidden="true" />
                    </UiButton>

                    <UiTooltip
                        :target-triggers="{
                            show: ['hover', 'focus'],
                            hide: ['hover', 'focus', 'click'],
                        }"
                    >
                        {{ deleteText }}
                    </UiTooltip>
                </UiPopperConnector>
            </template>
        </UiLogicTreeRow>
    </UiLogicTreeRoot>
</template>

<script lang="ts" remote setup>
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'
import type {
  UiLogicTreeAction,
  UiLogicTreeConnector,
  UiLogicTreeControl,
  UiLogicTreeInlineText,
  UiLogicTreeNode,
  UiLogicTreeOption,
  UiLogicTreeProperties,
} from '@/common/components/logic-tree'

import { inject } from 'vue'

import {
  computed,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
} from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'
import IconDrag from '~assets/sprites/actions/drag.svg'
import IconFolderOutlined from '~assets/sprites/files/folder-outlined.svg'
import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import {
  LogicTreeActionKind,
  LogicTreeConjunction,
  LogicTreeControlKind,
  LogicTreeIcon,
  LogicTreeNodeKind,
  LogicTreeRowKind,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import _i18n from '@/host/components/logic-tree/i18n'

import { I18nInjectKey } from '@/host/i18n/plugin'
import { UiButton } from '@/remote/components/button'
import { UiPopperConnector } from '@/remote/components/popper'
import { UiSelect, UiSelectOption } from '@/remote/components/select'
import { UiTextbox } from '@/remote/components/textbox'
import { UiTooltip } from '@/remote/components/tooltip'

import { UiLogicTreeRoot, UiLogicTreeRow } from './parts'

type DropMode = 'before' | 'inside'

type FlattenedRow = {
  conjunction: UiLogicTreeNode['conjunction'];
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

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const deleteText = computed(() => i18n.value.t('delete'))

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
const editingPathKey = ref('')
const dragState = reactive({
  nodeId: '',
  path: [] as number[],
  pathKey: '',
  sectionKey: '',
})
const dropState = reactive({
  mode: '' as DropMode | '',
  pathKey: '',
})

let uid = 0
let controlUpdateTimer: ReturnType<typeof setTimeout> | null = null

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

const isStructuralCounterNode = (node: UiLogicTreeNode): boolean => (
  Boolean(node.children?.length)
  && !node.kind
  && !node.controls?.length
  && !node.actions?.length
  && !node.inline?.length
  && !node.meta
  && !node.subtitle
)

const resolveConfiguredRowKind = (node: UiLogicTreeNode): LogicTreeRowKind => (
  node.rowKind ?? LogicTreeRowKind.SUMMARY
)

const isConjunctionContentNode = (node: UiLogicTreeNode): boolean => (
  resolveConfiguredRowKind(node) !== LogicTreeRowKind.ACTIONS
  && !isStructuralCounterNode(node)
)

const canEditRow = (node: UiLogicTreeNode): boolean => (
  props.editable
  && Boolean(node.controls?.length)
  && resolveConfiguredRowKind(node) !== LogicTreeRowKind.ACTIONS
)

const isRowEditing = (row: FlattenedRow): boolean => (
  canEditRow(row.node)
  && editingPathKey.value === pathToKey(row.path)
)

const resolveRowKind = (row: FlattenedRow): LogicTreeRowKind => {
  const configuredRowKind = resolveConfiguredRowKind(row.node)

  if (!props.editable && configuredRowKind === LogicTreeRowKind.EDITOR) {
    return LogicTreeRowKind.SUMMARY
  }

  if (configuredRowKind === LogicTreeRowKind.ACTIONS || configuredRowKind === LogicTreeRowKind.EDITOR) {
    return configuredRowKind
  }

  if (isRowEditing(row)) {
    return LogicTreeRowKind.EDITOR
  }

  return configuredRowKind
}

watch(() => props.items, (items) => {
  itemsState.value = cloneNodes(items ?? [])
}, { deep: true, immediate: true })

const withItemsMutation = (mutator: (items: UiLogicTreeNode[]) => void) => {
  const nextItems = cloneNodes(itemsState.value)

  mutator(nextItems)

  itemsState.value = nextItems
  emit('update:items', cloneNodes(itemsState.value))
}

const scheduleItemsUpdate = () => {
  if (controlUpdateTimer) {
    clearTimeout(controlUpdateTimer)
  }

  controlUpdateTimer = setTimeout(() => {
    controlUpdateTimer = null
    emit('update:items', cloneNodes(itemsState.value))
  }, 80)
}

const nextId = (prefix: string): string => {
  uid += 1

  return `${prefix}-${uid}`
}

const createActionRow = (tone: LogicTreeTone): UiLogicTreeNode => ({
  actions: [
    {
      id: nextId('add-condition'),
      kind: LogicTreeActionKind.CONDITION,
      label: 'Условие',
    },
    {
      id: nextId('add-group'),
      kind: LogicTreeActionKind.GROUP,
      label: 'Группа',
    },
  ],
  id: nextId('actions'),
  rowKind: LogicTreeRowKind.ACTIONS,
  title: 'Добавить в ветку',
  tone,
})

const createConditionNode = (tone: LogicTreeTone): UiLogicTreeNode => ({
  controls: [
    {
      id: nextId('field'),
      kind: LogicTreeControlKind.SELECT,
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
      kind: LogicTreeControlKind.SELECT,
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
      kind: LogicTreeControlKind.INPUT,
      label: 'Значение',
      placeholder: 'Введите значение',
      value: '',
      width: 198,
    },
    {
      icon: LogicTreeIcon.MORE,
      id: nextId('menu'),
      kind: LogicTreeControlKind.ICON,
      label: 'Дополнительно',
    },
  ],
  draggable: true,
  id: nextId('condition'),
  removable: true,
  rowKind: LogicTreeRowKind.EDITOR,
  title: 'Новое условие',
  tone,
})

const createGroupNode = (tone: LogicTreeTone): UiLogicTreeNode => ({
  children: [
    createActionRow(tone),
  ],
  collapsible: true,
  draggable: true,
  expanded: true,
  id: nextId('group'),
  kind: LogicTreeNodeKind.GROUP,
  meta: 'Новая ветка',
  removable: true,
  rowKind: LogicTreeRowKind.SUMMARY,
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
  return node.rowKind === LogicTreeRowKind.ACTIONS
})

const findInsertionIndex = (nodes: UiLogicTreeNode[]): number => {
  const actionIndex = findActionIndex(nodes)

  return actionIndex === -1 ? nodes.length : actionIndex
}

const resolveSubtreeInheritedTone = (
  node: UiLogicTreeNode,
  inheritedTone: LogicTreeTone
): LogicTreeTone => {
  let tone = inheritedTone

  if (isConjunctionContentNode(node) && node.conjunction) {
    tone = resolveConjunctionTone(node.conjunction, tone)
  }

  if (!node.children?.length || node.expanded === false) {
    return tone
  }

  for (const child of node.children) {
    tone = resolveSubtreeInheritedTone(child, tone)
  }

  return tone
}

const resolveSiblingsBranchTone = (
  siblings: UiLogicTreeNode[],
  fallback: LogicTreeTone
): LogicTreeTone => {
  let tone = fallback

  for (const sibling of siblings) {
    tone = resolveSubtreeInheritedTone(sibling, tone)
  }

  return tone
}

const flatten = (
  nodes: UiLogicTreeNode[],
  ancestors: UiLogicTreeConnector[] = [],
  parentPath: number[] = [],
  parentTone: LogicTreeTone | null = null,
  currentSectionKey = ''
): FlattenedRow[] => nodes.flatMap((node, index, siblings) => {
  const isLast = index === siblings.length - 1
  const path = [...parentPath, index]
  const expanded = node.expanded !== false
  const hasChildren = Boolean(node.children?.length)
  const shouldPreserveChildLevel = isStructuralCounterNode(node) && ancestors.length === 0
  const descendsIntoChildren = hasChildren && expanded
  const conjunction = isConjunctionContentNode(node)
    ? node.conjunction ?? ''
    : ''
  const inheritedTone = parentTone
    ? resolveSiblingsBranchTone(siblings, parentTone)
    : fallbackTone(node)
  const branchTone = resolveConjunctionTone(conjunction, inheritedTone)
  const connectorContinues = !isLast || descendsIntoChildren
  const connectors = [
    ...ancestors,
    ...(parentTone
      ? [{
        continues: connectorContinues,
        tone: branchTone,
        visible: true,
      } satisfies UiLogicTreeConnector]
      : []),
  ]

  const rows: FlattenedRow[] = [{
    conjunction,
    connectors,
    expanded,
    groupedPosition: '',
    hasChildren,
    node,
    parentPath,
    path,
    conjunctionTone: branchTone,
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
            tone: branchTone,
            visible: true,
          } satisfies UiLogicTreeConnector]
          : []),
      ]
    const childParentTone = shouldPreserveChildLevel
      ? parentTone ?? fallbackTone(node)
      : fallbackTone(node)
    const nextSectionKey = node.childrenGrouped ? pathToKey(path) : ''

    rows.push(...flatten(
      node.children ?? [],
      childAncestors,
      path,
      childParentTone,
      nextSectionKey
    ))
  }

  return rows
})

const rows = computed(() => flatten(itemsState.value).filter((row) => {
  return props.editable || resolveConfiguredRowKind(row.node) !== LogicTreeRowKind.ACTIONS
}))

const rowsWithGrouping = computed<FlattenedRow[]>(() => rows.value.map((row, index, source) => {
  if (!row.sectionKey) {
    return row
  }

  const prev = source[index - 1]
  const next = source[index + 1]
  const hasPrev = prev?.sectionKey === row.sectionKey
  const hasNext = next?.sectionKey === row.sectionKey

  let groupedPosition: FlattenedRow['groupedPosition'] = 'single'

  if (!hasPrev && hasNext) {
    groupedPosition = 'start'
  } else if (hasPrev && hasNext) {
    groupedPosition = 'middle'
  } else if (hasPrev && !hasNext) {
    groupedPosition = 'end'
  }

  return {
    ...row,
    groupedPosition,
  }
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

const resolveWidth = (width?: number | string) => {
  if (width === undefined) {
    return undefined
  }

  return {
    width: typeof width === 'number' ? `${width}px` : width,
  }
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

const resolveIcon = (icon?: LogicTreeIcon) => {
  if (icon === LogicTreeIcon.MORE) {
    return IconMoreHorizontal
  }

  return IconAdd
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
      tone: node.tone ?? LogicTreeTone.BLUE,
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
    .filter((control) => control.kind !== LogicTreeControlKind.ICON)
    .map((control) => resolveControlDisplayValue(control))
    .filter(Boolean)

  const [first, ...rest] = textualControls
  const shouldSkipFirst = first.trim() === node.title.trim()
  const values = shouldSkipFirst ? rest : textualControls

  return values.map((text, index) => ({
    id: `${node.id}-readonly-${index + 1}`,
    text,
  }))
}

const resolveRowInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  if (!props.editable && resolveConfiguredRowKind(node) === LogicTreeRowKind.EDITOR) {
    return resolveReadonlyInlineContent(node)
  }

  return resolveInlineContent(node)
}

const isRowDraggable = (node: UiLogicTreeNode): boolean => (
  props.editable
  && Boolean(node.draggable)
  && resolveConfiguredRowKind(node) !== LogicTreeRowKind.ACTIONS
)

const resolveRowSurface = (node: UiLogicTreeNode): boolean => (
  node.surface ?? true
)

const isRowSelected = (row: FlattenedRow): boolean => (
  Boolean(row.node.selected)
  || activePathKey.value === pathToKey(row.path)
  || isRowEditing(row)
)

const clearDropState = () => {
  dropState.mode = ''
  dropState.pathKey = ''
}

const clearDragState = () => {
  dragState.nodeId = ''
  dragState.path = []
  dragState.pathKey = ''
  dragState.sectionKey = ''
  clearDropState()
}

const resolveDropMode = (row: FlattenedRow): DropMode => {
  if (row.sectionKey) {
    return DROP_MODE.BEFORE
  }

  if (row.node.kind === LogicTreeNodeKind.GROUP) {
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

  if (dragState.sectionKey || row.sectionKey) {
    if (!dragState.sectionKey || dragState.sectionKey !== row.sectionKey) {
      return false
    }
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
  const currentControl = currentNode?.controls?.find((control) => control.id === controlId)

  if (currentControl) {
    currentControl.value = value
    scheduleItemsUpdate()
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
  if (!props.editable) {
    return
  }

  const pathKey = pathToKey(path)

  withItemsMutation((nextItems) => {
    removeNodeAtPath(nextItems, path)
  })

  if (activePathKey.value === pathKey) {
    activePathKey.value = ''
  }

  if (editingPathKey.value === pathKey) {
    editingPathKey.value = ''
  }

  emit('remove', nodeId)
}

const onAction = (row: FlattenedRow, action: UiLogicTreeAction) => {
  if (!props.editable || resolveRowKind(row) !== LogicTreeRowKind.ACTIONS) {
    return
  }

  withItemsMutation((nextItems) => {
    const branch = getBranchAtPath(nextItems, row.parentPath)
    const actionIndex = row.path.at(-1)

    if (!branch || actionIndex === undefined) {
      return
    }

    const tone = row.node.tone ?? LogicTreeTone.BLUE
    const nextNode = action.kind === LogicTreeActionKind.GROUP
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
  if (resolveRowKind(row) === LogicTreeRowKind.ACTIONS) {
    return
  }

  activePathKey.value = pathToKey(row.path)

  if (canEditRow(row.node)) {
    editingPathKey.value = pathToKey(row.path)
    return
  }

  editingPathKey.value = ''
}

const onOutsideClick = () => {
  activePathKey.value = ''
  editingPathKey.value = ''
}

onBeforeUnmount(() => {
  if (controlUpdateTimer) {
    clearTimeout(controlUpdateTimer)
    controlUpdateTimer = null
  }
})

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
  dragState.sectionKey = row.sectionKey
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
