import type { UiFieldSlotProps } from '@/common/components/field'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'

import UiField from '@/remote/components/field/UiField.vue'

describe('remote/components/field', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('binds label and required state to default slot props', () => {
    wrapper = mount(UiField, {
      props: {
        id: 'field-a',
        label: 'Name',
        hint: 'Tooltip hint',
        required: true,
      },

      slots: {
        default: (slotProps: UiFieldSlotProps) => h('input', {
          id: slotProps.id,
          'aria-labelledby': slotProps.ariaLabelledby,
          'aria-invalid': slotProps.ariaInvalid,
          required: slotProps.required,
        }),
      },
    })

    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const root = wrapper.find('.ui-v1-field')

    expect(label.attributes('for')).toBe('field-a')
    expect(label.text()).toContain('Name')
    expect(label.text()).toContain('*')
    expect(root.attributes('id')).toBeUndefined()
    expect(wrapper.find('.ui-v1-field__hint-trigger').exists()).toBe(true)

    expect(input.attributes('id')).toBe('field-a')
    expect(input.attributes('aria-labelledby')).toBe('field-a-label')
    expect(input.attributes('aria-invalid')).toBeUndefined()
    expect(input.attributes('required')).toBeDefined()
  })

  test('sets aria-invalid in slot props when invalid=true', () => {
    wrapper = mount(UiField, {
      props: {
        id: 'field-b',
        label: 'Email',
        hint: 'Use work email',
        invalid: true,
      },

      slots: {
        default: (slotProps: UiFieldSlotProps) => h('input', {
          id: slotProps.id,
          'aria-invalid': slotProps.ariaInvalid,
        }),
      },
    })

    const input = wrapper.find('input')

    expect(input.attributes('aria-invalid')).toBe('true')
  })

  test('does not render label element when label is empty and no label slot', () => {
    wrapper = mount(UiField, {
      props: {
        id: 'field-c',
      },

      slots: {
        default: (slotProps: UiFieldSlotProps) => h('input', {
          id: slotProps.id,
        }),
      },
    })

    const input = wrapper.find('input')

    expect(wrapper.find('label').exists()).toBe(false)
    expect(input.attributes('id')).toBe('field-c')
  })
})
