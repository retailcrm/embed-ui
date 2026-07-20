import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { afterAll, beforeAll } from 'vitest'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { test, vi } from 'vitest'

import VSelect from '@/components/VSelect.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

type MountOptions<T extends Component> = ComponentMountingOptions<T>

class ResizeObserverPolyfill implements ResizeObserver {
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
}

const originalResizeObserver = globalThis.ResizeObserver

const createTestI18n = () => createI18n({
  fallbackLocale: 'en-GB',
  legacy: false,
  locale: 'ru-RU',
  messages: {
    'en-GB': messagesEnGb,
    'es-ES': messagesEsEs,
    'ru-RU': messagesRuRu,
  },
})

const mountWithApp = <T extends Component>(
  component: T,
  options: MountOptions<T> = {}
) => mount(component, {
    ...options,
    global: {
      ...(options.global ?? {}),
      plugins: [
        createTestI18n(),
        ...(options.global?.plugins ?? []),
      ],
    },
  })

beforeAll(() => {
  globalThis.ResizeObserver = ResizeObserverPolyfill
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

test('v-select emits selected value', async () => {
  const wrapper = mountWithApp(VSelect, {
    props: {
      id: 'mode',
      options: [
        {
          label: 'Виджеты',
          value: 'widget',
        },
        {
          label: 'Страница',
          value: 'page',
        },
      ],
      value: 'widget',
    },
  })

  await wrapper.get('[role="combobox"]').trigger('click')
  await nextTick()

  const option = document.body.querySelectorAll('[role="option"]')[1]

  expect(option).toBeInstanceOf(HTMLElement)
  option.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
  }))
  await nextTick()

  expect(wrapper.emitted('update:value')).toEqual([['page']])
})

test('v-select renders selected value', () => {
  const wrapper = mountWithApp(VSelect, {
    props: {
      id: 'fixture',
      options: [
        {
          disabled: true,
          label: 'Базовый заказ',
          value: 'order-basic',
        },
      ],
      value: 'order-basic',
    },
  })

  expect((wrapper.get('[role="combobox"]').element as HTMLInputElement).value).toBe('Базовый заказ')

  const trigger = wrapper.findComponent({ name: 'UiSelectTrigger' })
  const selection = trigger.props('selection') as Array<{
    isMatched: () => boolean;
  }>

  expect(selection[0].isMatched()).toBe(true)
})

test('v-select handles keyboard selection and empty value', async () => {
  const wrapper = mountWithApp(VSelect, {
    props: {
      id: 'mode',
      options: [{
        label: 'Виджеты',
        value: 'widget',
      }],
      value: 'widget',
    },
  })
  const trigger = wrapper.findComponent({ name: 'UiSelectTrigger' })
  const preventDefault = vi.fn()

  trigger.vm.$emit('keydown', {
    key: 'Escape',
    preventDefault,
  })
  trigger.vm.$emit('keydown', {
    key: 'Enter',
    preventDefault,
  })

  expect(preventDefault).toHaveBeenCalledOnce()
  expect(wrapper.emitted('update:value')).toEqual([['widget']])

  const emptyWrapper = mountWithApp(VSelect, {
    props: {
      id: 'empty-mode',
      options: [{
        label: 'Виджеты',
        value: 'widget',
      }],
      value: 'missing',
    },
  })
  const emptyTrigger = emptyWrapper.findComponent({ name: 'UiSelectTrigger' })

  emptyTrigger.vm.$emit('keydown', {
    key: 'Enter',
    preventDefault,
  })

  expect(emptyTrigger.props('selection')).toEqual([])
  expect(emptyTrigger.props('activeDescendant')).toBeNull()
  expect(emptyWrapper.emitted('update:value')).toBeUndefined()
})
