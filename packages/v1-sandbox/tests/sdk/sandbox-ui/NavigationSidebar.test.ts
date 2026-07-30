import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { render } from '@testing-library/vue'
import { screen } from '@testing-library/vue'
import { test } from 'vitest'

import NavigationSidebar from '@/components/NavigationSidebar.vue'

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

const renderNavigationSidebar = (props: { id: string; open: boolean }) => render(NavigationSidebar, {
  props,
  global: {
    plugins: [createTestI18n()],
  },
})

afterEach(() => {
  cleanup()
})

test('navigation sidebar keeps skeleton navigation decorative', () => {
  renderNavigationSidebar({
    id: 'sidebar',
    open: true,
  })

  expect(screen.getByRole('complementary').id).toBe('sidebar')
  expect(screen.getByRole('navigation')).toBeInstanceOf(HTMLElement)
  expect(screen.queryAllByRole('link')).toHaveLength(0)
  expect(screen.queryAllByRole('button')).toHaveLength(0)
})
