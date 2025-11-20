import type {
  InjectionKey,
  Plugin,
} from 'vue'

import type { Locale } from '@/host/i18n/index'

import { reactive } from 'vue'

export class VueI18n {
  private _state: { locale?: Locale }

  constructor (locale: Locale | undefined = undefined) {
    this._state = reactive({ locale })
  }

  get locale () {
    return this._state.locale
  }

  set locale (locale: Locale | undefined) {
    this._state.locale = locale
  }
}

export const I18nInjectKey = Symbol('$embedI18n') as InjectionKey<VueI18n>

export default {
  install (app, options: VueI18n | { locale?: Locale; }) {
    app.provide(I18nInjectKey, options instanceof VueI18n ? options : new VueI18n(options?.locale))
  },
} as Plugin
