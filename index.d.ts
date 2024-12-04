import type {
  ComputedRef,
  WritableComputedRef,
} from 'vue'

import type {
  Endpoint,
  MessageEndpoint,
  RemoteCallable,
} from '@remote-ui/rpc'

import type {
  Context,
  ContextAccessor,
  ContextSchema,
  IsReadonly,
  RejectionHandler,
  TypeOf,
} from '@retailcrm/embed-ui-v1-types/context'

import type { Schema as CustomerCardSchema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card'
import type { Schema as CustomerCardPhoneSchema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card-phone'
import type { Schema as OrderCardSchema } from '@retailcrm/embed-ui-v1-contexts/types/order/card'
import type { Schema as CurrentUserSchema } from '@retailcrm/embed-ui-v1-contexts/types/user/current'
import type { Schema as SettingsSchema } from '@retailcrm/embed-ui-v1-contexts/types/settings'

import type { SchemaList } from '@retailcrm/embed-ui-v1-contexts/types'

import type { Store } from 'pinia'
import type { StoreDefinition } from 'pinia'

import type { Callable } from './types/host/callable'
import type { WidgetRunner } from './types/widget'

export declare const createWidgetEndpoint: (
  widget: WidgetRunner,
  messenger: MessageEndpoint
) => Endpoint<ContextAccessor<SchemaList> & Callable>

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

export declare const useField: <S extends ContextSchema, F extends keyof S>(
  store: ContextStore<S>,
  field: F,
  onReject?: RejectionHandler | null
) => IsReadonly<S[F]> extends true
  ? ComputedRef<TypeOf<S[F]>>
  : WritableComputedRef<TypeOf<S[F]>>

export declare const useHost = () => RemoteCallable<Callable>

declare module 'pinia' {
  interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor & Callable>;
  }
}

export declare const customerCardSchema: CustomerCardSchema
export declare const customerCardPhoneSchema: CustomerCardPhoneSchema
export declare const orderCardSchema: OrderCardSchema
export declare const currentUserSchema: CurrentUserSchema
export declare const settingsSchema: SettingsSchema

export declare const useCustomerCardContext: ContextStoreDefinition<'customer/card', CustomerCardSchema>
export declare const useCustomerCardPhoneContext: ContextStoreDefinition<'customer/card:phone', CustomerCardPhoneSchema>
export declare const useOrderCardContext: ContextStoreDefinition<'order/card', OrderCardSchema>
export declare const useCurrentUserContext: ContextStoreDefinition<'user/current', CurrentUserSchema>
export declare const useSettingsContext: ContextStoreDefinition<'settings', SettingsSchema>
