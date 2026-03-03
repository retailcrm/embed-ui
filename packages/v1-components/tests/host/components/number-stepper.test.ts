import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiNumberStepper from '@/host/components/number-stepper/UiNumberStepper.vue'

describe('host/components/number-stepper', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}) => {
    wrapper = mount(UiNumberStepper, {
      props: {
        value: 5,
        min: 0,
        max: 10,
        step: 1,
        ...props,
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders spinbutton aria attributes on input', () => {
    createComponent({
      id: 'stepper-a11y',
      value: 7,
      min: 0,
      max: 10,
    })

    const input = wrapper?.find('input')

    expect(input?.attributes('role')).toBe('spinbutton')
    expect(input?.attributes('aria-valuenow')).toBe('7')
    expect(input?.attributes('aria-valuemin')).toBe('0')
    expect(input?.attributes('aria-valuemax')).toBe('10')

    const buttons = wrapper?.findAll('button')
    expect(buttons?.[0].attributes('aria-controls')).toBe('stepper-a11y-input')
    expect(buttons?.[1].attributes('aria-controls')).toBe('stepper-a11y-input')
  })

  test('supports inline mode via outlined=false', () => {
    createComponent({
      outlined: false,
      size: 'sm',
      value: 7,
    })

    const root = wrapper?.find('.ui-v1-number-stepper')
    const textbox = wrapper?.find('.ui-v1-textbox')

    expect(root?.classes()).toContain('ui-v1-number-stepper_inline')
    expect(root?.classes()).not.toContain('ui-v1-number-stepper_outlined')
    expect(textbox?.classes()).not.toContain('ui-v1-textbox_outlined')
    expect(textbox?.classes()).toContain('ui-v1-textbox_autofit')
  })

  test('clamps to range when clamp=true', async () => {
    createComponent({
      clamp: true,
      min: 0,
      max: 10,
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = '100'
    await input?.trigger('input')
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([10])
    expect((wrapper?.find('input').element as HTMLInputElement).value).toBe('10')
  })

  test('does not clamp and emits violation when clamp=false', async () => {
    createComponent({
      clamp: false,
      min: 0,
      max: 10,
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = '100'
    await input?.trigger('input')
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([100])
    expect(wrapper?.emitted('violation')?.at(-1)?.[0]).toEqual({
      value: 100,
      codes: ['too-large'],
    })
    expect((wrapper?.find('input').element as HTMLInputElement).value).toBe('100')
  })

  test('emits null when nullable=true and value cleared', async () => {
    createComponent({
      nullable: true,
      value: 5,
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = ''
    await input?.trigger('input')
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([null])
  })

  test('emits zero or min when nullable=false and value cleared', async () => {
    createComponent({
      nullable: false,
      min: 5,
      max: 10,
      value: 7,
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = ''
    await input?.trigger('input')
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([5])
    expect((wrapper?.find('input').element as HTMLInputElement).value).toBe('5')
  })

  test('supports keyboard stepping and boundaries', async () => {
    createComponent({
      value: 5,
      min: 0,
      max: 10,
      step: 1,
    })

    const input = wrapper?.find('input')

    await input?.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()
    expect(wrapper?.emitted('increase')?.at(-1)).toEqual([6])

    await input?.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper?.emitted('decrease')?.at(-1)).toEqual([5])

    await input?.trigger('keydown', { key: 'Home' })
    await nextTick()
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([0])

    await input?.trigger('keydown', { key: 'End' })
    await nextTick()
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([10])
  })

  test('disables step buttons on boundaries when clamp=true', async () => {
    createComponent({
      value: 10,
      clamp: true,
      min: 0,
      max: 10,
    })

    const buttons = wrapper?.findAll('button')
    const decrease = buttons?.[0]
    const increase = buttons?.[1]

    expect(decrease?.attributes('disabled')).toBeUndefined()
    expect(increase?.attributes('disabled')).toBeDefined()

    await decrease?.trigger('click')
    await nextTick()

    expect(wrapper?.emitted('decrease')?.at(-1)).toEqual([9])
  })
})
