import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiSkeleton from '@/host/components/skeleton/UiSkeleton.vue'

import { ANIMATION, APPEARANCE, SIZE } from '@/common/components/skeleton'

describe('host/components/skeleton', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders default rectangle shimmer skeleton', () => {
    wrapper = mount(UiSkeleton)

    const root = wrapper.find('.ui-v1-skeleton')

    expect(root.element.tagName).toBe('DIV')
    expect(root.attributes('aria-hidden')).toBe('true')
    expect(root.classes()).toContain('ui-v1-skeleton_rectangle')
    expect(root.classes()).toContain('ui-v1-skeleton_md')
    expect(root.classes()).toContain('ui-v1-skeleton_shimmer')
  })

  test('applies explicit appearance, size, animation and inline dimensions', () => {
    wrapper = mount(UiSkeleton, {
      props: {
        appearance: APPEARANCE.CIRCLE,
        size: SIZE.SM,
        animation: ANIMATION.PULSE,
        width: '48',
        height: 48,
      },
      attrs: {
        id: 'avatar-skeleton',
      },
    })

    const root = wrapper.find('.ui-v1-skeleton')

    expect(root.attributes('id')).toBe('avatar-skeleton')
    expect(root.classes()).toContain('ui-v1-skeleton_circle')
    expect(root.classes()).toContain('ui-v1-skeleton_sm')
    expect(root.classes()).toContain('ui-v1-skeleton_pulse')
    expect(root.attributes('style')).toContain('width: 48px;')
    expect(root.attributes('style')).toContain('height: 48px;')
  })
})
