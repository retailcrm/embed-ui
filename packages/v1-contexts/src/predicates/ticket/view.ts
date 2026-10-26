import type { Shape } from '@/predicates'
import type {
  TicketCompany,
  TicketContact,
  TicketGroup,
  TicketIssue,
  TicketPhone,
  TicketReference,
  TicketResponsibleInput,
  TicketSla,
  TicketStatus,
  TicketStatusGroup,
  TicketUser,
} from '~types/ticket/view'

import {
  arrayOf,
  isExactly,
  isNull,
  isNumber,
  isShape,
  isString,
  oneOf,
  withMeta,
} from '@/predicates'

export const isTicketReference = isShape({
  id: [isNumber, true],
  name: [isString, true],
} satisfies Shape<TicketReference>, 'TicketReference')

export const isTicketStatusGroup = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
} satisfies Shape<TicketStatusGroup>, 'TicketStatusGroup')

export const isTicketStatus = isShape({
  id: [isNumber, true],
  code: [isString, true],
  name: [isString, true],
  group: [isTicketStatusGroup, true],
} satisfies Shape<TicketStatus>, 'TicketStatus')

export const isTicketUser = isShape({
  id: [isNumber, true],
  kind: [isExactly('user'), true],
  name: [isString, true],
} satisfies Shape<TicketUser>, 'TicketUser')

export const isTicketGroup = isShape({
  id: [isNumber, true],
  kind: [isExactly('group'), true],
  name: [isString, true],
} satisfies Shape<TicketGroup>, 'TicketGroup')

export const isTicketResponsible = withMeta(oneOf(isTicketUser, isTicketGroup), 'TicketResponsible')

export const isTicketResponsibleInput = isShape({
  id: [isNumber, true],
  kind: [oneOf(isExactly('user'), isExactly('group')), true],
} satisfies Shape<TicketResponsibleInput>, 'TicketResponsibleInput')

export const isTicketSla = isShape({
  status: [oneOf(isExactly('normal'), isExactly('warning'), isExactly('urgent')), true],
  duration: [isNumber, true],
  remainingDuration: [oneOf(isNumber, isNull), true],
  closedAt: [oneOf(isString, isNull), true],
} satisfies Shape<TicketSla>, 'TicketSla')

export const isTicketIssue = isShape({
  id: [isNumber, true],
  type: [oneOf(isTicketReference, isNull), true],
  topic: [oneOf(isTicketReference, isNull), true],
  subtopic: [oneOf(isTicketReference, isNull), true],
  responsible: [oneOf(isTicketResponsible, isNull), true],
  status: [oneOf(isTicketStatus, isNull), true],
  sla: [oneOf(isTicketSla, isNull), true],
  closedAt: [oneOf(isString, isNull), true],
} satisfies Shape<TicketIssue>, 'TicketIssue')

export const isTicketPhone = isShape({
  number: [isString, true],
  numberCanonical: [oneOf(isString, isNull), true],
} satisfies Shape<TicketPhone>, 'TicketPhone')

export const isTicketContact = isShape({
  id: [isNumber, true],
  name: [isString, true],
  email: [oneOf(isString, isNull), true],
  phones: [arrayOf(isTicketPhone), true],
} satisfies Shape<TicketContact>, 'TicketContact')

export const isTicketCompany = isShape({
  id: [isNumber, true],
  name: [isString, true],
  inn: [oneOf(isString, isNull), true],
  kpp: [oneOf(isString, isNull), true],
} satisfies Shape<TicketCompany>, 'TicketCompany')
