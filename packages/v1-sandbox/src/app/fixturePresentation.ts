import type { ComposerTranslation } from 'vue-i18n'

import type { OrderSandboxFixtureCode } from '@/scenario/fixtures'

import { isOrderSandboxFixtureCode } from '@/scenario/fixtures'

type OrderSandboxFixturePresentationKeys = {
  description: string;
  name: string;
}

export type OrderSandboxFixturePresentation = {
  code: OrderSandboxFixtureCode;
  description: string;
  name: string;
}

const fixturePresentationKeys: Record<
  OrderSandboxFixtureCode,
  OrderSandboxFixturePresentationKeys
> = {
  'order-basic': {
    description: 'app.fixtures.orderBasic.description',
    name: 'app.fixtures.orderBasic.name',
  },
  'order-with-delivery': {
    description: 'app.fixtures.orderWithDelivery.description',
    name: 'app.fixtures.orderWithDelivery.name',
  },
  'order-readonly-error': {
    description: 'app.fixtures.orderReadonlyError.description',
    name: 'app.fixtures.orderReadonlyError.name',
  },
}

export const getOrderSandboxFixturePresentation = (
  code: string,
  t: ComposerTranslation
): OrderSandboxFixturePresentation | null => {
  if (!isOrderSandboxFixtureCode(code)) return null

  const keys = fixturePresentationKeys[code]

  return {
    code,
    description: t(keys.description),
    name: t(keys.name),
  }
}

export const getOrderSandboxFixturePresentations = (
  t: ComposerTranslation
): OrderSandboxFixturePresentation[] =>
  Object.keys(fixturePresentationKeys).map(code =>
    getOrderSandboxFixturePresentation(code, t)
  ).filter((fixture): fixture is OrderSandboxFixturePresentation => fixture !== null)
