<template>
    <UiLogicTreeRoot :surface="surface" @outside-click="onOutsideClick">
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
                :disabled="!props.editable"
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
                        :editing="isRowEditing(row)"
                        :grouped="Boolean(row.sectionKey)"
                        :grouped-position="row.groupedPosition || undefined"
                        :highlighted="Boolean(row.node.row.highlighted)"
                        :path-key="pathToKey(row.path)"
                        :conjunction="row.conjunction"
                        :conjunction-label="resolveConjunctionLabel(row.conjunction)"
                        :conjunction-tone="row.conjunctionTone"
                        :grouped-header="row.node.childrenView === LogicTreeChildrenView.GROUPED"
                        :row-view="resolveRowView(row)"
                        :selected="isRowSelected(row)"
                        :surface="resolveRowSurface(row.node)"
                        @row-click="onRowClick(row)"
                    >
                        <template #prefix>
                            <RemoteDragHandle
                                v-if="isGroupedDraggableRow(row)"
                                as="span"
                                class="ui-v1-logic-tree__handle"
                                data-skip-row-click="true"
                                :for="row.node.id"
                            >
                                <IconDrag aria-hidden="true" />
                            </RemoteDragHandle>

                            <span
                                v-else-if="row.node.row.icon"
                                class="ui-v1-logic-tree__folder"
                            >
                                <component
                                    :is="resolveRowIcon(row.node.row.icon)"
                                    aria-hidden="true"
                                />
                            </span>
                        </template>

                        <template #content>
                            <template v-if="resolveRowView(row) === LogicTreeRowView.EDITOR">
                                <div class="ui-v1-logic-tree__controls">
                                    <template
                                        v-for="control in row.node.row.controls ?? []"
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
                                            {{ row.node.row.title }}
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
                                v-if="resolveRowView(row) !== LogicTreeRowView.SUMMARY && row.node.collapsible && row.hasChildren"
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
                                    v-if="props.editable && row.node.row.removable"
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
                </RemoteSortableItem>

                <UiLogicTreeRow
                    v-for="row in entry.footerRows"
                    :key="row.node.id"
                    :connectors="row.connectors"
                    :editing="isRowEditing(row)"
                    :grouped="Boolean(row.sectionKey)"
                    :grouped-position="row.groupedPosition || undefined"
                    :highlighted="Boolean(row.node.row.highlighted)"
                    :path-key="pathToKey(row.path)"
                    :conjunction="row.conjunction"
                    :conjunction-label="resolveConjunctionLabel(row.conjunction)"
                    :conjunction-tone="row.conjunctionTone"
                    :grouped-header="row.node.childrenView === LogicTreeChildrenView.GROUPED"
                    :row-view="resolveRowView(row)"
                    :selected="isRowSelected(row)"
                    :surface="resolveRowSurface(row.node)"
                    @row-click="onRowClick(row)"
                >
                    <template #content>
                        <UiButton
                            v-for="action in row.node.row.actions ?? []"
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

                    <template #trailing>
                        <UiPopperConnector>
                            <UiButton
                                v-if="props.editable && row.node.row.removable"
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
            </RemoteSortableContainer>

            <UiLogicTreeRow
                v-else
                :connectors="entry.row.connectors"
                :editing="isRowEditing(entry.row)"
                :grouped="Boolean(entry.row.sectionKey)"
                :grouped-position="entry.row.groupedPosition || undefined"
                :highlighted="Boolean(entry.row.node.row.highlighted)"
                :path-key="pathToKey(entry.row.path)"
                :conjunction="entry.row.conjunction"
                :conjunction-label="resolveConjunctionLabel(entry.row.conjunction)"
                :conjunction-tone="entry.row.conjunctionTone"
                :grouped-header="entry.row.node.childrenView === LogicTreeChildrenView.GROUPED"
                :row-view="resolveRowView(entry.row)"
                :selected="isRowSelected(entry.row)"
                :surface="resolveRowSurface(entry.row.node)"
                @row-click="onRowClick(entry.row)"
            >
                <template #prefix>
                    <span
                        v-if="entry.row.node.row.icon"
                        class="ui-v1-logic-tree__folder"
                    >
                        <component
                            :is="resolveRowIcon(entry.row.node.row.icon)"
                            aria-hidden="true"
                        />
                    </span>
                </template>

                <template #content>
                    <template v-if="resolveRowView(entry.row) === LogicTreeRowView.ACTIONS">
                        <UiButton
                            v-for="action in entry.row.node.row.actions ?? []"
                            :key="action.id"
                            appearance="tertiary"
                            class="ui-v1-logic-tree__action-button"
                            size="sm"
                            @click="onAction(entry.row, action)"
                        >
                            <IconAdd aria-hidden="true" />

                            {{ action.label }}
                        </UiButton>
                    </template>

                    <template v-else-if="resolveRowView(entry.row) === LogicTreeRowView.EDITOR">
                        <div class="ui-v1-logic-tree__controls">
                            <template
                                v-for="control in entry.row.node.row.controls ?? []"
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
                                    @update:value="onControlUpdate(entry.row.path, control.id, $event ?? '')"
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
                                    @update:value="onControlUpdate(entry.row.path, control.id, $event ?? '')"
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
                                        nodeId: entry.row.node.id,
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
                                    {{ entry.row.node.row.title }}
                                </span>

                                <UiButton
                                    v-if="entry.row.node.collapsible && entry.row.hasChildren"
                                    appearance="tertiary"
                                    size="xs"
                                    @click="onToggle(entry.row)"
                                >
                                    <IconCaretDown
                                        aria-hidden="true"
                                        :class="{
                                            'ui-v1-logic-tree__toggle-icon': true,
                                            'ui-v1-logic-tree__toggle-icon_collapsed': !entry.row.expanded,
                                        }"
                                    />
                                </UiButton>
                            </span>

                            <span
                                v-for="item in resolveRowInlineContent(entry.row.node)"
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
                        v-if="resolveRowView(entry.row) !== LogicTreeRowView.SUMMARY && entry.row.node.collapsible && entry.row.hasChildren"
                        appearance="tertiary"
                        class="ui-v1-logic-tree__toggle"
                        size="xs"
                        @click="onToggle(entry.row)"
                    >
                        <IconCaretDown
                            aria-hidden="true"
                            :class="{
                                'ui-v1-logic-tree__toggle-icon': true,
                                'ui-v1-logic-tree__toggle-icon_collapsed': !entry.row.expanded,
                            }"
                        />
                    </UiButton>

                    <UiPopperConnector>
                        <UiButton
                            v-if="props.editable && entry.row.node.row.removable"
                            :aria-label="deleteText"
                            class="ui-v1-logic-tree__delete"
                            appearance="tertiary"
                            size="sm"
                            variant="danger"
                            @click="onRemove(entry.row.path, entry.row.node.id)"
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
  UiLogicTreeControl,
  UiLogicTreeDropPayload,
  UiLogicTreeInlineText,
  UiLogicTreeNode,
  UiLogicTreeOption,
  UiLogicTreeProperties,
} from '@/common/components/logic-tree'

import { inject } from 'vue'

import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'

import {
  RemoteDragHandle,
  RemoteSortableContainer,
  RemoteSortableItem,
} from '@omnicajs/vue-remote/remote'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'
import IconDrag from '~assets/sprites/actions/drag.svg'
import IconFolderOutlined from '~assets/sprites/files/folder-outlined.svg'
import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import {
  LogicTreeActionKind,
  LogicTreeChildrenView,
  LogicTreeConjunction,
  LogicTreeControlKind,
  LogicTreeIcon,
  LogicTreeNodeKind,
  LogicTreeRowView,
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
  'drop': [payload: UiLogicTreeDropPayload];
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

const canEditRow = (node: UiLogicTreeNode): boolean => (
  props.editable
  && Boolean(node.row.controls?.length)
  && resolveConfiguredRowView(node) !== LogicTreeRowView.ACTIONS
)

const isRowEditing = (row: FlattenedRow): boolean => (
  canEditRow(row.node)
  && editingPathKey.value === pathToKey(row.path)
)

const resolveRowView = (row: FlattenedRow): LogicTreeRowView => {
  const configuredRowView = resolveConfiguredRowView(row.node)

  if (!props.editable && configuredRowView === LogicTreeRowView.EDITOR) {
    return LogicTreeRowView.SUMMARY
  }

  if (configuredRowView === LogicTreeRowView.ACTIONS || configuredRowView === LogicTreeRowView.EDITOR) {
    return configuredRowView
  }

  if (isRowEditing(row)) {
    return LogicTreeRowView.EDITOR
  }

  return configuredRowView
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
  id: nextId('actions'),
  kind: LogicTreeNodeKind.CONDITION,
  row: {
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
    title: 'Добавить в ветку',
    view: LogicTreeRowView.ACTIONS,
  },
  tone,
})

const createConditionNode = (tone: LogicTreeTone): UiLogicTreeNode => ({
  id: nextId('condition'),
  kind: LogicTreeNodeKind.CONDITION,
  row: {
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
    removable: true,
    title: 'Новое условие',
    view: LogicTreeRowView.EDITOR,
  },
  tone,
})

const createGroupNode = (tone: LogicTreeTone): UiLogicTreeNode => ({
  children: [
    createActionRow(tone),
  ],
  collapsible: true,
  expanded: true,
  id: nextId('group'),
  kind: LogicTreeNodeKind.GROUP,
  row: {
    draggable: true,
    inline: [
      {
        id: nextId('group-subtitle'),
        text: 'Последовательное применение',
        tone,
      },
      {
        id: nextId('group-meta'),
        separated: true,
        text: 'Новая ветка',
        tone: 'muted',
      },
    ],
    removable: true,
    title: 'Новая группа',
    view: LogicTreeRowView.SUMMARY,
  },
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
  const shouldPreserveChildLevel = node.kind === LogicTreeNodeKind.BRANCH && ancestors.length === 0
  const descendsIntoChildren = hasChildren && expanded
  const isGroupedSectionRow = Boolean(currentSectionKey)
  const conjunction = !isGroupedSectionRow && isConjunctionContentNode(node)
    ? node.conjunction ?? ''
    : ''
  const connectorTone = parentTone ?? fallbackTone(node)
  const conjunctionTone = resolveConjunctionTone(conjunction, connectorTone)
  const connectorContinues = !isLast || descendsIntoChildren
  const connectors = [
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
  }))

  const rows: FlattenedRow[] = [{
    conjunction,
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
      nextSectionKey
    ))
  }

  return rows
})

const rows = computed(() => flatten(itemsState.value).filter((row) => {
  return props.editable || resolveConfiguredRowView(row.node) !== LogicTreeRowView.ACTIONS
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
  if (icon === LogicTreeIcon.FOLDER) {
    return IconFolderOutlined
  }

  if (icon === LogicTreeIcon.MORE) {
    return IconMoreHorizontal
  }

  return IconAdd
}

const resolveRowIcon = (icon?: LogicTreeIcon) => {
  if (icon === LogicTreeIcon.FOLDER) {
    return IconFolderOutlined
  }

  return resolveIcon(icon)
}

const resolveInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  return node.row.inline ?? []
}

const resolveControlDisplayValue = (control: UiLogicTreeControl): string => {
  const value = resolveControlValue(control)

  if (value === null || value === undefined || value === '') {
    return control.placeholder ?? control.label
  }

  return String(value)
}

const resolveReadonlyInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  const textualControls = (node.row.controls ?? [])
    .filter((control) => control.kind !== LogicTreeControlKind.ICON)
    .map((control) => resolveControlDisplayValue(control))
    .filter(Boolean)

  const [first, ...rest] = textualControls
  const shouldSkipFirst = first?.trim() === node.row.title.trim()
  const values = shouldSkipFirst ? rest : textualControls

  return values.map((text, index) => ({
    id: `${node.id}-readonly-${index + 1}`,
    text,
  }))
}

const resolveRowInlineContent = (node: UiLogicTreeNode): UiLogicTreeInlineText[] => {
  if (!props.editable && resolveConfiguredRowView(node) === LogicTreeRowView.EDITOR) {
    return resolveReadonlyInlineContent(node)
  }

  return resolveInlineContent(node)
}

const isRowDraggable = (node: UiLogicTreeNode): boolean => (
  props.editable
  && Boolean(node.row.draggable)
  && resolveConfiguredRowView(node) !== LogicTreeRowView.ACTIONS
)

const isGroupedDraggableRow = (row: FlattenedRow): boolean => (
  Boolean(row.sectionKey)
  && isRowDraggable(row.node)
)

const resolveRowSurface = (node: UiLogicTreeNode): boolean => (
  node.row.surface ?? true
)

const isRowSelected = (row: FlattenedRow): boolean => (
  Boolean(row.node.row.selected)
  || activePathKey.value === pathToKey(row.path)
  || isRowEditing(row)
)

const onControlUpdate = (path: number[], controlId: string, value: string | number) => {
  if (!props.editable) {
    return
  }

  const currentNode = getNodeAtPath(itemsState.value, path)
  const currentControl = currentNode?.row.controls?.find((control) => control.id === controlId)

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
  if (!props.editable || resolveRowView(row) !== LogicTreeRowView.ACTIONS) {
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
  if (resolveRowView(row) === LogicTreeRowView.ACTIONS) {
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

onBeforeUnmount(() => {
  if (controlUpdateTimer) {
    clearTimeout(controlUpdateTimer)
    controlUpdateTimer = null
  }
})

</script>
