import type { ComposerTranslation } from 'vue-i18n'

import type { SandboxFixtureCode } from '@/scenario/fixtures'

import { isSandboxFixtureCode } from '@/scenario/fixtures'

type SandboxFixturePresentationKeys = {
  description: string;
  name: string;
}

export type SandboxFixturePresentation = {
  code: SandboxFixtureCode;
  description: string;
  name: string;
}

const fixturePresentationKeys: Record<
  SandboxFixtureCode,
  SandboxFixturePresentationKeys
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
  'ticket-basic': {
    description: 'app.fixtures.ticketBasic.description',
    name: 'app.fixtures.ticketBasic.name',
  },
  'ticket-readonly': {
    description: 'app.fixtures.ticketReadonly.description',
    name: 'app.fixtures.ticketReadonly.name',
  },
}

export const getSandboxFixturePresentation = (
  code: string,
  t: ComposerTranslation
): SandboxFixturePresentation | null => {
  if (!isSandboxFixtureCode(code)) return null

  const keys = fixturePresentationKeys[code]

  return {
    code,
    description: t(keys.description),
    name: t(keys.name),
  }
}

export const getSandboxFixturePresentations = (
  t: ComposerTranslation
): SandboxFixturePresentation[] =>
  Object.keys(fixturePresentationKeys).map(code =>
    getSandboxFixturePresentation(code, t)
  ).filter((fixture): fixture is SandboxFixturePresentation => fixture !== null)
