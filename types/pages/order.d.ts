/** @deprecated */
export type OrderCardMethods = {
  getCustomerEmail: () => string | null,
  setCustomerEmail: (value: string) => void,

  getCustomerPhone: () => string | null,
  setCustomerPhone: (value: string) => void,

  getDeliveryAddress: () => string | null,
  setDeliveryAddress: (value: string) => void,
  parseDeliveryAddress: () => void,
}

export type FieldMap = {
  'customer.email': string | null;
  'customer.phone': string | null;
  'delivery.address': string | null;
}

export type FieldName = keyof FieldMap
export type FieldType<F extends FieldName> = FieldMap[F]

export type EventMap = {
  'change:customer.email': string;
  'change:customer.phone': string;
  'change:delivery.address': string;
}

export type HostMethods = {
  get <F extends FieldName>(name: F): FieldType<F>;
  set <F extends FieldName>(name: F, value: FieldType<F>);
}

export type RemoteMethods = {
  get <F extends FieldName>(name: F): Promise<FieldType<F>>;
  set <F extends FieldName>(name: F, value: FieldType<F>): Promise<void>;
}
