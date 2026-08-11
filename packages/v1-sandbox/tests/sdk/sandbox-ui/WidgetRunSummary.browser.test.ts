import type { VueWrapper } from '@vue/test-utils'

import { afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test } from 'vitest'
import { within } from '@testing-library/dom'

import WidgetRunSummary from '@/components/WidgetRunSummary.vue'

import messagesRuRu from '@/app/i18n/ru-RU.json'

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document.body.innerHTML = ''
})

test('describes the applied widget run with semantic selectors', () => {
  const root = document.createElement('div')

  document.body.append(root)
  wrapper = mount(WidgetRunSummary, {
    attachTo: root,
    props: {
      contextChanged: false,
      fixture: 'order-with-delivery',
      targets: [
        'order/card:common.before',
        'order/card:common.after',
      ],
    },
    global: {
      plugins: [createI18n({
        legacy: false,
        locale: 'ru-RU',
        messages: {
          'ru-RU': messagesRuRu,
        },
      })],
    },
  })

  const summary = within(root).getByRole('region', {
    name: 'Текущий запуск',
  })
  const targetList = within(summary).getByRole('list', {
    name: 'Места встраивания',
  })

  expect(within(summary).getByText('Виджеты (2)')).toBeInstanceOf(HTMLElement)
  expect(within(targetList).getAllByRole('listitem')).toHaveLength(2)
  expect(within(summary).getByText('Заказ с доставкой')).toBeInstanceOf(HTMLElement)
  expect(within(summary).getByText('Исходный из фикстуры')).toBeInstanceOf(HTMLElement)
})
