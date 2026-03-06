# `defineRunner`

`defineRunner` — это фасад над `definePageRunner` и `defineWidgetRunner`.
Он создаёт единый runner для endpoint, который умеет запускать и страницы, и виджеты.

## Сигнатура

```ts
defineRunner(config: {
  pages: Parameters<typeof definePageRunner>;
  widgets: Parameters<typeof defineWidgetRunner>;
}): {
  page: PageRunner;
  widget: WidgetRunner;
}
```

## Когда использовать

- Когда в одной интеграции есть и page-, и widget-сценарии.
- Когда нужен единый объект для `createEndpoint(...)` или `runEndpoint(...)`.

## Пример

```ts
import { defineRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './pages/OrdersPage.vue'
import OrderCommonWidget from './widgets/OrderCommonWidget.vue'

const runner = defineRunner({
  pages: [OrdersPage],
  widgets: [OrderCommonWidget],
})
```

## Пример с beforeMount и маппингом

```ts
import { definePageRunner, defineRunner, defineWidgetRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './pages/OrdersPage.vue'
import CustomersPage from './pages/CustomersPage.vue'
import CommonBeforeWidget from './widgets/CommonBeforeWidget.vue'
import CommonAfterWidget from './widgets/CommonAfterWidget.vue'

const runner = defineRunner({
  pages: [{
    orders: definePageRunner(OrdersPage),
    customers: definePageRunner(CustomersPage),
  }],

  widgets: [{
    'order/card:common.before': defineWidgetRunner(CommonBeforeWidget),
    'order/card:common.after': defineWidgetRunner(CommonAfterWidget),
  }],
})
```

## Что важно помнить

- `pages` и `widgets` передаются как tuple-аргументы соответствующих методов.
- Если нужен полный контроль над каждым типом runner, можно использовать `definePageRunner` и `defineWidgetRunner` напрямую.
