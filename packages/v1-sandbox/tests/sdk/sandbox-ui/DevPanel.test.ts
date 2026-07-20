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
    applyLaunchConfig: vi.fn(),
    contextJson: '{"order/card":{"number":"215C"}}',
    contextJsonChanged: false,
    fixture: 'order-basic',
    manifestUrl: 'http://extension.test/extension/id',
    mode: 'widget' as const,
    pageCode: 'returns',
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

  expect(wrapper.text()).toContain('Доставка JS-модуля')

  const devPanel = within(wrapper.element)

  expect(devPanel.getByRole('button', {
    name: 'Обязательный полный endpoint расширения: %extension-url%/extension/%extension-id%. Сервер расширения должен быть доступен из браузера.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Виджеты монтируются в выбранные CRM targets. Страница монтирует page runner по коду страницы.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Фикстура задаёт моковые данные CRM: контекст заказа, пользователя, настройки, пользовательские поля и начальное состояние host.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Обязателен только в режиме страницы. Укажите код из pages регистрации расширения, а не id расширения.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Targets — это слоты для встраивания виджетов. Выберите те же targets, которые регистрирует расширение.',
  })).toBeInstanceOf(HTMLButtonElement)
  expect(devPanel.getByRole('button', {
    name: 'Текущий контекст из фикстуры. Можно изменить его, чтобы симулировать другое состояние CRM, затем применить контекст.',
  })).toBeInstanceOf(HTMLButtonElement)

  const selects = wrapper.findAllComponents({ name: 'VSelect' })

  selects[0].vm.$emit('update:value', 'page')
  selects[1].vm.$emit('update:value', 'order-with-delivery')

  expect(props.setMode).toHaveBeenCalledWith('page')
  expect(props.setFixture).toHaveBeenCalledWith('order-with-delivery')

  await wrapper.get('input[id$="dev-panel-manifest-url"]').setValue('http://extension.test/extension/changed')
  await wrapper.get('textarea').setValue('{"order/card":{"number":"999C"}}')
  await wrapper.findAll('input[type="checkbox"]')[0].setValue(false)
  await wrapper.findAll('button').find(button => button.text() === 'Применить')?.trigger('click')

  expect(props.setManifestUrl).toHaveBeenCalledWith('http://extension.test/extension/changed')
  expect(props.setContextJson).toHaveBeenCalledWith('{"order/card":{"number":"999C"}}')
  expect(props.setTargetSelected).toHaveBeenCalledWith(ORDER_SANDBOX_SLOTS[0].target, false)
  expect(props.applyLaunchConfig).toHaveBeenCalledOnce()

  await wrapper.setProps({
    contextJsonChanged: true,
    mode: 'page',
  } as never)
  await wrapper.get('input[id$="dev-panel-page-code"]').setValue('orders-dashboard')
  await wrapper.findAll('button').find(button => button.text() === 'Применить контекст')?.trigger('click')

  expect(props.setPageCode).toHaveBeenCalledWith('orders-dashboard')
  expect(props.applyContextJson).toHaveBeenCalledOnce()
})

test('dev panel shows context json errors and disables page code in widget mode', () => {
  const wrapper = mountWithApp(DevPanel, {
    props: {
      applyContextJson: vi.fn(async () => undefined),
      applyLaunchConfig: vi.fn(),
      contextJson: '{',
      contextJsonChanged: false,
      fixture: 'order-basic',
      manifestUrl: '',
      mode: 'widget',
      pageCode: 'returns',
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
    'Invalid fixture',
    'Invalid page code',
    'Invalid targets',
    'Invalid JSON',
  ])
  expect(wrapper.get('input[id$="dev-panel-page-code"]').attributes('disabled')).toBeDefined()
  expect(wrapper.findAll('button').find(button => button.text() === 'Применить контекст')?.attributes('disabled'))
    .toBeDefined()
})
