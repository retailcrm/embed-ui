import { createI18n } from 'vue-i18n'

import messages_en_GB from './en-GB.json'
import messages_es_ES from './es-ES.json'
import messages_ru_RU from './ru-RU.json'

export const sandboxI18n = createI18n({
  fallbackLocale: 'en-GB',
  globalInjection: true,
  legacy: false,
  locale: 'en-GB',
  messages: {
    'en-GB': messages_en_GB,
    'es-ES': messages_es_ES,
    'ru-RU': messages_ru_RU,
  },
})
