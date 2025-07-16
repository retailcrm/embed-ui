import type {
  ComputedRef,
  WritableComputedRef,
} from 'vue'

import type {
  Endpoint,
  MessageEndpoint,
  RemoteCallable,
} from '@remote-ui/rpc'

import {
  ContextAccessor,
  ContextSchema,
  CustomFieldKind,
  IsReadonly,
  RejectionHandler,
  TypeOf,
  TypeOfCustom,
} from '@retailcrm/embed-ui-v1-types/context'

import type {
  ContextStore,
  ContextStoreDefinition,
} from '@retailcrm/embed-ui-v1-contexts/remote'

import type { Router } from '@omnicajs/symfony-router'

import type { Schema as CustomerCardSchema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card'
import type { Schema as CustomerCardPhoneSchema } from '@retailcrm/embed-ui-v1-contexts/types/customer/card-phone'
import type { Schema as OrderCardSchema } from '@retailcrm/embed-ui-v1-contexts/types/order/card'
import type { Schema as OrderCardSettingsSchema } from '@retailcrm/embed-ui-v1-contexts/types/order/card-settings'
import type { Schema as CurrentUserSchema } from '@retailcrm/embed-ui-v1-contexts/types/user/current'
import type { Schema as SettingsSchema } from '@retailcrm/embed-ui-v1-contexts/types/settings'

import type { SchemaList } from '@retailcrm/embed-ui-v1-contexts/types'

import type { Callable } from './types/host/callable'
import type { WidgetRunner } from './types/widget'

export declare const createWidgetEndpoint: (
  widget: WidgetRunner,
  messenger: MessageEndpoint
) => Endpoint<ContextAccessor<SchemaList> & Callable>

export type { ContextStore }
export type { ContextStoreDefinition }

export declare const useField: <S extends ContextSchema, F extends keyof S>(
  store: ContextStore<S>,
  field: F,
  onReject?: RejectionHandler | null
) => IsReadonly<S[F]> extends true
  ? ComputedRef<TypeOf<S[F]>>
  : WritableComputedRef<TypeOf<S[F]>>

export declare const useCustomField: <
  T extends string,
  K extends CustomFieldKind = CustomFieldKind,
  R extends boolean = false
>(
  store: CustomContextStore<T>,
  code: string,
  options?: {
    kind?: K | K[],
    readonly?: R,
    onReject?: RejectionHandler,
  }
) => R extends false
  ? WritableComputedRef<TypeOfCustom<K> | null, TypeOfCustom<K>>
  : ComputedRef<TypeOfCustom<K> | null>

export declare const useHost = () => RemoteCallable<Callable>

declare module 'pinia' {
  interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor & Callable>;
  }
}

export declare const customerCardSchema: CustomerCardSchema
export declare const customerCardPhoneSchema: CustomerCardPhoneSchema
export declare const orderCardSchema: OrderCardSchema
export declare const orderCardSettingsSchema: OrderCardSettingsSchema
export declare const currentUserSchema: CurrentUserSchema
export declare const settingsSchema: SettingsSchema

export declare const useCustomerCardContext: ContextStoreDefinition<'customer/card', CustomerCardSchema>
export declare const useCustomerCardPhoneContext: ContextStoreDefinition<'customer/card:phone', CustomerCardPhoneSchema>
export declare const useOrderCardContext: ContextStoreDefinition<'order/card', OrderCardSchema>
export declare const useOrderCardSettingsContext: ContextStoreDefinition<'order/card:settings', OrderCardSettingsSchema>
export declare const useCurrentUserContext: ContextStoreDefinition<'user/current', CurrentUserSchema>
export declare const useSettingsContext: ContextStoreDefinition<'settings', SettingsSchema>

export declare const useRouter: () => ComputedRef<Pick<Router, 'generate'>>
