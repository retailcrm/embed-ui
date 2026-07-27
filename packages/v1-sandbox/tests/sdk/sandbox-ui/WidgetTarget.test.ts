import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'

import WidgetTarget from '@/components/WidgetTarget.vue'

import { createMounts } from '@/runtime'
import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

type MountOptions<T extends Component> = ComponentMountingOptions<T>

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

test('widget target exposes accessible region', () => {
  const setTree = vi.fn()
  const [mount] = createMounts({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'returns',
    targets: ['order/card:common.after'],
    widgetId: 'sandbox-widget',
  })
  const wrapper = mountWithApp(WidgetTarget, {
    props: {
      mount,
      setTree,
    },
  })

  expect(wrapper.get('[role="region"]').attributes('aria-label'))
    .toBe('Место встраивания виджета: order/card:common.after')
  expect(wrapper.text()).toContain('order/card:common.after')
  expect(setTree).toHaveBeenCalled()

  wrapper.unmount()

  expect(setTree).toHaveBeenLastCalledWith(mount, null)
})
