import type { UiAlertMethods } from '@/common/components/alert'
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

import UiAlert from '@/host/components/alert/UiAlert.vue'

import { VARIANT } from '@/common/components/alert'

describe('host/components/alert', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const scrollIntoViewMock = vi.fn()

  const UiTransitionStub = defineComponent({
    name: 'UiTransition',
    emits: [
      'before-enter',
      'after-enter',
      'before-leave',
      'after-leave',
    ],
    template: '<div><slot /></div>',
  })

  const createComponent = (options = {}) => {
    wrapper = mount(UiAlert, {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiTransition: UiTransitionStub,
        },
      },
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)

    scrollIntoViewMock.mockClear()
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: scrollIntoViewMock,
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null
  })

  test('renders default variant and accessibility attributes', () => {
    createComponent({
      props: {
        text: 'Basic alert',
      },
    })

    const root = wrapper?.find('.ui-v1-alert')

    expect(root?.exists()).toBe(true)
    expect(root?.attributes('role')).toBe('alert')
    expect(root?.attributes('aria-live')).toBe('off')
    expect(root?.classes()).toContain('ui-v1-alert')
    expect(root?.classes()).not.toContain('ui-v1-alert_warning')
  })

  test('applies variant modifiers and aria-live mapping', async () => {
    createComponent({
      props: {
        variant: VARIANT.WARNING,
      },
    })

    const root = wrapper?.find('.ui-v1-alert')
    expect(root?.classes()).toContain('ui-v1-alert_warning')
    expect(root?.attributes('aria-live')).toBe('polite')

    await wrapper?.setProps({ variant: VARIANT.DANGER })
    expect(root?.classes()).toContain('ui-v1-alert_danger')
    expect(root?.attributes('aria-live')).toBe('assertive')

    await wrapper?.setProps({ variant: VARIANT.SUCCESS })
    expect(root?.classes()).toContain('ui-v1-alert_success')
    expect(root?.attributes('aria-live')).toBe('off')
  })

  test('hides alert on close button click when closable', async () => {
    createComponent({
      props: {
        text: 'Closable alert',
        closable: true,
      },
    })

    const close = wrapper?.find('.ui-v1-alert__close')
    const root = wrapper?.find('.ui-v1-alert')

    expect(close?.exists()).toBe(true)
    expect(close?.attributes('type')).toBe('button')

    await close?.trigger('click')

    expect(root?.attributes('style')).toContain('display: none;')
  })

  test('supports shown prop update and scrollToAlert behavior', async () => {
    createComponent({
      props: {
        shown: false,
        scrollToAlert: true,
      },
    })

    const root = wrapper?.find('.ui-v1-alert')
    expect(root?.attributes('style')).toContain('display: none;')

    await wrapper?.setProps({ shown: true })
    await nextTick()

    expect(root?.attributes('style')).not.toContain('display: none;')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })

  test('exposes scrollIntoView method', () => {
    createComponent()

    const methods = wrapper?.vm as unknown as UiAlertMethods
    methods.scrollIntoView()

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })

  test('maps transition lifecycle hooks to component events and aria-hidden', async () => {
    createComponent({
      props: {
        shown: true,
      },
    })

    const transition = wrapper?.findComponent({ name: 'UiTransition' })
    const root = wrapper?.find('.ui-v1-alert')

    transition?.vm.$emit('before-enter')
    await nextTick()
    expect(wrapper?.emitted('showing')?.length).toBe(1)
    expect(root?.attributes('aria-hidden')).toBe('true')

    transition?.vm.$emit('after-enter')
    await nextTick()
    expect(wrapper?.emitted('shown')?.length).toBe(1)
    expect(root?.attributes('aria-hidden')).toBe('false')

    transition?.vm.$emit('before-leave')
    await nextTick()
    expect(wrapper?.emitted('hiding')?.length).toBe(1)
    expect(root?.attributes('aria-hidden')).toBe('true')

    transition?.vm.$emit('after-leave')
    await nextTick()
    expect(wrapper?.emitted('hidden')?.length).toBe(1)
    expect(root?.attributes('aria-hidden')).toBe('true')
  })
})
