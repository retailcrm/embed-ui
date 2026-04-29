# `definePageRunner`

`definePageRunner` создаёт runner для remote-страниц.
При запуске в компонент пробрасывается проп `code`.

## Перегрузки

```ts
definePageRunner(component: Component, beforeMount?: (app, pinia) => void | Promise<void>): Runner
definePageRunner(runners: Record<string, Runner>): Runner
```

## Вариант 1. Один компонент на все `code`

```ts
import { definePageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import PageRoot from './PageRoot.vue'

const pageRunner = definePageRunner(PageRoot)
```

Компонент получит `code` как prop:

```ts
// внутри PageRoot
defineProps<{
  code: string;
}>()
```

## Вариант 2. Разные раннеры по `code`

```ts
import { definePageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './OrdersPage.vue'
import CustomersPage from './CustomersPage.vue'

const pageRunner = definePageRunner({
  orders: definePageRunner(OrdersPage),
  customers: definePageRunner(CustomersPage),
})
```

Если для `code` нет раннера, будет warning в консоль и noop-destroy.

## `beforeMount`

`beforeMount` вызывается после `app.use(pinia)` и до `app.mount(...)`.
Подходит для регистрации плагинов, глобальных компонентов и начальной синхронизации сторов.

```ts
const pageRunner = definePageRunner(PageRoot, async (app, pinia) => {
  // init code
})
```

Читайте также:

- [`page-routes`](./page-routes.md) — как связать page `code`, CRM route и компонент страницы.
- [`menu-placements`](./menu-placements.md) — как описывать пункты меню, которые открывают remote-страницы.
