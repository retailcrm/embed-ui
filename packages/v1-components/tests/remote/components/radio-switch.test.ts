import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiRadioSwitch from '@/remote/components/radio-switch/UiRadioSwitch.vue'
import UiRadioSwitchOption from '@/remote/components/radio-switch/UiRadioSwitchOption.vue'

import { APPEARANCE } from '@/common/components/radio-switch'

const UiRadioSwitchRootStub = defineComponent({
  name: 'UiRadioSwitchRoot',
  props: {
    appearance: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
    rubber: {
      type: Boolean,
      default: false,
    },
  },
  template: `
    <div
        class="ui-v1-radio-switch-root-stub"
        :data-appearance="appearance"
        :data-size="size"
        :data-rubber="rubber ? 'true' : 'false'"
    >
        <slot />
    </div>
  `,
})

const UiRadioSwitchOptionShellStub = defineComponent({
  name: 'UiRadioSwitchOptionShell',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
  },
  setup (props, { attrs, expose, slots }) {
    const focus = vi.fn()
    const blur = vi.fn()
    const onKeydown = (event: KeyboardEvent) => {
      const handlers = Array.isArray(attrs.onKeydown)
        ? attrs.onKeydown.flat()
        : [attrs.onKeydown]

      handlers.forEach((handler) => {
        if (typeof handler === 'function') {
          handler(event)
        }
      })
    }

    expose({
      focus,
      blur,
    })

    return () => h('div', {
      ...attrs,
      id: props.id,
      class: 'ui-v1-radio-switch-option-stub',
      role: 'radio',
      'data-checked': props.checked ? 'true' : 'false',
      'data-disabled': props.disabled ? 'true' : 'false',
      'data-tabindex': props.tabindex,
      onKeydown,
    }, slots.default?.())
  },
})

describe('remote/components/radio-switch', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders options from options prop, syncs checked state and ignores disabled click', async () => {
    wrapper = mount(UiRadioSwitch, {
      props: {
        value: 'a',
        appearance: APPEARANCE.SECTION,
        rubber: true,
        options: [
          { label: 'First', value: 'a' },
          { label: 'Second', value: 'b', disabled: true },
        ],
      },
      global: {
        stubs: {
          UiRadioSwitchRoot: UiRadioSwitchRootStub,
          UiRadioSwitchOptionShell: UiRadioSwitchOptionShellStub,
        },
      },
    })

    const root = wrapper.find('.ui-v1-radio-switch-root-stub')
    const options = wrapper.findAll('.ui-v1-radio-switch-option-stub')

    expect(root.attributes('data-appearance')).toBe(APPEARANCE.SECTION)
    expect(root.attributes('data-rubber')).toBe('true')
    expect(options).toHaveLength(2)
    expect(options[0]?.attributes('data-checked')).toBe('true')
    expect(options[1]?.attributes('data-disabled')).toBe('true')
    expect(options[0]?.attributes('data-tabindex')).toBe('0')
    expect(options[1]?.attributes('data-tabindex')).toBe('-1')

    await options[1]?.trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()

    await wrapper.setProps({ value: 'b' })
    await nextTick()

    expect(options[1]?.attributes('data-checked')).toBe('true')

    await options[0]?.trigger('click')

    expect(wrapper.emitted('change')).toEqual([['a']])
    expect(wrapper.emitted('update:value')).toEqual([['a']])
  })

  test('supports slot-based options with custom equality predicate', async () => {
    const first = { id: 1 }
    const second = { id: 2 }

    wrapper = mount(UiRadioSwitch, {
      props: {
        value: { id: 2 },
        equalFn: (a: unknown, b: unknown) => {
          return Boolean(
            a
            && b
            && typeof a === 'object'
            && typeof b === 'object'
            && 'id' in a
            && 'id' in b
            && a.id === b.id
          )
        },
      },
      global: {
        stubs: {
          UiRadioSwitchRoot: UiRadioSwitchRootStub,
          UiRadioSwitchOptionShell: UiRadioSwitchOptionShellStub,
        },
      },
      slots: {
        default: () => [
          h(UiRadioSwitchOption, { value: first, label: 'First' }),
          h(UiRadioSwitchOption, { value: second, label: 'Second' }),
        ],
      },
    })

    const options = wrapper.findAll('.ui-v1-radio-switch-option-stub')

    expect(options[0]?.attributes('data-checked')).toBe('false')
    expect(options[1]?.attributes('data-checked')).toBe('true')

    await options[0]?.trigger('click')

    expect(wrapper.emitted('change')?.at(0)?.[0]).toBe(first)
    expect(wrapper.emitted('update:value')?.at(0)?.[0]).toBe(first)
  })

  test('uses roving tabindex and keyboard navigation across enabled options', async () => {
    wrapper = mount(UiRadioSwitch, {
      props: {
        value: 'first',
        options: [
          { label: 'First', value: 'first' },
          { label: 'Disabled', value: 'disabled', disabled: true },
          { label: 'Last', value: 'last' },
        ],
      },
      global: {
        stubs: {
          UiRadioSwitchRoot: UiRadioSwitchRootStub,
          UiRadioSwitchOptionShell: UiRadioSwitchOptionShellStub,
        },
      },
    })

    const options = wrapper.findAll('.ui-v1-radio-switch-option-stub')

    expect(options[0]?.attributes('data-tabindex')).toBe('0')
    expect(options[1]?.attributes('data-tabindex')).toBe('-1')
    expect(options[2]?.attributes('data-tabindex')).toBe('-1')

    await options[0]?.trigger('keydown', { key: 'ArrowRight', preventDefault: vi.fn() })
    await nextTick()

    expect(wrapper.emitted('change')?.at(0)).toEqual(['last'])
    expect(wrapper.emitted('update:value')?.at(0)).toEqual(['last'])
    expect(options[2]?.attributes('data-tabindex')).toBe('0')

    await options[2]?.trigger('keydown', { key: 'Home', preventDefault: vi.fn() })
    await nextTick()

    expect(options[0]?.attributes('data-tabindex')).toBe('0')
  })
})
