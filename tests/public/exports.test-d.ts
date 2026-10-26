import type {
  SchemaList as ContextSchemaList,
} from '@retailcrm/embed-ui-v1-contexts/types'
import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'
import type { Field } from '@retailcrm/embed-ui-v1-types/context'
import type {
  Schema as OrderCardSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/order/card'
import type { SchemaList } from '@retailcrm/embed-ui/types/context'
import type {
  TargetList,
  TargetName,
} from '@retailcrm/embed-ui-v1-endpoint/common/targets'
import type {
  Schema as TicketSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view-settings'
import type {
  Schema as TicketViewSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'
import type { TypeOf } from '@retailcrm/embed-ui-v1-types/context'
import type { WidgetTarget } from '@retailcrm/embed-ui/types/widget'

import type {
  schema as publicSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view-settings'
import type {
  schema as publicTicketSchema,
  useActions as useTicketActions,
  useContext as useTicketContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view'
import type {
  useContext as useTicketSettings,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view-settings'

import { UiSelectPopper } from '@retailcrm/embed-ui-v1-components/host'

import { expectTypeOf, test } from 'vitest'

test('resolves the public declarations through package exports', () => {
  expectTypeOf<WidgetTarget>().toEqualTypeOf<WidgetTarget>()
  expectTypeOf<SchemaList>().toEqualTypeOf<SchemaList>()
  expectTypeOf<OrderCardSchema>().toEqualTypeOf<OrderCardSchema>()
  expectTypeOf<ContextSchemaList>().toEqualTypeOf<ContextSchemaList>()
  expectTypeOf<Field<string>>().toEqualTypeOf<Field<string>>()
  expectTypeOf(UiSelectPopper).toEqualTypeOf(UiSelectPopper)
  expectTypeOf<ContextSchemaList['ticket/view']>().toEqualTypeOf<TicketViewSchema>()
  expectTypeOf<ContextSchemaList['ticket/view:settings']>().toEqualTypeOf<TicketSettingsSchema>()
  expectTypeOf<ReturnType<typeof useTicketSettings>['editable']>().toEqualTypeOf<boolean>()
  expectTypeOf<ReturnType<typeof useTicketContext>['canCreateEmail']>().toEqualTypeOf<boolean>()
  expectTypeOf<typeof publicTicketSchema>().toEqualTypeOf<TicketViewSchema>()
  expectTypeOf<typeof publicSettingsSchema>().toEqualTypeOf<TicketSettingsSchema>()
  expectTypeOf<ReturnType<typeof useTicketContext>['id']>().toEqualTypeOf<number | null>()
  expectTypeOf<ReturnType<typeof useTicketActions>['createComment']>().returns.toEqualTypeOf<Promise<number>>()
  expectTypeOf<TypeOf<TicketViewSchema['customer.type']>>().toEqualTypeOf<CustomerType>()
  expectTypeOf<TypeOf<TicketViewSchema['customer.type']>>().toEqualTypeOf<TypeOf<OrderCardSchema['customer.type']>>()
})

test('preserves ticket readonly and action argument checks through public declarations', () => {
  function checkTicketContract (
    ticket: ReturnType<typeof useTicketContext>,
    actions: ReturnType<typeof useTicketActions>,
    settings: ReturnType<typeof useTicketSettings>,
    schema: typeof publicTicketSchema,
    settingsSchema: typeof publicSettingsSchema
  ) {
    // @ts-expect-error Ticket data is readonly.
    ticket.set('description', 'Changed')
    // @ts-expect-error Nested question data is readonly.
    ticket.issues[0].status = null
    // @ts-expect-error Customer email is readonly in the ticket slice.
    ticket.set('customer.email', 'changed@example.com')
    // @ts-expect-error Customer type uses the same canonical codes as orders.
    const invalidCustomerType: typeof ticket['customer.type'] = 'individual'
    // @ts-expect-error Responsible kind is required.
    actions.changeIssueResponsible(10, { id: 8 })
    // @ts-expect-error A comment must contain text.
    actions.createComment(123)
    // @ts-expect-error Status options are only available in settings.
    void ticket.statuses
    // @ts-expect-error Settings fields are readonly.
    settings.set('editable', true)
    // @ts-expect-error Telephony access is not part of the public ticket API.
    void actions.call
    // @ts-expect-error Viewer schema must not expose the shared status catalog.
    void schema.statuses
    // @ts-expect-error Settings schema must not expose ticket-specific flags.
    void settingsSchema.canCreateOrder

    return invalidCustomerType
  }

  expectTypeOf(checkTicketContract).toBeFunction()
})

test('exposes ticket targets with the correct context slices through package declarations', () => {
  const names: TargetName[] = [
    'ticket/view:header.after',
    'ticket/view:common.before',
    'ticket/view:customer.after',
    'ticket/view:issues.after',
  ]
  const widgetTarget: WidgetTarget = 'ticket/view:header.after'

  expectTypeOf<keyof TargetList['ticket/view:issues.after']>().toEqualTypeOf<
    'ticket/view' | 'ticket/view:settings' | 'user/current' | 'settings'
  >()
  expectTypeOf<TargetList['ticket/view:customer.after']['ticket/view']>().toEqualTypeOf<TicketViewSchema>()
  expectTypeOf(names).toEqualTypeOf<TargetName[]>()
  expectTypeOf(widgetTarget).toMatchTypeOf<WidgetTarget>()
})
