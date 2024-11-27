import type { ReadonlyField } from '../schema'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'email': ReadonlyField<string>;
  'firstName': ReadonlyField<string | null>;
  'lastName': ReadonlyField<string | null>;
  'patronymic': ReadonlyField<string | null>;
  'photo': ReadonlyField<string | null>;
  'groups': ReadonlyField<string[]>;
  'permissions': ReadonlyField<string[]>;
}
