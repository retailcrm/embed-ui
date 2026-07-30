import type { VSelectOption } from '@/app/types'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import VSelect from '@/components/VSelect.vue'

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

type SelectProps = {
  disabled?: boolean;
  id: string;
  labelledBy?: string;
  multiple?: boolean;
  'onUpdate:value'?: (value: string | string[]) => void;
  options: VSelectOption[];
  placeholder?: string;
  size?: 'sm' | 'xl' | 'xs';
  value: string | string[];
}

const renderVSelect = (props: SelectProps) => render(VSelect, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('v-select emits selected value', async () => {
  const updateValue = vi.fn()

  renderVSelect({
    id: 'mode',
    'onUpdate:value': updateValue,
    options: [
      {
        label: 'Виджеты',
        value: 'widget',
      },
      {
        label: 'Страница',
        value: 'page',
      },
    ],
    value: 'widget',
  })

  await fireEvent.click(screen.getByRole('combobox'))
  await fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', {
    name: 'Страница',
  }))

  expect(updateValue).toHaveBeenCalledWith('page')
})

test('v-select renders selected value', () => {
  renderVSelect({
    id: 'fixture',
    options: [
      {
        disabled: true,
        label: 'Базовый заказ',
        value: 'order-basic',
      },
    ],
    value: 'order-basic',
  })

  expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Базовый заказ')
})

test('v-select closes popper on repeated trigger click', async () => {
  renderVSelect({
    id: 'fixture-toggle',
    options: [{
      label: 'Базовый заказ',
      value: 'order-basic',
    }],
    value: 'order-basic',
  })

  const combobox = screen.getByRole('combobox')

  await fireEvent.click(combobox)

  expect(combobox.getAttribute('aria-expanded')).toBe('true')

  await fireEvent.click(combobox)

  expect(combobox.getAttribute('aria-expanded')).toBe('false')
})

test('v-select supports multiple selection', async () => {
  const updateValue = vi.fn()

  renderVSelect({
    id: 'targets',
    multiple: true,
    'onUpdate:value': updateValue,
    options: [
      {
        label: 'order/card:common.before',
        value: 'order/card:common.before',
      },
      {
        label: 'order/card:common.after',
        value: 'order/card:common.after',
      },
    ],
    value: ['order/card:common.before'],
  })

  const combobox = screen.getByRole('combobox')

  await fireEvent.click(combobox)

  const listbox = screen.getByRole('listbox')
  const beforeOption = within(listbox).getByRole('option', {
    name: 'order/card:common.before',
  })
  const afterOption = within(listbox).getByRole('option', {
    name: 'order/card:common.after',
  })

  expect(listbox.getAttribute('aria-multiselectable')).toBe('true')
  expect(beforeOption.getAttribute('aria-selected')).toBe('true')
  expect(afterOption.getAttribute('aria-selected')).toBe('false')

  await fireEvent.click(afterOption)

  expect(updateValue).toHaveBeenCalledWith([
    'order/card:common.before',
    'order/card:common.after',
  ])
  expect(combobox.getAttribute('aria-expanded')).toBe('true')
})

test('v-select supports keyboard navigation', async () => {
  renderVSelect({
    id: 'mode',
    options: [{
      label: 'Виджеты',
      value: 'widget',
    }],
    value: 'widget',
  })

  const combobox = screen.getByRole('combobox')

  await fireEvent.keyDown(combobox, { key: 'Enter' })

  expect(combobox.getAttribute('aria-expanded')).toBe('true')
  expect(screen.getByRole('listbox')).toBeInstanceOf(HTMLElement)

  await fireEvent.keyDown(combobox, { key: 'Escape' })

  expect(combobox.getAttribute('aria-expanded')).toBe('false')
  expect(screen.queryByRole('listbox')).toBeNull()
})

test('v-select handles an empty value', async () => {
  const updateValue = vi.fn()

  renderVSelect({
    id: 'empty-mode',
    'onUpdate:value': updateValue,
    options: [{
      label: 'Виджеты',
      value: 'widget',
    }],
    value: 'missing',
  })

  const combobox = screen.getByRole('combobox') as HTMLInputElement

  expect(combobox.value).toBe('')
  expect(combobox.getAttribute('aria-activedescendant')).toBeNull()

  await fireEvent.keyDown(combobox, { key: 'Enter' })

  expect(updateValue).not.toHaveBeenCalled()
})
