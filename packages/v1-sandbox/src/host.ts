import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type {
  HostApi,
  HostLocation,
  HostQueryInput,
  HostQueryOptions,
} from '@retailcrm/embed-ui-v1-types/host'
import type { MaybePromise } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { SandboxHostState, SandboxState } from '@/state'

import { clone } from '@/utils'

export type SandboxHttpCallRequest = {
  action: string;
  payload?: Parameters<HostApi['httpCall']>[1];
}

export type SandboxHttpCallResponse = Awaited<ReturnType<HostApi['httpCall']>>

export type SandboxHostMiddlewareNext = () => MaybePromise<SandboxHttpCallResponse>

export type SandboxHostMiddleware<M extends ContextSchemaList> = (
  request: SandboxHttpCallRequest,
  state: SandboxState<M>,
  next: SandboxHostMiddlewareNext
) => MaybePromise<SandboxHttpCallResponse>

export type SandboxHostApiOptions<M extends ContextSchemaList> = {
  httpCall?: (
    request: SandboxHttpCallRequest,
    state: SandboxState<M>
  ) => MaybePromise<SandboxHttpCallResponse>;
  httpMiddlewares?: SandboxHostMiddleware<M>[];
}

export const createSandboxHostApi = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  options: SandboxHostApiOptions<M> = {}
): HostApi => ({
    getLocation() {
      return clone(state.host.location)
    },

    async httpCall(action, payload) {
      const request = { action, payload }

      debugHttpCall('request', request)

      const response = await resolveHttpCall(request, state, options)

      debugHttpCall('response', {
        action,
        response,
      })

      state.host.http.push({
        action,
        payload: clone(payload),
        response: clone(response),
      })

      return response
    },

    goTo(route, params) {
      state.host.location = createRouteLocation(route, params)
      state.host.navigation.push({
        kind: 'go-to',
        params: clone(params),
        route,
      })
    },

    onBeforeRouteLeave(hook) {
      void hook
    },

    pushQuery(query, options) {
      state.host.location = applyQuery(state.host.location, query, options)
      state.host.navigation.push({
        kind: 'push-query',
        location: clone(state.host.location),
      })
    },

    replaceQuery(query, options) {
      state.host.location = applyQuery(state.host.location, query, options)
      state.host.navigation.push({
        kind: 'replace-query',
        location: clone(state.host.location),
      })
    },
  })

const resolveHttpCall = async <M extends ContextSchemaList>(
  request: SandboxHttpCallRequest,
  state: SandboxState<M>,
  options: SandboxHostApiOptions<M>
): Promise<SandboxHttpCallResponse> => {
  try {
    return await createHttpCallPipeline(state, options)(request)
  } catch (error) {
    return {
      body: JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        ok: false,
      }),
      status: 500,
    }
  }
}

const debugHttpCall = (event: string, details: unknown): void => {
  if (typeof console !== 'undefined') {
    console.info(`[sandbox:host:httpCall] ${event}`, details)
  }
}

const createHttpCallPipeline = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  options: SandboxHostApiOptions<M>
) => {
  const fallback = () => options.httpCall
    ? options.httpCall
    : async () => ({
      body: JSON.stringify({
        ok: true,
      }),
      status: 200,
    })
  const middlewares = options.httpMiddlewares ?? []

  return (request: SandboxHttpCallRequest): MaybePromise<SandboxHttpCallResponse> => {
    let index = -1

    const dispatch = (nextIndex: number): MaybePromise<SandboxHttpCallResponse> => {
      if (nextIndex <= index) {
        throw new Error('[sandbox:host] httpCall middleware called next() more than once.')
      }

      index = nextIndex

      const middleware = middlewares[nextIndex]

      if (!middleware) {
        return fallback()(request, state)
      }

      return middleware(request, state, () => dispatch(nextIndex + 1))
    }

    return dispatch(0)
  }
}

const applyQuery = (
  location: HostLocation,
  query: HostQueryInput,
  options: HostQueryOptions | undefined
): HostLocation => {
  const nextQuery = options?.preserveExisting
    ? clone(location.query)
    : {}

  Object.entries(query).forEach(([key, value]) => {
    nextQuery[key] = Array.isArray(value)
      ? value.map(item => String(item))
      : String(value)
  })

  const params = new URLSearchParams()

  Object.entries(nextQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => params.append(key, item))
      return
    }

    params.set(key, value)
  })

  const search = params.toString()

  return {
    ...location,
    query: nextQuery,
    search: search ? `?${search}` : '',
  }
}

const createRouteLocation = (
  route: string,
  params: Parameters<HostApi['goTo']>[1]
): SandboxHostState['location'] => {
  const url = new URL(route, 'https://sandbox.crm.test')
  const query = Object.entries(params ?? {}).reduce((all, [key, value]) => {
    if (Array.isArray(value)) {
      all[key] = value.map(item => String(item))
      return all
    }

    if (value !== undefined) {
      all[key] = String(value)
    }

    return all
  }, {} as HostLocation['query'])

  const pathname = url.pathname === '/' && !route.startsWith('/') ? route : url.pathname
  const search = Object.keys(query).length > 0 ? applyQuery({
    hash: url.hash,
    pathname,
    query: {},
    search: '',
  }, query, undefined).search : url.search

  return {
    hash: url.hash,
    pathname,
    query,
    search,
  }
}
