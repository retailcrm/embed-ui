import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { fireEvent } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { screen } from '@testing-library/vue'
import { test, vi } from 'vitest'

import NavigationRail from '@/components/NavigationRail.vue'

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

const renderNavigationRail = (props: {
  devPanelControlsId: string;
  devPanelOpen: boolean;
  onOpenDevPanel?: () => void;
}) => render(NavigationRail, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('navigation rail keeps only sandbox controls interactive', async () => {
  const openDevPanel = vi.fn<() => void>()

  renderNavigationRail({
    devPanelControlsId: 'sandbox-controls',
    devPanelOpen: false,
    onOpenDevPanel: openDevPanel,
  })

  expect(screen.queryAllByRole('link')).toHaveLength(0)
  expect(screen.getAllByRole('button')).toHaveLength(1)

  const openSandboxControls = screen.getByRole('button', {
    name: 'Открыть управление песочницей',
  })

  expect(openSandboxControls.getAttribute('aria-controls')).toBe('sandbox-controls')
  expect(openSandboxControls.getAttribute('aria-expanded')).toBe('false')

  await fireEvent.click(openSandboxControls)

  expect(openDevPanel).toHaveBeenCalledOnce()
})
