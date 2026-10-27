import type {
  TicketResponsibleInput,
} from '@retailcrm/embed-ui-v1-contexts/types/ticket/view'

import type { SandboxActionHandler } from '@/core/actions'
import type { TicketSandboxSchemas } from '@/scenario/fixtures/ticket'

const openingPermissions = {
  openTicketEditor: 'editable',
  openTicketHistory: null,
  openEmailEditor: 'canCreateEmail',
  openOrderForm: 'canCreateOrder',
} as const

// This fixture simulates host effects. It does not send messages or open real CRM forms.
export const handleTicketAction: SandboxActionHandler<TicketSandboxSchemas> = (name, args, state) => {
  const ticket = state.contexts['ticket/view']
  const settings = state.contexts['ticket/view:settings']

  if (name === 'refresh') {
    if (args.length) throw new Error('This action does not accept arguments.')
    if (ticket.pending) throw new Error('Ticket is busy.')
    ticket.loading = false
    ticket.loadFailed = false
    return
  }

  if (ticket.loading || ticket.loadFailed || ticket.pending || ticket.id === null) {
    throw new Error('Ticket is not ready for actions.')
  }

  if (Object.hasOwn(openingPermissions, name)) {
    if (args.length) throw new Error('This action does not accept arguments.')
    const permission = openingPermissions[name as keyof typeof openingPermissions]
    const allowed = permission === null || (permission === 'editable' ? settings.editable : ticket[permission])
    if (!allowed) throw new Error('Action is not permitted for this ticket.')
    return
  }

  if (name === 'createComment') {
    if (!settings.commentable) throw new Error('Comments are not permitted.')
    if (args.length !== 1 || typeof args[0] !== 'string' || !args[0].trim()) {
      throw new Error('Comment text is required.')
    }
    return 10000 + state.host.actions.filter(record => record.name === name && !record.result.rejection).length + 1
  }

  if (name !== 'changeIssueResponsible' && name !== 'changeIssueStatus') {
    throw new Error(`Unknown ticket action ${name}.`)
  }
  if (!settings.editable) throw new Error('Ticket editing is not permitted.')
  if (args.length !== 2 || typeof args[0] !== 'number') throw new Error('A question id and value are required.')
  const issue = ticket.issues.find(issue => issue.id === args[0])
  if (!issue) throw new Error('Question was not found in this ticket.')

  if (name === 'changeIssueResponsible') {
    const responsible = args[1]
    if (!isResponsible(responsible)) throw new Error('A responsible user or group reference is required.')
    const current = ticket.issues.map(issue => issue.responsible).find(
      current => current?.kind === responsible.kind && current.id === responsible.id
    )
    const next = current ?? { ...responsible, name: `${responsible.kind} #${responsible.id}` }
    ticket.issues = ticket.issues.map(item => item.id === issue.id ? { ...item, responsible: next } : item)
    return
  }

  const status = settings.statuses.find(status => status.id === args[1])
  if (!status) throw new Error('Status was not found in the ticket status catalog.')
  const closedAt = status.group.code === 'closed' ? new Date().toISOString() : null
  ticket.issues = ticket.issues.map(item => item.id === issue.id ? {
    ...item,
    status,
    closedAt,
    sla: item.sla ? { ...item.sla, closedAt, remainingDuration: closedAt ? null : item.sla.remainingDuration } : null,
  } : item)
  const activeSlas = ticket.issues.filter(item => !item.closedAt).flatMap(item => item.sla ? [item.sla] : [])
  ticket.sla = activeSlas.sort((a, b) => (a.remainingDuration ?? Infinity) - (b.remainingDuration ?? Infinity))[0] ?? null
}

const isResponsible = (value: unknown): value is TicketResponsibleInput =>
  typeof value === 'object' && value !== null
  && 'kind' in value && (value.kind === 'user' || value.kind === 'group')
  && 'id' in value && typeof value.id === 'number' && Number.isInteger(value.id) && value.id > 0
