import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Offer } from '~types/order/card-items'
import type { OrderItem } from '~types/order/card-items'
import type { OrderItemStatus } from '~types/order/card-items'
import type { PriceType } from '~types/order/card-items'
import type { Product } from '~types/order/card-items'
import type { Shape } from '@/predicates'
import type { Schema } from '~types/order/card-items'

import {
  arrayOf,
  isBoolean,
  isExactly,
  isNull,
  isNumber,
  isNumeric,
  isShape,
  isString,
  oneOf,
} from '@/predicates'

export const isDimensions = isShape({
  L: [oneOf(isNumber, isNull), true],
  W: [oneOf(isNumber, isNull), true],
  H: [oneOf(isNumber, isNull), true],
})

export const isMoney = isShape({
  amount: [isNumber, true],
  currency: [isString, true],
})

export const isWeightUnit = oneOf(
  isExactly('grams'),
  isExactly('kilograms'),
  isExactly('tons')
)

export const isWeight = isShape({
  value: [isNumber, true],
  unit: [isWeightUnit, true],
})

export const isProperty = isShape({
  code: [isString, true],
  name: [isString, true],
  value: [isString, true],
})

export const isDiscountType = oneOf(
  isExactly('bonus_charge'),
  isExactly('loyalty_event'),
  isExactly('loyalty_level'),
  isExactly('manual_order'),
  isExactly('manual_product'),
  isExactly('personal'),
  isExactly('round')
)

export const isDiscount = isShape({
  type: [isDiscountType, true],
  amount: [isNumber, true],
})

export const isOffer = isShape({
  id: [isNumber, true],
  name: [isString, true],
  image: [oneOf(isString, isNull), true],
  dimensions: [isDimensions, true],
  weight: [oneOf(isWeight, isNull), true],
  article: [oneOf(isString, isNull), true],
  barcode: [oneOf(isString, isNull), true],
  properties: [arrayOf(isProperty), true],
  unit: [oneOf(isString, isNull), true],
  purchasePrice: [oneOf(isMoney, isNull), true],
} satisfies Shape<Offer>)

export const isPriceType = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
  title: [isString, true],
  default: [isBoolean, true],
  currency: [isString, true],
} satisfies Shape<PriceType>)

export const isProductType = oneOf(
  isExactly('PRODUCT'),
  isExactly('SERVICE')
)

export const isProductGroup = isShape({
  id: [isNumber, true],
  name: [isString, true],
})

export const isProduct = isShape({
  id: [isNumber, true],
  type: [isProductType, true],
  name: [isString, true],
  image: [oneOf(isString, isNull), true],
  article: [oneOf(isString, isNull), true],
  manufacturer: [oneOf(isString, isNull), true],
  markable: [isBoolean, true],
  groups: [arrayOf(isProductGroup), true],
  unit: [oneOf(isString, isNull), true],
  url: [oneOf(isString, isNull), true],
  recommendationProviderType: [oneOf(
    isExactly('NONE'),
    isExactly('SERVICE'),
    isExactly('SYSTEM')
  ), true],
} satisfies Shape<Product>)

export const isStatus = isShape({
  id: [isNumber, true],
  name: [isString, true],
  isCancel: [isBoolean, false],
} satisfies Shape<OrderItemStatus>)

export const isItem = isShape({
  id: [oneOf(isNumber, isNull), true],
  index: [isNumber, true],
  type: [isProductType, true],
  offer: [oneOf(isOffer, isNull), true],
  product: [oneOf(isProduct, isNull), true],
  properties: [arrayOf(isProperty), true],
  quantity: [isNumber, true],
  purchasePrice: [oneOf(isMoney, isNull), true],
  initialPrice: [oneOf(isMoney, isNull), true],
  priceType: [oneOf(isPriceType, isNull), true],
  bonusesChargeTotal: [isNumber, true],
  bonusesCreditTotal: [isNumber, true],
  discounts: [arrayOf(isDiscount), true],
  discountTotal: [isNumber, true],
  vatRate: [oneOf(isExactly('none'), isNumeric), true],
  vatSum: [isNumber, true],
  comment: [isString, true],
  status: [oneOf(isStatus, isNull), true],
} satisfies Shape<OrderItem>, 'OrderItem')

export const id = 'order/card:items'

export const schema: Schema = {
  'items': {
    accepts: arrayOf(isItem),
    defaults: () => [],
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'items': {
    description: {
      'en-GB': 'List of items in the order',
      'es-ES': 'Lista de artículos en el pedido',
      'ru-RU': 'Список товарных позиций заказа',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/order/card-items\'',
  call: 'const orderItems = useContext()',
}
