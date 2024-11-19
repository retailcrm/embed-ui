# @retailcrm/embed-ui

API и компоненты для создания расширений интерфейса RetailCRM

## Цели встраивания

Цели встраивания определяют места, где будет размещена разметка виджета, генерируемая расширением.

https://docs.retailcrm.ru/Developers/modules/PublishingModuleMarketplace/JsModulesTargets

## Контексты

Предоставляют данные из системы, реактивны.

### `customer/card`

Данные карточки клиента

```typescript
import { useCustomerCardContext } from '@retailcrm/embed-ui'

const customer = useCustomerCardContext()
```

### `customer/card:phone`

Данные телефона клиента

```typescript
import { useCustomerCardPhoneContext } from '@retailcrm/embed-ui'

const phone = useCustomerCardPhoneContext()
```

### `order/card`

Данные карточки заказа

```typescript
import { useOrderCardContext } from '@retailcrm/embed-ui'

const order = useOrderCardContext()
```

### `settings`

Настройки CRM

```typescript
import { useSettingsContext } from '@retailcrm/embed-ui'

const settings = useSettingsContext()
```
