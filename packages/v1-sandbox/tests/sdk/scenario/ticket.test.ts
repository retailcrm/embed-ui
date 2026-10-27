import { expect } from 'vitest'
import { nextTick } from 'vue'
import { test, vi } from 'vitest'

import { createTicketSandboxController } from '@/scenario'

test('updates the selected question through actions and publishes changes without replacing other questions', async () => {
  const controller = createTicketSandboxController()
  const changed = vi.fn()
  controller.endpointApi.on('ticket/view', 'change:issues', changed)
  const second = controller.snapshot().contexts['ticket/view'].issues[1]

  expect(await controller.endpointApi.invoke('changeIssueResponsible', 1001, { kind: 'group', id: 8 }))
    .toEqual({ payload: undefined, rejection: null })
  expect(await controller.endpointApi.invoke('changeIssueStatus', 1001, 2))
    .toEqual({ payload: undefined, rejection: null })
  await nextTick()

  const ticket = controller.snapshot().contexts['ticket/view']
  expect(ticket.issues[0]).toMatchObject({ responsible: { kind: 'group', id: 8 }, status: { id: 2 } })
  expect(ticket.issues[0].closedAt).toEqual(expect.any(String))
  expect(ticket.issues[1]).toEqual(second)
  expect(ticket.sla).toEqual(second.sla)
  expect(changed).toHaveBeenCalled()
  controller.dispose()
})

test('records comment and interface-opening results and resets the scenario', async () => {
  const controller = createTicketSandboxController()
  expect(Object.keys(controller.state.contexts)).toEqual(['ticket/view', 'ticket/view:settings', 'user/current', 'settings'])
  expect(await controller.endpointApi.invoke('createComment', 'Please call back'))
    .toEqual({ payload: 10001, rejection: null })
  await controller.endpointApi.invoke('openEmailEditor')
  expect(controller.snapshot().host.actions).toMatchObject([
    { name: 'createComment', args: ['Please call back'], result: { payload: 10001, rejection: null } },
    { name: 'openEmailEditor', args: [], result: { rejection: null } },
  ])
  controller.reset()
  expect(controller.snapshot().host.actions).toEqual([])
  const comments = await Promise.all([
    controller.endpointApi.invoke('createComment', 'First note'),
    controller.endpointApi.invoke('createComment', 'Second note'),
  ])
  expect(comments.map(result => result.payload)).toEqual([10001, 10002])
  controller.patchContext('ticket/view', { loadFailed: true })
  expect((await controller.endpointApi.invoke('refresh')).rejection).toBeNull()
  expect(controller.state.contexts['ticket/view'].loadFailed).toBe(false)
  controller.dispose()
  expect((await controller.endpointApi.invoke('openTicketHistory')).rejection?.message).toContain('disposed')
})

test('rejects unavailable operations, invalid values and unknown actions without changing the ticket', async () => {
  const controller = createTicketSandboxController()
  const before = controller.snapshot().contexts
  expect((await controller.endpointApi.invoke('changeIssueStatus', 9999, 2)).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('changeIssueStatus', 1001, 9999)).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('changeIssueResponsible', 1001, { id: 8 })).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('createComment', ' ')).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('unknownAction')).rejection).not.toBeNull()
  expect(controller.snapshot().contexts).toEqual(before)
  controller.patchContext('ticket/view', { pending: true })
  expect((await controller.endpointApi.invoke('openEmailEditor')).rejection).not.toBeNull()
  controller.dispose()
})

test('keeps ticket history readable while mutation and creation permissions are denied', async () => {
  const controller = createTicketSandboxController('ticket-readonly')
  const before = controller.snapshot().contexts
  expect((await controller.endpointApi.invoke('createComment', 'Note')).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('changeIssueStatus', 1001, 2)).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('changeIssueResponsible', 1001, { kind: 'group', id: 8 })).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('openTicketEditor')).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('openOrderForm')).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('openEmailEditor')).rejection).not.toBeNull()
  expect((await controller.endpointApi.invoke('openTicketHistory')).rejection).toBeNull()
  expect((await controller.endpointApi.invoke('refresh')).rejection).toBeNull()
  expect(controller.snapshot().contexts).toEqual(before)
  controller.dispose()
})
