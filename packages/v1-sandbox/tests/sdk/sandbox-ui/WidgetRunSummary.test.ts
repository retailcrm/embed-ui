import type { SandboxOrderTarget } from '@/scenario'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { test } from 'vitest'
import { within } from '@testing-library/vue'

import WidgetRunSummary from '@/components/WidgetRunSummary.vue'

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

afterEach(() => {
  cleanup()
})

const getSummary = (name: string): HTMLElement => screen.getByRole('region', { name })

const renderWidgetRunSummary = (
  props: { contextChanged?: boolean; fixture: string; targets: SandboxOrderTarget[] },
  locale = 'ru-RU'
) => render(WidgetRunSummary, {
  props: {
    contextChanged: false,
    ...props,
  },
  global: {
    plugins: [createTestI18n(locale)],
  },
})

test('shows one widget target and the active fixture', () => {
  renderWidgetRunSummary({
    fixture: 'order-basic',
    targets: ['order/card:common.after'],
  })
  const summary = getSummary('Текущий запуск')
  const targetList = within(summary).getByRole('list', {
    name: 'Места встраивания',
  })

  expect(within(summary).getByText('Виджет')).toBeInstanceOf(HTMLElement)
  expect(within(targetList).getAllByRole('listitem')).toHaveLength(1)
  expect(within(targetList).getByText('order/card:common.after')).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText('Базовый заказ')).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText(
    'Обычный заказ без доставки, подходит для проверки общих блоков.'
  )).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText('Исходный из фикстуры')).toBeInstanceOf(HTMLElement)
})

test('shows all selected targets and their count', () => {
  renderWidgetRunSummary({
    contextChanged: true,
    fixture: 'order-with-delivery',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
  })
  const summary = getSummary('Текущий запуск')
  const targetList = within(summary).getByRole('list', {
    name: 'Места встраивания',
  })

  expect(within(summary).getByText('Виджеты (2)')).toBeInstanceOf(HTMLElement)
  expect(within(targetList).getAllByRole('listitem')).toHaveLength(2)
  expect(within(targetList).getByText('order/card:common.before')).toBeInstanceOf(HTMLElement)
  expect(within(targetList).getByText('order/card:common.after')).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText('Заказ с доставкой')).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText(
    'Заказ с адресом и суммой для проверки виджетов доставки и оплаты.'
  )).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText('Изменён вручную')).toBeInstanceOf(HTMLElement)
})

test('shows the readonly fixture presentation', () => {
  renderWidgetRunSummary({
    fixture: 'order-readonly-error',
    targets: ['order/card:common.after'],
  })
  const summary = getSummary('Текущий запуск')

  expect(within(summary).getByText(
    'Отменённый заказ только для чтения'
  )).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText(
    'Отменённый заказ с настройками только для чтения для проверки неактивных состояний.'
  )).toBeInstanceOf(HTMLElement)
})

test('localizes fixture presentation in English and Spanish', () => {
  const { unmount } = renderWidgetRunSummary({
    fixture: 'order-with-delivery',
    targets: ['order/card:common.after'],
  }, 'en-GB')
  const englishSummary = getSummary('Current run')

  expect(within(englishSummary).getByText('Order with delivery')).toBeInstanceOf(HTMLElement)
  expect(within(englishSummary).getByText(
    'An order with an address and amount for testing delivery and payment widgets.'
  )).toBeInstanceOf(HTMLElement)

  unmount()

  renderWidgetRunSummary({
    fixture: 'order-readonly-error',
    targets: ['order/card:common.after'],
  }, 'es-ES')
  const spanishSummary = getSummary('Ejecución actual')

  expect(within(spanishSummary).getByText(
    'Pedido cancelado de solo lectura'
  )).toBeInstanceOf(HTMLElement)
  expect(within(spanishSummary).getByText(
    'Un pedido cancelado con configuración de solo lectura para comprobar estados deshabilitados.'
  )).toBeInstanceOf(HTMLElement)
})
