import type { HostedTreeRef } from '@/runtime'
import type { SandboxMount } from '@/runtime'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import WidgetTarget from '@/components/WidgetTarget.vue'

import { createMounts } from '@/runtime'
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

const renderWidgetTarget = (props: {
  mount: SandboxMount;
  setTree: (mount: SandboxMount, tree: HostedTreeRef | null) => void;
}) => render(WidgetTarget, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('widget target exposes accessible region', () => {
  const setTree = vi.fn()
  const [mount] = createMounts({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'returns',
    targets: ['order/card:common.after'],
    widgetId: 'sandbox-widget',
  })
  const { unmount } = renderWidgetTarget({
    mount,
    setTree,
  })
  const target = screen.getByRole('region', {
    name: 'Место встраивания виджета: order/card:common.after',
  })

  expect(within(target).getByText('order/card:common.after')).toBeInstanceOf(HTMLElement)
  expect(setTree).toHaveBeenCalled()

  unmount()

  expect(setTree).toHaveBeenLastCalledWith(mount, null)
})
