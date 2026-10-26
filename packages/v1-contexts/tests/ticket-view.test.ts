import type { Context, ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
import type { Rejection } from '@retailcrm/embed-ui-v1-types/context'

import type { Schema } from '~types/ticket/view'
import type { Schema as SettingsSchema } from '~types/ticket/view-settings'
import type { TicketIssue } from '~types/ticket/view'

import { afterEach, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe } from 'vitest'
import { disposePinia } from 'pinia'
import { expect } from 'vitest'
import { setActivePinia } from 'pinia'
import { test, vi } from 'vitest'

import { actions } from '@/common/ticket/view'
import { injectEndpoint } from '@/remote'
import { schema as orderSchema } from '@/common/order/card'
import { schema } from '@/common/ticket/view'
import { schema as settingsSchema } from '@/common/ticket/view-settings'
import { useActions, useContext } from '@/remote/ticket/view'
import { useContext as useSettingsContext } from '@/remote/ticket/view-settings'

const issues: TicketIssue[] = [{
  id: 10,
  type: { id: 1, name: 'Return' },
  topic: null,
  subtopic: null,
  status: {
    id: 2,
    name: 'Open',
    code: 'open',
    group: { id: 3, name: 'New', code: 'new' },
  },
  responsible: { kind: 'user', id: 4, name: 'Manager' },
  closedAt: null,
  sla: { status: 'warning', duration: 3600, remainingDuration: 600, closedAt: null },
}, {
  id: 11,
  type: null,
  topic: null,
  subtopic: null,
  status: null,
  responsible: { kind: 'group', id: 5, name: 'Support' },
  closedAt: '2026-10-26T08:00:00.000Z',
  sla: null,
}]

test('ticket context starts with valid readonly defaults and no enabled operations', () => {
  Object.values(schema).forEach(field => {
    expect(field.readonly).toBe(true)
    expect(field.accepts(field.defaults())).toBe(true)
  })

  expect(schema.canCreateEmail.defaults()).toBe(false)
  expect(schema.canCreateOrder.defaults()).toBe(false)
  expect(schema.loading.defaults()).toBe(true)
  expect(schema.issues.defaults()).toEqual([])
})

test('question schema distinguishes users and groups and validates nested SLA and statuses', () => {
  expect(schema.issues.accepts(issues)).toBe(true)
  expect(schema.issues.accepts([{ ...issues[0], responsible: { id: 4, name: 'Manager' } }])).toBe(false)
  expect(schema.issues.accepts([{ ...issues[0], status: 'open' }])).toBe(false)
  expect(schema.issues.accepts([{ ...issues[0], sla: { ...issues[0].sla, status: 'closed' } }])).toBe(false)
  expect(schema.issues.accepts([{ ...issues[1], closedAt: new Date() }])).toBe(false)
})

test('ticket settings have readonly defaults with a shared status catalog and explicit flags', () => {
  Object.values(settingsSchema).forEach(field => {
    expect(field.readonly).toBe(true)
    expect(field.accepts(field.defaults())).toBe(true)
  })

  expect(settingsSchema.statuses.defaults()).toEqual([])
  expect(settingsSchema.editable.defaults()).toBe(false)
  expect(settingsSchema.commentable.defaults()).toBe(false)
})

test.each(['customer', 'customer_corporate'])('uses the same customer type %s as the order context', (type) => {
  expect(schema['customer.type'].accepts(type)).toBe(true)
  expect(orderSchema['customer.type'].accepts(type)).toBe(true)
})

test('keeps customer absence and defaults consistent with the order context', () => {
  expect(schema['customer.id'].defaults()).toBeNull()
  expect(schema['customer.type'].defaults()).toBe(orderSchema['customer.type'].defaults())
  expect(schema['customer.type'].accepts('individual')).toBe(false)
  expect(schema['customer.type'].accepts('corporate')).toBe(false)
})

describe('ticket viewer remote contract', () => {
  let pinia: ReturnType<typeof createPinia>
  let data: Context<Schema>
  let settingsData: Context<SettingsSchema>
  const subscriptions = new Map<string, (value: unknown) => void>()
  const get = vi.fn(async (context: string) => context === 'ticket/view:settings' ? settingsData : data)
  const set = vi.fn()
  const invoke = vi.fn(async (name: string) => ({
    payload: name === 'createComment' ? 77 : undefined,
    rejection: null as Rejection | null,
  }))

  beforeEach(() => {
    const defaults = Object.fromEntries(Object.entries(schema).map(([name, field]) => [name, field.defaults()])) as Context<Schema>

    data = {
      ...defaults,
      id: 42,
      'customer.id': 17,
      'customer.type': 'customer',
      'customer.name': 'Ivan',
      issues,
      loading: false,
    }
    settingsData = {
      statuses: [],
      editable: true,
      commentable: true,
    }
    subscriptions.clear()
    get.mockClear()
    set.mockClear()
    invoke.mockClear()

    const endpoint = {
      call: {
        get,
        set,
        on: (context: string, event: string, handler: (value: unknown) => void) => {
          subscriptions.set(`${context}:${event}`, handler)
        },
        invoke,
      },
    } as unknown as Endpoint<ContextAccessor>

    pinia = createPinia()
    pinia.use(injectEndpoint(endpoint))
    createApp({}).use(pinia)
    setActivePinia(pinia)
  })

  afterEach(() => {
    disposePinia(pinia)
    setActivePinia(undefined)
  })

  test('initializes from host and receives updated questions without losing their identities', async () => {
    const ticket = useContext()

    await ticket.initialize()

    expect(get).toHaveBeenCalledWith('ticket/view', '~', expect.any(Function))
    expect(ticket.id).toBe(42)
    expect(ticket.issues).toEqual(issues)

    const updatedIssues = [{ ...issues[0], responsible: { kind: 'group' as const, id: 8, name: 'Returns' } }, issues[1]]
    subscriptions.get('ticket/view:change:issues')?.(updatedIssues)

    expect(ticket.issues).toEqual(updatedIssues)
    expect(ticket.issues[1].id).toBe(11)
  })

  test('rejects direct writes instead of sending a setter call to the host', () => {
    const ticket = useContext()

    expect(() => ticket.set('description' as never, 'Changed' as never)).toThrow('readonly')
    expect(() => ticket.set('customer.email' as never, 'ivan@example.com' as never)).toThrow('readonly')
    expect(set).not.toHaveBeenCalled()
  })

  test('reads customer fields and receives updates using the same paths as order/card', async () => {
    const ticket = useContext()

    await ticket.initialize()

    expect(ticket['customer.id']).toBe(17)
    expect(ticket['customer.type']).toBe('customer')
    expect(ticket['customer.name']).toBe('Ivan')

    subscriptions.get('ticket/view:change:customer.type')?.('customer_corporate')
    subscriptions.get('ticket/view:change:customer.email')?.('company@example.com')

    expect(ticket['customer.type']).toBe('customer_corporate')
    expect(ticket['customer.email']).toBe('company@example.com')
  })

  test('keeps shared settings independent from ticket-specific action availability', async () => {
    const ticket = useContext()
    const settings = useSettingsContext()

    await Promise.all([ticket.initialize(), settings.initialize()])

    expect(settings.$id).toBe('ticket/view:settings')
    expect(get).toHaveBeenCalledWith('ticket/view:settings', '~', expect.any(Function))
    expect(settings.editable).toBe(true)
    expect(ticket.canCreateEmail).toBe(false)
    expect(ticket.canCreateOrder).toBe(false)
    expect('capabilities' in ticket).toBe(false)
    expect('statuses' in ticket).toBe(false)

    subscriptions.get('ticket/view:change:canCreateEmail')?.(true)
    subscriptions.get('ticket/view:change:canCreateOrder')?.(true)
    subscriptions.get('ticket/view:settings:change:editable')?.(false)

    expect(ticket.canCreateEmail).toBe(true)
    expect(ticket.canCreateOrder).toBe(true)
    expect(settings.editable).toBe(false)
  })

  test('provides the status catalog through settings without granting ticket edit permission', async () => {
    settingsData.editable = false
    const settings = useSettingsContext()
    await settings.initialize()

    const statuses = [{ id: 2, code: 'open', name: 'Open', group: { id: 3, code: 'new', name: 'New' } }]
    subscriptions.get('ticket/view:settings:change:statuses')?.(statuses)

    expect(settings.statuses).toEqual(statuses)
    expect(settings.editable).toBe(false)
    expect(() => settings.set('editable' as never, true as never)).toThrow('readonly')
    expect(set).not.toHaveBeenCalled()
  })

  test('passes question identifiers and typed responsible references to host actions', async () => {
    const ticketActions = useActions()

    await ticketActions.changeIssueStatus(10, 6)
    await ticketActions.changeIssueResponsible(11, { kind: 'group', id: 8 })
    await ticketActions.changeIssueResponsible(10, { kind: 'user', id: 9 })

    expect(invoke.mock.calls).toEqual([
      ['changeIssueStatus', 10, 6],
      ['changeIssueResponsible', 11, { kind: 'group', id: 8 }],
      ['changeIssueResponsible', 10, { kind: 'user', id: 9 }],
    ])
  })

  test('returns the saved comment id and forwards host failure', async () => {
    const ticketActions = useActions()

    await expect(ticketActions.createComment('Customer contacted')).resolves.toBe(77)
    expect(invoke).toHaveBeenCalledWith('createComment', 'Customer contacted')

    invoke.mockResolvedValueOnce({ payload: undefined, rejection: { message: 'TICKET_EDIT_DENIED' } })

    await expect(ticketActions.changeIssueStatus(10, 6)).rejects.toThrow('TICKET_EDIT_DENIED')
  })

  test('rejects malformed responsible references before invoking the host', async () => {
    const ticketActions = useActions()

    await expect(ticketActions.changeIssueResponsible(10, { id: 8 } as never)).rejects.toThrow('Invalid arguments')
    await expect(ticketActions.changeIssueResponsible(10, { kind: 'customer', id: 8 } as never)).rejects.toThrow('Invalid arguments')
    expect(invoke).not.toHaveBeenCalled()
  })

  test('requires a saved comment identifier in the host response', async () => {
    invoke.mockResolvedValueOnce({ payload: undefined, rejection: null })

    await expect(useActions().createComment('Note')).rejects.toThrow('Invalid result')
  })

  test('exposes UI-opening and refresh actions with validated argument lists', async () => {
    const ticketActions = useActions()

    await ticketActions.openTicketEditor()
    await ticketActions.openTicketHistory()
    await ticketActions.openEmailEditor()
    await ticketActions.openOrderForm()
    await ticketActions.refresh()

    expect(invoke.mock.calls).toEqual([
      ['openTicketEditor'],
      ['openTicketHistory'],
      ['openEmailEditor'],
      ['openOrderForm'],
      ['refresh'],
    ])
    expect(actions.openTicketEditor.accepts([42])).toBe(false)
  })
})
