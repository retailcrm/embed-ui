import type { Locale } from '@/common/components/date'

import { getCurrentInstance } from 'vue'

import { format } from 'date-fns'
import { enGB, es, ru } from 'date-fns/locale'

export const formatDateLat = (date: Date | string) => format(date, 'dd/MM/yyyy', { locale: enGB })
export const formatDateRu = (date: Date | string) => format(date, 'dd.MM.yyyy', { locale: ru })

export const formatTime = (date: Date | string) => format(date, 'HH:mm', { locale: enGB })

export const formatDate = (date: Date | string, locale: Locale | undefined = undefined) => {
  return (locale ?? detectLocale()) === 'ru-RU'
    ? formatDateRu(date)
    : formatDateLat(date)
}

export const formatDateTime = (date: Date | string, locale: Locale | undefined = undefined) => format(date, 'Pp', {
  locale: {
    'en-GB': enGB,
    'es-ES': es,
    'ru-RU': ru,
  }[locale ?? detectLocale()] ?? enGB,
})

function detectLocale(): Locale {
  const instance = getCurrentInstance()
  // Safely access i18n instance with proper type checking
  const i18n = instance?.appContext?.app?.config?.globalProperties?.$i18n

  if (i18n) {
    try {
      const locale = (
        typeof i18n.locale === 'object'
          ? i18n.locale.value
          : i18n.locale
      ) ?? 'en-GB'

      if (locale.startsWith('en')) return 'en-GB'
      if (locale.startsWith('es')) return 'es-ES'
      if (locale.startsWith('ru')) return 'ru-RU'
    } catch (error) {
      console.warn('Error detecting locale:', error)
    }
  }

  return 'en-GB'
}