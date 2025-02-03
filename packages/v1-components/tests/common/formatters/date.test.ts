import { describe, expect, test } from 'vitest'

import { mount } from '@vue/test-utils'

import {
  formatDate,
  formatDateTime,
  formatTime,
} from '../../../src/common/formatters/date'

import { createI18n } from 'vue-i18n'
import { h, nextTick } from 'vue'

describe('common/formatters/date', () => {
  describe('formatDate', () => {
    test('falls back to en-GB', () => {
      expect(formatDate(new Date('2024-01-01T12:30:00'))).toMatch(/01\/01\/2024/)
    })

    test('handles string dates', () => {
      expect(formatDate('2024-01-01')).toMatch(/01\/01\/2024/)
    })

    test('should detect i18n locale from Vue instance', async () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'en-GB',
        fallbackLocale: 'en-GB',
      })

      const wrapper = mount({
        setup: () => () => h('div', [formatDate(new Date('2024-01-01T12:30:00'))]),
      }, {
        global: { plugins: [i18n] },
      })

      expect(wrapper.text()).toMatch('01/01/2024')

      i18n.global.locale.value = 'ru-RU'

      await nextTick()

      expect(wrapper.text()).toMatch('01.01.2024')

      i18n.global.locale.value = 'en-GB'

      await nextTick()

      expect(wrapper.text()).toMatch('01/01/2024')
    })
  })

  describe('formatTime', () => {
    test('uses explicit locale', () => {
      expect(formatTime(new Date('2024-01-01T12:30:00'))).toBe('12:30')
    })
  })

  describe('formatDateTime', () => {
    test('falls back to en-GB when no i18n instance exists', () => {
      expect(formatDateTime(new Date('2024-01-01T12:30:00'))).toMatch('01/01/2024, 12:30')
    })

    test('combines date and time', () => {
      const result = formatDateTime(new Date('2024-01-01T12:30:00'))

      expect(result).toMatch(/01\/01\/2024/)
      expect(result).toMatch(/12:30/)
    })

    test('should detect i18n locale from Vue instance', async () => {
      const i18n = createI18n({
        legacy: false,
        locale: 'en-GB',
        fallbackLocale: 'en-GB',
      })

      const wrapper = mount({
        setup: () => () => h('div', [formatDateTime(new Date('2024-01-01T12:30:00'))]),
      }, {
        global: { plugins: [i18n] },
      })

      expect(wrapper.text()).toMatch('01/01/2024, 12:30')

      i18n.global.locale.value = 'ru-RU'

      await nextTick()

      expect(wrapper.text()).toMatch('01.01.2024, 12:30')

      i18n.global.locale.value = 'en-GB'

      await nextTick()

      expect(wrapper.text()).toMatch('01/01/2024, 12:30')
    })
  })
})
