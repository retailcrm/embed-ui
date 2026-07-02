import '@retailcrm/embed-ui-v1-components/dist/host.css'

import './styles.css'

import type { App as VueApp } from 'vue'

import { createApp } from 'vue'

import App from '@/app/App.vue'

import i18n from '@/app/i18n'

export type SandboxMountTarget = Element | string

export const createSandbox = (): VueApp<Element> => {
  const app = createApp(App)

  app.use(i18n)

  return app
}

export const mountSandbox = (
  target: SandboxMountTarget = '#app'
): VueApp<Element> => {
  const app = createSandbox()

  app.mount(target)

  return app
}
