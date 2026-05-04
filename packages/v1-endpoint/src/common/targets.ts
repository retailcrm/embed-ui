import type { SchemaList } from '@retailcrm/embed-ui-v1-contexts/types'

export type TargetDefinition<
  TId extends string = string,
  TContexts extends readonly (keyof SchemaList)[] = readonly (keyof SchemaList)[],
  TCustomContexts extends readonly string[] = readonly string[],
  TActions extends readonly string[] = readonly string[],
> = {
  id: TId;
  contexts: TContexts;
  customContexts: TCustomContexts;
  actions: TActions;
}

export type TargetConfig<
  TContexts extends readonly (keyof SchemaList)[] = readonly (keyof SchemaList)[],
  TCustomContexts extends readonly string[] = readonly string[],
  TActions extends readonly string[] = readonly string[],
> = {
  contexts: TContexts;
  customContexts: TCustomContexts;
  actions: TActions;
}

const isTargetConfig = (
  configOrContexts: readonly (keyof SchemaList)[] | TargetConfig
): configOrContexts is TargetConfig => !Array.isArray(configOrContexts)

export function defineTarget<
  const TId extends string,
  const TContexts extends readonly (keyof SchemaList)[],
>(
  id: TId,
  contexts: TContexts
): TargetDefinition<TId, TContexts, readonly [], readonly []>

export function defineTarget<
  const TId extends string,
  const TContexts extends readonly (keyof SchemaList)[],
  const TCustomContexts extends readonly string[],
  const TActions extends readonly string[],
>(
  id: TId,
  config: TargetConfig<TContexts, TCustomContexts, TActions>
): TargetDefinition<TId, TContexts, TCustomContexts, TActions>

export function defineTarget(
  id: string,
  configOrContexts:
    | readonly (keyof SchemaList)[]
    | TargetConfig
): TargetDefinition {
  if (isTargetConfig(configOrContexts)) {
    return {
      id,
      ...configOrContexts,
    }
  }

  return {
    id,
    contexts: configOrContexts,
    customContexts: [],
    actions: [],
  }
}

const customerCardTarget = {
  contexts: [
    'customer/card',
    'user/current',
    'settings',
  ],
  customContexts: ['customer'],
  actions: [],
} as const

const orderFormTarget = {
  contexts: [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ],
  customContexts: ['order'],
  actions: ['order/card'],
} as const

export const targets = {
  'customer/card:phone': defineTarget('customer/card:phone', {
    ...customerCardTarget,
    contexts: [
      'customer/card',
      'customer/card:phone',
      'user/current',
      'settings',
    ],
  }),
  'customer/card:communications.after': defineTarget('customer/card:communications.after', customerCardTarget),
  'customer/card:inWork.before': defineTarget('customer/card:inWork.before', customerCardTarget),
  'customer/card:inWork.after': defineTarget('customer/card:inWork.after', customerCardTarget),
  'order/card:common.before': defineTarget('order/card:common.before', orderFormTarget),
  'order/card:common.after': defineTarget('order/card:common.after', orderFormTarget),
  'order/card:customer.before': defineTarget('order/card:customer.before', orderFormTarget),
  'order/card:customer.after': defineTarget('order/card:customer.after', orderFormTarget),
  'order/card:customer.email': defineTarget('order/card:customer.email', orderFormTarget),
  'order/card:customer.phone': defineTarget('order/card:customer.phone', orderFormTarget),
  'order/card:list.before': defineTarget('order/card:list.before', orderFormTarget),
  'order/card:list.after': defineTarget('order/card:list.after', orderFormTarget),
  'order/card:store.before': defineTarget('order/card:store.before', orderFormTarget),
  'order/card:dimensions.before': defineTarget('order/card:dimensions.before', orderFormTarget),
  'order/card:delivery.before': defineTarget('order/card:delivery.before', orderFormTarget),
  'order/card:delivery.after': defineTarget('order/card:delivery.after', orderFormTarget),
  'order/card:delivery.address': defineTarget('order/card:delivery.address', orderFormTarget),
  'order/card:payment.before': defineTarget('order/card:payment.before', orderFormTarget),
  'order/card:comment.manager.before': defineTarget('order/card:comment.manager.before', orderFormTarget),
  'order/mg:list.before': defineTarget('order/mg:list.before', orderFormTarget),
  'order/mg:list.after': defineTarget('order/mg:list.after', orderFormTarget),
  'order/mg:delivery.before': defineTarget('order/mg:delivery.before', orderFormTarget),
  'order/mg:delivery.after': defineTarget('order/mg:delivery.after', orderFormTarget),
  'order/mg:payment.before': defineTarget('order/mg:payment.before', orderFormTarget),
  'order/mg:payment.after': defineTarget('order/mg:payment.after', orderFormTarget),
} as const

export type TargetName = keyof typeof targets

export type TargetList = {
  [Target in TargetName]: Pick<SchemaList, (typeof targets)[Target]['contexts'][number]>
}
