import {I18nLocalized, Locale, Options} from '@/host/i18n'
import I18n, { localize } from '@/host/i18n'

import messages_en_GB from './i18n/ru-RU.json'
import messages_es_ES from './i18n/es-ES.json'
import messages_ru_RU from './i18n/ru-RU.json'

export const fallback = 'en-GB'

const i18n = new I18n({
  messages: {
    'en-GB': messages_en_GB,
    'es-ES': messages_es_ES,
    'ru-RU': messages_ru_RU,
  },
  fallback,
})

const extend = (i18n: I18n, options : Options|null = null) => options
  ? i18n.extend(options)
  : i18n

export const init = (
  locale: string,
  options : Options|null = null
): I18nLocalized => localize(
  extend(i18n, options),
  locale as `${Locale}`
)

export default {
  fallback: 'en-GB',
  init,
}
