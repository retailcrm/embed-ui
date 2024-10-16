import type { ReadonlyField } from '../schema'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'externalId': ReadonlyField<string | null>;
  'email': ReadonlyField<string>;
  'phones': ReadonlyField<string[]>;
}
