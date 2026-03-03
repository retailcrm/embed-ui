import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiRadio from '@/host/components/radio/UiRadio.vue'

describe('host/components/radio', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}, attrs = {}) => {
    wrapper = mount(UiRadio, {
      props: {
        value: 'option-a',
        ...props,
      },
      attrs,
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders native radio input with generated id', () => {
    createComponent()

    const input = wrapper?.find('input')

    expect(input?.attributes('type')).toBe('radio')
    expect(input?.attributes('id')).toMatch(/^ui-v1-radio-/)
  })

  test('marks input as checked when model equals value', () => {
    createComponent({
      model: 'option-a',
      value: 'option-a',
    })

    expect((wrapper?.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  test('emits change and update:model on native change', async () => {
    createComponent({
      value: 'option-a',
    })

    const input = wrapper?.find('input')
    await input?.trigger('change')

    expect(wrapper?.emitted('change')?.at(0)).toEqual(['option-a'])
    expect(wrapper?.emitted('update:model')?.at(0)).toEqual(['option-a'])
  })

  test('forwards aria-label to input and strips aria-checked', () => {
    createComponent(
      {},
      {
        'aria-label': 'Shipping option',
        'aria-checked': 'true',
      }
    )

    const root = wrapper?.find('.ui-v1-radio')
    const input = wrapper?.find('input')

    expect(root?.attributes('aria-label')).toBeUndefined()
    expect(input?.attributes('aria-label')).toBe('Shipping option')
    expect(input?.attributes('aria-checked')).toBeUndefined()
  })

  test('supports required prop on native input', () => {
    createComponent({
      required: true,
    })

    const input = wrapper?.find('input')
    expect(input?.attributes('required')).toBeDefined()
  })
})
