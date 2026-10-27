import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type { CreateSandboxControllerOptions } from '@/core/controller'
import type {
  OrderSandboxFixture,
  OrderSandboxFixtureCode,
  OrderSandboxSchemas,
} from '@/scenario/fixtures/order'
import type { SandboxController } from '@/core/controller'
import type {
  TicketSandboxFixture,
  TicketSandboxFixtureCode,
  TicketSandboxSchemas,
} from '@/scenario/fixtures/ticket'

import {
  DEFAULT_SANDBOX_TARGETS,
  ORDER_SANDBOX_TARGETS,
  TICKET_SANDBOX_TARGETS,
} from '@/scenario/targets'

import { createOrderSandboxController } from '@/scenario/fixtures/order'
import { createTicketSandboxController } from '@/scenario/fixtures/ticket'
import { getOrderSandboxFixture } from '@/scenario/fixtures/order'
import { isTicketSandboxFixtureCode } from '@/scenario/fixtures/ticket'
import { orderSandboxFixtures } from '@/scenario/fixtures/order'
import { ticketSandboxFixtures } from '@/scenario/fixtures/ticket'

export type SandboxFixtureCode = OrderSandboxFixtureCode | TicketSandboxFixtureCode
export type SandboxFixture = OrderSandboxFixture | TicketSandboxFixture
export const sandboxFixtures: Record<SandboxFixtureCode, SandboxFixture> = { ...orderSandboxFixtures, ...ticketSandboxFixtures }
export type SandboxFixtureSchemas<F extends string> = F extends TicketSandboxFixtureCode
  ? TicketSandboxSchemas : F extends keyof typeof orderSandboxFixtures ? OrderSandboxSchemas : ContextSchemaList

export const isSandboxFixtureCode = (code: string): code is SandboxFixtureCode =>
  Object.hasOwn(sandboxFixtures, code)

export const getSandboxFixture = (code: string): SandboxFixture =>
  isSandboxFixtureCode(code) ? sandboxFixtures[code] : getOrderSandboxFixture(code)

export type SandboxFixtureControllerOptions = Omit<CreateSandboxControllerOptions<ContextSchemaList>, 'contexts' | 'schemas'>

export const createFixtureSandboxController = (
  code: string,
  options: SandboxFixtureControllerOptions = {}
): SandboxController<ContextSchemaList> => isTicketSandboxFixtureCode(code)
  ? createTicketSandboxController(code, options)
  : createOrderSandboxController(code, options)

export const getSandboxFixtureTargets = (code: string) => isTicketSandboxFixtureCode(code)
  ? TICKET_SANDBOX_TARGETS : ORDER_SANDBOX_TARGETS

export const isTargetForSandboxFixture = (target: string, code: string): boolean =>
  getSandboxFixtureTargets(code).some(candidate => candidate === target)

export const getDefaultSandboxTargets = (code: string) => isTicketSandboxFixtureCode(code)
  ? TICKET_SANDBOX_TARGETS : DEFAULT_SANDBOX_TARGETS
