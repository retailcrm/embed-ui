import type { Offer } from '~types/order/common'
import type { OrderItemStatus } from '~types/order/common'
import type { PriceType } from '~types/order/common'
import type { Product } from '~types/order/common'
import type { Shape } from '@/predicates'

import {
  arrayOf,
  isBoolean,
  isExactly,
  isNull,
  isNumber,
  isShape,
  isString,
  oneOf,
} from '@/predicates'

export const isMoney = isShape({
  amount: [isNumber, true],
  currency: [isString, true],
}, 'Money')

export const isProperty = isShape({
  code: [isString, true],
  name: [isString, true],
  value: [isString, true],
}, 'Property')

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

export const isDimensions = isShape({
  L: [oneOf(isNumber, isNull), true],
  W: [oneOf(isNumber, isNull), true],
  H: [oneOf(isNumber, isNull), true],
}, 'Dimensions')

export const isWeightUnit = oneOf(
  isExactly('grams'),
  isExactly('kilograms'),
  isExactly('tons')
)

export const isWeight = isShape({
  value: [isNumber, true],
  unit: [isWeightUnit, true],
}, 'Weight')

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

export const isStatus = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
  isCancel: [isBoolean, true],
} satisfies Shape<OrderItemStatus>, 'OrderItemStatus')
