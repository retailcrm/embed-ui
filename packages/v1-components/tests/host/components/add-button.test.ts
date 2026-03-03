import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiAddButton from '@/host/components/add-button/UiAddButton.vue'

import { COLOR } from '@/common/components/add-button'

describe('host/components/add-button', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiAddButton, {
      attachTo: el as HTMLElement,
      slots: {
        default: 'Add Button',
      },
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null
  })

  test('renders default state and classes', () => {
    createComponent()

    const button = wrapper?.find('button')

    expect(button?.attributes('type')).toBe('button')
    expect(button?.classes()).toContain('ui-v1-add-button')
    expect(button?.classes()).toContain('ui-v1-add-button_green')
    expect(button?.classes()).not.toContain('ui-v1-add-button_small')
    expect(button?.attributes('style')).toContain('height: 80px;')
    expect(wrapper?.find('.ui-v1-add-button__icon').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-add-button__description').exists()).toBe(false)
  })

  test('supports type, color and disabled props', () => {
    createComponent({
      props: {
        type: 'submit',
        color: COLOR.PURPLE,
        disabled: true,
      },
    })

    const button = wrapper?.find('button')

    expect(button?.attributes('type')).toBe('submit')
    expect(button?.classes()).toContain('ui-v1-add-button_purple')
    expect(button?.classes()).toContain('ui-v1-add-button_disabled')
    expect(button?.attributes('disabled')).toBeDefined()
  })

  test('renders description only for non-small mode', async () => {
    createComponent({
      props: {
        small: false,
      },
      slots: {
        default: 'Add Button',
        description: 'Description',
      },
    })

    expect(wrapper?.find('.ui-v1-add-button__description').exists()).toBe(true)

    await wrapper?.setProps({ small: true })
    await nextTick()

    expect(wrapper?.find('.ui-v1-add-button__description').exists()).toBe(false)
  })

  test('applies custom height only in non-small mode', async () => {
    createComponent({
      props: {
        height: 120,
        small: false,
      },
    })

    const button = wrapper?.find('button')
    expect(button?.attributes('style')).toContain('height: 120px;')

    await wrapper?.setProps({
      small: true,
      height: '50%',
    })
    await nextTick()

    expect(button?.attributes('style') ?? '').not.toContain('height:')
  })

  test('supports custom icon slot', () => {
    createComponent({
      slots: {
        default: 'Add Button',
        icon: '<span class="custom-icon">+</span>',
      },
    })

    expect(wrapper?.find('.custom-icon').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-add-button__icon').exists()).toBe(false)
  })

  test('forwards aria attributes and native events', async () => {
    const clickListener = vi.fn()
    const focusListener = vi.fn()

    createComponent({
      attrs: {
        'aria-label': 'Add item',
        'data-qa': 'add-button',
        onClick: clickListener,
        onFocus: focusListener,
      },
    })

    const button = wrapper?.find('button')

    expect(button?.attributes('aria-label')).toBe('Add item')
    expect(button?.attributes('data-qa')).toBe('add-button')

    await button?.trigger('focus')
    await button?.trigger('click')

    expect(focusListener).toHaveBeenCalledTimes(1)
    expect(clickListener).toHaveBeenCalledTimes(1)
  })
})
