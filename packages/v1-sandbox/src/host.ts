import type {
  HostApi,
  HostLocation,
  HostQueryInput,
  HostQueryOptions,
} from '@retailcrm/embed-ui-v1-types/host'

import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type { MaybePromise, Pojo } from '@retailcrm/embed-ui-v1-types/scaffolding'

import type { SandboxHostState, SandboxState } from '@/state'

import { clone } from '@/utils'

export type SandboxHttpCallRequest = {
  action: string;
  payload?: Pojo | string;
}

export type SandboxHttpCallResponse = {
  body: string;
  status: number;
}

export type SandboxHostApiOptions<M extends ContextSchemaList> = {
  httpCall?: (
    request: SandboxHttpCallRequest,
    state: SandboxState<M>
  ) => MaybePromise<SandboxHttpCallResponse>;
}

export const createSandboxHostApi = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  options: SandboxHostApiOptions<M> = {}
): HostApi => ({
    getLocation() {
      return clone(state.host.location)
    },

    async httpCall(action, payload) {
      const response = options.httpCall
        ? await options.httpCall({ action, payload }, state)
        : { body: '', status: 200 }

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
  params: Record<string, unknown> | undefined
): SandboxHostState['location'] => {
  const url = new URL(route, 'https://sandbox.crm.local')
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
