import type { CustomerType } from '@retailcrm/embed-ui-v1-types/domain'
import type { ReadonlyField } from '@retailcrm/embed-ui-v1-types/context'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'site': ReadonlyField<TicketReference | null>;
  'number': ReadonlyField<string | null>;
  'description': ReadonlyField<string | null>;
  'channelName': ReadonlyField<string | null>;
  'customer.id': ReadonlyField<number | null>;
  'customer.type': ReadonlyField<CustomerType>;
  'customer.name': ReadonlyField<string | null>;
  'customer.email': ReadonlyField<string | null>;
  'customer.phones': ReadonlyField<ReadonlyArray<TicketPhone>>;
  'customer.vip': ReadonlyField<boolean>;
  'customer.bad': ReadonlyField<boolean>;
  'contact': ReadonlyField<TicketContact | null>;
  'company': ReadonlyField<TicketCompany | null>;
  'issues': ReadonlyField<ReadonlyArray<TicketIssue>>;
  'sla': ReadonlyField<TicketSla | null>;
  'canCreateEmail': ReadonlyField<boolean>;
  'canCreateOrder': ReadonlyField<boolean>;
  'loading': ReadonlyField<boolean>;
  'loadFailed': ReadonlyField<boolean>;
  'pending': ReadonlyField<boolean>;
  'createdAt': ReadonlyField<string | null>;
}

export type MethodList = {
  createComment: (text: string) => Promise<number>;
  changeIssueResponsible: (issueId: number, responsible: TicketResponsibleInput) => Promise<void>;
  changeIssueStatus: (issueId: number, statusId: number) => Promise<void>;
  openTicketEditor: () => Promise<void>;
  openTicketHistory: () => Promise<void>;
  openEmailEditor: () => Promise<void>;
  openOrderForm: () => Promise<void>;
  refresh: () => Promise<void>;
}

export type TicketReference = {
  readonly id: number;
  readonly name: string;
}

export type TicketStatusGroup = {
  readonly id: number;
  readonly code: string;
  readonly name: string;
}

export type TicketStatus = {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly group: TicketStatusGroup;
}

export type TicketUser = {
  readonly id: number;
  readonly kind: 'user';
  readonly name: string;
}

export type TicketGroup = {
  readonly id: number;
  readonly kind: 'group';
  readonly name: string;
}

export type TicketResponsible = TicketUser | TicketGroup

export type TicketResponsibleInput = {
  readonly id: number;
  readonly kind: 'user' | 'group';
}

export type TicketSla = {
  readonly status: 'normal' | 'warning' | 'urgent';
  readonly duration: number;
  readonly remainingDuration: number | null;
  readonly closedAt: string | null;
}

export type TicketIssue = {
  readonly id: number;
  readonly type: TicketReference | null;
  readonly topic: TicketReference | null;
  readonly subtopic: TicketReference | null;
  readonly responsible: TicketResponsible | null;
  readonly status: TicketStatus | null;
  readonly sla: TicketSla | null;
  readonly closedAt: string | null;
}

export type TicketPhone = {
  readonly number: string;
  readonly numberCanonical: string | null;
}

export type TicketContact = {
  readonly id: number;
  readonly name: string;
  readonly email: string | null;
  readonly phones: ReadonlyArray<TicketPhone>;
}

export type TicketCompany = {
  readonly id: number;
  readonly name: string;
  readonly inn: string | null;
  readonly kpp: string | null;
}
