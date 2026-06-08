import type { ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
import type { Pinia } from 'pinia'

import type {
  schema as orderCardSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

export type RemoteChild = RemoteNode | RemoteText | string

export type RemoteNode = {
  append(...children: RemoteChild[]): Promise<void> | void;
}

export type RemoteText = {
  update(text: string): Promise<void> | void;
}

export type SandboxRemoteRoot = RemoteNode & {
  createComponent(
    type: string,
    properties?: Record<string, unknown>,
    ...children: RemoteChild[]
  ): RemoteNode;
  createText(text?: string): RemoteText;
  removeChild(child: RemoteNode): Promise<void> | void;
}

export type OrderStore = ReturnType<typeof useOrderContext> & {
  endpoint: Endpoint<ContextAccessor<{
    'order/card': typeof orderCardSchema;
  }>>;
}

export type OrderContextSnapshot = {
  number?: string;
  status?: string;
}

export const createOrderStore = (pinia: Pinia): OrderStore =>
  useOrderContext(pinia) as OrderStore

export const readOrderContext = async (order: OrderStore): Promise<OrderContextSnapshot> =>
  (await order.endpoint.call.get('order/card', '~') as OrderContextSnapshot | null) ?? {}
