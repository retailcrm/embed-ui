import type { Dimensions } from '@retailcrm/embed-ui-v1-types/domain'
import type { Money } from '@retailcrm/embed-ui-v1-types/domain'
import type { Weight } from '@retailcrm/embed-ui-v1-types/domain'

import type { Field, ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'externalId': ReadonlyField<string | null>;
  'type': ReadonlyField<string | null>;
  'site': ReadonlyField<string | null>;
  'number': ReadonlyField<string | null>;
  'country': ReadonlyField<string | null>;
  'currency': ReadonlyField<string>;
  'customer.type': ReadonlyField<'customer' | 'customer_corporate'>;
  'customer.lastName': Field<string | null>;
  'customer.firstName': Field<string | null>;
  'customer.patronymic': Field<string | null>;
  'customer.email': Field<string | null>;
  'customer.phone': Field<string | null>;
  'company.contragentType': ReadonlyField<'enterpreneur' | 'legal-entity' | 'individual'>;
  'company.certificateNumber': Field<string | null>;
  'company.certificateDate': Field<string | null>;
  'company.OGRN': Field<string | null>;
  'company.OGRNIP': Field<string | null>;
  'company.name': Field<string | null>;
  'company.legalName': Field<string | null>;
  'company.legalAddress': Field<string | null>;
  'company.INN': Field<string | null>;
  'company.KPP': Field<string | null>;
  'company.OKPO': Field<string | null>;
  'company.BIK': Field<string | null>;
  'company.bank': Field<string | null>;
  'company.bankAddress': Field<string | null>;
  'company.corrAccount': Field<string | null>;
  'company.bankAccount': Field<string | null>;
  'items': ReadonlyField<ReadonlyArray<Readonly<OrderItem>>>;
  'delivery.address': Field<string | null>;
  'discount.amount': Field<number>;
  'discount.percent': Field<number>;
  'discount.total': ReadonlyField<number>;
  'status': ReadonlyField<string>;
}

export type MethodList = {
  createItem: (input: CreateOrderItemInput) => Promise<number>;
  changeItemPrice: (index: number, amount: number) => void;
  changeItemPriceType: (index: number, code: string | null) => Promise<void>;
  changeItemDiscount: (index: number, discount: {
    amount: number | undefined;
    percent: number | undefined;
  }) => void;
  changeItemQuantity: (index: number, quantity: number) => void;
  changeItemStatus: (index: number, statusCode: string) => void;
  removeItem: (index: number) => void;
}

export type CreateOrderItemInput = {
  productId: number;
  offerId: number;
  priceAmount: number | undefined;
  priceTypeCode: string | undefined;
  quantity: number | undefined;
}

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
