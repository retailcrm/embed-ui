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

import { WIDTH } from '@/common/components/width'

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

  test('check clearable method, when click button', async () => {
    createComponent({
      clearable: true,
      value: 'kyle',
      selection: [{
        id: 'option-1',
        value: 'kyle',
        label: 'Kyle Simmons',
        isMatched: () => true,
      }],
    })

    const input = wrapper?.find('input')
    const clearButton = wrapper?.find('.ui-v1-textbox__eraser')

    expect(input?.attributes('readonly')).toBeUndefined()
    expect(clearButton?.exists()).toBe(true)
    expect(clearButton?.attributes('disabled')).toBeUndefined()

    await input?.trigger('input')

    expect((input?.element as HTMLInputElement).value).toBe('Kyle Simmons')
    expect(wrapper?.emitted('input')).toBeUndefined()

    await clearButton?.trigger('click')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([null])
    expect(wrapper?.emitted('clear')).toBeTruthy()
  })

  test('supports fluid and exact width modes', async () => {
    createComponent({
      width: WIDTH.FLUID,
    })

    let root = wrapper?.find('.ui-v1-select')

    expect(root?.classes()).toContain('ui-v1-select_fluid')
    expect(root?.attributes('style')).toBeUndefined()

    await wrapper?.setProps({
      width: '240',
    })

    root = wrapper?.find('.ui-v1-select')

    expect(root?.classes()).not.toContain('ui-v1-select_exact')
    expect(root?.attributes('style')).toContain('width: 240px;')
  })
})
