# `runEndpoint`

`runEndpoint` — shortcut для worker entry:
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

- Почти всегда, если endpoint запускается как web worker.
- Когда не нужен ручной контроль над messenger/transport.

## Когда лучше `createEndpoint`

- Когда transport создаётся не от `self` worker.
- Когда у вас кастомный runtime/bridge между host и remote.
