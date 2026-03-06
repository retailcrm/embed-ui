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

- [`defineRunner`](./docs/define-runner.md)
- [`definePageRunner`](./docs/define-page-runner.md)
- [`defineWidgetRunner`](./docs/define-widget-runner.md)
- [`createEndpoint`](./docs/create-endpoint.md)
- [`runEndpoint`](./docs/run-endpoint.md)
- [`targets` и `defineTarget`](./docs/targets.md)
