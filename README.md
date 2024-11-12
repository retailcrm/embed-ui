# @retailcrm/embed-ui
API и компоненты для создания расширений интерфейса RetailCRM

## Цели

### `customer/card:phone`

Для виджетов в списке телефонов клиента в карточке клиента

### `order/card:customer.after`

Для виджетов, выводимых после полей в секции данных клиента в карточке заказа

### `order/card:customer.email`

Для виджетов, выводимых после поля "Email" в секции данных  клиента в карточке заказа

### `order/card:customer.phone`

Для виджетов, выводимых после поля "Телефон" в секции данных клиента в карточке заказа

### `order/card:delivery.address`

Для виджетов, выводимых после поля "Адрес" в секции данных доставки в карточке заказа

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
