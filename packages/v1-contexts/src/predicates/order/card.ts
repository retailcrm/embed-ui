import type { OrderItem as OrderItem } from '~types/order/card'
import type { Shape } from '@/predicates'

import {
  arrayOf,
  isExactly,
  isNull,
  isNumber,
  isNumeric,
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
  isProperty,
  isStatus,
} from '@/predicates/order/common'

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
