import type { ActionList } from '@retailcrm/embed-ui-v1-types/context'
import type { actions } from '@/common/ticket/edit'
import type { Context } from '@retailcrm/embed-ui-v1-types/context'
import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'
import type { Schema } from '~types/ticket/edit'
import type { Schema as SettingsSchema } from '~types/ticket/edit-settings'
import type { useActions, useContext } from '@/remote/ticket/edit'
import type { Writable } from '@retailcrm/embed-ui-v1-types/context'

import { expectTypeOf, test } from 'vitest'

test('editor preserves canonical customer types, item names and opaque question keys', () => {
  expectTypeOf<Context<Schema>['customer.type']>().toEqualTypeOf<CustomerType>()
  expectTypeOf<Context<Schema>['issues'][number]['id']>().toEqualTypeOf<number | null>()
  expectTypeOf<Context<Schema>['issues'][number]['key']>().toEqualTypeOf<string>()
  expectTypeOf<Context<Schema>['orders'][number]['createdAt']>().toEqualTypeOf<string>()
  expectTypeOf<keyof Writable<SettingsSchema>>().toEqualTypeOf<never>()
  expectTypeOf<ActionList<typeof actions>['addIssue']>().returns.toEqualTypeOf<Promise<string>>()

  function check(ticket: ReturnType<typeof useContext>, draft: ReturnType<typeof useActions>) {
    ticket.set('description', 'Draft text')
    ticket.set('contact.firstName', 'Alex')
    // @ts-expect-error Host owns the persisted ticket identity.
    ticket.set('id', 123)
    // @ts-expect-error Collection mutation goes through actions.
    ticket.set('orderItems', [])
    // @ts-expect-error Nested question data is readonly.
    ticket.issues[0].status = null
    // @ts-expect-error Item prices cannot be edited from the ticket form.
    ticket.orderItems[0].price.amount = 123
    // @ts-expect-error Use the local key, not an index or database id.
    draft.updateIssue(123, { statusId: 1 })
    // @ts-expect-error Question identity is not writable.
    draft.updateIssue('new/1', { id: 1 })
    // @ts-expect-error Saving belongs to CRM.
    draft.save()
    // @ts-expect-error Closing belongs to CRM.
    draft.close()
    // @ts-expect-error Validation belongs to CRM.
    draft.validate()
    // @ts-expect-error The public collection follows order/card terminology.
    void ticket.orderProducts
  }
  expectTypeOf(check).toBeFunction()
})
