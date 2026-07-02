import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type {
  HostApi,
  HostLocation,
  HostQueryInput,
  HostQueryOptions,
} from '@retailcrm/embed-ui-v1-types/host'
import type { MaybePromise } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { SandboxHostState, SandboxState } from '@/core/state'

import { clone } from '@/lib/clone'

export type SandboxHttpCallRequest = {
  action: string;
  httpBaseUrl?: string | null;
  payload?: Parameters<HostApi['httpCall']>[1];
  uuid?: string;
}

export type SandboxHttpCallResponse = Awaited<ReturnType<HostApi['httpCall']>>

export type SandboxHostMiddleware<M extends ContextSchemaList> = (
  request: SandboxHttpCallRequest,
  state?: SandboxState<M>
) => MaybePromise<SandboxHttpCallResponse>

export type SandboxHostApiOptions<M extends ContextSchemaList> = {
  httpCall?: (
    request: SandboxHttpCallRequest,
    state: SandboxState<M>
  ) => MaybePromise<SandboxHttpCallResponse>;
  httpMiddleware?: SandboxHostMiddleware<M>;
  descriptorUuid?: string;
  getDescriptorUuid?: () => string | undefined;
  getHttpCallBaseUrl?: () => string | null | undefined;
  httpCallBaseUrl?: string | null;
}

export const createSandboxHostApi = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  options: SandboxHostApiOptions<M> = {}
): HostApi => ({
    getLocation() {
      return clone(state.host.location)
    },

    async httpCall(action, payload) {
      const descriptorUuid = options.getDescriptorUuid?.() ?? options.descriptorUuid
      const request = {
        action,
        httpBaseUrl: options.getHttpCallBaseUrl?.() ?? options.httpCallBaseUrl,
        payload,
        uuid: descriptorUuid,
      }

      const response = await resolveHttpCall(request, state, options)

      state.host.http.push({
        action,
        payload: clone(payload),
        response: clone(response),
        uuid: descriptorUuid,
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
    if (options.httpMiddleware) {
      return await options.httpMiddleware(request)
    } else {
      return createFallbackHttpCall()
    }
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

const createFallbackHttpCall = (): SandboxHttpCallResponse => ({
  body: JSON.stringify({
    ok: true,
  }),
  status: 200,
})

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
