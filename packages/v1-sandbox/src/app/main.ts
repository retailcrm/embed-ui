import '@retailcrm/embed-ui-v1-components/dist/host.css'

import './styles.css'

import { createApp } from 'vue'

import App from '@/app/App.vue'

import { sandboxI18n } from '@/app/i18n'

createApp(App)
  .use(sandboxI18n)
  .mount('#app')
