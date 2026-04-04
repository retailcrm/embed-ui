import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'

import UiToggleButton from '@/host/components/toggle-button/UiToggleButton.vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

describe('host/components/toggle-button', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders pressed grouped button without implicit aria state', () => {
    wrapper = mount(UiToggleButton, {
      props: {
        pressed: true,
        grouped: true,
        size: UiToggleButtonSize.SM,
      },
      slots: {
        default: () => 'Теги',
      },
    })

    const button = wrapper.find('.ui-v1-toggle-button')

    expect(button.element.tagName).toBe('BUTTON')
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-pressed')).toBeUndefined()
    expect(button.classes()).toContain('ui-v1-toggle-button_sm')
    expect(button.classes()).toContain('ui-v1-toggle-button_pressed')
    expect(button.classes()).toContain('ui-v1-toggle-button_grouped')
    expect(button.text()).toContain('Теги')
  })

  test('preserves explicit aria state from attrs', () => {
    wrapper = mount(UiToggleButton, {
      props: {
        disabled: true,
      },
      attrs: {
        role: 'checkbox',
        'aria-checked': 'true',
      },
    })

    const button = wrapper.find('.ui-v1-toggle-button')

    expect(button.attributes('role')).toBe('checkbox')
    expect(button.attributes('aria-checked')).toBe('true')
    expect(button.attributes('aria-pressed')).toBeUndefined()
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('ui-v1-toggle-button_disabled')
  })

  test('renders icon and text in separate wrappers', () => {
    wrapper = mount(UiToggleButton, {
      slots: {
        default: () => [
          h('svg', { 'aria-hidden': 'true' }),
          'День',
        ],
      },
    })

    expect(wrapper.find('.ui-v1-toggle-button__icon').exists()).toBe(true)
    expect(wrapper.find('.ui-v1-toggle-button__text').text()).toContain('День')
  })
})
