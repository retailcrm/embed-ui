import type { SandboxLaunchMode } from '@/scenario'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import DevPanel from '@/components/DevPanel.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'
import { ORDER_SANDBOX_SLOTS } from '@/scenario'

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

afterEach(() => {
  cleanup()
})

test('dev panel updates launch fields and context', async () => {
  const props = {
    activeFixture: 'order-basic',
    applyContextJson: vi.fn(async () => undefined),
    applyLaunchConfig: vi.fn(async () => undefined),
    applyingContext: false,
    applyingLaunchConfig: false,
    contextApplySucceeded: false,
    contextHasManualChanges: false,
    contextJson: '{"order/card":{"number":"215C"}}',
    contextJsonChanged: false,
    downloadContextJson: vi.fn(),
    extensionConnected: true,
    fixture: 'order-basic',
    formatContextJson: vi.fn(),
    launchConfigChanged: false,
    manifestUrl: 'http://extension.test/extension/id',
    mode: 'widget' as SandboxLaunchMode,
    pageCode: 'returns',
    resetContextJson: vi.fn(),
    selectedTargets: [ORDER_SANDBOX_SLOTS[0].target],
    setContextJson: vi.fn(),
    setFixture: vi.fn(),
    setManifestUrl: vi.fn(),
    setMode: vi.fn(),
    setPageCode: vi.fn(),
    setTargetSelected: vi.fn(),
    validationErrors: {},
  }

  const { rerender } = render(DevPanel, {
    props,
    global: {
      plugins: [createTestI18n()],
      stubs: {
        UiTooltip: {
          template: '<div><slot /></div>',
        },
      },
    },
  })

  expect(screen.getByRole('button', {
    name: 'URL расширения может указывать на любое стороннее приложение, которое отдаёт расширение, например http://web-extensions-server.simla.local/extension/.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(screen.getByText(
    'Укажите полный URL расширения по примеру в поле. Замените UUID на значение из extensionrc.json и убедитесь, что получившаяся страница открывается в браузере.'
  )).toBeInstanceOf(HTMLSpanElement)

  const manifestUrlInput = screen.getByLabelText('Манифест / URL расширения') as HTMLInputElement

  expect(manifestUrlInput.placeholder).toContain('http://127.0.0.1:4175/extension/<uuid>')
  expect(screen.getByRole('button', {
    name: 'В режиме «Виджеты» виджеты добавляются в выбранные места встраивания. В режиме «Страница» запускается страница по её коду.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(screen.getByRole('button', {
    name: 'Базовый заказ: Обычный заказ без доставки, подходит для проверки общих блоков. Заказ с доставкой: Заказ с адресом и суммой для проверки виджетов доставки и оплаты. Отменённый заказ только для чтения: Отменённый заказ с настройками только для чтения для проверки неактивных состояний.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(screen.getByRole('button', {
    name: 'Места встраивания — это области интерфейса CRM для виджетов. Выберите те же места, которые зарегистрированы расширением.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(screen.getByRole('button', {
    name: 'Контекст текущего подключённого расширения. Он не зависит от фикстуры, выбранной для следующего запуска.',
  })).toBeInstanceOf(HTMLButtonElement)

  const contextJsonEditor = screen.getByLabelText('JSON контекста текущего запуска') as HTMLTextAreaElement

  expect(contextJsonEditor.getAttribute('spellcheck')).toBe('false')
  expect(contextJsonEditor.getAttribute('wrap')).toBe('off')
  expect(screen.queryByLabelText('Код страницы')).toBeNull()

  const targetsSelect = screen.getByDisplayValue(ORDER_SANDBOX_SLOTS[0].target)

  await fireEvent.click(targetsSelect)

  const targetsListbox = screen.getByRole('listbox', {
    name: 'Места встраивания виджетов',
  })
  const targetOptions = within(targetsListbox).getAllByRole('option')

  expect(targetsListbox.getAttribute('aria-multiselectable')).toBe('true')
  expect(targetOptions).toHaveLength(ORDER_SANDBOX_SLOTS.length)
  expect(within(targetsListbox).queryAllByRole('checkbox')).toHaveLength(0)

  await fireEvent.click(within(targetsListbox).getByRole('option', {
    name: ORDER_SANDBOX_SLOTS[0].target,
  }))
  await fireEvent.click(targetsSelect)

  const fixtureSelect = screen.getByRole('combobox', {
    name: 'Выбранная фикстура',
  })

  await fireEvent.click(fixtureSelect)

  const fixtureListbox = screen.getByRole('listbox', {
    name: 'Выбранная фикстура',
  })

  expect(within(fixtureListbox).getAllByRole('option').map(option => option.textContent?.trim())).toEqual([
    'Базовый заказ',
    'Заказ с доставкой',
    'Отменённый заказ только для чтения',
  ])

  await fireEvent.click(within(fixtureListbox).getByRole('option', {
    name: 'Заказ с доставкой',
  }))

  const modeSelect = screen.getByRole('combobox', {
    name: 'Режим',
  })

  await fireEvent.click(modeSelect)
  await fireEvent.click(within(screen.getByRole('listbox', {
    name: 'Режим',
  })).getByRole('option', {
    name: 'Страница',
  }))

  expect(props.setMode).toHaveBeenCalledWith('page')
  expect(props.setFixture).toHaveBeenCalledWith('order-with-delivery')
  expect(props.setTargetSelected).toHaveBeenCalledWith(ORDER_SANDBOX_SLOTS[0].target, false)

  await fireEvent.update(manifestUrlInput, 'http://extension.test/extension/changed')
  await fireEvent.update(contextJsonEditor, '{"order/card":{"number":"999C"}}')
  await fireEvent.click(screen.getByRole('button', { name: 'Форматировать' }))
  await fireEvent.click(screen.getByRole('button', { name: 'Отменить изменения' }))
  await fireEvent.click(screen.getByRole('button', { name: 'Скачать JSON' }))
  await fireEvent.click(screen.getByRole('button', { name: 'Применить' }))

  expect(props.setManifestUrl).toHaveBeenCalledWith('http://extension.test/extension/changed')
  expect(props.setContextJson).toHaveBeenCalledWith('{"order/card":{"number":"999C"}}')
  expect(props.formatContextJson).toHaveBeenCalledOnce()
  expect(props.resetContextJson).toHaveBeenCalledOnce()
  expect(props.downloadContextJson).toHaveBeenCalledOnce()
  expect(props.applyLaunchConfig).toHaveBeenCalledOnce()

  await rerender({
    applyingLaunchConfig: true,
  })
  expect((screen.getByRole('button', { name: 'Применить' }) as HTMLButtonElement).disabled).toBe(true)

  await rerender({
    applyingLaunchConfig: false,
    contextJsonChanged: true,
    mode: 'page',
    pageCode: '',
  })
  expect(screen.getByRole('combobox', { name: 'Режим' })).toBeInstanceOf(HTMLInputElement)
  expect(screen.queryByText('Места встраивания виджетов', { exact: true })).toBeNull()
  expect(screen.getByRole('button', {
    name: 'Укажите значение code из массива pages в дескрипторе, а не UUID расширения. Допустимы только латинские буквы (A–Z, a–z) и дефисы.',
  })).toBeInstanceOf(HTMLButtonElement)

  const pageCodeInput = screen.getByLabelText('Код страницы') as HTMLInputElement

  expect(pageCodeInput.placeholder).toBe('Введите код страницы')
  expect(pageCodeInput.value).toBe('')

  await rerender({
    validationErrors: {
      pageCode: 'В расширении нет страницы «returns». Доступные страницы: settings.',
    },
  })
  expect(screen.getByRole('alert').textContent)
    .toBe('В расширении нет страницы «returns». Доступные страницы: settings.')

  await fireEvent.update(pageCodeInput, ' 1Заказы orders-dashboard_2!')
  await fireEvent.click(screen.getByRole('button', { name: 'Применить контекст' }))

  expect(props.setPageCode).toHaveBeenCalledWith(' 1Заказы orders-dashboard_2!')
  expect(props.applyContextJson).toHaveBeenCalledOnce()
})

test('dev panel shows only widget settings and their errors in widget mode', () => {
  const props = {
    activeFixture: 'order-basic',
    applyContextJson: vi.fn(async () => undefined),
    applyLaunchConfig: vi.fn(async () => undefined),
    applyingContext: false,
    applyingLaunchConfig: false,
    contextApplySucceeded: false,
    contextHasManualChanges: false,
    contextJson: '{',
    contextJsonChanged: false,
    downloadContextJson: vi.fn(),
    extensionConnected: false,
    fixture: 'order-basic',
    formatContextJson: vi.fn(),
    launchConfigChanged: false,
    manifestUrl: '',
    mode: 'widget' as SandboxLaunchMode,
    pageCode: 'returns',
    resetContextJson: vi.fn(),
    selectedTargets: [],
    setContextJson: vi.fn(),
    setFixture: vi.fn(),
    setManifestUrl: vi.fn(),
    setMode: vi.fn(),
    setPageCode: vi.fn(),
    setTargetSelected: vi.fn(),
    validationErrors: {
      contextJson: 'Invalid JSON',
      fixture: 'Invalid fixture',
      mode: 'Invalid mode',
      pageCode: 'Invalid page code',
      targets: 'Invalid targets',
    },
  }

  render(DevPanel, {
    props,
    global: {
      plugins: [createTestI18n()],
      stubs: {
        UiTooltip: {
          template: '<div><slot /></div>',
        },
      },
    },
  })

  expect(screen.getAllByRole('alert').map(alert => alert.textContent)).toEqual([
    'Invalid mode',
    'Invalid targets',
    'Invalid fixture',
    'Invalid JSON',
  ])

  expect(screen.getByText('Места встраивания виджетов')).toBeInstanceOf(HTMLDivElement)

  const contextButton = screen.getByRole('button', { name: 'Применить контекст' }) as HTMLButtonElement
  expect(contextButton.disabled).toBe(true)
})
