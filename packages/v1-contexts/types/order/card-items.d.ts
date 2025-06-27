import type {
  Dimensions,
  Money,
  Weight,
} from '@retailcrm/embed-ui-v1-types/domain'

import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type DiscountType =
  | 'bonus_charge'
  | 'loyalty_event'
  | 'loyalty_level'
  | 'manual_order'
  | 'manual_product'
  | 'personal'
  | 'round'

export type Discount = {
  type: DiscountType;
  amount: number;
}

export type PriceType = {
  id: number;
  code: string;
  name: string;
  title: string;
  default: boolean;
  currency: string;
}

export type Property = {
  code: string;
  name: string;
  value: string;
}

export type Offer = {
  id: number;
  name: string;
  image: string | null;
  dimensions: Dimensions;
  weight: Weight | null,
  article: string | null;
  barcode: string | null;
  properties: Property[];
  unit: string | null;
  purchasePrice: Money | null;
}

export type Product = {
  id: number;
  type: 'PRODUCT' | 'SERVICE';
  name: string;
  image: string | null;
  article: string | null;
  manufacturer: string | null;
  markable: boolean;
  groups: ProductGroup[];
  unit: string | null;
  url: string | null;
  recommendationProviderType: 'NONE' | 'SERVICE' | 'SYSTEM';
}

export type ProductGroup = {
  id: number;
  name: string;
}

export type OrderItem = {
  id: number | null;
  /** Temporal ID to identify items while editing */
  index: number;
  type: 'PRODUCT' | 'SERVICE';
  offer: Offer | null;
  product: Product | null;
  properties: Property[];
  quantity: number;
  purchasePrice: Money | null;
  initialPrice: Money | null;
  priceType: PriceType | null;
  /** Number of debited bonuses */
  bonusesChargeTotal: number;
  /** Number of accrued bonuses */
  bonusesCreditTotal: number;
  discounts: Discount[];
  discountTotal: number;
  vatRate: 'none' | number | `${number}`
  vatSum: number;
  comment: string;
  status: OrderItemStatus | null;
}

export type OrderItemStatus = {
  id: number;
  name: string;
  isCancel?: boolean;
}

export type Schema = {
  'items': ReadonlyField<ReadonlyArray<Readonly<OrderItem>>>;
}