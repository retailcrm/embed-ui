import type { SandboxWorkerRuntime } from '@/automation/browser'
import type { TicketSandboxSchemas } from '@/scenario'

import { afterEach, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/dom'
import { test } from 'vitest'
import { within } from '@testing-library/dom'

import {
  createExtensionSourceWorker,
  createSandboxWorkerRuntime,
  launchSandboxExtension,
} from '@/automation/browser'
import { TICKET_SANDBOX_TARGETS } from '@/scenario'

let runtime: SandboxWorkerRuntime<TicketSandboxSchemas> | null = null
let unmount: (() => void) | undefined

afterEach(async () => {
  await runtime?.teardown()
  runtime = null
  unmount?.()
  unmount = undefined
  document.body.innerHTML = ''
  window.localStorage.clear()
})

const createWorker = () => createExtensionSourceWorker(
  new URL('../../__fixtures__/extensions/ticketSummary/index.ts', import.meta.url)
)

test('runs ticket actions through worker RPC, updates subscriptions, and restores fixture data', async () => {
  const source = createWorker()
  runtime = await createSandboxWorkerRuntime({ fixture: 'ticket-basic', ready: source.ready, worker: source.worker })
  await runtime.runWidget('ticket/view:header.after')
  await expect.element(await screen.findByRole('heading', { name: 'Ticket 124C' })).toBeVisible()

  fireEvent.input(screen.getByRole('textbox', { name: 'Comment' }), { target: { value: 'Customer replied' } })
  fireEvent.click(screen.getByRole('button', { name: 'Add comment' }))
  await expect.poll(() => runtime?.snapshot().host.actions[0]).toMatchObject({
    name: 'createComment', args: ['Customer replied'], result: { payload: 10001, rejection: null },
  })

  fireEvent.click(screen.getByRole('button', { name: 'Resolve first question' }))
  await expect.element(await screen.findByText('Question 1001: Resolved — Taylor Smith')).toBeVisible()
  await expect.element(screen.getByText('Question 1002: New — Support')).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Assign first question' }))
  await expect.element(await screen.findByText('Question 1001: Resolved — Support')).toBeVisible()

  fireEvent.click(screen.getByRole('button', { name: 'Edit ticket' }))
  fireEvent.click(screen.getByRole('button', { name: 'Open history' }))
  fireEvent.click(screen.getByRole('button', { name: 'New email' }))
  fireEvent.click(screen.getByRole('button', { name: 'New order' }))
  fireEvent.click(screen.getByRole('button', { name: 'Refresh ticket' }))
  await expect.poll(() => runtime?.snapshot().host.actions.map(action => action.name)).toEqual([
    'createComment', 'changeIssueStatus', 'changeIssueResponsible', 'openTicketEditor', 'openTicketHistory',
    'openEmailEditor', 'openOrderForm', 'refresh',
  ])
  runtime.reset()
  await expect.element(await screen.findByText('Question 1001: New — Taylor Smith')).toBeVisible()

  runtime.patchContext('ticket/view:settings', { editable: false })
  await expect.poll(() => (screen.getByRole('button', { name: 'Edit ticket' }) as HTMLButtonElement).disabled).toBe(true)
  await runtime.runWidget('ticket/view:issues.after')
  runtime.patchContext('ticket/view', { number: '125C' })
  await expect.element(await screen.findByRole('heading', { name: 'Ticket 125C' })).toBeVisible()
})

test('shows disabled creation and mutation controls for a read-only ticket', async () => {
  const source = createWorker()
  runtime = await createSandboxWorkerRuntime({ fixture: 'ticket-readonly', ready: source.ready, worker: source.worker })
  await runtime.runWidget('ticket/view:header.after')
  await screen.findByRole('heading', { name: 'Ticket 124C' })
  await expect.element(screen.getByRole('button', { name: 'Add comment' })).toBeDisabled()
  await expect.element(screen.getByRole('button', { name: 'Edit ticket' })).toBeDisabled()
  await expect.element(screen.getByRole('button', { name: 'New email' })).toBeDisabled()
  await expect.element(screen.getByRole('button', { name: 'New order' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: 'Open history' }))
  await expect.poll(() => runtime?.snapshot().host.actions[0]?.name).toBe('openTicketHistory')
})

test('launches all four ticket placements together through the sandbox app', async () => {
  const mounted = await launchSandboxExtension({
    fixture: 'ticket-basic',
    mode: 'widget',
    descriptor: {
      runner: 'worker',
      entrypoint: new URL('../../__fixtures__/extensions/ticketSummary/index.ts', import.meta.url).href,
      stylesheet: null,
      pages: [],
      targets: [...TICKET_SANDBOX_TARGETS],
    },
  })
  unmount = mounted.unmount
  for (const target of TICKET_SANDBOX_TARGETS) {
    const region = await screen.findByRole('region', { name: `Widget target: ${target}` })
    await expect.element(await within(region).findByRole('heading', { name: 'Ticket 124C' })).toBeVisible()
  }
  expect(screen.getAllByRole('button', { name: 'Edit ticket' })).toHaveLength(1)
})
