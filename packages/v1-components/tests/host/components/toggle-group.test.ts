import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiToggleGroupRoot from '@/host/components/toggle-group/UiToggleGroupRoot.vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

describe('host/components/toggle-group', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders root aria attributes and state classes', () => {
    wrapper = mount(UiToggleGroupRoot, {
      props: {
        size: UiToggleButtonSize.SM,
        rubber: true,
        disabled: true,
        ariaLabel: 'Weekdays',
        ariaOrientation: 'horizontal',
      },
      slots: {
        default: () => 'content',
      },
    })

    const root = wrapper.find('.ui-v1-toggle-group')

    expect(root.element.tagName).toBe('SPAN')
    expect(root.attributes('role')).toBe('toolbar')
    expect(root.attributes('aria-label')).toBe('Weekdays')
    expect(root.attributes('aria-orientation')).toBe('horizontal')
    expect(root.attributes('aria-disabled')).toBe('true')
    expect(root.classes()).toContain('ui-v1-toggle-group_sm')
    expect(root.classes()).toContain('ui-v1-toggle-group_rubber')
    expect(root.classes()).toContain('ui-v1-toggle-group_disabled')
    expect(root.text()).toContain('content')
  })
})
