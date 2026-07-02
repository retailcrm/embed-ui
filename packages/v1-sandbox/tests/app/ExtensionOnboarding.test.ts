import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'

import ExtensionOnboarding from '@/components/ExtensionOnboarding.vue'

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

test('extension onboarding opens sandbox controls', async () => {
  const openDevPanel = vi.fn()
  const wrapper = mountWithApp(ExtensionOnboarding, {
    props: {
      openDevPanel,
    },
  })

  expect(wrapper.text()).toContain('Подключите внешнее расширение')
  expect(wrapper.text()).toContain('%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%')

  await wrapper.get('button').trigger('click')

  expect(openDevPanel).toHaveBeenCalledOnce()
})
