import { describe, expect, test } from 'vitest'

import { h } from 'vue'

import { collectTabs } from '@/host/components/tab/tabs'
import { UiTab, UiTabGroup } from '@/remote/components/tab'

describe('remote/components/tab', () => {
  test('exports UiTab and UiTabGroup wrappers', () => {
    expect(UiTab).toBeTruthy()
    expect(UiTabGroup).toBeTruthy()
  })

  test('keeps UiTab wrapper consumable by host-side tab resolution', () => {
    const tabs = collectTabs([
      h(UiTab, {
        id: 'overview',
        label: 'Overview',
        counter: '8',
      }, {
        icon: () => h('svg', { 'aria-hidden': 'true' }),
      }),
      h(UiTab, {
        id: 'files',
        disabled: true,
      }, {
        icon: () => h('svg'),
        content: () => h('div', 'Files panel'),
      }),
    ])

    expect(tabs).toHaveLength(2)
    expect(tabs[0]).toMatchObject({
      id: 'overview',
      label: 'Overview',
      counter: '8',
      disabled: false,
      iconOnly: false,
    })
    expect(tabs[0]?.iconSlot).toBeTypeOf('function')
    expect(tabs[1]?.contentSlot).toBeTypeOf('function')
    expect(tabs[1]).toMatchObject({
      id: 'files',
      label: '',
      counter: null,
      disabled: true,
      iconOnly: true,
    })
  })
})
