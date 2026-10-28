import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'
import type {
  TicketReference,
  TicketStatus,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

export type Schema = {
  'statuses': ReadonlyField<ReadonlyArray<TicketStatus>>;
  'types': ReadonlyField<ReadonlyArray<TicketReference>>;
  'topics': ReadonlyField<ReadonlyArray<TicketEditorTopic>>;
  'channels': ReadonlyField<ReadonlyArray<TicketReference>>;
  'creatable': ReadonlyField<boolean>;
  'editable': ReadonlyField<boolean>;
  'canCreateCustomer': ReadonlyField<boolean>;
  'canCreateCorporateCustomer': ReadonlyField<boolean>;
}

export type TicketEditorTopic = {
  readonly id: number;
  readonly name: string;
  readonly subtopics: ReadonlyArray<TicketReference>;
}
