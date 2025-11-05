import type { Bonuses } from '~types/order/mg'
import type { CreateMgOrderItemInput } from '~types/order/mg'
import type { MgDiscount as Discount } from '~types/order/mg'
import type { MgOrderItem as OrderItem } from '~types/order/mg'
import type { Price } from '~types/order/mg'
import type { Shape } from '@/predicates'

import {
  isNull,
  isNumber,
  isShape,
  isString,
  oneOf,
} from '@/predicates'

import {
  isMoney,
  isOffer,
  isPriceType,
  isProduct,
  isProductType,
  isStatus,
} from '@/predicates/order/common'

export const isPrice = isShape({
  type: [oneOf(isPriceType, isNull), true],
  value: [isMoney, true],
} satisfies Shape<Price>, 'Price')

export const isDiscount = isShape({
  amount: [isNumber, true],
  percent: [isNumber, true],
  share: [isMoney, true],
  total: [isMoney, true],
} satisfies Shape<Discount>, 'Discount')

export const isBonuses = isShape({
  charge: [isNumber, true],
  credit: [isNumber, true],
} satisfies Shape<Bonuses>, 'Bonuses')

export const isItem = isShape({
  id: [oneOf(isNumber, isNull), true],
  index: [isNumber, true],
  type: [isProductType, true],
  product: [oneOf(isProduct, isNull), true],
  offer: [oneOf(isOffer, isNull), true],
  price: [isPrice, true],
  quantity: [isNumber, true],
  discount: [isDiscount, true],
  bonuses: [isBonuses, true],
  total: [oneOf(isMoney, isNull), true],
  totalPerUnit: [oneOf(isMoney, isNull), true],
  status: [oneOf(isStatus, isNull), true],
} satisfies Shape<OrderItem>, 'OrderItem')

export const isCreateOrderItemInput = isShape({
  productId: [isNumber, true],
  offerId: [isNumber, true],
  priceAmount: [isNumber, true],
  priceTypeCode: [isString, true],
  quantity: [isNumber, true],
} satisfies Shape<CreateMgOrderItemInput>, 'CreateMgOrderItemInput')
