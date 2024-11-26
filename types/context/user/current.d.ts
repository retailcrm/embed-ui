import type { ReadonlyField } from '../schema'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'email': ReadonlyField<string>;
  'firstName': ReadonlyField<number | null>;
  'lastName': ReadonlyField<string | null>;
  'patronymic': ReadonlyField<number | null>;
  'permissions': ReadonlyField<string[]>;
}
