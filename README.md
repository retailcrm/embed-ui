# @retailcrm/embed-ui

API и компоненты для создания расширений интерфейса RetailCRM

## Цели встраивания

Цели встраивания определяют места, где будет размещена разметка виджета, генерируемая расширением.

### Карточка клиента

* `customer/card:phone` &ndash; Для виджетов в списке телефонов клиента в карточке клиента

### Карточка заказа

#### Основная секция

* `order/card:common.before` &ndash; начало секции, над полями ввода
* `order/card:common.after` &ndash; конец секции, под полями ввода

#### Секция данных клиента

* `order/card:customer.before` &ndash; начало секции, над полями ввода
* `order/card:customer.after` &ndash; конец секции, под полями ввода
* `order/card:customer.email` &ndash; под полем ввода "Email"
* `order/card:customer.phone` &ndash; под полем ввода "Телефон"

#### Секция данных склада

* `order/card:store.before` &ndash; начало секции, над полями ввода
* `order/card:store.after` &ndash; конец секции, под полями ввода

#### Секция габаритов и веса

* `order/card:dimensions.before` &ndash; начало секции, над полями ввода
* `order/card:dimensions.after` &ndash; конец секции, под полями ввода

#### Секция данных доставки

* `order/card:delivery.before` &ndash; начало секции, над полями ввода
* `order/card:delivery.after` &ndash; конец секции, под полями ввода
* `order/card:delivery.address` &ndash; под полем "Адрес"

#### Секция данных по оплате

* `order/card:payment.before` &ndash; начало секции, над полями ввода

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
