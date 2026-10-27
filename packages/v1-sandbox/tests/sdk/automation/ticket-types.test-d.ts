import { expectTypeOf, test } from 'vitest'

import { createSandboxWorkerRuntime } from '@/automation/browser'

// vue-tsc checks this contract together with the sandbox sources.
test('infers the context slice from the worker fixture', () => {
  async function check(worker: Worker) {
    const ticket = await createSandboxWorkerRuntime({ fixture: 'ticket-basic', worker })
    expectTypeOf(ticket.snapshot().contexts['ticket/view'].id).toEqualTypeOf<number | null>()
    ticket.patchContext('ticket/view:settings', { editable: false })
    // @ts-expect-error Ticket fixtures do not expose an order context.
    ticket.patchContext('order/card', { number: '123' })
    // @ts-expect-error Ticket identifiers remain numeric.
    ticket.patchContext('ticket/view', { id: '123' })

    const order = await createSandboxWorkerRuntime({ worker })
    expectTypeOf(order.snapshot().contexts['order/card'].number).toEqualTypeOf<string | null>()
    // @ts-expect-error The default order fixture does not expose a ticket context.
    order.patchContext('ticket/view', { id: 123 })
  }
  expectTypeOf(check).toBeFunction()
})
