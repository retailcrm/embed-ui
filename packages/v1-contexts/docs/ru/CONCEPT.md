# Предустановленные контексты

`@retailcrm/embed-ui-v1-contexts` предоставляет реактивные контексты RetailCRM для JS-расширений.
Контекст дает расширению доступ к данным страницы CRM, на которой оно запущено: например к форме заказа,
карточке клиента, текущему пользователю или системным настройкам.

Контексты используются в remote-коде расширения. CRM host передает данные и события через endpoint,
а расширение работает с ними через публичные composable-утилиты пакета.

## Виды контекстов

В пакете есть два вида контекстов:

- Предустановленные контексты — имеют заранее известный набор полей, типы и readonly/writable статус.
  Примеры: `order/card`, `order/card:settings`, `user/current`, `settings`.
- Пользовательские контексты — строятся по схеме пользовательских полей CRM, поэтому состав полей заранее
  неизвестен. Они описаны отдельно в [`CUSTOM.md`](./CUSTOM.md).

Этот документ описывает предустановленные контексты.

## Как выбрать доступный контекст

Доступность контекста зависит от widget target. Для виджетов source of truth находится в
`@retailcrm/embed-ui-v1-endpoint`: target profile перечисляет `contexts`, `custom_contexts` и `action_scopes`,
которые доступны в конкретной точке встраивания.

Не нужно выводить доступность контекста из названия страницы или target id. Используйте target config.
Если target не перечисляет нужный контекст, расширение не должно полагаться на его наличие.

## Использование в remote-коде

Каждый предустановленный контекст экспортирует `useContext` из своего public entrypoint:

```typescript
import { useContext } from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const order = useContext()
```

Контекст работает как Pinia store с реактивными getters/setters для полей схемы. Поля и типы известны из
соответствующего `types/*.d.ts` и generated profiles.

Пример чтения данных заказа:

```typescript
import { computed } from 'vue'

import { useContext } from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const order = useContext()

const hasItems = computed(() => order.items.length > 0)
const customerEmail = computed(() => order['customer.email'])
```

Пример записи writable поля:

```typescript
import { useContext } from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const order = useContext()

order['discount.percent'] = 10
order['delivery.address'] = 'Москва, Тверская, 1'
```

## Readonly и writable поля

Каждое поле схемы имеет флаг `readonly`.

- Readonly поля предназначены для чтения и расчетов UI. Их нельзя менять напрямую.
- Writable поля можно менять через context store, если изменение соответствует контракту CRM.
- Если поле является агрегатом или управляется сложной логикой формы, правильный способ изменения может быть action,
  даже если UI-задача выглядит как изменение одного значения.

Например, в `order/card` поле `items` является readonly source of truth для состава заказа. Для изменения товарных
позиций используются actions: `changeItemQuantity`, `changeItemPriceType`, `changeItemDiscount`, `removeItem` и другие.

## Actions

Некоторые контексты имеют отдельный action scope. Actions нужны для host-mediated изменений, где прямой set поля
не отражает бизнес-операцию или невозможен из-за readonly-поля.

Для `order/card` actions экспортируются рядом с context:

```typescript
import {
  useActions,
  useContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const order = useContext()
const actions = useActions()

const firstItem = order.items[0]

if (firstItem) {
  await actions.changeItemQuantity(firstItem.index, firstItem.quantity + 1)
}
```

Используйте `OrderItem.index` из текущего `items` как идентификатор позиции при вызове item actions.

## Основные предустановленные контексты

### `order/card`

Данные формы заказа:

- идентификаторы и служебные поля заказа;
- customer fields;
- company fields;
- `items` — readonly список товарных позиций;
- `delivery.address` — writable адрес доставки;
- `discount.amount`, `discount.percent` — writable одноразовая скидка заказа;
- `discount.total` — readonly итоговая скидка;
- `status` — readonly статус заказа.

Для изменения товарных позиций используйте `useActions()` из
`@retailcrm/embed-ui-v1-contexts/remote/order/card`.

### `order/card:settings`

Readonly настройки формы заказа. Они нужны, чтобы UI расширения уважал возможности текущей CRM-формы:

- `priceEditable`;
- `productsRemoveAllowed`;
- `quantityIsFractional`;
- `showPriceTypes`;
- `useStores`;
- `useReserve`.

Например, если `quantityIsFractional` равен `false`, UI ввода количества не должен предлагать дробные значения.

### `customer/card`

Данные карточки клиента:

- `id`;
- `externalId`;
- `type`;
- `firstName`;
- `lastName`;
- `patronymic`.

### `customer/card:phone`

Телефонный контекст карточки клиента. Используется в target, где CRM предоставляет телефон клиента.

### `user/current`

Readonly данные текущего пользователя:

- идентификатор и ФИО;
- `groups`;
- `permissions`;
- `isAdmin`;
- `isManager`.

Используйте `permissions`, `groups` и quick flags для условного отображения действий в UI расширения.

### `settings`

Readonly системные настройки:

- `system.locale` — локаль CRM;
- `system.routing` — данные Symfony router для построения CRM route URL;
- `image.workers` — worker endpoints для обработки изображений.

## Generated AI profiles

При сборке пакета генерируются AI-friendly profiles:

- `docs/contexts/*.yml` — описание предустановленных контекстов;
- `docs/actions/*.yml` — описание action scopes;
- `docs/custom-contexts/*.yml` — описание custom context entities;
- `docs/*/index.json` — индексы generated resources.

Profiles генерируются из typed source metadata и не редактируются вручную:

```bash
yarn workspace @retailcrm/embed-ui-v1-contexts run build:docs
```

Полная сборка workspace тоже запускает генерацию:

```bash
yarn workspace @retailcrm/embed-ui-v1-contexts run build
```

Release workflow выполняет `yarn workspaces foreach -A --topological-dev run build`, поэтому profiles
генерируются перед публикацией и входят в published package вместе с `docs`.

## Связанные документы

- [`CUSTOM.md`](./CUSTOM.md) — пользовательские контексты для custom fields.
- [`@retailcrm/embed-ui-v1-endpoint` targets](../../../v1-endpoint/docs/targets.md) — как определить,
  какие contexts доступны в widget target.
