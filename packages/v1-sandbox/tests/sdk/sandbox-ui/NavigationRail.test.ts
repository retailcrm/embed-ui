import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test } from 'vitest'

import NavigationRail from '@/components/NavigationRail.vue'

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

test('navigation rail emits dev panel open action', async () => {
  const wrapper = mountWithApp(NavigationRail, {
    props: {
      devPanelControlsId: 'sandbox-controls',
      devPanelOpen: false,
    },
  })

  await wrapper.get('a[aria-label="Раздел заказов"]').trigger('click')
  await wrapper.get('a[aria-label="Уведомления"]').trigger('click')
  await wrapper.get('button[aria-label="Открыть управление песочницей"]').trigger('click')

  expect(wrapper.get('a[aria-label="Раздел заказов"]').attributes('aria-current')).toBe('page')
  expect(wrapper.emitted('openDevPanel')).toHaveLength(1)
})
