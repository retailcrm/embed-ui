import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'externalId': ReadonlyField<string | null>;
  'email': ReadonlyField<string>;
  'phones': ReadonlyField<string[]>;
}
