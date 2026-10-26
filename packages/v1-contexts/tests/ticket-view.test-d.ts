import type { ActionList, Context } from '@retailcrm/embed-ui-v1-types/context'
import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'
import type { Writable } from '@retailcrm/embed-ui-v1-types/context'

import type { Schema as OrderSchema } from '~types/order/card'
import type { Schema } from '~types/ticket/view'
import type { Schema as SettingsSchema } from '~types/ticket/view-settings'
import type { TicketResponsibleInput } from '~types/ticket/view'

import type { actions } from '@/common/ticket/view'
import type { useContext } from '@/remote/ticket/view'
import type { useContext as useSettingsContext } from '@/remote/ticket/view-settings'

import { expectTypeOf, test } from 'vitest'

test('ticket context is readonly and keeps dates serializable', () => {
  expectTypeOf<keyof Writable<Schema>>().toEqualTypeOf<never>()
  expectTypeOf<keyof Writable<SettingsSchema>>().toEqualTypeOf<never>()
  expectTypeOf<Context<Schema>['createdAt']>().toEqualTypeOf<string | null>()
  expectTypeOf<Context<Schema>['issues'][number]['closedAt']>().toEqualTypeOf<string | null>()

  type TicketContext = ReturnType<typeof useContext>
  expectTypeOf<TicketContext['set']>().parameter(0).toEqualTypeOf<never>()

  function rejectMutation (ticket: TicketContext) {
    // @ts-expect-error Questions must be changed through host actions.
    ticket.issues[0].status = null
    // @ts-expect-error The question collection is readonly.
    ticket.issues.push(ticket.issues[0])
    // @ts-expect-error Customer email is readonly in the viewer slice.
    ticket.set('customer.email', 'changed@example.com')
    // @ts-expect-error Customer phone data is readonly.
    ticket['customer.phones'][0].number = 'Changed'
  }

  expectTypeOf(rejectMutation).toBeFunction()
})

test('keeps explicit viewer flags and shared settings in separate readonly contexts', () => {
  type TicketContext = ReturnType<typeof useContext>
  type SettingsContext = ReturnType<typeof useSettingsContext>

  expectTypeOf<TicketContext['canCreateEmail']>().toEqualTypeOf<boolean>()
  expectTypeOf<TicketContext['canCreateOrder']>().toEqualTypeOf<boolean>()
  expectTypeOf<SettingsContext['editable']>().toEqualTypeOf<boolean>()
  expectTypeOf<SettingsContext['statuses']>().toEqualTypeOf<Context<SettingsSchema>['statuses']>()

  function rejectWrongContext (ticket: TicketContext, settings: SettingsContext) {
    // @ts-expect-error Status catalog belongs to the settings context.
    void ticket.statuses
    // @ts-expect-error Permission belongs to the settings context.
    void ticket.editable
    // @ts-expect-error Email availability depends on the selected ticket.
    void settings.canCreateEmail
    // @ts-expect-error Settings are readonly.
    settings.set('editable', true)
  }

  expectTypeOf(rejectWrongContext).toBeFunction()
})

test('ticket and order expose the same customer entity types through different slices', () => {
  expectTypeOf<Context<Schema>['customer.type']>().toEqualTypeOf<CustomerType>()
  expectTypeOf<Context<Schema>['customer.type']>().toEqualTypeOf<Context<OrderSchema>['customer.type']>()
  expectTypeOf<Context<Schema>['customer.id']>().toEqualTypeOf<Context<OrderSchema>['customer.id']>()
  expectTypeOf<Context<Schema>['customer.email']>().toEqualTypeOf<Context<OrderSchema>['customer.email']>()
})

test('ticket actions accept question references and return confirmed results', () => {
  type TicketActions = ActionList<typeof actions>

  expectTypeOf<TicketActions['changeIssueResponsible']>().parameters.toEqualTypeOf<[
    issueId: number,
    responsible: TicketResponsibleInput,
  ]>()
  expectTypeOf<TicketActions['createComment']>().returns.toEqualTypeOf<Promise<number>>()
  expectTypeOf<TicketActions['openOrderForm']>().returns.toEqualTypeOf<Promise<void>>()
})
