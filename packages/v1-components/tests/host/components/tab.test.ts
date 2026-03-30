import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiTabGroup from '@/host/components/tab/UiTabGroup.vue'

import { APPEARANCE, SIZE } from '@/common/components/tab'
import { UiTab } from '@/remote/components/tab'

describe('host/components/tab', () => {
  let clientWidthDescriptor: PropertyDescriptor | undefined
  let initialResizeObserver: typeof ResizeObserver | undefined
  let offsetWidthDescriptor: PropertyDescriptor | undefined
  let wrapper: VueWrapper | null = null

  beforeEach(() => {
    clientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    offsetWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
    initialResizeObserver = globalThis.ResizeObserver

    Object.defineProperty(globalThis, 'ResizeObserver', {
      value: class ResizeObserverMock {
        observe () {}
        disconnect () {}
      },
      configurable: true,
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    if (clientWidthDescriptor) {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', clientWidthDescriptor)
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'clientWidth')
    }

    if (offsetWidthDescriptor) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', offsetWidthDescriptor)
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'offsetWidth')
    }

    if (initialResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        value: initialResizeObserver,
        configurable: true,
      })
    } else {
      Reflect.deleteProperty(globalThis, 'ResizeObserver')
    }
  })

  test('renders tabs from items and emits public tab events and move intents', async () => {
    wrapper = mount(UiTabGroup, {
      attachTo: document.body,
      props: {
        activeId: 'orders',
        appearance: APPEARANCE.FILLED,
        items: [
          { id: 'overview', label: 'Overview' },
          { id: 'orders', label: 'Orders', counter: '12' },
        ],
        overflowing: false,
        size: SIZE.LG,
      },
    })

    await nextTick()

    const buttons = wrapper.findAll('[role="tab"]')

    expect(wrapper.find('.ui-v1-tab-group').classes()).toContain('ui-v1-tab-group_filled')
    expect(wrapper.emitted('layout')?.at(0)?.[0]).toEqual({
      headIds: ['overview', 'orders'],
      menuIds: [],
    })
    expect(buttons).toHaveLength(2)
    expect(buttons[1]?.classes()).toContain('ui-v1-tab_active')
    expect(buttons[1]?.attributes('aria-selected')).toBe('true')
    expect(buttons[1]?.text()).toContain('Orders')
    expect(buttons[1]?.text()).toContain('12')

    await buttons[0]?.trigger('click')
    await buttons[0]?.trigger('keydown', { key: 'End' })

    expect(wrapper.emitted('change')?.at(0)).toEqual(['overview'])
    expect(wrapper.emitted('update:activeId')?.at(0)).toEqual(['overview'])
    expect(wrapper.emitted('change')?.at(1)).toEqual(['orders'])
    expect(wrapper.emitted('update:activeId')?.at(1)).toEqual(['orders'])
    expect(wrapper.emitted('update:focusableId')).toEqual([['overview'], ['orders']])
  })

  test('renders overflow trigger and menu from computed layout', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get () {
        return this.classList.contains('ui-v1-tab-group__head') ? 160 : 0
      },
    })

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get () {
        return (this as HTMLElement).id?.endsWith('-measure') ? 120 : 0
      },
    })

    wrapper = mount(UiTabGroup, {
      attachTo: document.body,
      props: {
        activeId: 'orders',
        menuExpanded: true,
        overflowing: true,
      },
      slots: {
        default: () => [
          h(UiTab, { id: 'overview', label: 'Overview' }, {
            icon: () => h('svg', {
              'aria-hidden': 'true',
              viewBox: '0 0 16 16',
            }, [
              h('circle', { cx: '8', cy: '8', r: '6' }),
            ]),
          }),
          h(UiTab, { id: 'orders', label: 'Orders' }),
          h(UiTab, { id: 'files', label: 'Files' }),
        ],
      },
    })

    await nextTick()
    await nextTick()

    expect(wrapper.emitted('layout')?.at(-1)?.[0]).toEqual({
      headIds: ['orders'],
      menuIds: ['overview', 'files'],
    })
    expect(wrapper.find('[aria-haspopup="menu"]').exists()).toBe(true)

    const menu = document.body.querySelector<HTMLElement>('[role="menu"]')

    expect(menu?.textContent).toContain('Overview')
    expect(menu?.textContent).toContain('Files')
    expect(menu?.querySelector('svg')).not.toBeNull()

    const menuItem = document.body.querySelector<HTMLElement>('[role="menuitemradio"]')

    menuItem?.click()
    await nextTick()

    expect(wrapper.emitted('change')?.at(-1)).toEqual(['overview'])
    expect(wrapper.emitted('update:activeId')?.at(-1)).toEqual(['overview'])
    expect(wrapper.emitted('update:menuExpanded')?.at(-1)).toEqual([false])
  })

  test('renders active tab panel and links it with active tab button', async () => {
    wrapper = mount(UiTabGroup, {
      attachTo: document.body,
      props: {
        activeId: 'overview',
      },
      slots: {
        default: () => [
          h(UiTab, { id: 'overview', label: 'Overview' }, {
            content: () => h('div', 'Overview panel'),
          }),
          h(UiTab, { id: 'orders', label: 'Orders' }, {
            content: () => h('div', 'Orders panel'),
          }),
        ],
      },
    })

    await nextTick()

    const activeButton = wrapper.find('[role="tab"][aria-selected="true"]')
    const panel = wrapper.find('[role="tabpanel"]')

    expect(activeButton.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(panel.attributes('aria-labelledby')).toBe(activeButton.attributes('id'))
    expect(panel.text()).toContain('Overview panel')
    expect(panel.text()).not.toContain('Orders panel')

    await wrapper.findAll('[role="tab"]')[1]?.trigger('click')
    await wrapper.setProps({ activeId: 'orders' })
    await nextTick()

    expect(wrapper.find('[role="tabpanel"]').text()).toContain('Orders panel')
    expect(wrapper.find('[role="tabpanel"]').text()).not.toContain('Overview panel')
  })
})
