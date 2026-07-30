import type { HostedTreeRef } from '@/runtime'
import type { SandboxMount } from '@/runtime'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { test, vi } from 'vitest'
import { within } from '@testing-library/vue'

import WidgetTargetList from '@/components/WidgetTargetList.vue'

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

const renderWidgetTargetList = (props: {
  mounts: SandboxMount[];
  setTree: (mount: SandboxMount, tree: HostedTreeRef | null) => void;
}) => render(WidgetTargetList, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('widget target list renders every provided mount', () => {
  renderWidgetTargetList({
    mounts: createMounts({
      extensionUrl: '',
      fixture: 'order-basic',
      manifestUrl: '',
      mode: 'widget',
      pageCode: 'returns',
      targets: [
        'order/card:common.before',
        'order/card:common.after',
      ],
      widgetId: 'sandbox-widget',
    }),
    setTree: vi.fn(),
  })
  const targetList = screen.getByRole('region', {
    name: 'Места встраивания виджетов',
  })

  expect(within(targetList).getAllByRole('region', {
    name: /^Место встраивания виджета:/u,
  })).toHaveLength(2)
})

test('widget target list supports an empty mount collection', () => {
  renderWidgetTargetList({
    mounts: [],
    setTree: vi.fn(),
  })
  const targetList = screen.getByRole('region', {
    name: 'Места встраивания виджетов',
  })

  expect(within(targetList).queryAllByRole('region', {
    name: /^Место встраивания виджета:/u,
  })).toHaveLength(0)
})
