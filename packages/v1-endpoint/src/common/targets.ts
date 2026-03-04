import type { SchemaList } from '@retailcrm/embed-ui-v1-contexts/types'

export type TargetDefinition<
  TId extends string = string,
  TContexts extends readonly (keyof SchemaList)[] = readonly (keyof SchemaList)[],
> = {
  id: TId;
  contexts: TContexts;
}

export const defineTarget = <
  const TId extends string,
  const TContexts extends readonly (keyof SchemaList)[],
>(id: TId, contexts: TContexts): TargetDefinition<TId, TContexts> => ({
    id,
    contexts,
  })

export const targets = {
  'customer/card:phone': defineTarget('customer/card:phone', [
    'customer/card',
    'customer/card:phone',
    'user/current',
    'settings',
  ]),

  'customer/card:communications.after': defineTarget('customer/card:communications.after', [
    'customer/card',
    'user/current',
    'settings',
  ]),

  'customer/card:inWork.before': defineTarget('customer/card:inWork.before', [
    'customer/card',
    'user/current',
    'settings',
  ]),

  'customer/card:inWork.after': defineTarget('customer/card:inWork.after', [
    'customer/card',
    'user/current',
    'settings',
  ]),

  'order/card:common.before': defineTarget('order/card:common.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:common.after': defineTarget('order/card:common.after', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:customer.before': defineTarget('order/card:customer.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:customer.after': defineTarget('order/card:customer.after', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:customer.email': defineTarget('order/card:customer.email', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:customer.phone': defineTarget('order/card:customer.phone', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:list.before': defineTarget('order/card:list.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:list.after': defineTarget('order/card:list.after', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:store.before': defineTarget('order/card:store.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:dimensions.before': defineTarget('order/card:dimensions.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:delivery.before': defineTarget('order/card:delivery.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:delivery.after': defineTarget('order/card:delivery.after', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:delivery.address': defineTarget('order/card:delivery.address', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:payment.before': defineTarget('order/card:payment.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/card:comment.manager.before': defineTarget('order/card:comment.manager.before', [
    'order/card',
    'user/current',
    'settings',
  ]),

  'order/mg:list.before': defineTarget('order/mg:list.before', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),

  'order/mg:list.after': defineTarget('order/mg:list.after', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),

  'order/mg:delivery.before': defineTarget('order/mg:delivery.before', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),

  'order/mg:delivery.after': defineTarget('order/mg:delivery.after', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),

  'order/mg:payment.before': defineTarget('order/mg:payment.before', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),

  'order/mg:payment.after': defineTarget('order/mg:payment.after', [
    'order/card',
    'order/card:settings',
    'user/current',
    'settings',
  ]),
} as const

export type TargetName = keyof typeof targets
