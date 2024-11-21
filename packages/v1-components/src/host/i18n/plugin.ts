import type { InjectionKey, Plugin } from 'vue'

import { reactive } from 'vue'

export class VueI18n {
  private _state: { locale?: string }
  
  constructor (locale: string|undefined = undefined) {
    this._state = reactive({ locale })
  }
  
  get locale () {
    return this._state.locale
  }
  
  set locale (locale: string|undefined) {
    this._state.locale = locale
  }
}

export const VueI18nInjectKey = Symbol('$embedI18n') as InjectionKey<VueI18n>

export default {
  install (app, options: VueI18n | { locale?: string; }) {
    app.provide(VueI18nInjectKey, options instanceof VueI18n ? options : new VueI18n(options?.locale))
  },
} as Plugin
