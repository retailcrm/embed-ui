import type { Field } from '../schema'

export type Schema = {
  'customer.email': Field<string | null>;
  'customer.phone': Field<string | null>;
  'delivery.address': Field<string | null>;
}
