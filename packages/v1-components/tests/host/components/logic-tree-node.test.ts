import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiLogicTreeNode from '@/host/components/logic-tree/UiLogicTreeNode.vue'

import { LogicTreeConjunction, LogicTreeTone } from '@/common/components/logic-tree'

describe('host/components/logic-tree-node', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}, slots = {}) => {
    wrapper = mount(UiLogicTreeNode, {
      props,
      slots: {
        ...slots,
        content: '<span>Node content</span>',
        trailing: '<button type="button">remove</button>',
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('emits node activation events for enabled nodes', async () => {
    createComponent({
      pathKey: '0.1',
    })

    await wrapper?.find('.ui-v1-logic-tree__surface-node-content').trigger('click')

    expect(wrapper?.emitted('node-click')).toEqual([['0.1']])
    expect(wrapper?.emitted('node-edit')).toEqual([[true]])
  })

  test('renders disabled node as non-interactive', async () => {
    createComponent({
      disabled: true,
      pathKey: '0.1',
    })

    const node = wrapper?.find('.ui-v1-logic-tree__surface-node-content')

    expect(node?.classes()).toContain('ui-v1-logic-tree__surface-node-content_disabled')
    expect(node?.attributes('aria-disabled')).toBe('true')
    expect(node?.attributes('role')).toBe('button')
    expect(node?.attributes('tabindex')).toBeUndefined()

    await node?.trigger('click')
    await node?.trigger('keydown', { key: 'Enter' })

    expect(wrapper?.emitted('node-click')).toBeUndefined()
    expect(wrapper?.emitted('node-edit')).toBeUndefined()
  })

  test('renders conjunction as a popper target with consumer poppers slot', async () => {
    createComponent({
      conjunction: LogicTreeConjunction.AND,
      conjunctionLabel: 'AND',
      conjunctionTone: LogicTreeTone.BLUE,
      connectors: [
        {
          continues: false,
          tone: LogicTreeTone.BLUE,
          visible: true,
        },
      ],
      pathKey: '0.1',
    }, {
      'conjunction-poppers': '<span data-test-id="conjunction-popper">Popper content</span>',
    })

    const target = wrapper?.find('.ui-v1-logic-tree__relation-badge')

    expect(target?.element.tagName).toBe('BUTTON')
    expect(target?.attributes('type')).toBe('button')
    expect(target?.text()).toBe('AND')
    expect(wrapper?.find('[data-test-id="conjunction-popper"]').exists()).toBe(true)

    await target?.trigger('click')

    expect(wrapper?.emitted('node-click')).toBeUndefined()
    expect(wrapper?.emitted('node-edit')).toBeUndefined()
  })
})
