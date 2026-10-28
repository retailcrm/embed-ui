import type { Context } from '@retailcrm/embed-ui-v1-types/context'
import type { ContextAccessor } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
import type { Rejection } from '@retailcrm/embed-ui-v1-types/context'
import type { Schema } from '~types/ticket/edit'
import type { Schema as SettingsSchema } from '~types/ticket/edit-settings'

import { afterEach, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe } from 'vitest'
import { disposePinia } from 'pinia'
import { expect } from 'vitest'
import { setActivePinia } from 'pinia'
import { test, vi } from 'vitest'

import { actions, description } from '@/common/ticket/edit'
import { injectEndpoint } from '@/remote'
import { schema } from '@/common/ticket/edit'
import { schema as settingsSchema } from '@/common/ticket/edit-settings'
import { useActions, useContext } from '@/remote/ticket/edit'
import { useContext as useSettings } from '@/remote/ticket/edit-settings'

const issue = {
  id: null,
  key: 'new/1',
  type: { id: 1, name: 'Delivery' },
  topic: { id: 2, name: 'Delivery dates' },
  subtopic: { id: 3, name: 'Late delivery' },
  responsible: { id: 17, kind: 'user', name: 'Manager' },
  status: null,
  sla: null,
}

test('editor defaults describe an unsaved form without lifecycle controls', () => {
  for (const field of Object.values(schema)) expect(field.accepts(field.defaults())).toBe(true)
  for (const field of Object.values(settingsSchema)) {
    expect(field.readonly).toBe(true)
    expect(field.accepts(field.defaults())).toBe(true)
  }
  expect(schema.id.defaults()).toBeNull()
  expect(schema.mode.defaults()).toBe('create')
  expect(schema.loading.defaults()).toBe(true)
  expect(schema.valid.defaults()).toBe(false)
  expect(schema.orderItems.defaults()).toEqual([])
  expect(schema).not.toHaveProperty('orderProducts')
  expect(Object.keys(actions)).toEqual([
    'changeCustomerType', 'selectCustomer', 'unlinkCustomer', 'selectContact', 'unlinkContact',
    'selectCompany', 'unlinkCompany', 'addIssue', 'updateIssue', 'removeIssue', 'addOrder', 'removeOrder',
    'addOrderItem', 'removeOrderItem',
  ])
  expect(Object.keys(description)).toEqual(Object.keys(schema))
})

test('accepts nullable question ids, readonly nested references and serializable selected items', () => {
  expect(schema.issues.accepts([issue, { ...issue, id: 10, key: 'persisted/10' }])).toBe(true)
  expect(schema.issues.accepts([{ ...issue, key: 1 }])).toBe(false)
  expect(schema.orderItems.accepts([{
    id: 11, orderId: 10, orderNumber: '10C', name: 'Shoes', article: 'SH-1',
    price: { amount: 100, currency: 'EUR' }, image: null,
  }])).toBe(true)
  expect(schema.orders.accepts([{
    id: 10, number: '10C', statusName: 'New', manager: 'Manager',
    total: { amount: 100, currency: 'EUR' }, createdAt: '2026-10-28T10:00:00Z',
  }])).toBe(true)
  expect(schema.orders.accepts([{ id: 10, createdAt: new Date() }])).toBe(false)
  expect(schema.errors.accepts([{ path: ['issues', 'new/1', 'subtopic'], code: 'required', message: 'Select a subtopic' }])).toBe(true)
  expect(settingsSchema.topics.accepts([{ id: 2, name: 'Delivery dates', subtopics: [{ id: 3, name: 'Late delivery' }] }])).toBe(true)
  expect(settingsSchema.topics.accepts([{ id: 2, name: 'Delivery dates', subtopics: [{ name: 'No id' }] }])).toBe(false)
})

test('partial question changes distinguish omission and clearing and reject unsupported writable properties', () => {
  expect(actions.updateIssue.accepts(['new/1', {}])).toBe(true)
  expect(actions.updateIssue.accepts(['new/1', { typeId: 1, subtopicId: null, responsible: { kind: 'group', id: 5 } }])).toBe(true)
  expect(actions.updateIssue.accepts([42, { statusId: 1 }])).toBe(false)
  expect(actions.updateIssue.accepts(['new/1', { responsible: { id: 5 } }])).toBe(false)
  expect(actions.updateIssue.accepts(['new/1', { id: 42 }])).toBe(false)
  expect(actions.updateIssue.accepts(['new/1', { key: 'other' }])).toBe(false)
  expect(actions.updateIssue.accepts(['new/1', { topicId: 4 }])).toBe(false)
})

describe('editor remote draft contract', () => {
  let pinia: ReturnType<typeof createPinia>
  let data: Context<Schema>
  let settingsData: Context<SettingsSchema>
  const subscriptions = new Map<string, (value: unknown) => void>()
  const get = vi.fn(async (id: string) => id === 'ticket/edit' ? data : settingsData)
  const set = vi.fn()
  const invoke = vi.fn(async (name: string) => ({
    payload: name === 'addIssue' ? 'new/2' : undefined,
    rejection: null as Rejection | null,
  }))

  beforeEach(() => {
    data = Object.fromEntries(Object.entries(schema).map(([key, field]) => [key, field.defaults()])) as Context<Schema>
    settingsData = Object.fromEntries(Object.entries(settingsSchema).map(([key, field]) => [key, field.defaults()])) as Context<SettingsSchema>
    data.loading = false
    subscriptions.clear()
    vi.clearAllMocks()
    const endpoint = { call: {
      get, set, invoke,
      on: (id: string, event: string, handler: (value: unknown) => void) => subscriptions.set(`${id}:${event}`, handler),
    } } as unknown as Endpoint<ContextAccessor>
    pinia = createPinia()
    pinia.use(injectEndpoint(endpoint))
    createApp({}).use(pinia)
    setActivePinia(pinia)
  })

  afterEach(() => disposePinia(pinia))

  test('reads both slices, writes form fields and receives host reconciliation', async () => {
    const ticket = useContext()
    const settings = useSettings()
    await ticket.initialize()
    await settings.initialize()
    expect(ticket.$id).toBe('ticket/edit')
    expect(settings.$id).toBe('ticket/edit:settings')
    ticket.set('description', 'Customer asked for a return')
    expect(set).toHaveBeenCalledWith('ticket/edit', 'description', 'Customer asked for a return', null)
    subscriptions.get('ticket/edit:change:dirty')?.(true)
    subscriptions.get('ticket/edit:change:issues')?.([issue])
    subscriptions.get('ticket/edit:settings:change:editable')?.(true)
    expect(ticket.dirty).toBe(true)
    expect(ticket.issues[0].key).toBe('new/1')
    expect(settings.editable).toBe(true)
    expect(() => ticket.set('id' as never, 123 as never)).toThrow('readonly')
    expect(() => settings.set('editable' as never, false as never)).toThrow('readonly')
  })

  test('dispatches only draft actions and returns the host question key', async () => {
    const draftActions = useActions()
    expect(await draftActions.addIssue()).toBe('new/2')
    await draftActions.updateIssue('new/2', { statusId: null })
    await draftActions.selectCustomer(10)
    await draftActions.changeCustomerType('customer_corporate')
    await draftActions.addOrderItem(77)
    await draftActions.removeOrder(10)
    expect(invoke.mock.calls).toEqual([
      ['addIssue'], ['updateIssue', 'new/2', { statusId: null }], ['selectCustomer', 10],
      ['changeCustomerType', 'customer_corporate'], ['addOrderItem', 77], ['removeOrder', 10],
    ])
    const methods = draftActions as unknown as Record<string, unknown>
    expect(methods.save).toBeUndefined()
    expect(methods.close).toBeUndefined()
    expect(methods.validate).toBeUndefined()
    expect(methods.reset).toBeUndefined()
    expect(methods.refresh).toBeUndefined()
  })

  test('rejects malformed input and host refusals instead of reporting draft success', async () => {
    await expect(useActions().updateIssue('new/1', { id: 123 } as never)).rejects.toThrow('Invalid arguments')
    expect(invoke).not.toHaveBeenCalled()
    invoke.mockResolvedValueOnce({ payload: undefined, rejection: { message: 'EDITOR_BUSY' } })
    await expect(useActions().selectCustomer(10)).rejects.toThrow('EDITOR_BUSY')
    invoke.mockResolvedValueOnce({ payload: 123 as never, rejection: null })
    await expect(useActions().addIssue()).rejects.toThrow('Invalid result')
  })
})
