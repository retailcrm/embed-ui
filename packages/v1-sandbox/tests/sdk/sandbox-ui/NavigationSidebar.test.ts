import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test } from 'vitest'

import NavigationSidebar from '@/components/NavigationSidebar.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'

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

test('navigation sidebar renders fixed skeleton navigation', async () => {
  const wrapper = mountWithApp(NavigationSidebar, {
    props: {
      id: 'sidebar',
      open: true,
    },
  })

  expect(wrapper.attributes('id')).toBe('sidebar')
  expect(wrapper.findAll('.ui-v1-skeleton')).toHaveLength(10)

  await wrapper.setProps({ open: false } as never)

  expect(wrapper.classes().join(' ')).toContain('navigation-sidebar_closed')
})
