import type { UiSelectPopperMethods } from '@/common/components/select'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { computed, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { PopperTargetKey } from '@/host/components/popper/composables'
import UiSelectPopper from '@/host/components/select/UiSelectPopper.vue'

describe('host/components/select-popper', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  test('exposes imperative popper methods and auto-scrolls active option', async () => {
    const target = document.createElement('button')
    document.body.appendChild(target)

    wrapper = mount(UiSelectPopper, {
      attachTo: document.body,
      props: {
        id: 'select-popper',
        opened: true,
      },
      global: {
        provide: {
          [PopperTargetKey as symbol]: computed(() => target),
        },
      },
      slots: {
        default: '<div class="ui-v1-select-option ui-v1-select-option_active">Active option</div>',
      },
    })

    const methods = wrapper.vm as unknown as UiSelectPopperMethods

    await nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    const scrollable = document.body.querySelector('.ui-v1-select__content') as HTMLDivElement | null
    const option = document.body.querySelector('.ui-v1-select-option_active') as HTMLElement | null

    expect(scrollable).not.toBeNull()
    expect(option).not.toBeNull()

    Object.defineProperty(option as HTMLElement, 'offsetTop', {
      configurable: true,
      value: 120,
    })

    methods.updateWidth()
    await methods.autoScroll()

    expect(scrollable?.scrollTop).toBe(120)
  })
})
