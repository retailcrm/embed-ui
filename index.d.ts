import type { Callable } from './types/host/callable'
import type { ComputedRef } from 'vue'
import type { Context } from './types/context/schema'
import type { ContextAccessor } from './types/context/schema'
import type { ContextSchema } from './types/context/schema'
import type { Endpoint, RemoteCallable } from '@remote-ui/rpc'
import type { IsReadonly } from './types/context/schema'
import type { MessageEndpoint } from '@remote-ui/rpc'
import type { Schema as CustomerCardSchema } from './types/context/customer/card'
import type { Schema as CustomerCardPhoneSchema } from './types/context/customer/card-phone'
import type { Schema as OrderCardSchema } from './types/context/order/card'
import type { Schema as CurrentUserSchema } from './types/context/user/current'
import type { Schema as SettingsSchema } from './types/context/settings'
import type { SchemaList } from './types/context'
import type { Store } from 'pinia'
import type { StoreDefinition } from 'pinia'
import type { TypeOf } from './types/context/schema'
import type { WidgetRunner } from './types/widget'
import type { WritableComputedRef } from 'vue'

declare type Computed<
  S extends ContextSchema,
  F extends keyof S
> = IsReadonly<S[F]> extends true ? ComputedRef<TypeOf<S[F]>> : WritableComputedRef<TypeOf<S[F]>>;

export declare const createWidgetEndpoint: (
  widget: WidgetRunner,
  messenger: MessageEndpoint
) => Endpoint<ContextAccessor<SchemaList>>

export declare const customerCardPhoneSchema: CustomerCardPhoneSchema
export declare const customerCardSchema: CustomerCardSchema
export declare const orderCardSchema: OrderCardSchema
export declare const currentUserSchema: CurrentUserSchema
export declare const settingsSchema: SettingsSchema

export type ContextStore<S extends ContextSchema> = Store<string, Context<S>, {
  schema(): S;
}, {
  initialize(): Promise<void>;
  set<F extends keyof S>(field: F, value: TypeOf<S[F]>): void;
}>

export type ContextStoreDefinition<
  Id extends string,
  S extends ContextSchema
> = StoreDefinition<Id, Context<S>, {
  schema(): S;
}, {
  initialize(): Promise<void>;
  set<F extends keyof S>(field: F, value: TypeOf<S[F]>): void;
}>

export declare const useCustomerCardContext: ContextStoreDefinition<'customer/card', CustomerCardSchema>
export declare const useCustomerCardPhoneContext: ContextStoreDefinition<'customer/card:phone', CustomerCardPhoneSchema>
export declare const useOrderCardContext: ContextStoreDefinition<'order/card', OrderCardSchema>
export declare const useCurrentUserContext: ContextStoreDefinition<'user/current', CurrentUserSchema>
export declare const useSettingsContext: ContextStoreDefinition<'settings', SettingsSchema>

export declare const useField: <S extends ContextSchema, F extends keyof S>(
  store: ContextStore<S>,
  field: F
) => Computed<S, F>

export declare const useHost = () => RemoteCallable<Callable>

declare module 'pinia' {
  interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor & Callable>;
  }
}
