export type FieldSchema = {
  'customer.email': string | null;
  'customer.phone': string | null;
  'delivery.address': string | null;
}

export type FieldName = keyof FieldSchema
export type FieldType<F extends FieldName> = FieldSchema[F]

export type EventSchema = {
  'change:customer.email': string;
  'change:customer.phone': string;
  'change:delivery.address': string;
}

type Returns<F extends FieldName | '~'> = '~' extends F
  ? FieldSchema
  : FieldType<F>

export type HostMethods = {
  get <F extends FieldName | '~'>(name: F): Returns<F>;
  set <F extends FieldName>(name: F, value: FieldType<F>);
}

export type RemoteMethods = {
  get <F extends FieldName | '~'>(name: F): Promise<Returns<F>>;
  set <F extends FieldName>(name: F, value: FieldType<F>): Promise<void>;
}
