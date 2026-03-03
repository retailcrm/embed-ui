import type { UiInfoboxMethods } from '@/common/components/infobox'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiInfobox from '@/host/components/infobox/UiInfobox.vue'

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

const UiCollapseStub = defineComponent({
  name: 'UiCollapse',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'collapsed',
    'collapsing',
    'expanded',
    'expanding',
  ],
  template: `
    <div
        v-show="expanded"
        class="ui-v1-infobox__body"
        v-bind="$attrs"
    >
        <slot />
    </div>
  `,
})

describe('host/components/infobox', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiInfobox, {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiTransition: UiTransitionStub,
          UiCollapse: UiCollapseStub,
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
  })

  test('renders alert semantics and title linkage', () => {
    createComponent({
      props: {
        id: 'infobox-a11y',
        title: 'Information title',
      },
    })

    const root = wrapper?.find('.ui-v1-infobox')

    expect(root?.attributes('id')).toBe('infobox-a11y')
    expect(root?.attributes('role')).toBe('alert')
    expect(root?.attributes('aria-live')).toBe('polite')
    expect(root?.attributes('aria-labelledby')).toBe('infobox-a11y-title')
    expect(wrapper?.find('#infobox-a11y-title').text()).toBe('Information title')
  })

  test('does not override explicit aria-label', () => {
    createComponent({
      props: {
        id: 'infobox-label',
        title: 'Title',
      },
      attrs: {
        'aria-label': 'Custom label',
      },
    })

    const root = wrapper?.find('.ui-v1-infobox')

    expect(root?.attributes('aria-label')).toBe('Custom label')
    expect(root?.attributes('aria-labelledby')).toBeUndefined()
  })

  test('supports warning and closable modifiers', async () => {
    createComponent({
      props: {
        warning: true,
        closable: true,
      },
    })

    const root = wrapper?.find('.ui-v1-infobox')
    expect(root?.classes()).toContain('ui-v1-infobox_warning')
    expect(root?.classes()).toContain('ui-v1-infobox_closable')

    await wrapper?.find('.ui-v1-infobox__closer').trigger('click')

    expect(wrapper?.emitted('hide')?.length).toBe(1)
    expect(wrapper?.emitted('update:shown')?.at(-1)).toEqual([false])
  })

  test('toggle button is keyboard-accessible and emits expanded updates', async () => {
    createComponent({
      props: {
        id: 'infobox-toggle',
        expandable: true,
        expanded: false,
      },
    })

    const toggle = wrapper?.find('.ui-v1-infobox__toggle')

    expect(toggle?.attributes('type')).toBe('button')
    expect(toggle?.attributes('aria-controls')).toBe('infobox-toggle-body')
    expect(toggle?.attributes('aria-expanded')).toBe('false')

    await toggle?.trigger('click')

    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([true])
  })

  test('syncs expanded state from collapse lifecycle events', async () => {
    createComponent({
      props: {
        expandable: true,
        expanded: true,
      },
    })

    const root = wrapper?.find('.ui-v1-infobox')
    const collapse = wrapper?.findComponent({ name: 'UiCollapse' })

    expect(root?.attributes('aria-expanded')).toBe('true')

    collapse?.vm.$emit('collapsing')
    await nextTick()
    expect(root?.attributes('aria-expanded')).toBe('false')

    collapse?.vm.$emit('expanded')
    await nextTick()
    expect(root?.attributes('aria-expanded')).toBe('true')
  })

  test('updates aria-hidden during transition hooks', async () => {
    createComponent({
      props: {
        shown: true,
      },
    })

    const transition = wrapper?.findComponent({ name: 'UiTransition' })
    const root = wrapper?.find('.ui-v1-infobox')

    expect(root?.attributes('aria-hidden')).toBe('false')

    transition?.vm.$emit('before-leave')
    await nextTick()
    expect(root?.attributes('aria-hidden')).toBe('true')

    transition?.vm.$emit('after-enter')
    await nextTick()
    expect(root?.attributes('aria-hidden')).toBe('false')
  })

  test('exposes show, hide and toggle methods', async () => {
    createComponent({
      props: {
        shown: false,
        expandable: true,
        expanded: false,
      },
    })

    const methods = wrapper?.vm as unknown as UiInfoboxMethods

    methods.show()
    await nextTick()
    expect(wrapper?.emitted('show')?.length).toBe(1)
    expect(wrapper?.emitted('update:shown')?.at(-1)).toEqual([true])

    methods.hide()
    await nextTick()
    expect(wrapper?.emitted('hide')?.length).toBe(1)
    expect(wrapper?.emitted('update:shown')?.at(-1)).toEqual([false])

    methods.toggle()
    await nextTick()
    expect(wrapper?.emitted('update:expanded')?.at(-1)).toEqual([true])
  })
})
