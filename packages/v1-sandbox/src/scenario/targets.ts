import type { SandboxOrderTarget, SandboxSlotDefinition } from '@/scenario/types'

export type { SandboxOrderTarget, SandboxSlotDefinition } from '@/scenario/types'

export const ORDER_SANDBOX_TARGETS = [
  'order/card:common.before',
  'order/card:common.after',
  'order/card:customer.before',
  'order/card:customer.after',
  'order/card:customer.email',
  'order/card:customer.phone',
  'order/card:list.before',
  'order/card:list.after',
  'order/card:store.before',
  'order/card:dimensions.before',
  'order/card:delivery.before',
  'order/card:delivery.after',
  'order/card:delivery.address',
  'order/card:payment.before',
  'order/card:comment.manager.before',
] as const satisfies readonly SandboxOrderTarget[]

export const ORDER_SANDBOX_SLOTS: SandboxSlotDefinition[] = [
  {
    id: 'common-before',
    label: 'Before common data',
    target: 'order/card:common.before',
  },
  {
    id: 'common-after',
    label: 'After common data',
    target: 'order/card:common.after',
  },
  {
    id: 'customer-before',
    label: 'Before customer',
    target: 'order/card:customer.before',
  },
  {
    id: 'customer-after',
    label: 'After customer',
    target: 'order/card:customer.after',
  },
  {
    id: 'customer-email',
    label: 'Customer email',
    target: 'order/card:customer.email',
  },
  {
    id: 'customer-phone',
    label: 'Customer phone',
    target: 'order/card:customer.phone',
  },
  {
    id: 'list-before',
    label: 'Before order items',
    target: 'order/card:list.before',
  },
  {
    id: 'list-after',
    label: 'After order items',
    target: 'order/card:list.after',
  },
  {
    id: 'store-before',
    label: 'Before store',
    target: 'order/card:store.before',
  },
  {
    id: 'dimensions-before',
    label: 'Before dimensions',
    target: 'order/card:dimensions.before',
  },
  {
    id: 'delivery-before',
    label: 'Before delivery',
    target: 'order/card:delivery.before',
  },
  {
    id: 'delivery-after',
    label: 'After delivery',
    target: 'order/card:delivery.after',
  },
  {
    id: 'delivery-address',
    label: 'Delivery address',
    target: 'order/card:delivery.address',
  },
  {
    id: 'payment-before',
    label: 'Before payment',
    target: 'order/card:payment.before',
  },
  {
    id: 'comment-manager-before',
    label: 'Before manager comment',
    target: 'order/card:comment.manager.before',
  },
]

export const DEFAULT_SANDBOX_TARGET = ORDER_SANDBOX_TARGETS[0]
