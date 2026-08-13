import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type { UiLogicTreeNode } from '@/common/components/logic-tree'

import {
  afterEach,
  beforeEach,
  expect,
  test,
} from 'vitest'

import { createApp } from 'vue'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'

import {
  LogicTreeNodeKind,
  LogicTreeNodeView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import { storybookHostProvider } from '../storybook/provider'

type FixtureNodeData = {
  actions?: Array<{
    id: string;
    kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
    label: string;
  }>;
  controls?: Array<{
    clearable?: boolean;
    id: string;
    kind: 'select';
    label: string;
    options?: Array<{
      id: string;
      label: string;
      value: string;
    }>;
    value?: string | null;
  }>;
  removable?: boolean;
  title: string;
}

type FixtureNode = UiLogicTreeNode<FixtureNodeData>

type WorkerApi = {
  run (channel: Channel, props?: { items?: FixtureNode[] }): Promise<void>;
  release (): void;
}

function createHostApp (receiver: Receiver) {
  return createApp({
    setup () {
      return () => h(HostedTree, {
        provider: storybookHostProvider,
        receiver,
      })
    },
  })
}

async function flushRuntime (receiver: Receiver) {
  await receiver.flush()
  await flushPromises()
}

async function waitFor<T> (
  receiver: Receiver,
  resolver: () => T | null | undefined,
  message: string
): Promise<T> {
  for (let i = 0; i < 60; i += 1) {
    const value = resolver()

    if (value) {
      return value
    }

    await new Promise(resolve => setTimeout(resolve, 10))
    await flushRuntime(receiver)
  }

  throw new Error(message)
}

let mountRoot: HTMLElement | null = null

beforeEach(() => {
  mountRoot = document.createElement('div')
  document.body.appendChild(mountRoot)
})

afterEach(() => {
  mountRoot?.remove()
  mountRoot = null
})

test('worker keeps add/edit/remove controlled and supports keyboard activation', async () => {
  const worker = new Worker(new URL('./__fixtures__/logic-tree.worker.ts', import.meta.url), { type: 'module' })
  const host = createRpcEndpoint<WorkerApi>(worker)
  const receiver = createReceiver()
  const mount = document.createElement('div')

  const items: FixtureNode[] = [
    {
      id: 'condition-root',
      kind: LogicTreeNodeKind.CONDITION,
      data: {
        controls: [
          {
            clearable: true,
            id: 'condition-root-control',
            kind: 'select',
            label: 'Значение',
            options: [
              { id: 'condition-root-control-option-a', label: 'A', value: 'A' },
              { id: 'condition-root-control-option-b', label: 'B', value: 'B' },
            ],
            value: 'A',
          },
        ],
        editable: false,
        removable: false,
        title: 'Узел 1',
        view: LogicTreeNodeView.SUMMARY,
      },
      tone: LogicTreeTone.BLUE,
    },
    {
      id: 'actions-root',
      kind: LogicTreeNodeKind.CONDITION,
      data: {
        actions: [
          {
            id: 'action-add-condition',
            kind: LogicTreeNodeKind.CONDITION,
            label: 'Условие',
          },
          {
            id: 'action-add-group',
            kind: LogicTreeNodeKind.GROUP,
            label: 'Группа',
          },
        ],
        editable: false,
        title: 'Добавить',
        view: LogicTreeNodeView.ACTIONS,
      },
      tone: LogicTreeTone.BLUE,
    },
    {
      children: [
        {
          id: 'group-root-child',
          kind: LogicTreeNodeKind.CONDITION,
          data: {
            editable: false,
            removable: false,
            title: 'Акция внутри группы',
            view: LogicTreeNodeView.SUMMARY,
          },
          tone: LogicTreeTone.GREEN,
        },
      ],
      collapsible: true,
      expanded: true,
      id: 'group-root',
      kind: LogicTreeNodeKind.GROUP,
      data: {
        editable: false,
        removable: false,
        title: '2 акции',
        view: LogicTreeNodeView.SUMMARY,
      },
      tone: LogicTreeTone.GREEN,
    },
  ]

  mountRoot?.appendChild(mount)
  createHostApp(receiver).mount(mount)

  try {
    await host.call.run(receiver.receive, { items })
    await flushRuntime(receiver)

    const nodeSurface = await waitFor(
      receiver,
      () => mount.querySelector('[data-path-key="0"] .ui-v1-logic-tree__surface-node-content') as HTMLElement | null,
      'Timed out waiting for first logic-tree node'
    )

    const groupSurface = await waitFor(
      receiver,
      () => mount.querySelector('[data-path-key="2"] .ui-v1-logic-tree__surface-node-content') as HTMLElement | null,
      'Timed out waiting for collapsible logic-tree node'
    )

    expect(mount.querySelector('[data-test="summary-group-root"]')?.textContent).toContain('2 акции')
    expect(mount.querySelector('[data-test="summary-group-root-child"]')?.textContent).toContain('Акция внутри группы')

    groupSurface.click()
    await flushRuntime(receiver)

    expect(mount.querySelector('[data-test="summary-group-root"]')?.textContent).toContain('2 акции')
    expect(mount.querySelector('[data-test="edit-group-root"]')).toBeNull()

    await waitFor(
      receiver,
      () => mount.querySelector('[data-test="summary-group-root-child"]') === null
        ? mount.querySelector('[data-test="logic-tree-fixture"]')
        : null,
      'Timed out waiting for collapsible node to collapse'
    )

    nodeSurface.focus()
    nodeSurface.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
    }))

    await flushRuntime(receiver)

    const editNode = await waitFor(
      receiver,
      () => mount.querySelector('[data-test="edit-condition-root"]') as HTMLElement | null,
      'Timed out waiting for edit node after Enter key'
    )

    expect(editNode.textContent).toContain('A')

    const clearButton = mount.querySelector('[data-test="clear-condition-root-control"]')

    if (!(clearButton instanceof HTMLButtonElement)) {
      throw new Error('Expected clear button to exist')
    }

    clearButton.click()
    await flushRuntime(receiver)

    await waitFor(
      receiver,
      () => mount.querySelector('[data-test="value-condition-root-control"]')?.textContent === 'null'
        ? mount.querySelector('[data-test="value-condition-root-control"]')
        : null,
      'Timed out waiting for null control value'
    )

    document.body.click()
    await flushRuntime(receiver)

    nodeSurface.focus()
    nodeSurface.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: ' ',
    }))

    await flushRuntime(receiver)

    await waitFor(
      receiver,
      () => mount.querySelector('[data-test="edit-condition-root"]') as HTMLElement | null,
      'Timed out waiting for edit node after Space key'
    )

    const addConditionButton = mount.querySelector('[data-test="action-action-add-condition"]')

    if (!(addConditionButton instanceof HTMLButtonElement)) {
      throw new Error('Expected add condition button to exist')
    }

    addConditionButton.click()
    await flushRuntime(receiver)

    await waitFor(
      receiver,
      () => Array.from(mount.querySelectorAll('[data-test^="summary-"]'))
        .find((node) => node.textContent?.includes('Новое условие')) as HTMLElement | null,
      'Timed out waiting for added condition node'
    )

    const addGroupButton = await waitFor(
      receiver,
      () => mount.querySelector('[data-test="action-action-add-group"]') as HTMLButtonElement | null,
      'Timed out waiting for add group button'
    )

    addGroupButton.click()
    await flushRuntime(receiver)

    await waitFor(
      receiver,
      () => Array.from(mount.querySelectorAll('[data-test^="summary-"]'))
        .find((node) => node.textContent?.includes('Новая группа')) as HTMLElement | null,
      'Timed out waiting for added group node'
    )

    const addedConditionRemoveButton = await waitFor(
      receiver,
      () => mount.querySelector('[data-test="remove-condition-1"]') as HTMLButtonElement | null,
      'Timed out waiting for remove button on added condition'
    )

    addedConditionRemoveButton.click()
    await flushRuntime(receiver)

    await waitFor(
      receiver,
      () => mount.querySelector('[data-test="remove-condition-1"]') === null
        ? mount.querySelector('[data-test="logic-tree-fixture"]')
        : null,
      'Timed out waiting for added condition removal'
    )

    expect(
      Array.from(mount.querySelectorAll('[data-test^="summary-"]')).some((node) => node.textContent?.includes('Новая группа'))
    ).toBe(true)
  } finally {
    await host.call.release()
    worker.terminate()
  }
})
