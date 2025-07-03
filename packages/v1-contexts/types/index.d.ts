import type { Schema as CustomerCardSchema } from './customer/card'
import type { Schema as CustomerCardPhoneSchema } from './customer/card-phone'
import type { Schema as OrderCardSchema } from './order/card'
import type { Schema as OrderCardItemsSchema } from './order/card-items'
import type { Schema as OrderCardSettingsSchema } from './order/card-settings'
import type { Schema as CurrentUserSchema } from './user/current'
import type { Schema as SettingsSchema } from './settings'

export type SchemaList = {
  'customer/card': CustomerCardSchema;
  'customer/card:phone': CustomerCardPhoneSchema;
  'order/card': OrderCardSchema;
  'order/card:items': OrderCardItemsSchema;
  'order/card:settings': OrderCardSettingsSchema;
  'user/current': CurrentUserSchema;
  'settings': SettingsSchema;
}
