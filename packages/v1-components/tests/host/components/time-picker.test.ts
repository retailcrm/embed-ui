import type { UiTimePickerMethods } from '@/common/components/time-picker'
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
import { nextTick, watch } from 'vue'

import UiTimePicker from '@/host/components/time-picker/UiTimePicker.vue'

const UiPopperStub = defineComponent({
  name: 'UiPopper',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'attached'],
  setup (props, { emit }) {
    watch(() => props.visible, (visible) => {
      if (visible) {
        emit('attached')
      }
    }, { immediate: true })

    return {}
  },
  template: `
    <div
        v-show="visible"
        class="ui-v1-time-picker__menu"
        v-bind="$attrs"
    >
        <slot />
    </div>
  `,
})

const UiScrollBoxStub = defineComponent({
  name: 'UiScrollBox',
  setup (_, { expose }) {
    expose({
      update: () => undefined,
    })

    return {}
  },
  template: `
    <div
        class="ui-v1-time-picker__list"
        v-bind="$attrs"
    >
        <slot />
    </div>
  `,
})

describe('host/components/time-picker', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiTimePicker, {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiPopper: UiPopperStub,
          UiScrollBox: UiScrollBoxStub,
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

  test('renders combobox semantics', () => {
    createComponent({
      props: {
        id: 'timepicker-a11y',
        value: '10:00',
      },
    })

    const root = wrapper?.find('.ui-v1-time-picker')

    expect(root?.attributes('id')).toBe('timepicker-a11y-root')
    expect(root?.attributes('role')).toBe('combobox')
    expect(root?.attributes('aria-haspopup')).toBe('listbox')
    expect(root?.attributes('aria-controls')).toBe('timepicker-a11y-listbox')
    expect(root?.attributes('aria-expanded')).toBe('false')
  })

  test('uses __:__ as default placeholder', () => {
    createComponent({
      props: {
        value: '',
      },
    })

    expect(wrapper?.find('input').attributes('placeholder')).toBe('__:__')
  })

  test('shows clock icon when value is empty', () => {
    createComponent({
      props: {
        value: '',
      },
    })

    expect(wrapper?.find('.ui-v1-time-picker__icon').exists()).toBe(true)
  })

  test('normalizes entered time on blur', async () => {
    createComponent({
      props: {
        value: '16:3',
      },
    })

    const input = wrapper?.find('input')
    await input?.trigger('blur')

    expect(wrapper?.emitted('change')?.at(-1)).toEqual(['16:30'])
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['16:30'])
  })

  test('sanitizes typed value', async () => {
    createComponent({
      props: {
        value: '10:00',
      },
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = '16a4'
    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['16:4'])
    expect(wrapper?.emitted('change')?.at(-1)).toEqual(['16:4'])
  })

  test('supports keyboard navigation and enter selection', async () => {
    createComponent({
      props: {
        value: '10:00',
      },
    })

    const input = wrapper?.find('input')
    await input?.trigger('focus')
    await nextTick()

    expect(wrapper?.find('.ui-v1-time-picker').attributes('aria-expanded')).toBe('true')

    await input?.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper?.find('.ui-v1-time-picker').attributes('aria-activedescendant'))
      .toContain('option')

    await input?.trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['10:30'])
    expect(wrapper?.find('.ui-v1-time-picker').attributes('aria-expanded')).toBe('false')
  })

  test('opens again on mousedown after selecting from menu', async () => {
    createComponent({
      props: {
        value: '10:00',
      },
    })

    const root = wrapper?.find('.ui-v1-time-picker')
    const input = wrapper?.find('input')

    await input?.trigger('focus')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('true')

    const option = wrapper?.findAll('.ui-v1-time-picker__item')[1]
    await option?.trigger('mousedown')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('false')

    await input?.trigger('mousedown')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('true')

    await input?.trigger('mousedown')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('false')
  })

  test('emits empty value on clear', async () => {
    createComponent({
      props: {
        value: '11:00',
      },
    })

    await wrapper?.find('.ui-v1-textbox__eraser svg').trigger('click')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([''])
    expect(wrapper?.emitted('change')?.at(-1)).toEqual([''])
  })

  test('closes popper on clear click', async () => {
    createComponent({
      props: {
        value: '11:00',
      },
    })

    const input = wrapper?.find('input')
    const root = wrapper?.find('.ui-v1-time-picker')

    await input?.trigger('focus')
    await nextTick()
    expect(root?.attributes('aria-expanded')).toBe('true')

    await wrapper?.find('.ui-v1-textbox__eraser svg').trigger('click')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('false')
  })

  test('does not show clear button in readonly or disabled mode', async () => {
    createComponent({
      props: {
        value: '11:00',
        readonly: true,
      },
    })

    expect(wrapper?.find('.ui-v1-textbox__eraser').exists()).toBe(false)
    expect(wrapper?.find('.ui-v1-time-picker__icon').exists()).toBe(true)

    await wrapper?.setProps({
      readonly: false,
      disabled: true,
    })
    await nextTick()

    expect(wrapper?.find('.ui-v1-textbox__eraser').exists()).toBe(false)
    expect(wrapper?.find('.ui-v1-time-picker__icon').exists()).toBe(true)
  })

  test('allows reopening popper by input click after value clear', async () => {
    createComponent({
      props: {
        value: '11:00',
      },
    })

    const root = wrapper?.find('.ui-v1-time-picker')
    const input = wrapper?.find('input')

    await input?.trigger('focus')
    await nextTick()
    expect(root?.attributes('aria-expanded')).toBe('true')

    await wrapper?.find('.ui-v1-textbox__eraser svg').trigger('click')
    await wrapper?.setProps({ value: '' })
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('false')

    await input?.trigger('mousedown')
    await nextTick()

    expect(root?.attributes('aria-expanded')).toBe('true')
  })

  test('exposes open close and focus methods', async () => {
    createComponent({
      props: {
        value: '09:00',
      },
    })

    const methods = wrapper?.vm as unknown as UiTimePickerMethods
    const input = wrapper?.find('input').element as HTMLInputElement

    methods.focus()
    await nextTick()
    expect(document.activeElement).toBe(input)

    methods.open()
    await nextTick()
    expect(wrapper?.find('.ui-v1-time-picker').attributes('aria-expanded')).toBe('true')

    methods.close()
    await nextTick()
    expect(wrapper?.find('.ui-v1-time-picker').attributes('aria-expanded')).toBe('false')
  })
})
