import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiButton from '@/host/components/button/UiButton.vue'

describe('host/components/button', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders anchor with button classes when href is provided', () => {
    wrapper = mount(UiButton, {
      props: {
        href: '/orders',
      },
      slots: {
        default: 'Open orders',
      },
    })

    const button = wrapper.find('.ui-v1-button')

    expect(button.element.tagName).toBe('A')
    expect(button.attributes('href')).toBe('/orders')
    expect(button.classes()).toContain('ui-v1-button_primary')
    expect(button.text()).toContain('Open orders')
  })

  test('renders native button type when href is absent', () => {
    wrapper = mount(UiButton, {
      slots: {
        default: 'Save',
      },
    })

    const button = wrapper.find('.ui-v1-button')

    expect(button.element.tagName).toBe('BUTTON')
    expect(button.attributes('type')).toBe('button')
  })
})
