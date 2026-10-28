import type { Schema as CurrentUserSchema } from './user/current'
import type { Schema as CustomerCardPhoneSchema } from './customer/card-phone'
import type { Schema as CustomerCardSchema } from './customer/card'
import type { Schema as OrderCardSchema } from './order/card'
import type { Schema as OrderCardSettingsSchema } from './order/card-settings'
import type { Schema as SettingsSchema } from './settings'
import type {
  MethodList as TicketViewMethodList,
  Schema as TicketViewSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'
import type {
  Schema as TicketViewSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view-settings'

import type {
  MethodList as TicketEditMethodList,
  Schema as TicketEditSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/edit'
import type {
  Schema as TicketEditSettingsSchema,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/edit-settings'

import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'

import type { MethodList } from './order/card'

export type SchemaList = {
  'customer/card': CustomerCardSchema;
  'customer/card:phone': CustomerCardPhoneSchema;
  'order/card': OrderCardSchema;
  'order/card:settings': OrderCardSettingsSchema;
  'user/current': CurrentUserSchema;
  'settings': SettingsSchema;
  'ticket/edit': TicketEditSchema;
  'ticket/edit:settings': TicketEditSettingsSchema;
  'ticket/view': TicketViewSchema;
  'ticket/view:settings': TicketViewSettingsSchema;
}

export type ActionSchemaList = {
  'order/card': ActionSchema<MethodList>;
  'ticket/edit': ActionSchema<TicketEditMethodList>;
  'ticket/view': ActionSchema<TicketViewMethodList>;
}
