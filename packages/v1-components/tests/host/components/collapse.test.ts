import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiCollapse from '@/host/components/collapse/UiCollapse.vue'

import { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'

describe('host/components/collapse', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const TransitionStub = defineComponent({
    name: 'transition',
    emits: [
      'before-enter',
      'enter',
      'after-enter',
      'before-leave',
      'leave',
    ],
    template: '<div><slot /></div>',
  })

  const createComponent = (options = {}) => {
    wrapper = mount(UiCollapse, {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          transition: TransitionStub,
        },
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

    vi.useRealTimers()
  })

  test('supports hide and dispose behaviours', async () => {
    createComponent({
      props: {
        expanded: false,
        collapseBehaviour: COLLAPSE_BEHAVIOUR.HIDE,
      },
      slots: {
        default: '<div>content</div>',
      },
    })

    const hideRoot = wrapper?.find('.ui-v1-collapse')
    expect(hideRoot?.exists()).toBe(true)
    expect(hideRoot?.attributes('style')).toContain('display: none;')

    await wrapper?.setProps({ expanded: true })
    await nextTick()

    expect(hideRoot?.attributes('style') ?? '').not.toContain('display: none;')

    wrapper?.unmount()

    createComponent({
      props: {
        expanded: false,
        collapseBehaviour: COLLAPSE_BEHAVIOUR.DISPOSE,
      },
      slots: {
        default: '<div>content</div>',
      },
    })

    expect(wrapper?.find('.ui-v1-collapse').exists()).toBe(false)

    await wrapper?.setProps({ expanded: true })
    await nextTick()
    expect(wrapper?.find('.ui-v1-collapse').exists()).toBe(true)
  })

  test('emits lifecycle events and updates inline styles during transition hooks', async () => {
    vi.useFakeTimers()

    createComponent({
      props: {
        expanded: true,
        duration: 1,
      },
      slots: {
        default: '<div>content</div>',
      },
    })

    const transition = wrapper?.findComponent({ name: 'transition' })
    const element = document.createElement('div')
    const content = document.createElement('div')

    Object.defineProperty(content, 'clientHeight', {
      value: 120,
      configurable: true,
    })

    element.appendChild(content)
    element.style.transitionDuration = '0s'

    transition?.vm.$emit('before-enter', element)
    await nextTick()

    expect(wrapper?.emitted('expanding')?.length).toBe(1)
    expect(element.style.maxHeight).toMatch(/^0(px)?$/)
    expect(element.style.opacity).toBe('0')
    expect(element.style.overflow).toBe('hidden')

    const onEnterDone = vi.fn()
    transition?.vm.$emit('enter', element, onEnterDone)
    await nextTick()

    expect(element.style.maxHeight).toBe('120px')
    expect(element.style.opacity).toBe('1')

    vi.runOnlyPendingTimers()
    expect(onEnterDone).toHaveBeenCalledTimes(1)

    transition?.vm.$emit('after-enter', element)
    await nextTick()
    expect(wrapper?.emitted('expanded')?.length).toBe(1)
    expect(element.style.overflow).toBe('visible')

    transition?.vm.$emit('before-leave', element)
    await nextTick()
    expect(wrapper?.emitted('collapsing')?.length).toBe(1)
    expect(element.style.maxHeight).toBe('120px')

    const onLeaveDone = vi.fn()
    transition?.vm.$emit('leave', element, onLeaveDone)
    await nextTick()

    expect(element.style.maxHeight).toMatch(/^0(px)?$/)
    expect(element.style.opacity).toBe('0')

    vi.runOnlyPendingTimers()
    expect(onLeaveDone).toHaveBeenCalledTimes(1)
    expect(wrapper?.emitted('collapsed')?.length).toBe(1)
  })
})
