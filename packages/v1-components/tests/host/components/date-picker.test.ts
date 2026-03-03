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

import UiDatePicker from '@/host/components/date-picker/UiDatePicker.vue'

import { SYNCHRONIZATION } from '@/common/components/date-picker'

import I18nPlugin, { VueI18n } from '@/host/i18n/plugin'

const pad = (value: number) => value < 10 ? `0${value}` : `${value}`

const dayCell = (date: Date): HTMLElement | null => {
  const datetime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

  return [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
    .find((cell) => cell.querySelector('time')?.getAttribute('datetime') === datetime) ?? null
}

const buttonByText = (text: string): HTMLButtonElement | null => {
  return [...document.querySelectorAll<HTMLButtonElement>('button')]
    .find((button) => button.textContent?.trim() === text) ?? null
}

const menuItemByText = (text: string): HTMLElement | null => {
  return [...document.querySelectorAll<HTMLElement>('.ui-v1-menu-item')]
    .find((item) => item.textContent?.trim() === text) ?? null
}

const UiPopperStub = defineComponent({
  name: 'UiPopper',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  template: `
    <div
        v-show="visible"
        class="ui-v1-date-picker__popper"
        v-bind="$attrs"
    >
        <div class="ui-v1-popper__content">
            <slot />
        </div>
    </div>
  `,
})

describe('host/components/date-picker', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null
  let i18n: VueI18n | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiDatePicker, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
        stubs: {
          UiPopper: UiPopperStub,
        },
      },
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
    i18n = new VueI18n('en-GB')
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null
    i18n = null
  })

  test('renders combobox root with aria attributes', () => {
    createComponent({
      props: {
        id: 'dp-test',
      },
    })

    const root = wrapper?.find('.ui-v1-date-picker')

    expect(root?.attributes('id')).toBe('dp-test')
    expect(root?.attributes('role')).toBe('combobox')
    expect(root?.attributes('aria-haspopup')).toBe('dialog')
    expect(root?.attributes('aria-controls')).toBe('dp-test-popper')
    expect(root?.attributes('aria-expanded')).toBe('false')
  })

  test('opens on input focus and closes on outside click', async () => {
    createComponent()

    const input = wrapper?.find('input')
    await input?.trigger('focus')
    await nextTick()

    expect(wrapper?.find('.ui-v1-date-picker__popper').isVisible()).toBe(true)

    const outside = document.createElement('button')
    document.body.appendChild(outside)
    outside.click()
    await nextTick()

    expect(wrapper?.find('.ui-v1-date-picker__popper').isVisible()).toBe(false)
    outside.remove()
  })

  test('opens with ArrowDown and closes with Escape', async () => {
    createComponent()

    const input = wrapper?.find('input')
    await input?.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper?.find('.ui-v1-date-picker').attributes('aria-expanded')).toBe('true')

    await input?.trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper?.find('.ui-v1-date-picker').attributes('aria-expanded')).toBe('false')
  })

  test('instant single mode emits change immediately and closes', async () => {
    createComponent({
      props: {
        value: new Date(2024, 10, 21),
      },
    })

    await wrapper?.find('input').trigger('focus')
    await nextTick()

    const targetDay = dayCell(new Date(2024, 10, 20))
    targetDay?.click()
    await nextTick()

    const changed = wrapper?.emitted('change')?.at(-1)?.[0] as Date | undefined
    expect(changed).toBeInstanceOf(Date)
    expect(changed?.getFullYear()).toBe(2024)
    expect(changed?.getMonth()).toBe(10)
    expect(changed?.getDate()).toBe(20)

    expect(wrapper?.find('.ui-v1-date-picker__popper').isVisible()).toBe(false)
  })

  test('confirmed mode emits only after apply', async () => {
    createComponent({
      props: {
        synchronization: SYNCHRONIZATION.CONFIRMED,
        value: null,
      },
    })

    await wrapper?.find('input').trigger('focus')
    await nextTick()

    dayCell(new Date())?.click()
    await nextTick()

    expect(wrapper?.emitted('change')).toBeUndefined()

    buttonByText('Apply')?.click()
    await nextTick()

    expect((wrapper?.emitted('change')?.length ?? 0) > 0).toBe(true)
  })

  test('confirmed mode applies selection by Enter key', async () => {
    createComponent({
      props: {
        synchronization: SYNCHRONIZATION.CONFIRMED,
        value: null,
      },
    })

    const input = wrapper?.find('input')
    await input?.trigger('focus')
    await nextTick()

    dayCell(new Date())?.click()
    await nextTick()

    expect(wrapper?.emitted('change')).toBeUndefined()

    await input?.trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect((wrapper?.emitted('change')?.length ?? 0) > 0).toBe(true)
    expect(wrapper?.find('.ui-v1-date-picker').attributes('aria-expanded')).toBe('false')
  })

  test('quick menu changes view and can be applied in confirmed mode', async () => {
    createComponent({
      props: {
        synchronization: SYNCHRONIZATION.CONFIRMED,
        quickOptions: [
          { label: 'Today', value: new Date(2024, 0, 10) },
        ],
      },
    })

    await wrapper?.find('input').trigger('focus')
    await nextTick()

    menuItemByText('Today')?.click()
    await nextTick()

    expect(wrapper?.emitted('change')).toBeUndefined()

    buttonByText('Apply')?.click()
    await nextTick()

    const changed = wrapper?.emitted('change')?.at(-1)?.[0] as Date | undefined
    expect(changed).toBeInstanceOf(Date)
    expect(changed?.getFullYear()).toBe(2024)
    expect(changed?.getMonth()).toBe(0)
    expect(changed?.getDate()).toBe(10)
  })

  test('does not render timepicker controls', async () => {
    createComponent({
      props: {
        synchronization: SYNCHRONIZATION.CONFIRMED,
      },
    })

    await wrapper?.find('input').trigger('focus')
    await nextTick()

    expect(wrapper?.find('.ui-v1-date-picker__timepicker').exists()).toBe(false)
  })
})
