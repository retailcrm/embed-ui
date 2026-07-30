import type { HostedTreeRef, SandboxMount } from '@/runtime'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { test, vi } from 'vitest'

import PageMount from '@/components/PageMount.vue'

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

const renderPageMount = (props: {
  mount: SandboxMount;
  setTree: (mount: SandboxMount, tree: HostedTreeRef | null) => void;
}) => render(PageMount, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('page mount exposes accessible region', () => {
  const setTree = vi.fn()
  const [mount] = createMounts({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'page',
    pageCode: 'returns',
    targets: [],
    widgetId: 'sandbox-widget',
  })
  const { unmount } = renderPageMount({
    mount,
    setTree,
  })

  expect(screen.getByRole('region', {
    name: 'Страница расширения: returns',
  })).toBeInstanceOf(HTMLElement)
  expect(setTree).toHaveBeenCalled()

  unmount()

  expect(setTree).toHaveBeenLastCalledWith(mount, null)
})
