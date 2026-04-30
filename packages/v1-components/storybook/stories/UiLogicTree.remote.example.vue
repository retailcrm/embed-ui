<template>
    <UiLogicTree
        :items="tree"
        @control-action="onControlAction"
        @node:add="onNodeAdd"
        @node:edit="onNodeEdit"
        @node:remove="onNodeRemove"
        @update:items="setTree"
    >
        <template #conjunction-poppers="{ node, pathKey }">
            <UiPopper
                :visible="activeConjunctionPathKey === pathKey"
                :target-triggers="['click']"
                :popper-triggers="{ hide: ['click'] }"
                :global-triggers="['miss-click', 'reference-hidden']"
                placement="bottom-start"
                @update:visible="onConjunctionVisibleUpdate({ pathKey, visible: $event })"
            >
                <UiMenuItem
                    v-for="option in conjunctionOptions"
                    :key="option.value"
                    :active="node.conjunction === option.value"
                    size="sm"
                    @click="onConjunctionUpdate({ pathKey, value: option.value })"
                >
                    {{ option.label }}
                </UiMenuItem>
            </UiPopper>
        </template>

        <template #node-prefix="{ node, grouped, nodeView, disabled, editing }">
            <UiLogicTreeDragHandle
                v-if="grouped
                    && Boolean(node.data.draggable)
                    && nodeView !== LogicTreeNodeView.ACTIONS
                    && !disabled"
                :for="node.id"
            />

            <UiLogicTreeNodeIcon v-else-if="Boolean(node.data.icon) && !editing">
                <NodeIcon :icon="node.data.icon" />
            </UiLogicTreeNodeIcon>
        </template>

        <template
            #node="{
                node,
                pathKey,
                nodeView,
                editing,
                hasChildren,
                expanded,
                onAction,
                onToggle,
                onControlUpdate,
                onControlAction
            }"
        >
            <template v-if="nodeView === LogicTreeNodeView.ACTIONS">
                <UiButton
                    v-for="action in (node.data.actions ?? [])"
                    :key="action.id"
                    appearance="tertiary"
                    size="sm"
                    @click="onAction(action.id, action.kind)"
                >
                    <IconAdd aria-hidden="true" />
                    {{ action.label }}
                </UiButton>
            </template>

            <div
                v-else-if="editing"
                :class="styles.controls"
            >
                <template
                    v-for="control in (node.data.controls ?? [])"
                    :key="control.id"
                >
                    <UiSelect
                        v-if="control.kind === 'select'"
                        :value="control.value ?? null"
                        :placeholder="control.placeholder ?? control.label"
                        :width="control.width"
                        :clearable="control.clearable"
                        :disabled="control.disabled"
                        :invalid="control.invalid"
                        :readonly="control.readonly"
                        popper-fit-trigger
                        @update:value="(value) => onControlValueUpdate({
                            pathKey,
                            controlId: control.id,
                            value,
                            onControlUpdate,
                        })"
                    >
                        <UiSelectOption
                            v-for="option in resolveOptions(control)"
                            :key="option.id"
                            :label="option.label"
                            :value="option.value"
                        />
                    </UiSelect>

                    <UiTextbox
                        v-else-if="control.kind === 'input'"
                        :value="control.value ?? ''"
                        :placeholder="control.placeholder ?? control.label"
                        :width="control.width"
                        :disabled="control.disabled"
                        :invalid="control.invalid"
                        :readonly="control.readonly"
                        @update:value="(value) => drafts.set(draftKey(pathKey, control.id), value)"
                        @change="onTextboxValueCommit({
                            pathKey,
                            controlId: control.id,
                            onControlUpdate,
                        })"
                        @blur="onTextboxValueCommit({
                            pathKey,
                            controlId: control.id,
                            onControlUpdate,
                        })"
                    />

                    <UiButton
                        v-else
                        appearance="tertiary"
                        size="sm"
                        @click="onControlAction(control.id)"
                    >
                        <NodeIcon :icon="control.icon" />
                    </UiButton>
                </template>
            </div>

            <UiLogicTreeNodeItem v-else>
                <template #title>
                    {{ node.data.title }}
                </template>

                <template #trailing>
                    <UiButton
                        v-if="node.collapsible && hasChildren"
                        appearance="tertiary"
                        size="xs"
                        @click="onToggle"
                    >
                        <UiLogicTreeCaret :active="expanded" />
                    </UiButton>
                </template>

                <span
                    v-for="item in (node.data.inline ?? [])"
                    :key="item.id"
                    :class="{
                        [styles.inline]: true,
                        [styles.inline_muted]: item.tone === 'muted',
                        [styles.inline_separated]: item.separated,
                        [styles.inline_semibold]: item.weight === 'semibold',
                        [styles.inline_blue]: item.tone === LogicTreeTone.BLUE,
                        [styles.inline_green]: item.tone === LogicTreeTone.GREEN,
                        [styles.inline_grey]: item.tone === LogicTreeTone.GREY,
                        [styles.inline_red]: item.tone === LogicTreeTone.RED,
                        [styles.inline_yellow]: item.tone === LogicTreeTone.YELLOW,
                    }"
                >
                    {{ item.text }}
                </span>
            </UiLogicTreeNodeItem>
        </template>

        <template #node-trailing="{ node, onRemove, editing }">
            <UiPopperConnector v-if="Boolean(node.data.removable)">
                <UiButton
                    :aria-label="i18n.t('delete')"
                    :size="editing ? 'sm' : 'xs'"
                    appearance="tertiary"
                    :class="styles.remove"
                    variant="danger"
                    @click="onRemove"
                >
                    <IconDeleteOutlined aria-hidden="true" />
                </UiButton>

                <UiTooltip
                    :target-triggers="{
                        show: ['hover', 'focus'],
                        hide: ['hover', 'focus', 'click'],
                    }"
                >
                    {{ i18n.t('delete') }}
                </UiTooltip>
            </UiPopperConnector>
        </template>
    </UiLogicTree>
</template>

<script lang="ts" remote setup>
import type {
  UiLogicTreeNode,
  UiLogicTreeNodeAddPayload,
  UiLogicTreeNodeEditPayload,
  UiLogicTreeNodeRemovePayload,
} from '@/common/components/logic-tree'
import type { WidthValue } from '@/common/components/width'

import { computed, h, inject } from 'vue'
import isEqual from 'lodash.isequal'
import { ref, watch } from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconAddSquareOutlined from '~assets/sprites/actions/add-square-outlined.svg'
import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'
import IconFolderOutlined from '~assets/sprites/files/folder-outlined.svg'
import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import { UiButton } from '@/remote/components/button'
import {
  UiLogicTree,
  UiLogicTreeCaret,
  UiLogicTreeDragHandle,
  UiLogicTreeNodeIcon,
  UiLogicTreeNodeItem,
} from '@/remote/components/logic-tree'
import { UiMenuItem } from '@/remote/components/menu'
import { UiPopper, UiPopperConnector } from '@/remote/components/popper'
import { UiSelect, UiSelectOption } from '@/remote/components/select'
import { UiTextbox } from '@/remote/components/textbox'
import { UiTooltip } from '@/remote/components/tooltip'

import {
  LogicTreeConjunction,
  LogicTreeNodeKind,
  LogicTreeNodeView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import _i18n from '@/host/components/logic-tree/i18n'
import { I18nInjectKey } from '@/host/i18n/plugin'

type TreeNodeIcon = 'folder' | 'more'
type TreeNodeInline = {
  id: string;
  text: string;
  tone?: LogicTreeTone | 'default' | 'muted';
  weight?: 'regular' | 'semibold';
  separated?: boolean;
}
type TreeNodeControl = {
  id: string;
  kind: 'icon' | 'input' | 'select';
  label: string;
  icon?: TreeNodeIcon;
  options?: {
    id: string;
    label: string;
    value: string | number;
  }[];
  value?: string | number | null;
  placeholder?: string;
  width?: WidthValue;
  clearable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

type TreeNodeAction = {
  id: string;
  kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
  label: string;
}

type TreeNode = UiLogicTreeNode<{
  title: string;
  icon?: TreeNodeIcon;
  inline?: TreeNodeInline[];
  controls?: TreeNodeControl[];
  actions?: TreeNodeAction[];
  removable?: boolean;
}>

type Styles = Partial<Record<
  | 'controls'
  | 'inline'
  | 'inline_blue'
  | 'inline_green'
  | 'inline_grey'
  | 'inline_muted'
  | 'inline_red'
  | 'inline_semibold'
  | 'inline_separated'
  | 'inline_yellow'
  | 'remove',
  string
>>

const props = defineProps<{
  items?: TreeNode[];
  styles?: Styles;
}>()

const styles = computed(() => props.styles ?? {})

const cloneNodes = (nodes: TreeNode[]): TreeNode[] => nodes.map((node) => ({
  ...node,
  data: {
    ...node.data,
    actions: node.data.actions?.map((action) => ({ ...action })),
    controls: node.data.controls?.map((control) => ({
      ...control,
      options: control.options?.map((option) => ({ ...option })),
    })),
    inline: node.data.inline?.map((item) => ({ ...item })),
  },
  children: node.children ? cloneNodes(node.children) : undefined,
}))

const parsePathKey = (pathKey: string | null): number[] => (
  pathKey
    ? pathKey.split('.').filter(Boolean).map((segment) => Number(segment))
    : []
)

const branchAtPath = (
  nodes: TreeNode[],
  parentPath: number[]
): TreeNode[] | null => {
  let branch = nodes

  for (const index of parentPath) {
    const node = branch[index]
    if (!node?.children) {
      return null
    }

    branch = node.children
  }

  return branch
}

const nodeAtPath = (nodes: TreeNode[], path: number[]): TreeNode | null => {
  const branch = branchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)
  if (index === undefined) {
    return null
  }

  return branch?.[index] ?? null
}

const findNodePath = (
  nodes: TreeNode[],
  nodeId: string,
  parentPath: number[] = []
): number[] | null => {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    const path = [...parentPath, index]

    if (node.id === nodeId) {
      return path
    }

    if (node.children?.length) {
      const nestedPath = findNodePath(node.children, nodeId, path)
      if (nestedPath) {
        return nestedPath
      }
    }
  }

  return null
}

let uid = 0

const nextId = (prefix: string): string => {
  uid += 1

  return `${prefix}-${uid}`
}

const isConjunctionContentNode = (node: TreeNode): boolean => (
  node.data.view !== LogicTreeNodeView.ACTIONS
  && node.kind !== LogicTreeNodeKind.BRANCH
)

const shouldAssignConditionConjunction = (
  branch: TreeNode[],
  insertionIndex: number
): boolean => {
  const hasPreviousContentSibling = branch
    .slice(0, insertionIndex)
    .some((node) => isConjunctionContentNode(node))

  if (!hasPreviousContentSibling) {
    return false
  }

  const hasExistingConjunction = branch.some((node) => (
    isConjunctionContentNode(node)
    && Boolean(node.conjunction)
  ))

  return !hasExistingConjunction
}

const createActionNode = (tone: LogicTreeTone): TreeNode => ({
  id: nextId('actions'),
  kind: LogicTreeNodeKind.CONDITION,
  data: {
    actions: [
      {
        id: nextId('add-condition'),
        kind: LogicTreeNodeKind.CONDITION,
        label: 'Условие',
      },
      {
        id: nextId('add-group'),
        kind: LogicTreeNodeKind.GROUP,
        label: 'Группа',
      },
    ],
    editable: false,
    title: 'Добавить в ветку',
    view: LogicTreeNodeView.ACTIONS,
  },
  tone,
})

const createConditionNode = (tone: LogicTreeTone): TreeNode => ({
  id: nextId('condition'),
  kind: LogicTreeNodeKind.CONDITION,
  title: 'Новое условие',
  data: {
    controls: [
      {
        id: nextId('field'),
        kind: 'select',
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
        kind: 'select',
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
        kind: 'input',
        label: 'Значение',
        placeholder: 'Введите значение',
        value: '',
        width: 198,
      },
      {
        id: nextId('menu'),
        kind: 'icon',
        label: 'Дополнительно',
        icon: 'more',
      },
    ],
    view: LogicTreeNodeView.SUMMARY,
    draggable: true,
    editable: false,
    removable: true,
  },
  tone,
})

const createGroupNode = (tone: LogicTreeTone): TreeNode => ({
  id: nextId('group'),
  kind: LogicTreeNodeKind.GROUP,
  data: {
    draggable: true,
    editable: false,
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
    view: LogicTreeNodeView.SUMMARY,
  },
  tone,
  children: [
    createActionNode(tone),
  ],
  collapsible: true,
  expanded: true,
})

const resolveOptions = (control: TreeNodeControl) => {
  if (control.options?.length) {
    return control.options
  }

  const value = control.value ?? null
  if (value === null || value === undefined) {
    return []
  }

  return [{
    id: `${control.id}-option`,
    label: String(value),
    value,
  }]
}

const NodeIcon = (props: { icon?: TreeNodeIcon }, bindings: { attrs: Record<string, unknown> }) => {
  const attrs = { ...bindings.attrs, 'aria-hidden': 'true' }

  return props.icon === 'folder'
    ? h(IconFolderOutlined, attrs)
    : props.icon === 'more'
      ? h(IconMoreHorizontal, attrs)
      : h(IconAddSquareOutlined, attrs)
}

const i18n = computed(() => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))
const conjunctionOptions = computed(() => [
  {
    label: i18n.value.t('relationAnd'),
    value: LogicTreeConjunction.AND,
  },
  {
    label: i18n.value.t('relationOr'),
    value: LogicTreeConjunction.OR,
  },
])

const tree = ref<TreeNode[]>([])
const activeConjunctionPathKey = ref('')
const setTree = (items: TreeNode[]) => {
  if (!isEqual(tree.value, items)) {
    tree.value = cloneNodes(items)
  }
}

const mutate = (mutator: (nodes: TreeNode[]) => void) => {
  const copy = cloneNodes(tree.value)

  mutator(copy)
  tree.value = copy
}

const drafts = new Map<string, string | number | null>()
const draftKey = (pathKey: string, controlId: string) => `${pathKey}:${controlId}`
const draftValue = (pathKey: string, controlId: string) => {
  const key = draftKey(pathKey, controlId)

  return drafts.has(key)
    ? drafts.get(key)
    : undefined
}

const updateControlValue = (
  pathKey: string,
  controlId: string,
  value: string | number | null
) => mutate((tree) => {
  const node = nodeAtPath(tree, parsePathKey(pathKey))
  const control = node?.data.controls?.find((item) => item.id === controlId)
  if (control) {
    control.value = value
  }
})

const onControlValueUpdate = ({
  pathKey,
  controlId,
  value,
  onControlUpdate,
}: {
  pathKey: string;
  controlId: string;
  value: string | number | null;
  onControlUpdate: (controlId: string, value: string | number | null) => void;
}) => {
  updateControlValue(pathKey, controlId, value)
  onControlUpdate(controlId, value)
}

const onTextboxValueCommit = ({
  pathKey,
  controlId,
  onControlUpdate,
}: {
  pathKey: string;
  controlId: string;
  onControlUpdate: (controlId: string, value: string | number | null) => void;
}) => {
  const value = draftValue(pathKey, controlId)
  if (value === undefined) return

  updateControlValue(pathKey, controlId, value)
  drafts.delete(draftKey(pathKey, controlId))
  onControlUpdate(controlId, value)
}

const onConjunctionVisibleUpdate = ({
  pathKey,
  visible,
}: {
  pathKey: string;
  visible: boolean;
}) => {
  if (visible) {
    activeConjunctionPathKey.value = pathKey
    return
  }

  if (activeConjunctionPathKey.value === pathKey) {
    activeConjunctionPathKey.value = ''
  }
}

const onConjunctionUpdate = ({
  pathKey,
  value,
}: {
  pathKey: string;
  value: LogicTreeConjunction;
}) => {
  activeConjunctionPathKey.value = ''

  if (nodeAtPath(tree.value, parsePathKey(pathKey))?.conjunction === value) {
    return
  }

  mutate((tree) => {
    const node = nodeAtPath(tree, parsePathKey(pathKey))

    if (node) {
      node.conjunction = value
    }
  })
}

const onNodeAdd = ({
  triggerNodeId,
  parentPathKey,
  kind,
}: UiLogicTreeNodeAddPayload) => mutate((tree) => {
  const triggerPath = findNodePath(tree, triggerNodeId)
  const branch = branchAtPath(tree, parsePathKey(parentPathKey))
  const actionIndex = triggerPath?.at(-1)

  if (!triggerPath || !branch || actionIndex === undefined) return

  const triggerNode = nodeAtPath(tree, triggerPath)
  const tone = triggerNode?.tone ?? LogicTreeTone.BLUE
  const nextNode = kind === LogicTreeNodeKind.GROUP
    ? createGroupNode(tone)
    : createConditionNode(tone)

  if (
    kind === LogicTreeNodeKind.CONDITION
    && shouldAssignConditionConjunction(branch, actionIndex)
  ) {
    nextNode.conjunction = LogicTreeConjunction.AND
  }

  branch.splice(actionIndex, 0, nextNode)
})

const onNodeEdit = ({
  pathKey,
  controlId,
  value,
}: UiLogicTreeNodeEditPayload) => {
  updateControlValue(pathKey, controlId, value)
}

const onNodeRemove = ({ parentPathKey, index }: UiLogicTreeNodeRemovePayload) => mutate((tree) => {
  const branch = branchAtPath(tree, parsePathKey(parentPathKey))
  if (branch && index >= 0 && index < branch.length) {
    branch.splice(index, 1)
  }
})

const onControlAction = () => {
  // Business behavior is owned by the consumer; the demo tree keeps it as a no-op.
}

watch(() => props.items, (items) => {
  setTree(items ?? [])
  drafts.clear()
}, { immediate: true })
</script>
