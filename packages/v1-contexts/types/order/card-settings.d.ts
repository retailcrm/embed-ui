import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'changePriceTypeByPriority': ReadonlyField<boolean>;
  'changePriceTypeIfUnavailable': ReadonlyField<boolean>;
  'defaultUnit': ReadonlyField<string | null>;
  'duplicatesAllowed': ReadonlyField<boolean>;
  'quantityIsFractional': ReadonlyField<boolean>;
  'priceEditable': ReadonlyField<boolean>;
  'productsRemoveAllowed': ReadonlyField<boolean>;
  'productsMarkingEnabled': ReadonlyField<boolean>;
  'propertiesToShow.additional': ReadonlyField<string[]>;
  'propertiesToShow.base': ReadonlyField<string[]>;
  'purchasePriceEditable': ReadonlyField<boolean>;
  'purchasePriceVisible': ReadonlyField<boolean>;
  'reserveDeliveryNoteEditable': ReadonlyField<boolean>;
  'reserveInvoiceEditable': ReadonlyField<boolean>;
  'reserveShipmentDateEditable': ReadonlyField<boolean>;
  'reserveTelephonyEnabled': ReadonlyField<boolean>;
  'showArticle': ReadonlyField<boolean>;
  'showPriceTypes': ReadonlyField<boolean>;
  'useStores': ReadonlyField<boolean>;
  'useReserve': ReadonlyField<boolean>;
}
