import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'
import type { Field } from '@retailcrm/embed-ui-v1-types/context'
import type { Money } from '@retailcrm/embed-ui-v1-types/domain'
import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'
import type {
  TicketReference,
  TicketResponsible,
  TicketResponsibleInput,
  TicketSla,
  TicketStatus,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'mode': ReadonlyField<'create' | 'edit'>;
  'site': Field<TicketReference | null>;
  'number': ReadonlyField<string | null>;
  'description': Field<string>;
  'channel': Field<TicketReference | null>;
  'customer.id': ReadonlyField<number | null>;
  'customer.type': ReadonlyField<CustomerType>;
  'customer.name': Field<string>;
  'customer.lastName': Field<string>;
  'customer.firstName': Field<string>;
  'customer.patronymic': Field<string>;
  'customer.email': Field<string>;
  'customer.phone': Field<string>;
  'contact.id': ReadonlyField<number | null>;
  'contact.name': ReadonlyField<string>;
  'contact.lastName': Field<string>;
  'contact.firstName': Field<string>;
  'contact.patronymic': Field<string>;
  'contact.email': Field<string>;
  'contact.phone': Field<string>;
  'company.id': ReadonlyField<number | null>;
  'company.name': Field<string>;
  'issues': ReadonlyField<ReadonlyArray<TicketIssueDraft>>;
  'orders': ReadonlyField<ReadonlyArray<TicketEditorOrder>>;
  'orderItems': ReadonlyField<ReadonlyArray<TicketEditorItem>>;
  'dirty': ReadonlyField<boolean>;
  'valid': ReadonlyField<boolean>;
  'loading': ReadonlyField<boolean>;
  'loadFailed': ReadonlyField<boolean>;
  'saving': ReadonlyField<boolean>;
  'pending': ReadonlyField<boolean>;
  'errors': ReadonlyField<ReadonlyArray<TicketEditorError>>;
}

export type MethodList = {
  changeCustomerType: (type: CustomerType) => Promise<void>;
  selectCustomer: (customerId: number) => Promise<void>;
  unlinkCustomer: () => Promise<void>;
  selectContact: (contactId: number) => Promise<void>;
  unlinkContact: () => Promise<void>;
  selectCompany: (companyId: number) => Promise<void>;
  unlinkCompany: () => Promise<void>;
  addIssue: () => Promise<string>;
  updateIssue: (key: string, changes: TicketIssueDraftChanges) => Promise<void>;
  removeIssue: (key: string) => Promise<void>;
  addOrder: (orderId: number) => Promise<void>;
  removeOrder: (orderId: number) => Promise<void>;
  addOrderItem: (orderItemId: number) => Promise<void>;
  removeOrderItem: (orderItemId: number) => Promise<void>;
}

export type TicketIssueDraft = {
  readonly id: number | null;
  readonly key: string;
  readonly type: TicketReference | null;
  readonly topic: TicketReference | null;
  readonly subtopic: TicketReference | null;
  readonly responsible: TicketResponsible | null;
  readonly status: TicketStatus | null;
  readonly sla: TicketSla | null;
}

export type TicketIssueDraftChanges = {
  readonly typeId?: number | null;
  readonly subtopicId?: number | null;
  readonly responsible?: TicketResponsibleInput | null;
  readonly statusId?: number | null;
}

export type TicketEditorOrder = {
  readonly id: number;
  readonly number: string;
  readonly statusName: string | null;
  readonly manager: string;
  readonly total: Readonly<Money>;
  readonly createdAt: string;
}

export type TicketEditorItem = {
  readonly id: number;
  readonly orderId: number;
  readonly orderNumber: string;
  readonly name: string;
  readonly article: string;
  readonly price: Readonly<Money>;
  readonly image: string | null;
}

export type TicketEditorError = {
  readonly path: ReadonlyArray<string>;
  readonly code: string | null;
  readonly message: string;
}
