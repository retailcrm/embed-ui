import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'

import WidgetTargetList from '@/components/WidgetTargetList.vue'

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

test('widget target list renders every provided mount', () => {
  const wrapper = mountWithApp(WidgetTargetList, {
    props: {
      mounts: createMounts({
        extensionUrl: '',
        fixture: 'order-basic',
        manifestUrl: '',
        mode: 'widget',
        pageCode: 'returns',
        targets: [
          'order/card:common.before',
          'order/card:common.after',
        ],
        widgetId: 'sandbox-widget',
      }),
      setTree: vi.fn(),
    },
  })

  expect(wrapper.get('[role="region"]').attributes('aria-label')).toBe('Места встраивания виджетов')
  expect(wrapper.findAll('[role="region"][aria-label^="Цель виджета:"]')).toHaveLength(2)
})

test('widget target list supports an empty mount collection', () => {
  const wrapper = mountWithApp(WidgetTargetList, {
    props: {
      mounts: [],
      setTree: vi.fn(),
    },
  })

  expect(wrapper.findAll('[role="region"][aria-label^="Цель виджета:"]')).toHaveLength(0)
})
