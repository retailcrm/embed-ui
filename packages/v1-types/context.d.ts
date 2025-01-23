import type { If, IsTilda, Maybe } from './scaffolding'

export type Field<Type, Readonly extends boolean = false> = {
  accepts (value: unknown): value is Type;
  defaults (): Type;
  readonly: Readonly;
}

export type ReadonlyField<Type = unknown> = Field<Type, true>

export type TypeOf<F> = F extends Field<infer T>
  ? T
  : F extends ReadonlyField<infer T>
    ? T
    : never;

export type IsReadonly<F> = F extends Field<unknown, infer R>
  ? R
  : F extends ReadonlyField
    ? true
    : false;

export type ContextSchema = {
  [key: string]: Field<unknown, boolean>;
}

export type ContextSchemaList = {
  [key: string]: ContextSchema;
}

export type ContextSchemaMap = ContextSchemaList

export type Context<S extends ContextSchema> = {
  [F in keyof S]: TypeOf<S[F]>;
}

export type Writable<S extends ContextSchema> = {
  [F in keyof S as IsReadonly<S[F]> extends true ? never : F]: S[F];
}

export type EventMap<S extends ContextSchema> = {
  [K in keyof S as K extends string ? `change:${K}` : never]: K;
}

export type EventPayloadMap<S extends ContextSchema> = {
  [K in keyof S as K extends string ? `change:${K}` : never]: TypeOf<S[K]>;
}

export type EventHandler<
  S extends ContextSchema,
  E extends keyof EventPayloadMap<S>
> = (payload: EventPayloadMap<S>[E]) => void

export type ContextAccessor<M extends ContextSchemaList = ContextSchemaList> = {
  get <
    C extends keyof M,
    F extends keyof M[C]
  >(context: C, field: F | '~', onReject?: Maybe<RejectionHandler>): If<
    IsTilda<typeof field>,
    Context<M[C]>,
    Context<M[C]>[F]
  >;

  set <
    C extends keyof M,
    F extends keyof Writable<M[C]>
  >(context: C, field: F, value: Context<M[C]>[F], onReject?: Maybe<RejectionHandler>): void;

  on<
    C extends keyof M,
    E extends keyof EventMap<M[C]>
  >(context: C, event: E, handler: EventHandler<M[C], E>): void;
}

export type FieldAccessor<S extends ContextSchema> = {
  get <F extends keyof S>(field: F | '~'): If<
    IsTilda<typeof field>,
    Context<S>,
    Context<S>[F]
  >;

  set <F extends keyof Writable<S>>(
    field: F,
    value: Context<S>[F]
  ): void;

  on<E extends keyof EventMap<S>>(
    event: E,
    handler: EventHandler<S, E>
  ): void;
}

export type FieldGetters<S extends ContextSchema> = {
  [F in keyof S]: () => Context<S>[F]
}

export type FieldSetters<S extends ContextSchema> = {
  [F in keyof Writable<S>]: (value: Context<S>[F]) => void
}

export interface Rejection {
  message: string;
}

export interface RejectionHandler {
  (rejection: Rejection): void;
}

export interface DomainRejection extends Rejection {
  type: 'domain';
}

export interface LogicalRejection extends Rejection {
  type: 'logical';
}

export interface RuntimeRejection extends Rejection {
  type: 'runtime';
}

export type CustomDictionary = CustomDictionaryItem[]
export type CustomDictionaryItem = {
  code: string;
  text: string;
  cursor: string;
}

export type CustomDictionaryFilter = {
  after?: string;
  first?: number;
}

export interface BasicCustomField<K extends string, T> {
  kind: K;
  code: string;
  readonly: boolean;
  initial: T;
}

export interface DictionaryCustomField extends BasicCustomField<'dictionary', string | null> {
  dictionaryCode: string;
}

export interface MultiselectDictionaryCustomField extends BasicCustomField<'multiselect_dictionary', string[]> {
  dictionaryCode: string;
}

export type CustomField<K extends CustomFieldKind = CustomFieldKind> = CustomFieldList[K]

export type CustomFieldType = TypeOfCustom<CustomFieldKind>
export type CustomFieldKind = keyof CustomFieldList
export type CustomFieldList = {
  'boolean': BasicCustomField<'boolean', boolean | null>;
  'date': BasicCustomField<'date', string | null>;
  'datetime': BasicCustomField<'datetime', string | null>;
  'dictionary': DictionaryCustomField;
  'multiselect_dictionary': MultiselectDictionaryCustomField;
  'email': BasicCustomField<'email', string | null>;
  'integer': BasicCustomField<'integer', number | null>;
  'numeric': BasicCustomField<'numeric', number | null>;
  'string': BasicCustomField<'string', string | null>;
  'text': BasicCustomField<'text', string | null>;
}

export type TypeOfCustom<K extends string> = K extends CustomFieldKind
  ? CustomFieldList[K] extends BasicCustomField<string, infer T> ? T : never
  : unknown;

export type CustomContextSchema = {
  entity: string;
  fields: CustomField[];
}

export type CustomContext = {
  [code: string]: CustomFieldType
}

export type CustomContextAccessor = {
  getCustomSchema (entity: string, onReject?: Maybe<RejectionHandler>): CustomContextSchema | null;

  getCustomDictionary (
    code: string,
    filter?: CustomDictionaryFilter,
    onReject?: Maybe<RejectionHandler>
  ): Promise<CustomDictionary>;

  getCustomField (entity: string, code: string, onReject?: Maybe<RejectionHandler>): unknown;
  setCustomField (
    entity: string,
    code: string,
    value: CustomFieldType,
    onReject?: Maybe<RejectionHandler>
  ): void;

  onCustomFieldChange (
    entity: string,
    code: string,
    handler: (value: CustomFieldType) => void,
    onReject?: Maybe<RejectionHandler>
  ): void | (() => void);
}

export type CustomFieldAccessor = {
  readonly schema: CustomContextSchema;

  get (code: string): unknown;
  set (code: string, value: CustomFieldType): void;

  onChange (
    code: string,
    handler: (value: CustomFieldType) => void
  ): void | (() => void);
}