import type { ReadonlyField } from '../schema'

export type Schema = {
  'email': ReadonlyField<string | null>;
  'firstName': ReadonlyField<string | null>;
  'lastName': ReadonlyField<string | null>;
  'patronymic': ReadonlyField<string | null>;
  'groupCodes': ReadonlyField<string[]>;
}
