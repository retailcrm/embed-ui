import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type {
  SandboxHostMiddleware,
  SandboxHttpCallRequest,
  SandboxHttpCallResponse,
} from '@/host'

type PayloadRecord = Record<string, unknown>

export const createSandboxHttpMiddleware = <M extends ContextSchemaList>(): SandboxHostMiddleware<M> =>
  async request => {
    if (!request.httpBaseUrl && !isAbsoluteUrl(request.action)) {
      return createGenericResponse(request)
    }

    const actionUrl = createExtensionActionUrl(request.action, request.httpBaseUrl)
    const response = await fetch(actionUrl.href, {
      body: createRequestBody(request.payload),
      cache: 'no-store',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
    })

    return {
      body: await response.text(),
      status: response.status,
    }
  }

const createGenericResponse = (
  request: SandboxHttpCallRequest
): SandboxHttpCallResponse => {
  const payload = isRecord(request.payload) ? request.payload : {}
  const resourceName = getResourceName(request.action)

  if (isCountAction(request.action)) {
    return jsonResponse({ count: 0 })
  }

  if (isPaginationPayload(payload) && resourceName) {
    return jsonResponse({
      [resourceName]: [],
      page: payload.page,
      perPage: payload.perPage,
      total: 0,
    })
  }

  return jsonResponse({
    action: request.action,
    ok: true,
    payload,
    uuid: request.uuid ?? null,
  })
}

const jsonResponse = (body: unknown): SandboxHttpCallResponse => ({
  body: JSON.stringify(body),
  status: 200,
})

const isRecord = (value: unknown): value is PayloadRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const createRequestBody = (
  payload: SandboxHttpCallRequest['payload']
): URLSearchParams => {
  const body = new URLSearchParams()

  if (payload !== undefined) {
    body.set('payload', typeof payload === 'string' ? payload : JSON.stringify(payload))
  }

  return body
}

const createExtensionActionUrl = (
  action: string,
  baseUrl: string | null | undefined
): URL => {
  if (isAbsoluteUrl(action)) {
    return new URL(action)
  }

  if (!baseUrl) {
    throw new Error(`[sandbox:host] Cannot proxy httpCall '${action}' without extension backend URL.`)
  }

  const base = new URL(baseUrl)
  const basePath = base.pathname.replace(/\/+$/u, '')
  const actionPath = action.startsWith('/') ? action : `/${action}`

  base.pathname = `${basePath}${actionPath}`
  base.search = ''
  base.hash = ''

  return base
}

const isAbsoluteUrl = (value: string): boolean => {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const isPaginationPayload = (payload: PayloadRecord): payload is PayloadRecord & {
  page: number;
  perPage: number;
} =>
  typeof payload.page === 'number' && typeof payload.perPage === 'number'

const isCountAction = (action: string): boolean =>
  getActionPathname(action).endsWith('-count') || getActionPathname(action).endsWith('/count')

const getResourceName = (action: string): string => {
  const pathname = getActionPathname(action)
  const segment = pathname.split('/').filter(Boolean).at(-1) ?? ''

  return segment.replace(/-count$/, '')
}

const getActionPathname = (action: string): string => {
  try {
    return new URL(action, 'http://sandbox.invalid').pathname.toLowerCase()
  } catch {
    return action.toLowerCase()
  }
}
