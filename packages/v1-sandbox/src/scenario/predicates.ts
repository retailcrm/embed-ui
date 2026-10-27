import type { SandboxOrderTarget, SandboxTarget } from '@/scenario/types'

import { ORDER_SANDBOX_TARGETS, SANDBOX_SLOTS } from '@/scenario/targets'

export const isObjectKey = <T extends object>(
  object: T,
  value: PropertyKey
): value is Extract<keyof T, string> =>
    value in object

export const isSandboxOrderTarget = (value: string): value is SandboxOrderTarget =>
  ORDER_SANDBOX_TARGETS.includes(value as (typeof ORDER_SANDBOX_TARGETS)[number])

export const isSandboxTarget = (value: string): value is SandboxTarget =>
  SANDBOX_SLOTS.some(slot => slot.target === value)
