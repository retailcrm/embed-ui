import type {
  UiLogicTreeNode,
  UiLogicTreeProperties,
  UiLogicTreeRowAddPayload,
  UiLogicTreeRowEditPayload,
  UiLogicTreeRowRemovePayload,
  UiLogicTreeRowSlotProps,
} from '@/common/components/logic-tree'

import {
  computed,
  h,
  ref,
  watch,
} from 'vue'

import {
  LogicTreeActionKind,
  LogicTreeControlKind,
  LogicTreeNodeKind,
  LogicTreeRowView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import { UiLogicTree } from '@/remote/components/logic-tree'

import { createComponentEndpoint } from '../../storybook/endpoint'

type UiLogicTreeWorkerProps = UiLogicTreeProperties

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

const getBranchAtPath = (nodes: UiLogicTreeNode[], parentPath: number[]): UiLogicTreeNode[] | null => {
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

const createActionRow = (): UiLogicTreeNode => ({
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
    title: 'Добавить',
    view: LogicTreeRowView.ACTIONS,
  },
  tone: LogicTreeTone.BLUE,
})

const createConditionNode = (title = 'Новое условие'): UiLogicTreeNode => ({
  id: nextId('condition'),
  kind: LogicTreeNodeKind.CONDITION,
  row: {
    controls: [
      {
        clearable: true,
        id: nextId('value'),
        kind: LogicTreeControlKind.SELECT,
        label: 'Значение',
        options: [
          { id: nextId('option'), label: 'A', value: 'A' },
          { id: nextId('option'), label: 'B', value: 'B' },
        ],
        value: 'A',
      },
    ],
    editable: false,
    removable: true,
    title,
    view: LogicTreeRowView.SUMMARY,
  },
  tone: LogicTreeTone.BLUE,
})

const createGroupNode = (): UiLogicTreeNode => ({
  children: [createActionRow()],
  expanded: true,
  id: nextId('group'),
  kind: LogicTreeNodeKind.GROUP,
  row: {
    editable: false,
    removable: true,
    title: 'Новая группа',
    view: LogicTreeRowView.SUMMARY,
  },
  tone: LogicTreeTone.GREEN,
})

createComponentEndpoint<UiLogicTreeWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const items = ref<UiLogicTreeNode[]>([])
        const controlActionCount = ref(0)
        const controlledInfo = computed(() => [
          `nodes:${items.value.length}`,
          `control-actions:${controlActionCount.value}`,
        ].join(' '))

        const mutateItems = (mutator: (nextItems: UiLogicTreeNode[]) => void) => {
          const nextItems = cloneNodes(items.value)

          mutator(nextItems)
          items.value = nextItems
        }

        const handleRowAdd = (payload: UiLogicTreeRowAddPayload) => {
          mutateItems((nextItems) => {
            const triggerPath = findNodePath(nextItems, payload.triggerNodeId)
            const branch = getBranchAtPath(nextItems, parsePathKey(payload.parentPathKey))
            const actionIndex = triggerPath?.at(-1)

            if (!triggerPath || !branch || actionIndex === undefined) {
              return
            }

            const nextNode = payload.kind === LogicTreeNodeKind.GROUP
              ? createGroupNode()
              : createConditionNode()

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
          controlActionCount.value += 1
        }

        const renderSummary = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
          'data-test': `summary-${slotProps.node.id}`,
        }, slotProps.node.row.title)

        const renderEdit = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
          'data-test': `edit-${slotProps.node.id}`,
        }, [
          ...(slotProps.node.row.controls ?? []).flatMap((control) => [
            h('span', {
              'data-test': `value-${control.id}`,
              key: `${control.id}-value`,
            }, control.value === null ? 'null' : String(control.value ?? 'empty')),
            h('button', {
              'data-skip-row-click': 'true',
              'data-test': `clear-${control.id}`,
              key: `${control.id}-clear`,
              onClick: () => {
                slotProps.onControlUpdate(control.id, null)
              },
            }, 'clear'),
            h('button', {
              'data-skip-row-click': 'true',
              'data-test': `action-${control.id}`,
              key: `${control.id}-action`,
              onClick: () => {
                slotProps.onControlAction(control.id)
              },
            }, 'action'),
          ]),
        ])

        const renderActions = (slotProps: UiLogicTreeRowSlotProps) => (
          slotProps.node.row.actions ?? []
        ).map((action) => h('button', {
          'data-skip-row-click': 'true',
          'data-test': `action-${action.id}`,
          key: action.id,
          onClick: () => {
            slotProps.onAction(action)
          },
        }, action.label))

        const renderTrailing = (slotProps: UiLogicTreeRowSlotProps) => slotProps.node.row.removable
          ? h('button', {
            'data-skip-row-click': 'true',
            'data-test': `remove-${slotProps.node.id}`,
            onClick: slotProps.onRemove,
          }, 'remove')
          : null

        watch(() => props.items, (nextItems) => {
          items.value = cloneNodes(nextItems ?? [])
        }, { deep: true, immediate: true })

        return () => h('div', {
          'data-test': 'logic-tree-fixture',
        }, [
          h('div', {
            'data-test': 'controlled-info',
          }, controlledInfo.value),
          h(UiLogicTree, {
            onControlAction: handleControlAction,
            'onRow:add': handleRowAdd,
            'onRow:edit': handleRowEdit,
            'onRow:remove': handleRowRemove,
            'onUpdate:items': (nextItems: UiLogicTreeNode[]) => {
              items.value = cloneNodes(nextItems)
            },
            items: items.value,
          }, {
            'row-actions': (slotProps: UiLogicTreeRowSlotProps) => renderActions(slotProps),
            'row-edit': (slotProps: UiLogicTreeRowSlotProps) => renderEdit(slotProps),
            'row-summary': (slotProps: UiLogicTreeRowSlotProps) => renderSummary(slotProps),
            'row-trailing': (slotProps: UiLogicTreeRowSlotProps) => renderTrailing(slotProps),
          }),
        ])
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
