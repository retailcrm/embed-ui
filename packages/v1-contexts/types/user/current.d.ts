import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

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
