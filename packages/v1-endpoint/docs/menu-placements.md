# Меню и точки входа страниц

Этот справочник описывает, как документировать меню и пункты навигации, из которых запускаются
remote-страницы расширения.

Важно: `v1-endpoint` не экспортирует типизированный registry CRM-меню. Пакет отвечает за запуск
страницы по `code`, а список меню, подпунктов и их видимость задаются на стороне host/manifest
конкретного расширения.

## Термины

- `menu placement` — зона CRM, куда host добавляет пункт навигации.
- `menu item` — конкретный пункт меню, который видит пользователь.
- `page code` — стабильный код remote-страницы, который host передаёт в `definePageRunner`.
- `route` — маршрут CRM или route name, через который host открывает страницу.

`menu item` не равен `target`. Меню открывает полноценную remote-страницу по `code`, а `target`
используется для виджетов, которые встраиваются внутрь уже существующей CRM-страницы.

## Что нужно фиксировать в справочнике проекта

Для каждого пункта меню указывайте:

| Поле | Что означает |
| --- | --- |
| `placement` | Зона CRM, где находится пункт меню. |
| `item code` | Стабильный код пункта меню в host/manifest. |
| `label` | Пользовательское название пункта меню. |
| `page code` | Код remote-страницы, который получит `definePageRunner`. |
| `route` | Имя или путь CRM-маршрута, если пункт открывается через host routing. |
| `visibility` | Условия показа: права, настройки, тариф, доступность фичи. |

## Пример справочника меню

Это пример формата. Конкретные `placement`, `item code` и `route` нужно брать из host/manifest
расширения.

| Placement | Item code | Label | Page code | Route | Когда использовать |
| --- | --- | --- | --- | --- | --- |
| `main` | `orders-dashboard` | Заказы | `orders-dashboard` | `embed.page.orders_dashboard` | Основной пункт навигации расширения. |
| `settings` | `integration-settings` | Настройки интеграции | `integration-settings` | `embed.page.integration_settings` | Страница настроек, доступная администраторам. |
| `customer/card:actions` | `customer-tools` | Инструменты клиента | `customer-tools` | `embed.page.customer_tools` | Пункт в контексте карточки клиента. |

## Связь с `definePageRunner`

`page code` из справочника меню должен совпадать с ключом runner:

```ts
import { definePageRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import CustomerToolsPage from './pages/CustomerToolsPage.vue'
import IntegrationSettingsPage from './pages/IntegrationSettingsPage.vue'
import OrdersDashboardPage from './pages/OrdersDashboardPage.vue'

const pageRunner = definePageRunner({
  'customer-tools': definePageRunner(CustomerToolsPage),
  'integration-settings': definePageRunner(IntegrationSettingsPage),
  'orders-dashboard': definePageRunner(OrdersDashboardPage),
})
```

Если host откроет страницу с `code`, которого нет в runner map, `definePageRunner` запишет warning
в консоль и не смонтирует страницу.

Читайте также:

- [`page-routes`](./page-routes.md) — как описывать page `code` и CRM route.
- [`definePageRunner`](./define-page-runner.md) — как remote-страница получает `code`.
- [`targets`](./targets.md) — точки встраивания виджетов, не пунктов меню.
- [`layout`](./layout.md) — когда делать полноценную страницу, а когда `modal sidebar` или `modal window`.
- [`UiMenuItem`](../../v1-components/docs/profiles/UiMenuItem.yml) — компонент строки меню внутри UI расширения.
