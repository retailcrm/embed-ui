import { ComputedRef } from 'vue'
import { Context } from './types/context/schema'
import { ContextAccessor } from './types/context/schema'
import { ContextSchema } from './types/context/schema'
import { Endpoint } from '@remote-ui/rpc'
import { IsReadonly } from './types/context/schema'
import { MessageEndpoint } from '@remote-ui/rpc'
import { Schema } from './types/context/customer/card'
import { Schema as Schema_2 } from './types/context/customer/card-phone'
import { Schema as Schema_3 } from './types/context/order/card'
import { Schema as Schema_4 } from './types/context/settings'
import { SchemaList } from '../types/context'
import { Store } from 'pinia'
import { StoreDefinition } from 'pinia'
import { TypeOf } from './types/context/schema'
import { WidgetRunner } from './types/widget'
import { WritableComputedRef } from 'vue'

declare type Computed<S extends ContextSchema, F extends keyof S> = IsReadonly<S[F]> extends true ? ComputedRef<TypeOf<S[F]>> : WritableComputedRef<TypeOf<S[F]>>;

export declare const createWidgetEndpoint: (widget: WidgetRunner, messenger: MessageEndpoint) => Endpoint<ContextAccessor<SchemaList>>

export declare const customerCardPhoneSchema: Schema_2

export declare const customerCardSchema: Schema

export declare const orderCardSchema: Schema_3

export declare const settingsSchema: Schema_4

export declare const useCustomerCardContext: StoreDefinition<'customer/card', Context<Schema>, {
  schema: () => Schema;
}, {
  initialize(): Promise<void>;
  set<F extends keyof Schema>(field: F, value: TypeOf<Schema[F]>): void;
}>

export declare const useCustomerCardPhoneContext: StoreDefinition<'customer/card:phone', Context<Schema_2>, {
  schema: () => Schema_2;
}, {
  initialize(): Promise<void>;
  set<F extends keyof Schema_2>(field: F, value: TypeOf<Schema_2[F]>): void;
}>

export declare const useField: <S extends ContextSchema, F extends keyof S>(store: Store<string, Context<S>, {
  schema(): S;
}, {
  initialize(): Promise<void>;
  set<F_1 extends keyof S>(field: F_1, value: TypeOf<S[F_1]>): void;
}>, field: F) => Computed<S, F>

export declare const useOrderCardContext: StoreDefinition<'order/card', Context<Schema_3>, {
  schema: () => Schema_3;
}, {
  initialize(): Promise<void>;
  set<F extends keyof Schema_3>(field: F, value: TypeOf<Schema_3[F]>): void;
}>

export declare const useSettingsContext: StoreDefinition<'settings', Context<Schema_4>, {
  schema: () => Schema_4;
}, {
  initialize(): Promise<void>;
  set<F extends keyof Schema_4>(field: F, value: TypeOf<Schema_4[F]>): void;
}>

declare module 'pinia' {
  interface PiniaCustomProperties {
    endpoint: Endpoint<ContextAccessor>;
  }
}
