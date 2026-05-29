# `definePageRunner`

`definePageRunner` создаёт runner для встраиваемых страниц.
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

## Runtime-проверка страницы

После первого минимального vertical slice проверяйте страницу внутри CRM host, а не только через build/lint.

Минимальный чек:

- manifest или publish payload содержит page descriptor object с `code`, `menu`, `menuItemTitle` и нужной
  hierarchy metadata;
- `code` в `pages[]` совпадает с ключом runner map в `definePageRunner`;
- локальный dev server отдает `entrypoint` и `stylesheet` URL, которые указаны в extension config;
- пункт меню появился в CRM и открывает route `/modules/<module-code>/<page-code>`;
- frontend реально смонтировался в CRM host.

Если ошибка видна только в minified bundle, соберите или отдайте dev bundle без минификации до изменения кода
по догадке.

## `beforeMount`

`beforeMount` вызывается после `app.use(pinia)` и до `app.mount(...)`.
Подходит для регистрации плагинов, глобальных компонентов и начальной синхронизации сторов.

```ts
const pageRunner = definePageRunner(PageRoot, async (app, pinia) => {
  // init code
})
```

Читайте также:

- [`page-routes`](./page-routes.md) — как связать page `code`, CRM-маршрут и компонент страницы.
- [`menu-placements`](./menu-placements.md) — как описывать пункты меню, которые открывают встраиваемые страницы.
