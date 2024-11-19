import type {
  CreateAppFunction,
  Component,
} from 'vue'

import type { Channel } from '@omnicajs/vue-remote/dist/remote'

import type { Pinia } from 'pinia'

import type { RemoteRoot } from '@omnicajs/vue-remote/remote'

import type { SchemaList } from './context'

export interface WidgetRunner {
  run(
    createApp: CreateAppFunction<
      | Component<RemoteRoot<SchemaOf<string>>>
      | RemoteRoot<SchemaOf<string>>
    >,
    root: RemoteRoot<SchemaOf<string>>,
    pinia: Pinia,
    target: WidgetTarget
  ): Promise<() => void>;
}

export interface WidgetEndpoint {
  run (channel: Channel, target: WidgetTarget): Promise<void>;
  release (): void;
}

export type WidgetTarget = keyof SchemaListByTarget

export type SchemaListOf<T extends WidgetTarget> = SchemaListByTarget[T]
export type SchemaListByTarget = {
  'customer/card:phone': Pick<SchemaList,
    | 'customer/card'
    | 'customer/card:phone'
    | 'settings'
  >;
  'order/card:common.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:common.after': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:customer.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:customer.after': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:customer.email': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:customer.phone': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:list.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:list.after': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:store.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:dimensions.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:delivery.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:delivery.after': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:delivery.address': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
  'order/card:payment.before': Pick<SchemaList,
    | 'order/card'
    | 'settings'
  >;
}
