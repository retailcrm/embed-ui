import type {
  UiLogicTreeNode,
  UiLogicTreeNodeAddPayload,
  UiLogicTreeNodeEditPayload,
  UiLogicTreeNodeRemovePayload,
  UiLogicTreeNodeSlotProps,
  UiLogicTreeProperties,
} from '@/common/components/logic-tree'

import {
  computed,
  h,
  ref,
  watch,
} from 'vue'

import {
  LogicTreeNodeKind,
  LogicTreeNodeView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import { UiLogicTree } from '@/remote/components/logic-tree'

import { createComponentEndpoint } from '../../storybook/endpoint'

const fixtureControlKind = {
  SELECT: 'select',
} as const

type FixtureControlKind = typeof fixtureControlKind[keyof typeof fixtureControlKind]

type FixtureOption = {
  id: string;
  label: string;
  value: string;
}

type FixtureControl = {
  clearable?: boolean;
  id: string;
  kind: FixtureControlKind;
  label: string;
  options?: FixtureOption[];
  value?: string | null;
}

type FixtureAction = {
  id: string;
  kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
  label: string;
}

type FixtureNodeData = {
  actions?: FixtureAction[];
  controls?: FixtureControl[];
  removable?: boolean;
  title: string;
}

type FixtureNode = UiLogicTreeNode<FixtureNodeData>
type FixtureSlotProps = Omit<UiLogicTreeNodeSlotProps, 'node'> & {
  node: FixtureNode;
}

type UiLogicTreeWorkerProps = UiLogicTreeProperties<FixtureNodeData>

const toFixtureSlotProps = (slotProps: UiLogicTreeNodeSlotProps): FixtureSlotProps => (
  slotProps as FixtureSlotProps
)

const cloneNodes = (nodes: FixtureNode[]): FixtureNode[] => nodes.map((node) => ({
  ...node,
  children: node.children ? cloneNodes(node.children) : undefined,
  data: {
    ...node.data,
    actions: node.data.actions?.map((action) => ({ ...action })),
    controls: node.data.controls?.map((control) => ({
      ...control,
      options: control.options?.map((option) => ({ ...option })),
    })),
  },
}))

const parsePathKey = (pathKey: string | null): number[] => (
  pathKey
    ? pathKey.split('.').filter(Boolean).map((segment) => Number(segment))
    : []
)

const getBranchAtPath = (nodes: FixtureNode[], parentPath: number[]): FixtureNode[] | null => {
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

const getNodeAtPath = (nodes: FixtureNode[], path: number[]): FixtureNode | null => {
  const branch = getBranchAtPath(nodes, path.slice(0, -1))
  const index = path.at(-1)

  if (index === undefined) {
    return null
  }

  return branch?.[index] ?? null
}

const findNodePath = (
  nodes: FixtureNode[],
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

const createActionNode = (): FixtureNode => ({
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
    title: 'Добавить',
    view: LogicTreeNodeView.ACTIONS,
  },
  tone: LogicTreeTone.BLUE,
})

const createConditionNode = (title = 'Новое условие'): FixtureNode => ({
  id: nextId('condition'),
  kind: LogicTreeNodeKind.CONDITION,
  data: {
    controls: [
      {
        clearable: true,
        id: nextId('value'),
        kind: fixtureControlKind.SELECT,
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
    view: LogicTreeNodeView.SUMMARY,
  },
  tone: LogicTreeTone.BLUE,
})

const createGroupNode = (): FixtureNode => ({
  children: [createActionNode()],
  expanded: true,
  id: nextId('group'),
  kind: LogicTreeNodeKind.GROUP,
  data: {
    editable: false,
    removable: true,
    title: 'Новая группа',
    view: LogicTreeNodeView.SUMMARY,
  },
  tone: LogicTreeTone.GREEN,
})

createComponentEndpoint<UiLogicTreeWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const items = ref<FixtureNode[]>([])
        const controlActionCount = ref(0)
        const controlledInfo = computed(() => [
          `nodes:${items.value.length}`,
          `control-actions:${controlActionCount.value}`,
        ].join(' '))

        const mutateItems = (mutator: (nextItems: FixtureNode[]) => void) => {
          const nextItems = cloneNodes(items.value)

          mutator(nextItems)
          items.value = nextItems
        }

        const handleNodeAdd = (payload: UiLogicTreeNodeAddPayload) => {
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

        const handleNodeEdit = (payload: UiLogicTreeNodeEditPayload) => {
          mutateItems((nextItems) => {
            const node = getNodeAtPath(nextItems, parsePathKey(payload.pathKey))
            const control = node?.data.controls?.find((item) => item.id === payload.controlId)

            if (control) {
              control.value = payload.value
            }
          })
        }

        const handleNodeRemove = (payload: UiLogicTreeNodeRemovePayload) => {
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

        const renderSummary = (slotProps: FixtureSlotProps) => h('div', {
          'data-test': `summary-${slotProps.node.id}`,
        }, slotProps.node.data.title)

        const renderEdit = (slotProps: FixtureSlotProps) => h('div', {
          'data-test': `edit-${slotProps.node.id}`,
        }, [
          ...(slotProps.node.data.controls ?? []).flatMap((control) => [
            h('span', {
              'data-test': `value-${control.id}`,
              key: `${control.id}-value`,
            }, control.value === null ? 'null' : String(control.value ?? 'empty')),
            h('button', {
              'data-skip-node-click': 'true',
              'data-test': `clear-${control.id}`,
              key: `${control.id}-clear`,
              onClick: () => {
                slotProps.onControlUpdate(control.id, null)
              },
            }, 'clear'),
            h('button', {
              'data-skip-node-click': 'true',
              'data-test': `action-${control.id}`,
              key: `${control.id}-action`,
              onClick: () => {
                slotProps.onControlAction(control.id)
              },
            }, 'action'),
          ]),
        ])

        const renderActions = (slotProps: FixtureSlotProps) => (
          slotProps.node.data.actions ?? []
        ).map((action) => h('button', {
          'data-skip-node-click': 'true',
          'data-test': `action-${action.id}`,
          key: action.id,
          onClick: () => {
            slotProps.onAction(action.id, action.kind)
          },
        }, action.label))

        const renderTrailing = (slotProps: FixtureSlotProps) => slotProps.node.data.removable
          ? h('button', {
            'data-skip-node-click': 'true',
            'data-test': `remove-${slotProps.node.id}`,
            onClick: slotProps.onRemove,
          }, 'remove')
          : null

        const renderNode = (slotProps: FixtureSlotProps) => {
          if (slotProps.nodeView === LogicTreeNodeView.ACTIONS) {
            return renderActions(slotProps)
          }

          if (slotProps.editing) {
            return renderEdit(slotProps)
          }

          return renderSummary(slotProps)
        }

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
            'onNode:add': handleNodeAdd,
            'onNode:edit': handleNodeEdit,
            'onNode:remove': handleNodeRemove,
            'onUpdate:items': (nextItems: FixtureNode[]) => {
              items.value = cloneNodes(nextItems)
            },
            items: items.value,
          }, {
            'node': (slotProps: UiLogicTreeNodeSlotProps) => renderNode(toFixtureSlotProps(slotProps)),
            'node-trailing': (slotProps: UiLogicTreeNodeSlotProps) => renderTrailing(toFixtureSlotProps(slotProps)),
          }),
        ])
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
