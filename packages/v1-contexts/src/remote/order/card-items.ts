import { defineContext } from '@/remote'
import { defineActions } from '@/remote'

import { cortegeOf } from '@/predicates'
import { isNull } from '@/predicates'
import { isNumber } from '@/predicates'
import { isPriceType } from '@/common/order/card-items'
import { isShape } from '@/predicates'
import { isVoid } from '@/predicates'
import { oneOf } from '@/predicates'

import {
  id,
  schema,
} from '@/common/order/card-items'

export { schema }

export const useContext = defineContext(id, schema)

export const useActions = defineActions(id, {
  'createItem': {
    accepts: cortegeOf([isShape({
      productId: [isNumber, true],
      offerId: [isNumber, true],
      price: [isShape({
        type: [oneOf(isPriceType, isNull), true],
        amount: [isNumber, true],
      }), false],
      quantity: [isNumber, false],
    })]),
    expects: isNumber,
  },
  'changeItemPrice': {
    accepts: cortegeOf([isNumber]),
    expects: isVoid,
  },
  'changeItemPriceType': {
    accepts: cortegeOf([oneOf(isPriceType, isNull)]),
    expects: isVoid,
  },
  'changeItemQuantity': {
    accepts: cortegeOf([isNumber, isNumber]),
    expects: isVoid,
  },
  'removeItem': {
    accepts: cortegeOf([isNumber]),
    expects: isVoid,
  },
})
