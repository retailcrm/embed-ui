import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiRadioSwitchOptionShell from '@/host/components/radio-switch/UiRadioSwitchOptionShell.vue'
import UiRadioSwitchRoot from '@/host/components/radio-switch/UiRadioSwitchRoot.vue'

import { APPEARANCE } from '@/common/components/radio-switch'
import { SIZE } from '@/common/components/radio-switch'

describe('host/components/radio-switch', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders root classes for default appearance and rubber mode', () => {
    wrapper = mount(UiRadioSwitchRoot, {
      props: {
        size: SIZE.LG,
        rubber: true,
      },
      slots: {
        default: () => 'content',
      },
    })

    const root = wrapper.find('.ui-v1-radio-switch')

    expect(root.classes()).toContain('ui-v1-radio-switch_lg')
    expect(root.classes()).toContain('ui-v1-radio-switch_rubber')
    expect(root.attributes('role')).toBe('radiogroup')
    expect(root.text()).toContain('content')
  })

  test('renders borderless class for section appearance', () => {
    wrapper = mount(UiRadioSwitchRoot, {
      props: {
        appearance: APPEARANCE.SECTION,
      },
    })

    expect(wrapper.find('.ui-v1-radio-switch').classes()).toContain('ui-v1-radio-switch_borderless')
  })

  test('renders option shell aria attributes and active class', () => {
    wrapper = mount(UiRadioSwitchOptionShell, {
      props: {
        id: 'option-a',
        checked: true,
        disabled: true,
        appearance: APPEARANCE.SECTION,
      },
      slots: {
        default: () => 'First',
      },
    })

    const option = wrapper.find('.ui-v1-radio-switch-option')

    expect(option.attributes('id')).toBe('option-a')
    expect(option.attributes('role')).toBe('radio')
    expect(option.attributes('aria-checked')).toBe('true')
    expect(option.attributes('aria-disabled')).toBe('true')
    expect(option.classes()).toContain('ui-v1-radio-switch-option_standalone')
    expect(option.classes()).toContain('ui-v1-radio-switch-option_active')
    expect(option.classes()).toContain('ui-v1-radio-switch-option_disabled')
    expect(option.text()).toContain('First')
  })
})
