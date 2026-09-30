import type {
  SchemaList as ContextSchemaList,
} from '@retailcrm/embed-ui-v1-contexts/types'
import type { Field } from '@retailcrm/embed-ui-v1-types/context'
import type {
  Schema as OrderCardSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/order/card'
import type { SchemaList } from '@retailcrm/embed-ui/types/context'
import type { WidgetTarget } from '@retailcrm/embed-ui/types/widget'

import { UiSelectPopper } from '@retailcrm/embed-ui-v1-components/host'

import { expectTypeOf, test } from 'vitest'

test('resolves the public declarations through package exports', () => {
  expectTypeOf<WidgetTarget>().toEqualTypeOf<WidgetTarget>()
  expectTypeOf<SchemaList>().toEqualTypeOf<SchemaList>()
  expectTypeOf<OrderCardSchema>().toEqualTypeOf<OrderCardSchema>()
  expectTypeOf<ContextSchemaList>().toEqualTypeOf<ContextSchemaList>()
  expectTypeOf<Field<string>>().toEqualTypeOf<Field<string>>()
  expectTypeOf(UiSelectPopper).toEqualTypeOf(UiSelectPopper)
})
