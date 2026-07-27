import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'
import { within } from '@testing-library/dom'

import DevPanel from '@/components/DevPanel.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'
import { ORDER_SANDBOX_SLOTS } from '@/scenario'

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

test('dev panel updates launch fields and context', async () => {
  const props = {
    applyContextJson: vi.fn(async () => undefined),
    applyLaunchConfig: vi.fn(async () => undefined),
    applyingLaunchConfig: false,
    contextJson: '{"order/card":{"number":"215C"}}',
    contextJsonChanged: false,
    downloadContextJson: vi.fn(),
    fixture: 'order-basic',
    formatContextJson: vi.fn(),
    manifestUrl: 'http://extension.test/extension/id',
    mode: 'widget' as const,
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
  const wrapper = mountWithApp(DevPanel, {
    props,
    global: {
      stubs: {
        UiTooltip: {
          template: '<div><slot /></div>',
        },
      },
    },
  })

  const devPanel = within(wrapper.element)

  expect(devPanel.getByRole('button', {
    name: 'URL расширения может указывать на любое стороннее приложение, которое отдаёт расширение, например http://web-extensions-server.simla.local/extension/.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(wrapper.text()).toContain(
    'Замените UUID на значение из extensionrc.json и убедитесь, что получившаяся страница открывается в браузере.'
  )
  expect(wrapper.get('input[id$="dev-panel-manifest-url"]').attributes('placeholder'))
    .toBe('http://127.0.0.1:4175/extension/<uuid>')
  expect(devPanel.getByRole('button', {
    name: 'В режиме «Виджеты» виджеты добавляются в выбранные места встраивания. В режиме «Страница» запускается страница по её коду.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Базовый заказ: Обычный заказ без доставки, подходит для проверки общих блоков. Заказ с доставкой: Заказ с адресом и суммой для проверки виджетов доставки и оплаты. Отменённый заказ только для чтения: Отменённый заказ с настройками только для чтения для проверки неактивных состояний.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Места встраивания — это области интерфейса CRM для виджетов. Выберите те же места, которые зарегистрированы расширением.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Текущий контекст из фикстуры. Измените его, чтобы воспроизвести другое состояние CRM, затем примените контекст.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(wrapper.get('textarea').attributes()).toMatchObject({
    spellcheck: 'false',
    wrap: 'off',
  })
  expect(wrapper.find('input[id$="dev-panel-page-code"]').exists()).toBe(false)

  const selects = wrapper.findAllComponents({ name: 'VSelect' })

  expect(selects[1].props('multiple')).toBe(true)
  expect(selects[1].props('options')).toHaveLength(ORDER_SANDBOX_SLOTS.length)
  expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(0)

  expect(selects[2].props('options')).toEqual([
    {
      label: 'Базовый заказ',
      value: 'order-basic',
    },
    {
      label: 'Заказ с доставкой',
      value: 'order-with-delivery',
    },
    {
      label: 'Отменённый заказ только для чтения',
      value: 'order-readonly-error',
    },
  ])

  selects[0].vm.$emit('update:value', 'page')
  selects[1].vm.$emit('update:value', [])
  selects[2].vm.$emit('update:value', 'order-with-delivery')

  expect(props.setMode).toHaveBeenCalledWith('page')
  expect(props.setFixture).toHaveBeenCalledWith('order-with-delivery')
  expect(props.setTargetSelected).toHaveBeenCalledWith(ORDER_SANDBOX_SLOTS[0].target, false)

  await wrapper.get('input[id$="dev-panel-manifest-url"]').setValue('http://extension.test/extension/changed')
  await wrapper.get('textarea').setValue('{"order/card":{"number":"999C"}}')
  await devPanel.getByRole('button', { name: 'Форматировать' }).click()
  await devPanel.getByRole('button', { name: 'Сбросить' }).click()
  await devPanel.getByRole('button', { name: 'Скачать JSON' }).click()
  await wrapper.findAll('button').find(button => button.text() === 'Применить')?.trigger('click')

  expect(props.setManifestUrl).toHaveBeenCalledWith('http://extension.test/extension/changed')
  expect(props.setContextJson).toHaveBeenCalledWith('{"order/card":{"number":"999C"}}')
  expect(props.formatContextJson).toHaveBeenCalledOnce()
  expect(props.resetContextJson).toHaveBeenCalledOnce()
  expect(props.downloadContextJson).toHaveBeenCalledOnce()
  expect(props.applyLaunchConfig).toHaveBeenCalledOnce()

  await wrapper.setProps({
    applyingLaunchConfig: true,
  } as never)
  expect(wrapper.findAll('button').find(button => button.text() === 'Применить')?.attributes('disabled'))
    .toBeDefined()

  await wrapper.setProps({
    applyingLaunchConfig: false,
    contextJsonChanged: true,
    mode: 'page',
    pageCode: '',
  } as never)
  expect(wrapper.findComponent({ name: 'VSelect' }).exists()).toBe(true)
  expect(wrapper.find('div[id$="dev-panel-targets-label"]').exists()).toBe(false)
  expect(devPanel.getByRole('button', {
    name: 'Укажите значение code из массива pages в дескрипторе, а не UUID расширения. Допустимы только латинские буквы (A–Z, a–z) и дефисы.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(wrapper.get('input[id$="dev-panel-page-code"]').attributes('placeholder'))
    .toBe('Введите код страницы')
  expect((wrapper.get('input[id$="dev-panel-page-code"]').element as HTMLInputElement).value)
    .toBe('')

  await wrapper.setProps({
    validationErrors: {
      pageCode: 'В расширении нет страницы «returns». Доступные страницы: settings.',
    },
  } as never)
  expect(devPanel.getByRole('alert').textContent)
    .toBe('В расширении нет страницы «returns». Доступные страницы: settings.')

  await wrapper.get('input[id$="dev-panel-page-code"]')
    .setValue(' 1Заказы orders-dashboard_2!')
  await wrapper.findAll('button').find(button => button.text() === 'Применить контекст')?.trigger('click')

  expect(props.setPageCode).toHaveBeenCalledWith(' 1Заказы orders-dashboard_2!')
  expect(props.applyContextJson).toHaveBeenCalledOnce()
})

test('dev panel shows only widget settings and their errors in widget mode', () => {
  const wrapper = mountWithApp(DevPanel, {
    props: {
      applyContextJson: vi.fn(async () => undefined),
      applyLaunchConfig: vi.fn(async () => undefined),
      applyingLaunchConfig: false,
      contextJson: '{',
      contextJsonChanged: false,
      downloadContextJson: vi.fn(),
      fixture: 'order-basic',
      formatContextJson: vi.fn(),
      manifestUrl: '',
      mode: 'widget',
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
    },
  })

  expect(wrapper.findAll('[role="alert"]').map(alert => alert.text())).toEqual([
    'Invalid mode',
    'Invalid targets',
    'Invalid fixture',
    'Invalid JSON',
  ])
  expect(wrapper.find('input[id$="dev-panel-page-code"]').exists()).toBe(false)
  expect(wrapper.find('div[id$="dev-panel-targets-label"]').exists()).toBe(true)
  expect(wrapper.findAll('button').find(button => button.text() === 'Применить контекст')?.attributes('disabled'))
    .toBeDefined()
})
