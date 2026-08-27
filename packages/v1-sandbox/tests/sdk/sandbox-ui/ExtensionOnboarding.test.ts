import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import ExtensionOnboarding from '@/components/ExtensionOnboarding.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

const createTestI18n = (locale = 'ru-RU') => createI18n({
  fallbackLocale: 'en-GB',
  legacy: false,
  locale,
  messages: {
    'en-GB': messagesEnGb,
    'es-ES': messagesEsEs,
    'ru-RU': messagesRuRu,
  },
})

const renderOnboarding = (
  props: { openDevPanel: () => void },
  locale = 'ru-RU'
) => render(ExtensionOnboarding, {
  props,
  global: {
    plugins: [createTestI18n(locale)],
  },
})

afterEach(() => {
  cleanup()
})

test('extension onboarding opens sandbox controls', async () => {
  const openDevPanel = vi.fn()

  renderOnboarding({
    openDevPanel,
  })

  const onboarding = screen.getByRole('region', {
    name: 'Подключите внешнее расширение',
  })

  expect(within(onboarding).getByRole('heading', {
    name: 'Подключите внешнее расширение',
  })).toBeInstanceOf(HTMLHeadingElement)
  expect(within(onboarding).getByText(/"code": "promoModule"/u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(/"baseUrl": "http:\/\/web-extensions-server\.simla\.local"/u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(/"entrypoint": "\/extension\/8ebe1617-d609-43e4-b35a-fbfae011eee3\/script"/u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(/"stylesheet": "\/extension\/8ebe1617-d609-43e4-b35a-fbfae011eee3\/stylesheet"/u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(/"pages": \[/u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(
    'Формат передаваемого дескриптора'
  )).toBeInstanceOf(HTMLSpanElement)
  expect(within(onboarding).getByText(/Дополнительный сервер запускать не требуется\./u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(
    'При заполнении отдельных полей затем выберите режим: Виджеты или Страница.'
  )).toBeInstanceOf(HTMLElement)

  expect(within(onboarding).queryByText('Легаси-шаблон URL запуска')).toBeNull()

  await fireEvent.click(within(onboarding).getByRole('button', {
    name: 'Открыть дев-панель',
  }))

  expect(openDevPanel).toHaveBeenCalledOnce()
})

test('extension onboarding localizes descriptor heading in English', () => {
  renderOnboarding({
    openDevPanel: vi.fn(),
  }, 'en-GB')

  expect(screen.getByText('Runtime descriptor format')).toBeInstanceOf(HTMLSpanElement)
  expect(screen.queryByText('Формат передаваемого дескриптора')).toBeNull()
})

test('extension onboarding localizes descriptor heading in Spanish', () => {
  renderOnboarding({
    openDevPanel: vi.fn(),
  }, 'es-ES')

  expect(screen.getByText('Formato del descriptor de ejecución')).toBeInstanceOf(HTMLSpanElement)
  expect(screen.queryByText('Формат передаваемого дескриптора')).toBeNull()
})
