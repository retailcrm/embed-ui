import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'

import type {
  SandboxHostMiddleware,
  SandboxHttpCallRequest,
  SandboxHttpCallResponse,
} from '@/host'

export const createSandboxHttpMiddleware = <M extends ContextSchemaList>(): SandboxHostMiddleware<M> =>
  async (request) => {
    if (!request.httpBaseUrl && !isAbsoluteUrl(request.action)) {
      return jsonResponse({
        ok: false,
        message: 'Sandbox cannot proxy host.httpCall without extension backend URL.',
      }, 503)
    }

    const actionUrl = createExtensionActionUrl(request.action, request.httpBaseUrl)
    const response = await fetch(actionUrl.href, {
      method: 'POST',
      body: createRequestBody(request.payload),
    })

    return {
      body: await response.text(),
      status: response.status,
    }
  }

const jsonResponse = (body: unknown, status?: number): SandboxHttpCallResponse => ({
  body: JSON.stringify(body),
  status: status ?? 200,
})

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
