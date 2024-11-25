import type { ReadonlyField } from '../schema'

export type Schema = {
  'lastName': ReadonlyField<string>;
  'firstName': ReadonlyField<number | null>;
  'patronymic': ReadonlyField<number | null>;
  'email': ReadonlyField<string>;
  'id': ReadonlyField<number | null>;
  'permissions': ReadonlyField<string[]>;
}
