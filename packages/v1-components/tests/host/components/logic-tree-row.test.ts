import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiLogicTreeRow from '@/host/components/logic-tree/UiLogicTreeRow.vue'

describe('host/components/logic-tree-row', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}) => {
    wrapper = mount(UiLogicTreeRow, {
      props,
      slots: {
        content: '<span>Row content</span>',
        trailing: '<button type="button">remove</button>',
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('emits row activation events for enabled rows', async () => {
    createComponent({
      pathKey: '0.1',
    })

    await wrapper?.find('.ui-v1-logic-tree__surface-row-content').trigger('click')

    expect(wrapper?.emitted('row-click')).toEqual([['0.1']])
    expect(wrapper?.emitted('row-edit')).toEqual([[true]])
  })

  test('renders disabled row as non-interactive', async () => {
    createComponent({
      disabled: true,
      pathKey: '0.1',
    })

    const row = wrapper?.find('.ui-v1-logic-tree__surface-row-content')

    expect(row?.classes()).toContain('ui-v1-logic-tree__surface-row-content_disabled')
    expect(row?.attributes('aria-disabled')).toBe('true')
    expect(row?.attributes('tabindex')).toBeUndefined()

    await row?.trigger('click')
    await row?.trigger('keydown', { key: 'Enter' })

    expect(wrapper?.emitted('row-click')).toBeUndefined()
    expect(wrapper?.emitted('row-edit')).toBeUndefined()
  })
})
