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

vi.mock('@omnicajs/vue-remote/remote', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    nextTick,
  }
})

import UiSelect from '@/remote/components/select/UiSelect.vue'
import UiSelectOption from '@/remote/components/select/UiSelectOption.vue'

const UiSelectTriggerStub = defineComponent({
  name: 'UiSelectTrigger',
  props: {
    activeDescendant: {
      type: String,
      default: null,
    },
  },
  emits: ['input', 'keydown', 'update:value', 'update:expanded'],
  template: '<div class="ui-v1-select-trigger-stub" :data-active-descendant="activeDescendant" />',
})

const UiSelectPopperStub = defineComponent({
  name: 'UiSelectPopper',
  methods: {
    updateWidth() {},
    autoScroll() {},
  },
  template: '<div class="ui-v1-select-popper-stub"><slot /></div>',
})

const UiPopperConnectorStub = defineComponent({
  name: 'UiPopperConnector',
  template: '<div class="ui-v1-select-connector-stub"><slot /></div>',
})

const UiMenuItemStub = defineComponent({
  name: 'UiMenuItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  template: `
    <div class="ui-v1-menu-item" :data-active="active ? 'true' : 'false'">
        <slot />
        <slot name="description" />
        <slot name="trailing-icon" />
        <slot name="leading-icon" />
    </div>
  `,
})

describe('remote/components/select', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (slotsProps: Array<Record<string, unknown>>) => {
    wrapper = mount(UiSelect, {
      props: {
        id: 'remote-select',
      },
      global: {
        stubs: {
          UiSelectTrigger: UiSelectTriggerStub,
          UiSelectPopper: UiSelectPopperStub,
          UiPopperConnector: UiPopperConnectorStub,
          UiMenuItem: UiMenuItemStub,
        },
      },
      slots: {
        default: () => slotsProps.map((props) => h(UiSelectOption, props)),
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('moves active descendant by ArrowDown and selects option by Enter', async () => {
    createComponent([
      { label: 'First', value: 'first' },
      { label: 'Second', value: 'second' },
    ])

    const trigger = wrapper?.findComponent(UiSelectTriggerStub)
    const options = wrapper?.findAll('[role="option"]') ?? []

    const firstId = options[0].attributes('id')
    expect(firstId).toBeTruthy()

    trigger?.vm.$emit('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper?.find('.ui-v1-select-trigger-stub').attributes('data-active-descendant')).toBe(firstId)

    trigger?.vm.$emit('keydown', { key: 'Enter' })
    await nextTick()

    expect(options[0].attributes('aria-selected')).toBe('true')
    expect(wrapper?.find('.ui-v1-select-trigger-stub').attributes('data-active-descendant')).toBeUndefined()
    expect(wrapper?.emitted('change')).toEqual([['first']])
    expect(wrapper?.emitted('update:value')).toEqual([['first']])
  })

  test('skips disabled option during keyboard navigation', async () => {
    createComponent([
      { label: 'First', value: 'first', disabled: true },
      { label: 'Second', value: 'second' },
    ])

    const trigger = wrapper?.findComponent(UiSelectTriggerStub)
    const options = wrapper?.findAll('[role="option"]') ?? []

    const secondId = options[1].attributes('id')
    expect(secondId).toBeTruthy()

    trigger?.vm.$emit('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper?.find('.ui-v1-select-trigger-stub').attributes('data-active-descendant')).toBe(secondId)

    trigger?.vm.$emit('keydown', { key: 'Enter' })
    await nextTick()

    expect(options[0].attributes('aria-selected')).toBe('false')
    expect(options[1].attributes('aria-selected')).toBe('true')
    expect(wrapper?.emitted('change')).toEqual([['second']])
    expect(wrapper?.emitted('update:value')).toEqual([['second']])
  })

  test('re-emits trigger value updates for external v-model sync', async () => {
    createComponent([
      { label: 'First', value: 'first' },
    ])

    const trigger = wrapper?.findComponent(UiSelectTriggerStub)

    trigger?.vm.$emit('update:value', null)
    await nextTick()

    expect(wrapper?.emitted('change')).toEqual([[null]])
    expect(wrapper?.emitted('update:value')).toEqual([[null]])
  })
})
