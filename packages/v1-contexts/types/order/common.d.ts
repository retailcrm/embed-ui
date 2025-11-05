import type { Dimensions } from '@retailcrm/embed-ui-v1-types/domain'
import type { Money } from '@retailcrm/embed-ui-v1-types/domain'
import type { Weight } from '@retailcrm/embed-ui-v1-types/domain'

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

export type Property = {
  code: string;
  name: string;
  value: string;
}

export type PriceType = {
  id: number;
  code: string;
  name: string;
  title: string;
  default: boolean;
  currency: string;
}

export type OrderItemStatus = {
  id: number;
  code: string;
  name: string;
  isCancel: boolean;
}
