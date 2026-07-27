import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test } from 'vitest'
import { within } from '@testing-library/dom'

import WidgetRunSummary from '@/components/WidgetRunSummary.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

type MountOptions<T extends Component> = ComponentMountingOptions<T>

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

const getSummary = (element: HTMLElement, name: string): HTMLElement => {
  const heading = within(element).getByRole('heading', { name })
  const summary = heading.closest<HTMLElement>('[role="region"]')

  expect(summary).not.toBeNull()

  return summary as HTMLElement
}

test('shows one widget target and the active fixture', () => {
  const wrapper = mountWithApp(WidgetRunSummary, {
    props: {
      fixture: 'order-basic',
      targets: ['order/card:common.after'],
    },
  })
  const summary = getSummary(wrapper.element, 'Текущий запуск')
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
})

test('shows all selected targets and their count', () => {
  const wrapper = mountWithApp(WidgetRunSummary, {
    props: {
      fixture: 'order-with-delivery',
      targets: [
        'order/card:common.before',
        'order/card:common.after',
      ],
    },
  })
  const summary = getSummary(wrapper.element, 'Текущий запуск')
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
})

test('shows the readonly fixture presentation', () => {
  const wrapper = mountWithApp(WidgetRunSummary, {
    props: {
      fixture: 'order-readonly-error',
      targets: ['order/card:common.after'],
    },
  })
  const summary = getSummary(wrapper.element, 'Текущий запуск')

  expect(within(summary).getByText(
    'Отменённый заказ только для чтения'
  )).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText(
    'Отменённый заказ с настройками только для чтения для проверки неактивных состояний.'
  )).toBeInstanceOf(HTMLElement)
})

test('localizes fixture presentation in English and Spanish', () => {
  const englishWrapper = mount(WidgetRunSummary, {
    props: {
      fixture: 'order-with-delivery',
      targets: ['order/card:common.after'],
    },
    global: {
      plugins: [createTestI18n('en-GB')],
    },
  })
  const spanishWrapper = mount(WidgetRunSummary, {
    props: {
      fixture: 'order-readonly-error',
      targets: ['order/card:common.after'],
    },
    global: {
      plugins: [createTestI18n('es-ES')],
    },
  })

  expect(getSummary(englishWrapper.element, 'Current run').textContent)
    .toContain('Order with delivery')
  expect(within(englishWrapper.element).getByText(
    'An order with an address and amount for testing delivery and payment widgets.'
  )).toBeInstanceOf(HTMLElement)
  expect(getSummary(spanishWrapper.element, 'Ejecución actual').textContent)
    .toContain('Pedido cancelado de solo lectura')
  expect(within(spanishWrapper.element).getByText(
    'Un pedido cancelado con configuración de solo lectura para comprobar estados deshabilitados.'
  )).toBeInstanceOf(HTMLElement)
})
