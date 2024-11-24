import type { InjectionKey, Plugin } from 'vue'

import { reactive } from 'vue'

export interface EmbedModal {
  container: Element | string | null;
}

export const ModalInjectKey = Symbol('$embedModal') as InjectionKey<EmbedModal>

export default {
  install (app, options: EmbedModal | null) {
    app.provide(ModalInjectKey, reactive({ container: null, ...options }))
  },
} as Plugin
