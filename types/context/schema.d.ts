import type { IsTilda, If } from '../scaffolding'

export type Field<Type, Readonly extends boolean = false> = {
  accepts (value: Type): boolean;
  defaults (): Type;
  readonly: Readonly;
}

export type ReadonlyField<Type> = Field<Type, true>

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

export type ContextSchemaMap = {
  [key: string]: ContextSchema;
}

export type Context<S extends ContextSchema> = {
  [F in keyof S]: TypeOf<S[F]>;
}

export type Writable<S extends ContextSchema> = {
  [F in keyof S]: IsReadonly<S[F]> extends true ? never : S[F];
}

export type EventMap<S extends ContextSchema> = {
  [K in keyof S as `change:${K}`]: K;
}

export type EventHandler<
  S extends ContextSchema,
  E extends keyof EventMap<S>
> = (payload: TypeOf<S[EventMap<S>[E]]>) => void

export type ContextAccessor<M extends ContextSchemaMap = ContextSchemaMap> = {
  get <
    C extends keyof M
  >(context: C, field: '~'): Context<M[C]>;

  get <
    C extends keyof M,
    F extends keyof M[C]
  >(context: C, field: F): Context<M[C]>[F];

  set <
    C extends keyof M,
    F extends keyof Writable<M[C]>
  >(context: C, field: F, value: Context<M[C]>[F]): void;

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
