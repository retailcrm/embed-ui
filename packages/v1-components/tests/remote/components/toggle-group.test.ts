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

import UiToggleGroup from '@/remote/components/toggle-group/UiToggleGroup.vue'
import UiToggleGroupOption from '@/remote/components/toggle-group/UiToggleGroupOption.vue'

import { UiToggleButtonSize } from '@/common/components/toggle-button'

const UiToggleGroupRootStub = defineComponent({
  name: 'UiToggleGroupRoot',
  props: {
    size: {
      type: String,
      default: undefined,
    },
    rubber: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  template: `
    <div
        class="ui-v1-toggle-group-root-stub"
        :data-size="size"
        :data-rubber="rubber ? 'true' : 'false'"
        :data-disabled="disabled ? 'true' : 'false'"
    >
        <slot />
    </div>
  `,
})

const UiToggleButtonStub = defineComponent({
  name: 'UiToggleButton',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: undefined,
    },
    pressed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    focused: {
      type: Boolean,
      default: false,
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    size: {
      type: String,
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

    return () => h('button', {
      ...attrs,
      id: props.id,
      class: 'ui-v1-toggle-button-stub',
      'data-pressed': props.pressed ? 'true' : 'false',
      'data-disabled': props.disabled ? 'true' : 'false',
      'data-focused': props.focused ? 'true' : 'false',
      'data-grouped': props.grouped ? 'true' : 'false',
      'data-size': props.size,
      'data-tabindex': props.tabindex,
      'data-role': attrs.role,
      'data-aria-checked': attrs['aria-checked'],
      onKeydown,
    }, slots.default?.())
  },
})

describe('remote/components/toggle-group', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders options from props and toggles multiselect model', async () => {
    wrapper = mount(UiToggleGroup, {
      props: {
        model: ['first'],
        size: UiToggleButtonSize.SM,
        rubber: true,
        'aria-label': 'Weekdays',
        'aria-orientation': 'horizontal',
        options: [
          { label: 'First', value: 'first' },
          { label: 'Second', value: 'second' },
          { label: 'Third', value: 'third', disabled: true },
        ],
      },
      global: {
        stubs: {
          UiToggleButton: UiToggleButtonStub,
          UiToggleGroupRoot: UiToggleGroupRootStub,
        },
      },
    })

    const root = wrapper.find('.ui-v1-toggle-group-root-stub')
    const options = wrapper.findAll('.ui-v1-toggle-button-stub')

    expect(root.attributes('data-size')).toBe(UiToggleButtonSize.SM)
    expect(root.attributes('data-rubber')).toBe('true')
    expect(options).toHaveLength(3)
    expect(options[0]?.attributes('data-pressed')).toBe('true')
    expect(options[0]?.attributes('data-role')).toBe('checkbox')
    expect(options[0]?.attributes('data-aria-checked')).toBe('true')
    expect(options[1]?.attributes('data-pressed')).toBe('false')
    expect(options[0]?.attributes('data-tabindex')).toBe('0')
    expect(options[2]?.attributes('data-disabled')).toBe('true')

    await options[1]?.trigger('click')

    expect(wrapper.emitted('change')?.at(0)).toEqual([['first', 'second']])
    expect(wrapper.emitted('update:model')?.at(0)).toEqual([['first', 'second']])

    await wrapper.setProps({ model: ['first', 'second'] })
    await nextTick()

    expect(options[1]?.attributes('data-pressed')).toBe('true')

    await options[0]?.trigger('click')

    expect(wrapper.emitted('change')?.at(1)).toEqual([['second']])
    expect(wrapper.emitted('update:model')?.at(1)).toEqual([['second']])

    await options[2]?.trigger('click')

    expect(wrapper.emitted('change')).toHaveLength(2)
  })

  test('supports slot-based options with custom equality predicate', async () => {
    const first = { id: 1 }
    const second = { id: 2 }

    wrapper = mount(UiToggleGroup, {
      props: {
        model: [{ id: 2 }],
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
          UiToggleButton: UiToggleButtonStub,
          UiToggleGroupRoot: UiToggleGroupRootStub,
        },
      },
      slots: {
        default: () => [
          h(UiToggleGroupOption, { value: first, label: 'First' }),
          h(UiToggleGroupOption, { value: second, label: 'Second' }),
        ],
      },
    })

    const options = wrapper.findAll('.ui-v1-toggle-button-stub')

    expect(options[0]?.attributes('data-pressed')).toBe('false')
    expect(options[1]?.attributes('data-pressed')).toBe('true')

    await options[0]?.trigger('click')

    expect(wrapper.emitted('change')?.at(0)?.[0]).toEqual([{ id: 2 }, first])
    expect(wrapper.emitted('update:model')?.at(0)?.[0]).toEqual([{ id: 2 }, first])
  })

  test('disables the whole group from root prop', async () => {
    wrapper = mount(UiToggleGroup, {
      props: {
        disabled: true,
        model: ['first'],
        options: [
          { label: 'First', value: 'first' },
          { label: 'Second', value: 'second' },
        ],
      },
      global: {
        stubs: {
          UiToggleButton: UiToggleButtonStub,
          UiToggleGroupRoot: UiToggleGroupRootStub,
        },
      },
    })

    const root = wrapper.find('.ui-v1-toggle-group-root-stub')
    const options = wrapper.findAll('.ui-v1-toggle-button-stub')

    expect(root.attributes('data-disabled')).toBe('true')
    expect(options[0]?.attributes('data-disabled')).toBe('true')
    expect(options[1]?.attributes('data-disabled')).toBe('true')
    expect(options[0]?.attributes('data-tabindex')).toBe('-1')

    await options[1]?.trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:model')).toBeUndefined()
  })

  test('uses roving tabindex and keyboard navigation without toggling on arrows', async () => {
    wrapper = mount(UiToggleGroup, {
      props: {
        model: ['first'],
        options: [
          { label: 'First', value: 'first' },
          { label: 'Disabled', value: 'disabled', disabled: true },
          { label: 'Last', value: 'last' },
        ],
      },
      global: {
        stubs: {
          UiToggleButton: UiToggleButtonStub,
          UiToggleGroupRoot: UiToggleGroupRootStub,
        },
      },
    })

    const options = wrapper.findAll('.ui-v1-toggle-button-stub')

    expect(options[0]?.attributes('data-tabindex')).toBe('0')
    expect(options[1]?.attributes('data-tabindex')).toBe('-1')
    expect(options[2]?.attributes('data-tabindex')).toBe('-1')

    await options[0]?.trigger('focus')
    expect(options[0]?.attributes('data-focused')).toBe('true')

    await options[0]?.trigger('keydown', { key: 'ArrowRight', preventDefault: vi.fn() })
    await nextTick()

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(options[2]?.attributes('data-tabindex')).toBe('0')

    await options[0]?.trigger('blur')
    await options[2]?.trigger('focus')

    expect(options[0]?.attributes('data-focused')).toBe('false')
    expect(options[2]?.attributes('data-focused')).toBe('true')

    await options[2]?.trigger('keydown', { key: ' ', preventDefault: vi.fn() })

    expect(wrapper.emitted('change')?.at(0)).toEqual([['first', 'last']])
    expect(wrapper.emitted('update:model')?.at(0)).toEqual([['first', 'last']])
  })
})
