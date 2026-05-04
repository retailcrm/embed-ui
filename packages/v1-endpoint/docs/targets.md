# `targets` и `defineTarget`

Модуль `@retailcrm/embed-ui-v1-endpoint/common` содержит
типизированные target-идентификаторы и helper для объявления целей.

## Что экспортируется

- `targets` — словарь встроенных target-конфигураций.
- `TargetName` — union всех ключей `targets`.
- `TargetList` — словарь `target -> SchemaList`, выведенный из `targets[target].contexts`.
- `defineTarget(id, config)` — helper для объявления target с типами контекстов, custom contexts и action scopes.
  Также поддерживает альтернативную форму `defineTarget(id, contexts)`.

## Что такое `target` и `context`

`target` — это идентификатор места встраивания виджета в интерфейсе CRM. Он отвечает на вопрос:
«куда CRM сейчас монтирует remote-виджет?». Например, `order/card:common.before` означает конкретную
точку встраивания на карточке заказа.

`context` — это набор реактивных данных, доступных виджету в этом месте. Он отвечает на вопрос:
«какие данные CRM можно читать или менять из этого виджета?». Список контекстов задаётся в
`targets[target].contexts`.

`target` не является данными заказа, клиента или пользователя. Это только место встраивания.
Данные нужно брать из контекстов, которые привязаны к этому `target`.

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
import { useContext as useOrderSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/order/card-settings'
import { useContext as useSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import { useContext as useUserContext } from '@retailcrm/embed-ui-v1-contexts/remote/user/current'

defineProps<{
  target: TargetName;
}>()

const order = useOrderContext()
const orderSettings = useOrderSettingsContext()
const settings = useSettingsContext()
const user = useUserContext()
</script>
```

Такой набор контекстов подходит для `order/card:common.before`, потому что этот `target` объявлен с
контекстами `order/card`, `order/card:settings`, `user/current` и `settings`.

Для `customer/card:phone` набор импортов будет другим:

```ts
import { useContext as useCustomerContext } from '@retailcrm/embed-ui-v1-contexts/remote/customer/card'
import { useContext as usePhoneContext } from '@retailcrm/embed-ui-v1-contexts/remote/customer/card-phone'
import { useContext as useSettingsContext } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import { useContext as useUserContext } from '@retailcrm/embed-ui-v1-contexts/remote/user/current'
```

## `defineTarget` в тестах

CRM не предоставляет расширениям механизм регистрации произвольных widget targets.
В рабочем сценарии виджет монтируется только в заранее определённые платформой цели из `targets`.

`defineTarget` нужен для объявления этих встроенных целей внутри пакета и для автотестов,
где требуется собрать изолированную target-конфигурацию без запуска CRM.

```ts
import { defineTarget } from '@retailcrm/embed-ui-v1-endpoint/common'

const testTarget = defineTarget('order/card:test.after', {
  contexts: [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ],
  customContexts: ['order'],
  actions: ['order/card'],
} as const)
```

Альтернативная форма с массивом контекстов подходит для target без custom contexts и action scopes.
В этом случае `customContexts` и `actions` будут пустыми:

```ts
const testTarget = defineTarget('customer/card:test.after', [
  'customer/card',
  'user/current',
  'settings',
] as const)
```

## AI-friendly YAML profiles

Для встроенных целей дополнительно генерируется каталог [`targets/*.yml`](./targets/).
Эти файлы предназначены для AI-ассистентов: они описывают target на английском, перечисляют
доступные contexts, custom contexts и action scopes, но не являются отдельным источником truth.
Обновляйте `targets.ts` и `targets.documentation.ts`, затем запускайте
`yarn workspace @retailcrm/embed-ui-v1-endpoint run build:docs`.

## Практический совет

Если раннер маппится по `target`, старайтесь использовать ключи из `TargetName`.
Это снижает риск опечаток и помогает IDE/TS сразу показать несовместимые значения.

Читайте также:

- [`defineWidgetRunner`](./define-widget-runner.md) — как `target` попадает в remote-компонент.
- [`menu-placements`](./menu-placements.md) — чем пункты меню для страниц отличаются от widget `target`.
- [`page-routes`](./page-routes.md) — как описывать page `code` и CRM route.
- [`CONCEPT`](../../v1-contexts/docs/ru/CONCEPT.md) — общий принцип работы контекстов.
- [`CUSTOM`](../../v1-contexts/docs/ru/CUSTOM.md) — пользовательский контекст для custom fields.
