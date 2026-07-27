import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/dom'

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
  expect(wrapper.findAll('li')).toHaveLength(3)
  expect(wrapper.text()).toContain('Запустите сервер расширения.')
  expect(wrapper.text()).toContain('Запустите песочницу.')
  expect(wrapper.text()).toContain('http://127.0.0.1:4175/extension/<uuid>')
  expect(wrapper.text()).toContain('Дополнительный сервер запускать не требуется.')
  expect(wrapper.text()).toContain('Виджеты или Страница')
  expect(wrapper.text()).toContain('Шаблон URL запуска')
  expect(wrapper.text()).toContain('Это шаблон, а не готовая ссылка.')
  expect(wrapper.text()).toContain('%sandbox-url%')
  expect(wrapper.text()).toContain('%extension-url%')
  expect(wrapper.text()).toContain('%extension-id%')
  expect(wrapper.text()).toContain('UUID расширения.')
  expect(wrapper.text()).toContain('Пример полного URL расширения:')

  const onboarding = within(wrapper.element)
  const collapseButton = onboarding.getByRole('button', {
    name: 'Шаблон URL запуска',
  })

  expect(collapseButton.getAttribute('aria-expanded')).toBe('false')

  fireEvent.click(collapseButton)
  await nextTick()

  expect(collapseButton.getAttribute('aria-expanded')).toBe('true')

  const openSandboxButton = onboarding.getByRole('button', {
    name: 'Открыть песочницу',
  })

  fireEvent.click(openSandboxButton)

  expect(openDevPanel).toHaveBeenCalledOnce()
})
