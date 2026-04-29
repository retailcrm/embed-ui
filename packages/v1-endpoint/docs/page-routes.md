# Роуты страниц

Remote-страницы в `v1-endpoint` запускаются по `code`. Этот `code` приходит от host и пробрасывается
в компонент через `definePageRunner`.

`v1-endpoint` не задаёт фиксированный список page routes. Список страниц и CRM-маршрутов принадлежит
host/manifest конкретного расширения, поэтому его нужно хранить в справочнике проекта рядом с кодом
расширения.

## Что такое `page code`

`page code` — стабильный идентификатор remote-страницы внутри расширения. Он отвечает на вопрос:
«какую страницу расширения нужно смонтировать?».

Пример:

```ts
import { definePageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersDashboardPage from './pages/OrdersDashboardPage.vue'

const pageRunner = definePageRunner({
  'orders-dashboard': definePageRunner(OrdersDashboardPage),
})
```

Когда host запускает страницу с `code: 'orders-dashboard'`, компонент `OrdersDashboardPage` получает
этот код как prop:

```vue
<script setup lang="ts">
defineProps<{
  code: string;
}>()
</script>
```

## Что такое `route`

`route` — CRM-маршрут или route name, через который host открывает страницу. В remote-коде route
может использоваться для переходов через `HostApi.goTo(route, params)`.

Данные Symfony JS router доступны в контексте `settings` в поле `system.routing`. Это полезно,
когда нужно проверить доступные route names или собрать ссылку тем же routing data, что отдаёт host.

```ts
import { useContext as useSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/settings'

const settings = useSettingsContext()

console.log(settings['system.routing'].routes)
```

## Пример справочника роутов страниц

Это пример формата. Конкретные `code`, `route` и параметры нужно брать из host/manifest расширения.

| Page code | Route | Params | Открывается из | Компонент |
| --- | --- | --- | --- | --- |
| `orders-dashboard` | `embed.page.orders_dashboard` | `{}` | `main / orders-dashboard` | `OrdersDashboardPage.vue` |
| `integration-settings` | `embed.page.integration_settings` | `{}` | `settings / integration-settings` | `IntegrationSettingsPage.vue` |
| `customer-tools` | `embed.page.customer_tools` | `{ customerId }` | `customer/card:actions / customer-tools` | `CustomerToolsPage.vue` |

## Переход на CRM route

Если странице нужен переход на другой CRM-маршрут, используйте host API, а не прямую сборку URL.
Способ получения `HostApi` зависит от host-интеграции проекта, но сам публичный контракт выглядит так:

```ts
import type { HostApi } from '@retailcrm/embed-ui-v1-types/host'

const openSettings = (host: HostApi) => {
  host.goTo('embed.page.integration_settings')
}
```

Читайте также:

- [`menu-placements`](./menu-placements.md) — как связать пункт меню, page `code` и route.
- [`definePageRunner`](./define-page-runner.md) — как page `code` попадает в компонент.
- [`settings context`](../../v1-contexts/docs/ru/CONCEPT.md) — общий принцип работы контекстов.
- [`HostApi`](../../v1-types/host.d.ts) — публичный тип host API с `goTo`.
