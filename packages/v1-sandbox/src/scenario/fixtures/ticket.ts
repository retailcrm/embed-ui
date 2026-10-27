import type {
  Schema as CurrentUserSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/user/current'
import type {
  Schema as SettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/settings'
import type {
  Schema as TicketSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view-settings'
import type {
  Schema as TicketViewSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

import type { CreateSandboxControllerOptions } from '@/core/controller'
import type { SandboxContextOverrides } from '@/core/state'
import type { SandboxController } from '@/core/controller'

import {
  schema as currentUserSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/user/current'
import { schema as settingsSchema } from '@retailcrm/embed-ui-v1-contexts/remote/settings'
import {
  schema as ticketSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view'
import {
  schema as ticketSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view-settings'

import { createSandboxController } from '@/core/controller'
import { createSandboxHttpMiddleware } from '@/scenario/http'
import { handleTicketAction } from '@/scenario/ticketActions'

export type TicketSandboxSchemas = {
  'ticket/view': TicketViewSchema;
  'ticket/view:settings': TicketSettingsSchema;
  'user/current': CurrentUserSchema;
  settings: SettingsSchema;
}

export const ticketSandboxSchemas: TicketSandboxSchemas = {
  'ticket/view': ticketSchema,
  'ticket/view:settings': ticketSettingsSchema,
  'user/current': currentUserSchema,
  settings: settingsSchema,
}

export type TicketSandboxFixture = {
  contexts: SandboxContextOverrides<TicketSandboxSchemas>;
  description: string;
  name: string;
}

const statuses = [{
  id: 1, code: 'new', name: 'New',
  group: { id: 1, code: 'open', name: 'Open' },
}, {
  id: 2, code: 'resolved', name: 'Resolved',
  group: { id: 2, code: 'closed', name: 'Closed' },
}]
const sla = { status: 'normal' as const, duration: 3600, remainingDuration: 1800, closedAt: null }
const contexts: TicketSandboxFixture['contexts'] = {
  'ticket/view': {
    'id': 124,
    'site': { id: 1, name: 'Demo store' },
    'number': '124C',
    'description': 'Please check the delivery date and the missing tracking number.',
    'channelName': 'Email',
    'customer.id': 91742,
    'customer.type': 'customer',
    'customer.name': 'Alex Morgan',
    'customer.email': 'alex.morgan@example.test',
    'customer.phones': [{ number: '+1 202 555 0100', numberCanonical: '12025550100' }],
    'customer.vip': true,
    'customer.bad': false,
    'issues': [{
      id: 1001,
      type: { id: 1, name: 'Delivery' },
      topic: { id: 11, name: 'Delivery date' },
      subtopic: null,
      responsible: { id: 17, kind: 'user', name: 'Taylor Smith' },
      status: statuses[0], sla, closedAt: null,
    }, {
      id: 1002,
      type: { id: 1, name: 'Delivery' },
      topic: { id: 12, name: 'Tracking number' },
      subtopic: null,
      responsible: { id: 8, kind: 'group', name: 'Support' },
      status: statuses[0], sla: { ...sla, remainingDuration: 2400 }, closedAt: null,
    }],
    'sla': sla,
    'canCreateEmail': true,
    'canCreateOrder': true,
    'loading': false,
    'loadFailed': false,
    'pending': false,
    'createdAt': '2026-01-15T10:00:00.000Z',
  },
  'ticket/view:settings': { statuses, editable: true, commentable: true },
  'user/current': {
    id: 17, firstName: 'Taylor', lastName: 'Smith', email: 'taylor.smith@example.test',
    isManager: true, permissions: ['tickets_view', 'tickets_edit'],
  },
  settings: { 'system.locale': 'en-GB' },
}

export type TicketSandboxFixtureCode = 'ticket-basic' | 'ticket-readonly'

export const ticketSandboxFixtures: Record<TicketSandboxFixtureCode, TicketSandboxFixture> = {
  'ticket-basic': {
    name: 'Ticket with two questions',
    description: 'An editable ticket with a customer and two independently assigned questions.',
    contexts,
  },
  'ticket-readonly': {
    name: 'Read-only ticket',
    description: 'Ticket data remains visible while mutations and creation forms are unavailable.',
    contexts: {
      ...contexts,
      'ticket/view': { ...contexts['ticket/view'], canCreateEmail: false, canCreateOrder: false },
      'ticket/view:settings': { statuses, editable: false, commentable: false },
      'user/current': { ...contexts['user/current'], permissions: ['tickets_view'] },
    },
  },
}

export const isTicketSandboxFixtureCode = (code: string): code is TicketSandboxFixtureCode =>
  Object.hasOwn(ticketSandboxFixtures, code)

export const getTicketSandboxFixture = (code: string): TicketSandboxFixture =>
  ticketSandboxFixtures[isTicketSandboxFixtureCode(code) ? code : 'ticket-basic']

export const createTicketSandboxController = (
  fixtureCode = 'ticket-basic',
  options: Partial<CreateSandboxControllerOptions<TicketSandboxSchemas>> = {}
): SandboxController<TicketSandboxSchemas> => createSandboxController({
  contexts: getTicketSandboxFixture(fixtureCode).contexts,
  schemas: ticketSandboxSchemas,
  globalBridge: false,
  location: { pathname: '/tickets/124' },
  httpMiddleware: createSandboxHttpMiddleware<TicketSandboxSchemas>(),
  actionHandler: handleTicketAction,
  ...options,
})
