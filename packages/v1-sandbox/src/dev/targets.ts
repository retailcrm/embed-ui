import type { TargetName } from '@retailcrm/embed-ui-v1-endpoint/common/targets'

export type SandboxOrderTarget = Extract<TargetName, `order/card:${string}`>

export type SandboxSlotDefinition = {
  id: string;
  label: string;
  target: SandboxOrderTarget;
}

export const ORDER_SANDBOX_TARGETS = [
  'order/card:common.before',
  'order/card:common.after',
  'order/card:delivery.before',
  'order/card:payment.before',
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
    id: 'delivery-before',
    label: 'Перед доставкой',
    target: 'order/card:delivery.before',
  },
  {
    id: 'payment-before',
    label: 'Перед оплатой',
    target: 'order/card:payment.before',
  },
]

export const DEFAULT_SANDBOX_TARGET = ORDER_SANDBOX_TARGETS[0]

export const isSandboxOrderTarget = (value: string): value is SandboxOrderTarget =>
  ORDER_SANDBOX_TARGETS.includes(value as (typeof ORDER_SANDBOX_TARGETS)[number])
