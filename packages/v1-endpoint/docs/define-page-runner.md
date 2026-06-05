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

## Shared page setup

Если runner обслуживает несколько embed pages, держите root/switch component максимально тонким: он выбирает
компонент страницы по `code`, но не должен дублировать context plumbing, синхронизацию локали и API-адаптеры
каждой страницы.

Для i18n используйте общий composable или plugin, который синхронизирует remote locale из settings/context
источника, принятого в проекте. Если локаль нужна нескольким embed pages, не копируйте один и тот же watch/load
код в каждую страницу и не прячьте его в page switch без явной причины.

Для admin pages с несколькими сущностями предпочитайте тонкие domain helpers вместо одного безымянного
`callAdminApi`: `loadSettings`, `saveSettings`, `loadSpecialties`, `saveSpecialist`, `deleteSpecialist` и т.п.
Такие helpers должны сохранять transport details внутри integration layer, но отражать доменный контракт страницы
в именах и типах.

Ошибки API сохраняйте структурированными: status, field errors, error codes и machine-readable детали не должны
теряться при преобразовании в UI state. Если API возвращает error codes, frontend может переводить их в локали UI;
готовый backend message допустим как fallback или специальное продуктовое требование, но не должен быть
единственным typed contract для сложной формы.

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
