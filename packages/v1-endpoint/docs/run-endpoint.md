# `runEndpoint`

`runEndpoint` — краткая форма для точки входа веб-воркера:
он вызывает `createEndpoint(runner, self as Worker)`.

## Сигнатура

```ts
runEndpoint(runner: Runner): Endpoint<RemoteApi>
```

## Базовый сценарий

```ts
// endpoint.worker.ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './pages/OrdersPage.vue'
import OrderWidget from './widgets/OrderWidget.vue'

const runner = defineRunner({
  pages: [OrdersPage],
  widgets: [OrderWidget],
})

runEndpoint(runner)
```

## Когда использовать

- Почти всегда, если endpoint запускается как веб-воркер.
- Когда не нужен ручной контроль над messenger/transport.

## Когда лучше `createEndpoint`

- Когда transport создаётся не от `self` веб-воркера.
- Когда у вас кастомная среда выполнения или bridge между host и remote.
