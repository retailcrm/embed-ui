import type { SandboxOrderTarget, SandboxSlotDefinition } from '@/dev/types'

export type { SandboxOrderTarget, SandboxSlotDefinition } from '@/dev/types'

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
    label: 'Перед общими данными',
    target: 'order/card:common.before',
  },
  {
    id: 'common-after',
    label: 'После общих данных',
    target: 'order/card:common.after',
  },
  {
    id: 'customer-before',
    label: 'Перед покупателем',
    target: 'order/card:customer.before',
  },
  {
    id: 'customer-after',
    label: 'После покупателя',
    target: 'order/card:customer.after',
  },
  {
    id: 'customer-email',
    label: 'Email покупателя',
    target: 'order/card:customer.email',
  },
  {
    id: 'customer-phone',
    label: 'Телефон покупателя',
    target: 'order/card:customer.phone',
  },
  {
    id: 'list-before',
    label: 'Перед составом заказа',
    target: 'order/card:list.before',
  },
  {
    id: 'list-after',
    label: 'После состава заказа',
    target: 'order/card:list.after',
  },
  {
    id: 'store-before',
    label: 'Перед складом',
    target: 'order/card:store.before',
  },
  {
    id: 'dimensions-before',
    label: 'Перед габаритами',
    target: 'order/card:dimensions.before',
  },
  {
    id: 'delivery-before',
    label: 'Перед доставкой',
    target: 'order/card:delivery.before',
  },
  {
    id: 'delivery-after',
    label: 'После доставки',
    target: 'order/card:delivery.after',
  },
  {
    id: 'delivery-address',
    label: 'Адрес доставки',
    target: 'order/card:delivery.address',
  },
  {
    id: 'payment-before',
    label: 'Перед оплатой',
    target: 'order/card:payment.before',
  },
  {
    id: 'comment-manager-before',
    label: 'Перед комментарием менеджера',
    target: 'order/card:comment.manager.before',
  },
]

export const DEFAULT_SANDBOX_TARGET = ORDER_SANDBOX_TARGETS[0]
