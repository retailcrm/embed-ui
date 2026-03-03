import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { INPUTMODE, TYPE } from '@/common/components/textbox'

describe('host/components/textbox', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}) => {
    wrapper = mount(UiTextbox, {
      props: {
        value: '',
        ...props,
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('autofit is disabled by default', () => {
    createComponent()

    expect(wrapper?.find('.ui-v1-textbox').classes()).not.toContain('ui-v1-textbox_autofit')
  })

  test('sanitizes input for numeric inputmode', async () => {
    createComponent({
      inputmode: INPUTMODE.NUMERIC,
      value: '',
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = 'a1b2-3'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['123'])
  })

  test('sanitizes decimal input with decimals limit', async () => {
    createComponent({
      inputmode: INPUTMODE.DECIMAL,
      decimals: 2,
      min: -100,
      value: '',
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = '-0012,345x'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['-12.34'])
  })

  test('does not allow minus sign when min is non-negative', async () => {
    createComponent({
      inputmode: INPUTMODE.DECIMAL,
      min: 0,
      value: '',
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = '-12'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['12'])
  })

  test('derives inputmode from type when inputmode is not provided', () => {
    createComponent({
      type: TYPE.EMAIL,
      value: '',
    })

    const input = wrapper?.find('input')

    expect(input?.attributes('type')).toBe(TYPE.EMAIL)
    expect(input?.attributes('inputmode')).toBe(INPUTMODE.EMAIL)
  })

  test('drops incompatible inputmode for typed inputs', () => {
    createComponent({
      type: TYPE.EMAIL,
      inputmode: INPUTMODE.NUMERIC,
      value: '',
    })

    const input = wrapper?.find('input')

    expect(input?.attributes('inputmode')).toBeUndefined()
  })

  test('supports keyboard step for decimal mode on arrow up/down', async () => {
    createComponent({
      inputmode: INPUTMODE.DECIMAL,
      value: '1.2',
      step: 0.1,
      min: 0,
      max: 5,
    })

    const input = wrapper?.find('input')

    await input?.trigger('keydown', { key: 'ArrowUp' })
    await input?.trigger('keydown', { key: 'ArrowDown' })

    expect(wrapper?.emitted('update:value')?.[0]).toEqual(['1.3'])
    expect(wrapper?.emitted('update:value')?.[1]).toEqual(['1.1'])
  })

  test('emits normalized decimal value when prop contains comma', () => {
    createComponent({
      inputmode: INPUTMODE.DECIMAL,
      value: '12,5',
    })

    expect(wrapper?.emitted('update:value')?.at(0)).toEqual(['12.5'])
  })

  test('renders and handles clear button', async () => {
    createComponent({
      clearable: true,
      value: 'test',
    })

    const clearButton = wrapper?.find('.ui-v1-textbox__eraser svg')
    expect(clearButton?.exists()).toBe(true)

    await clearButton?.trigger('click')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([''])
    expect(wrapper?.emitted('clear')).toBeTruthy()
  })

  test('passes inputAttributes to native element', () => {
    createComponent({
      inputAttributes: {
        'aria-controls': 'target-id',
        'data-test': 'textbox-input',
      },
    })

    const input = wrapper?.find('input')

    expect(input?.attributes('aria-controls')).toBe('target-id')
    expect(input?.attributes('data-test')).toBe('textbox-input')
  })
})
