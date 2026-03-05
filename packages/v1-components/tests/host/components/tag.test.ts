import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiTag from '@/host/components/tag/UiTag.vue'

describe('host/components/tag', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}) => {
    wrapper = mount(UiTag, {
      props,
      slots: {
        default: 'Tag label',
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders remove control as native button when removable', () => {
    createComponent({
      removable: true,
    })

    const button = wrapper?.find('.ui-v1-tag__remove-icon')

    expect(button?.element.tagName).toBe('BUTTON')
    expect(button?.attributes('type')).toBe('button')
    expect(button?.attributes('aria-label')).toBeTruthy()
  })

  test('emits remove event when remove control is clicked', async () => {
    createComponent({
      removable: true,
    })

    await wrapper?.find('.ui-v1-tag__remove-icon').trigger('click')

    expect(wrapper?.emitted('remove')?.length).toBe(1)
  })
})
