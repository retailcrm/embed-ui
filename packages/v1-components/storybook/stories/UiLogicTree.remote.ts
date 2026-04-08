import type {
  UiLogicTreeControl,
  UiLogicTreeInlineText,
  UiLogicTreeNode,
  UiLogicTreeRowAddPayload,
  UiLogicTreeRowEditPayload,
  UiLogicTreeRowRemovePayload,
  UiLogicTreeRowSlotProps,
} from '@/common/components/logic-tree'

import {
  computed,
  h,
  inject,
  ref,
} from 'vue'
import { RemoteDragHandle } from '@omnicajs/vue-remote/remote'
import { watch } from 'vue'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconAddSquareOutlined from '~assets/sprites/actions/add-square-outlined.svg'
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
  LogicTreeRowView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import _i18n from '@/host/components/logic-tree/i18n'
import { I18nInjectKey } from '@/host/i18n/plugin'

import { UiButton } from '@/remote/components/button'

import { UiPopperConnector } from '@/remote/components/popper'

import { UiTextbox } from '@/remote/components/textbox'
import { UiTooltip } from '@/remote/components/tooltip'

import { UiLogicTree } from '../../src/remote/components/logic-tree'

import { UiSelect, UiSelectOption } from '../../src/remote/components/select'

import { createComponentEndpoint } from '../endpoint'

type UiLogicTreeProps = InstanceType<typeof UiLogicTree>['$props']

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

const parsePathKey = (pathKey: string | null): number[] => (
  pathKey
    ? pathKey.split('.').filter(Boolean).map((segment) => Number(segment))
    : []
)

const getBranchAtPath = (
  nodes: UiLogicTreeNode[],
  parentPath: number[]
): UiLogicTreeNode[] | null => {
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

const getNodeAtPath = (nodes: UiLogicTreeNode[], path: number[]): UiLogicTreeNode | null => {
  const branch = getBranchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)

  if (index === undefined) {
    return null
  }

  return branch?.[index] ?? null
}

const findNodePath = (
  nodes: UiLogicTreeNode[],
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

const isConjunctionContentNode = (node: UiLogicTreeNode): boolean => (
  node.row.view !== LogicTreeRowView.ACTIONS
  && node.kind !== LogicTreeNodeKind.BRANCH
)

const shouldAssignConditionConjunction = (
  branch: UiLogicTreeNode[],
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
    editable: false,
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
    editable: false,
    removable: true,
    title: 'Новое условие',
    view: LogicTreeRowView.SUMMARY,
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
    view: LogicTreeRowView.SUMMARY,
  },
  tone,
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

const resolveOptions = (control: UiLogicTreeControl) => {
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

  return IconAddSquareOutlined
}

const renderInlineItem = (item: UiLogicTreeInlineText) => h('span', {
  class: {
    'ui-v1-logic-tree__inline': true,
    'ui-v1-logic-tree__inline_muted': item.tone === 'muted',
    'ui-v1-logic-tree__inline_separated': item.separated,
    'ui-v1-logic-tree__inline_semibold': item.weight === 'semibold',
    [`ui-v1-logic-tree__inline_${item.tone}`]: Boolean(item.tone) && item.tone !== 'default' && item.tone !== 'muted',
  },
  key: item.id,
}, item.text)

const renderPrefix = (slotProps: UiLogicTreeRowSlotProps) => {
  if (
    slotProps.grouped
    && slotProps.node.row.draggable
    && slotProps.rowView !== LogicTreeRowView.ACTIONS
  ) {
    return h(RemoteDragHandle, {
      as: 'span',
      class: 'ui-v1-logic-tree__handle',
      'data-skip-row-click': 'true',
      for: slotProps.node.id,
    }, () => h(IconDrag, { 'aria-hidden': 'true' }))
  }

  if (slotProps.node.row.icon && !slotProps.editing) {
    return h('span', {
      class: 'ui-v1-logic-tree__folder',
    }, [
      h(resolveIcon(slotProps.node.row.icon), { 'aria-hidden': 'true' }),
    ])
  }

  return null
}

const renderSummary = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
  class: 'ui-v1-logic-tree__content',
}, [
  h('span', {
    class: 'ui-v1-logic-tree__headline',
  }, [
    h('span', {
      class: 'ui-v1-logic-tree__title',
    }, slotProps.node.row.title),
    slotProps.node.collapsible && slotProps.hasChildren
      ? h(UiButton, {
        appearance: 'tertiary',
        size: 'xs',
        onClick: slotProps.onToggle,
      }, () => h(IconCaretDown, {
        'aria-hidden': 'true',
        class: {
          'ui-v1-logic-tree__toggle-icon': true,
          'ui-v1-logic-tree__toggle-icon_collapsed': !slotProps.expanded,
        },
      }))
      : null,
  ]),
  ...(slotProps.node.row.inline ?? []).map(renderInlineItem),
])

const renderEdit = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
  class: 'ui-v1-logic-tree__controls',
}, (slotProps.node.row.controls ?? []).map((control) => {
  if (control.kind === LogicTreeControlKind.SELECT) {
    return h(UiSelect, {
      key: control.id,
      class: [
        'ui-v1-logic-tree__control',
        'ui-v1-logic-tree__control_select',
      ],
      clearable: control.clearable,
      disabled: control.disabled,
      invalid: control.invalid,
      placeholder: control.placeholder ?? control.label,
      popperFitTrigger: true,
      readonly: control.readonly,
      style: resolveWidth(control.width),
      value: resolveControlValue(control),
      'onUpdate:value': (value: string | number | null) => {
        slotProps.onControlUpdate(control.id, value)
      },
    }, () => resolveOptions(control).map((option) => h(UiSelectOption, {
      key: option.id,
      label: option.label,
      value: option.value,
    })))
  }

  if (control.kind === LogicTreeControlKind.INPUT) {
    return h(UiTextbox, {
      key: control.id,
      class: [
        'ui-v1-logic-tree__control',
        'ui-v1-logic-tree__control_input',
      ],
      disabled: control.disabled,
      invalid: control.invalid,
      placeholder: control.placeholder ?? control.label,
      readonly: control.readonly,
      style: resolveWidth(control.width),
      value: resolveControlValue(control),
      'onUpdate:value': (value: string | number | null) => {
        slotProps.onControlUpdate(control.id, value)
      },
    })
  }

  return h(UiButton, {
    key: control.id,
    appearance: 'tertiary',
    class: [
      'ui-v1-logic-tree__control',
      'ui-v1-logic-tree__control_icon',
    ],
    size: 'xs',
    onClick: () => {
      slotProps.onControlAction(control.id)
    },
  }, () => h(resolveIcon(control.icon), {
    'aria-hidden': 'true',
    class: 'ui-v1-logic-tree__control-icon',
  }))
}))

const renderActions = (slotProps: UiLogicTreeRowSlotProps) => (
  slotProps.node.row.actions ?? []
).map((action) => h(UiButton, {
  key: action.id,
  appearance: 'tertiary',
  class: 'ui-v1-logic-tree__action-button',
  size: 'sm',
  onClick: () => {
    slotProps.onAction(action)
  },
}, () => [
  h(IconAdd, { 'aria-hidden': 'true' }),
  action.label,
]))

const renderTrailing = (slotProps: UiLogicTreeRowSlotProps, deleteText: string) => {
  if (!slotProps.node.row.removable) {
    return null
  }

  return h(UiPopperConnector, () => [
    h(UiButton, {
      'aria-label': deleteText,
      appearance: 'tertiary',
      class: 'ui-v1-logic-tree__delete',
      size: slotProps.editing ? 'sm' : 'xs',
      variant: 'danger',
      onClick: slotProps.onRemove,
    }, () => h(IconDeleteOutlined, { 'aria-hidden': 'true' })),
    h(UiTooltip, {
      targetTriggers: {
        show: ['hover', 'focus'],
        hide: ['hover', 'focus', 'click'],
      },
    }, () => deleteText),
  ])
}

createComponentEndpoint<UiLogicTreeProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const i18n = computed(() => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))
        const deleteText = computed(() => i18n.value.t('delete'))
        const items = ref<UiLogicTreeNode[]>([])

        const mutateItems = (mutator: (nextItems: UiLogicTreeNode[]) => void) => {
          const nextItems = cloneNodes(items.value)

          mutator(nextItems)
          items.value = nextItems
        }

        const handleTreeItemsUpdate = (nextItems: UiLogicTreeNode[]) => {
          items.value = cloneNodes(nextItems)
        }

        const handleRowAdd = (payload: UiLogicTreeRowAddPayload) => {
          mutateItems((nextItems) => {
            const triggerPath = findNodePath(nextItems, payload.triggerNodeId)
            const branch = getBranchAtPath(nextItems, parsePathKey(payload.parentPathKey))
            const actionIndex = triggerPath?.at(-1)

            if (!triggerPath || !branch || actionIndex === undefined) {
              return
            }

            const triggerNode = getNodeAtPath(nextItems, triggerPath)
            const tone = triggerNode?.tone ?? LogicTreeTone.BLUE
            const nextNode = payload.kind === LogicTreeNodeKind.GROUP
              ? createGroupNode(tone)
              : createConditionNode(tone)

            if (
              payload.kind === LogicTreeNodeKind.CONDITION
              && shouldAssignConditionConjunction(branch, actionIndex)
            ) {
              nextNode.conjunction = LogicTreeConjunction.AND
            }

            branch.splice(actionIndex, 0, nextNode)
          })
        }

        const handleRowEdit = (payload: UiLogicTreeRowEditPayload) => {
          mutateItems((nextItems) => {
            const node = getNodeAtPath(nextItems, parsePathKey(payload.pathKey))
            const control = node?.row.controls?.find((item) => item.id === payload.controlId)

            if (control) {
              control.value = payload.value
            }
          })
        }

        const handleRowRemove = (payload: UiLogicTreeRowRemovePayload) => {
          mutateItems((nextItems) => {
            const branch = getBranchAtPath(nextItems, parsePathKey(payload.parentPathKey))

            if (!branch || payload.index < 0 || payload.index >= branch.length) {
              return
            }

            branch.splice(payload.index, 1)
          })
        }

        const handleControlAction = () => {
          // Business behavior is owned by the consumer; the demo tree keeps it as a no-op.
        }

        watch(() => props.items, (nextItems) => {
          items.value = cloneNodes(nextItems ?? [])
        }, { deep: true, immediate: true })

        return () => h(UiLogicTree, {
          ...props,
          onControlAction: handleControlAction,
          'onRow:add': handleRowAdd,
          'onRow:edit': handleRowEdit,
          'onRow:remove': handleRowRemove,
          'onUpdate:items': handleTreeItemsUpdate,
          items: items.value,
        }, {
          'row-actions': (slotProps: UiLogicTreeRowSlotProps) => renderActions(slotProps),
          'row-edit': (slotProps: UiLogicTreeRowSlotProps) => renderEdit(slotProps),
          'row-prefix': (slotProps: UiLogicTreeRowSlotProps) => renderPrefix(slotProps),
          'row-summary': (slotProps: UiLogicTreeRowSlotProps) => renderSummary(slotProps),
          'row-trailing': (slotProps: UiLogicTreeRowSlotProps) => renderTrailing(slotProps, deleteText.value),
        })
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
