# `targets` и `defineTarget`

Модуль `@retailcrm/embed-ui-v1-endpoint/common` содержит
типизированные target-идентификаторы и helper для объявления целей.

## Что экспортируется

- `targets` — словарь встроенных target-конфигураций.
- `TargetName` — union всех ключей `targets`.
- `defineTarget(id, contexts)` — helper для объявления target с типами контекстов.

## Пример использования `TargetName`

```ts
import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common'

const selectedTarget: TargetName = 'order/card:common.before'
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
