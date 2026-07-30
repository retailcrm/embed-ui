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

const renderOnboarding = (props: { openDevPanel: () => void }) => render(ExtensionOnboarding, {
  props,
  global: {
    plugins: [createTestI18n()],
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
  expect(within(onboarding).getAllByRole('listitem')).toHaveLength(3)
  expect(within(onboarding).getByText('Запустите сервер расширения.')).toBeInstanceOf(HTMLLIElement)
  expect(within(onboarding).getByText('Запустите песочницу.')).toBeInstanceOf(HTMLLIElement)
  expect(within(within(onboarding).getAllByRole('listitem')[2]).getByText(
    'http://127.0.0.1:4175/extension/<uuid>'
  )).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText(/Дополнительный сервер запускать не требуется\./u)).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('Затем выберите режим: Виджеты или Страница.')).toBeInstanceOf(HTMLElement)

  const collapseButton = within(onboarding).getByRole('button', {
    name: 'Шаблон URL запуска',
  })

  expect(collapseButton.getAttribute('aria-expanded')).toBe('false')

  await fireEvent.click(collapseButton)

  expect(collapseButton.getAttribute('aria-expanded')).toBe('true')
  expect(within(onboarding).getByText('Это шаблон, а не готовая ссылка.', {
    exact: false,
  })).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('%sandbox-url%')).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('%extension-url%')).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('%extension-id%')).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('UUID расширения.')).toBeInstanceOf(HTMLElement)
  expect(within(onboarding).getByText('Пример полного URL расширения:')).toBeInstanceOf(HTMLElement)

  await fireEvent.click(within(onboarding).getByRole('button', {
    name: 'Открыть песочницу',
  }))

  expect(openDevPanel).toHaveBeenCalledOnce()
})
