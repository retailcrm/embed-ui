# `targets` и `defineTarget`

Модуль `@retailcrm/embed-ui-v1-endpoint/common` содержит
типизированные target-идентификаторы и helper для объявления целей.

## Что экспортируется

- `targets` — словарь встроенных target-конфигураций.
- `TargetName` — union всех ключей `targets`.
- `defineTarget(id, contexts)` — helper для объявления target с типами контекстов.

## Что такое `target` и `context`

`target` — это идентификатор места встраивания виджета в интерфейсе CRM. Он отвечает на вопрос:
«куда CRM сейчас монтирует remote-виджет?». Например, `order/card:common.before` означает конкретную
точку встраивания на карточке заказа.

`context` — это набор реактивных данных, доступных виджету в этом месте. Он отвечает на вопрос:
«какие данные CRM можно читать или менять из этого виджета?». Список контекстов задаётся в
`targets[target].contexts`.

`target` не является данными заказа, клиента или пользователя. Это только место встраивания.
Данные нужно брать из контекстов, которые привязаны к этому `target`.

## Примеры встроенных `target`

| Target | Где встраивается | Доступные контексты |
| --- | --- | --- |
| `order/card:common.before` | Карточка заказа, перед блоком общей информации | `order/card`, `user/current`, `settings` |
| `order/card:customer.phone` | Карточка заказа, поле телефона клиента | `order/card`, `user/current`, `settings` |
| `customer/card:phone` | Карточка клиента, телефонный блок | `customer/card`, `customer/card:phone`, `user/current`, `settings` |
| `order/mg:list.before` | Карточка заказа, перед списком в multi-goods блоке | `order/card`, `order/card:settings`, `user/current`, `settings` |

## Проверка контекстов для `target`

```ts
import { targets } from '@retailcrm/embed-ui-v1-endpoint/common'

const target = targets['customer/card:phone']

console.log(target.contexts)
// ['customer/card', 'customer/card:phone', 'user/current', 'settings']
```

Если виджет монтируется в `customer/card:phone`, можно использовать контексты клиента, телефонного
блока, текущего пользователя и настроек. Контексты заказа в этой точке встраивания использовать не нужно.

## Пример использования `TargetName`

```ts
import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common'

const selectedTarget: TargetName = 'order/card:common.before'
```

## Пример виджета с `target` и контекстами

```vue
<script setup lang="ts">
import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common'

import { useContext as useOrderContext } from '@retailcrm/embed-ui-v1-contexts/remote/order/card'
import { useContext as useSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import { useContext as useUserContext } from '@retailcrm/embed-ui-v1-contexts/remote/user/current'

defineProps<{
  target: TargetName;
}>()

const order = useOrderContext()
const settings = useSettingsContext()
const user = useUserContext()
</script>
```

Такой набор контекстов подходит для `order/card:common.before`, потому что этот `target` объявлен с
контекстами `order/card`, `user/current` и `settings`.

Для `customer/card:phone` набор импортов будет другим:

```ts
import { useContext as useCustomerContext } from '@retailcrm/embed-ui-v1-contexts/remote/customer/card'
import { useContext as usePhoneContext } from '@retailcrm/embed-ui-v1-contexts/remote/customer/card-phone'
import { useContext as useSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import { useContext as useUserContext } from '@retailcrm/embed-ui-v1-contexts/remote/user/current'
```

## Пример `defineTarget`

```ts
import { defineTarget } from '@retailcrm/embed-ui-v1-endpoint/common'

const customTarget = defineTarget('order/card:custom.after', [
  'order/card',
  'user/current',
  'settings',
] as const)
```

## Практический совет

Если раннер маппится по `target`, старайтесь использовать ключи из `TargetName`.
Это снижает риск опечаток и помогает IDE/TS сразу показать несовместимые значения.

Читайте также:

- [`defineWidgetRunner`](./define-widget-runner.md) — как `target` попадает в remote-компонент.
- [`menu-placements`](./menu-placements.md) — чем пункты меню для страниц отличаются от widget `target`.
- [`page-routes`](./page-routes.md) — как описывать page `code` и CRM route.
- [`CONCEPT`](../../v1-contexts/docs/ru/CONCEPT.md) — общий принцип работы контекстов.
- [`CUSTOM`](../../v1-contexts/docs/ru/CUSTOM.md) — пользовательский контекст для custom fields.
