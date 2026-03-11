import type { UiSelectTriggerMethods } from '@/common/components/select'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiSelectTrigger from '@/host/components/select/UiSelectTrigger.vue'

describe('host/components/select-trigger', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}) => {
    wrapper = mount(UiSelectTrigger, {
      props: {
        id: 'select-a11y',
        selection: [],
        ...props,
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders combobox aria attributes on native input', () => {
    createComponent({
      filterable: true,
      expanded: true,
      activeDescendant: 'option-2',
    })

    const root = wrapper?.find('.ui-v1-select')
    const input = wrapper?.find('input')

    expect(root?.attributes('role')).toBeUndefined()
    expect(input?.attributes('role')).toBe('combobox')
    expect(input?.attributes('aria-controls')).toBe('select-a11y-popper')
    expect(input?.attributes('aria-haspopup')).toBe('listbox')
    expect(input?.attributes('aria-expanded')).toBe('true')
    expect(input?.attributes('aria-activedescendant')).toBe('option-2')
  })

  test('opens/closes by keyboard and emits keydown', async () => {
    createComponent({
      expanded: false,
    })

    const input = wrapper?.find('input')

    await input?.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([true])
    expect(wrapper?.emitted('keydown')?.at(-1)?.[0]).toMatchObject({ key: 'ArrowDown' })

    await wrapper?.setProps({ expanded: true })

    await input?.trigger('keydown', { key: 'Escape' })
    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([false])
    expect(wrapper?.emitted('keydown')?.at(-1)?.[0]).toMatchObject({ key: 'Escape' })
  })

  test('exposes imperative trigger methods', async () => {
    createComponent({
      expanded: false,
      filterable: true,
    })

    const methods = wrapper?.vm as unknown as UiSelectTriggerMethods

    methods.open()
    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([true])

    await wrapper?.setProps({ expanded: true })

    methods.close()
    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([false])

    methods.onClear()
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([null])
    expect(wrapper?.emitted('clear')?.at(-1)).toEqual([undefined])
  })
})
