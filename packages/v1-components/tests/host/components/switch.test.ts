import type { UiSwitchMethods } from '@/common/components/switch'
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
import { nextTick, ref } from 'vue'

import UiSwitch from '@/host/components/switch/UiSwitch.vue'

describe('host/components/switch', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiSwitch, {
      attachTo: el as HTMLElement,
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

  test('renders checked, disabled and square states correctly', () => {
    createComponent({
      props: {
        id: 'switch-states',
        value: true,
        square: true,
        disabled: true,
      },
    })

    const root = wrapper?.find('.ui-v1-switch')
    const input = wrapper?.find('.ui-v1-switch__input')

    expect(root?.classes()).toContain('ui-v1-switch_checked')
    expect(root?.classes()).toContain('ui-v1-switch_square')
    expect(root?.classes()).toContain('ui-v1-switch_disabled')
    expect(input?.attributes('role')).toBe('switch')
    expect(input?.attributes('id')).toBe('switch-states')
    expect(input?.attributes('aria-checked')).toBe('true')
    expect(input?.attributes('aria-disabled')).toBe('true')
    expect((input?.element as HTMLInputElement).checked).toBe(true)
    expect((input?.element as HTMLInputElement).disabled).toBe(true)
  })

  test('emits update:value and change when value changed', async () => {
    createComponent({
      props: {
        value: false,
      },
    })

    const input = wrapper?.find('.ui-v1-switch__input')
    ;(input?.element as HTMLInputElement).checked = true
    await input?.trigger('change')

    expect(wrapper?.emitted('update:value')?.at(0)).toEqual([true])
    expect(wrapper?.emitted('change')?.at(0)).toEqual([true])

    ;(input?.element as HTMLInputElement).checked = false
    await input?.trigger('change')

    expect(wrapper?.emitted('update:value')?.at(1)).toEqual([false])
    expect(wrapper?.emitted('change')?.at(1)).toEqual([false])
  })

  test('does not emit update events for disabled switch', async () => {
    createComponent({
      props: {
        value: false,
        disabled: true,
      },
    })

    const input = wrapper?.find('.ui-v1-switch__input')
    ;(input?.element as HTMLInputElement).checked = true
    await input?.trigger('change')

    expect(wrapper?.emitted('update:value')).toBeUndefined()
    expect(wrapper?.emitted('change')).toBeUndefined()
  })

  test('toggles switch when label linked via id/for is clicked', async () => {
    const host = mount(defineComponent({
      components: {
        UiSwitch,
      },

      setup () {
        return {
          value: ref(false),
        }
      },

      template: `
        <div>
            <UiSwitch
                id="switch-label"
                v-model:value="value"
            />

            <label for="switch-label">
                Toggle switch
            </label>
        </div>
      `,
    }), {
      attachTo: el as HTMLElement,
    })

    await host.find('label').trigger('click')
    await nextTick()

    expect((host.find('.ui-v1-switch__input').element as HTMLInputElement).checked).toBe(true)

    host.unmount()
  })

  test('exposes click, focus and blur methods', async () => {
    createComponent({
      props: {
        id: 'switch-methods',
        value: false,
      },
    })

    const input = wrapper?.find('.ui-v1-switch__input').element as HTMLInputElement
    const methods = wrapper?.vm as unknown as UiSwitchMethods

    methods.focus()
    await nextTick()
    expect(document.activeElement).toBe(input)

    methods.blur()
    await nextTick()
    expect(document.activeElement).not.toBe(input)

    methods.click()
    await nextTick()

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([true])
    expect(wrapper?.emitted('change')?.at(-1)).toEqual([true])
  })

  test('forwards aria attributes and event listeners to native input', async () => {
    const focusListener = vi.fn()

    createComponent({
      attrs: {
        'aria-label': 'Power switch',
        'data-qa': 'switch',
        onFocus: focusListener,
      },
    })

    const root = wrapper?.find('.ui-v1-switch')
    const input = wrapper?.find('.ui-v1-switch__input')

    expect(root?.attributes('data-qa')).toBe('switch')
    expect(input?.attributes('aria-label')).toBe('Power switch')

    await input?.trigger('focus')
    expect(focusListener).toHaveBeenCalledTimes(1)
  })
})
