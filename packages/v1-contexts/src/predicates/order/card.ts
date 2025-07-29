import type { Offer } from '~types/order/card'
import type { OrderItem } from '~types/order/card'
import type { OrderItemStatus } from '~types/order/card'
import type { PriceType } from '~types/order/card'
import type { Product } from '~types/order/card'
import type { Shape } from '@/predicates'

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
}, 'Dimensions')

export const isMoney = isShape({
  amount: [isNumber, true],
  currency: [isString, true],
}, 'Money')

export const isWeightUnit = oneOf(
  isExactly('grams'),
  isExactly('kilograms'),
  isExactly('tons')
)

export const isWeight = isShape({
  value: [isNumber, true],
  unit: [isWeightUnit, true],
}, 'Weight')

export const isProperty = isShape({
  code: [isString, true],
  name: [isString, true],
  value: [isString, true],
}, 'Property')

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
}, 'Discount')

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
} satisfies Shape<Offer>, 'Offer')

export const isPriceType = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
  title: [isString, true],
  default: [isBoolean, true],
  currency: [isString, true],
} satisfies Shape<PriceType>, 'PriceType')

export const isProductType = oneOf(
  isExactly('PRODUCT'),
  isExactly('SERVICE')
)

export const isProductGroup = isShape({
  id: [isNumber, true],
  name: [isString, true],
}, 'ProductGroup')

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
} satisfies Shape<Product>, 'Product')

export const isStatus = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
  isCancel: [isBoolean, false],
} satisfies Shape<OrderItemStatus>, 'OrderItemStatus')

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

export const isCreateOrderItemInput = isShape({
  productId: [isNumber, true],
  offerId: [isNumber, true],
  priceAmount: [isNumber, false],
  priceTypeCode: [isString, false],
  quantity: [isNumber, false],
}, 'CreateOrderItemInput')
