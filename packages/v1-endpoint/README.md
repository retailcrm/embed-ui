# `@retailcrm/embed-ui-v1-endpoint`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-endpoint.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-endpoint)

`@retailcrm/embed-ui-v1-endpoint` помогает поднять endpoint для удалённых
виджетов и страниц в RetailCRM: принять вызовы host-части, смонтировать Vue
приложение в удалённый root и корректно освобождать ресурсы.

Пакет покрывает два сценария:

- **Pages** — запуск по `code`.
- **Widgets** — запуск по `id + target`.

## Быстрый старт

```ts
// endpoint.worker.ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './pages/OrdersPage.vue'
import OrderCommonWidget from './widgets/OrderCommonWidget.vue'

const runner = defineRunner({
  pages: [OrdersPage],
  widgets: [OrderCommonWidget],
})

runEndpoint(runner)
```

Для продакшен-использования обычно достаточно `runEndpoint(...)` в worker entry.
Если нужен более низкоуровневый контроль транспорта — используйте `createEndpoint(...)`.

## Продвинутые гайды

Подробная документация по методам находится в каталоге [`docs/`](./docs/README.md):

- [`defineRunner`](./docs/define-runner.md) — как объединить page и widget runners в один endpoint runner.
- [`definePageRunner`](./docs/define-page-runner.md) — как запускать remote-страницы по `code`.
- [`defineWidgetRunner`](./docs/define-widget-runner.md) — как запускать remote-виджеты по `target`.
- [`createEndpoint`](./docs/create-endpoint.md) — как вручную создать endpoint с transport и messenger.
- [`runEndpoint`](./docs/run-endpoint.md) — как поднять endpoint в worker entry одной строкой.
- [`targets` и `defineTarget`](./docs/targets.md) — как типизировать цели виджетов и маршрутизировать их по target.
- [`layout`](./docs/layout.md) — как выбирать layout-паттерны страниц, `modal sidebar` и `modal window`, и из каких `v1-components` их собирать.
