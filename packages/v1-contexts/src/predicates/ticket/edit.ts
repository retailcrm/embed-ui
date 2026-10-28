import type { Shape } from '@/predicates'
import type {
  TicketEditorError,
  TicketEditorItem,
  TicketEditorOrder,
} from '~types/ticket/edit'
import type { TicketEditorTopic } from '~types/ticket/edit-settings'
import type { TicketIssueDraft, TicketIssueDraftChanges } from '~types/ticket/edit'

import {
  arrayOf,
  isNull,
  isNumber,
  isShape,
  isString,
} from '@/predicates'
import {
  isTicketReference,
  isTicketResponsible,
  isTicketResponsibleInput,
  isTicketSla,
  isTicketStatus,
} from '@/predicates/ticket/view'
import { oneOf, withMeta } from '@/predicates'

export const isTicketIssueDraft = isShape({
  id: [oneOf(isNumber, isNull), true],
  key: [isString, true],
  type: [oneOf(isTicketReference, isNull), true],
  topic: [oneOf(isTicketReference, isNull), true],
  subtopic: [oneOf(isTicketReference, isNull), true],
  responsible: [oneOf(isTicketResponsible, isNull), true],
  status: [oneOf(isTicketStatus, isNull), true],
  sla: [oneOf(isTicketSla, isNull), true],
} satisfies Shape<TicketIssueDraft>, 'TicketIssueDraft')

const issueChangesShape = isShape({
  typeId: [oneOf(isNumber, isNull), false],
  subtopicId: [oneOf(isNumber, isNull), false],
  responsible: [oneOf(isTicketResponsibleInput, isNull), false],
  statusId: [oneOf(isNumber, isNull), false],
} satisfies Shape<TicketIssueDraftChanges>, 'TicketIssueDraftChanges')

export const isTicketIssueDraftChanges = Object.assign(withMeta(
  (value: unknown): value is TicketIssueDraftChanges => issueChangesShape(value)
    && Object.keys(value).every(key => Object.hasOwn(issueChangesShape.shape, key)),
  'TicketIssueDraftChanges'
), { fields: issueChangesShape.fields })

const isMoney = isShape({ amount: [isNumber, true], currency: [isString, true] }, 'Money')

export const isTicketEditorOrder = isShape({
  id: [isNumber, true],
  number: [isString, true],
  statusName: [oneOf(isString, isNull), true],
  manager: [isString, true],
  total: [isMoney, true],
  createdAt: [isString, true],
} satisfies Shape<TicketEditorOrder>, 'TicketEditorOrder')

export const isTicketEditorItem = isShape({
  id: [isNumber, true],
  orderId: [isNumber, true],
  orderNumber: [isString, true],
  name: [isString, true],
  article: [isString, true],
  price: [isMoney, true],
  image: [oneOf(isString, isNull), true],
} satisfies Shape<TicketEditorItem>, 'TicketEditorItem')

export const isTicketEditorError = isShape({
  path: [arrayOf(isString), true],
  code: [oneOf(isString, isNull), true],
  message: [isString, true],
} satisfies Shape<TicketEditorError>, 'TicketEditorError')

export const isTicketEditorTopic = isShape({
  id: [isNumber, true],
  name: [isString, true],
  subtopics: [arrayOf(isTicketReference), true],
} satisfies Shape<TicketEditorTopic>, 'TicketEditorTopic')
