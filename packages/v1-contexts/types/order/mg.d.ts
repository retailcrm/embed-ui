import type { Money } from '@retailcrm/embed-ui-v1-types/domain'
import type { Offer } from '~types/order/common'
import type { OrderItemStatus } from '~types/order/common'
import type { PriceType } from '~types/order/common'
import type { Product } from '~types/order/common'

import type {
  Field,
  ReadonlyField,
} from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'externalId': ReadonlyField<string | null>;
  'type': ReadonlyField<string | null>;
  'site': ReadonlyField<string | null>;
  'number': ReadonlyField<string>;
  'country': ReadonlyField<string | null>;
  'currency': ReadonlyField<string>;
  'customer.id': ReadonlyField<number | null>;
  'customer.type': ReadonlyField<'customer' | 'customer_corporate'>;
  'items': ReadonlyField<ReadonlyArray<Readonly<MgOrderItem>>>;
  'discount.amount': Field<number>;
  'discount.percent': Field<number>;
  'discount.total': ReadonlyField<number>;
  'status': ReadonlyField<string | null>;
}

export type MethodList = {
  createItem: (input: CreateMgOrderItemInput) => Promise<number>;
  changeItemPrice: (item: MgOrderItem, price: (number | Price)) => void;
  changeItemDiscount: (item: MgOrderItem, discount: { amount: number; percent: number }) => void;
  changeItemQuantity: (item: MgOrderItem, quantity: number) => void;
  changeItemStatus: (item: MgOrderItem, code: string) => void;
  removeItem: (item: MgOrderItem) => void;
}

export type CreateMgOrderItemInput = {
  productId: number;
  offerId: number;
  priceAmount: number | undefined;
  priceTypeCode: string | undefined;
  quantity: number | undefined;
}

export type Price = {
  type: PriceType | null;
  value: Money;
}

export type MgDiscount = {
  amount: number;
  percent: number;
  share: Money;
  total: Money;
}

export type Bonuses = {
  charge: number;
  credit: number;
}

export type MgOrderItem = {
  id: number | null;
  /** Serial number */
  index: number;
  type: 'PRODUCT' | 'SERVICE';
  product: Product | null;
  offer: Offer | null;
  price: Price;
  quantity: number;
  discount: Discount;
  bonuses: Bonuses;
  total: Money | null;
  totalPerUnit: Money | null;
  status: OrderItemStatus | null;
}
