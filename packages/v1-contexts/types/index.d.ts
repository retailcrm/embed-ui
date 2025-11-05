import type { Schema as CustomerCardSchema } from './customer/card'
import type { Schema as CustomerCardPhoneSchema } from './customer/card-phone'
import type { Schema as OrderCardSchema } from './order/card'
import type { Schema as OrderCardSettingsSchema } from './order/card-settings'
import type { Schema as OrderMgSchema } from './order/mg'
import type { Schema as OrderMgSettingsSchema } from './order/mg-settings'
import type { Schema as CurrentUserSchema } from './user/current'
import type { Schema as SettingsSchema } from './settings'

import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'

import type { MethodList as MethodListCard } from './order/card'
import type { MethodList as MethodListMg } from './order/mg'

export type SchemaList = {
  'customer/card': CustomerCardSchema;
  'customer/card:phone': CustomerCardPhoneSchema;
  'order/card': OrderCardSchema;
  'order/card:settings': OrderCardSettingsSchema;
  'order/mg': OrderMgSchema;
  'order/mg:settings': OrderMgSettingsSchema;
  'user/current': CurrentUserSchema;
  'settings': SettingsSchema;
}

export type ActionSchemaList = {
  'order/card': ActionSchema<MethodListCard>;
  'order/mg': ActionSchema<MethodListMg>;
}
