import type {
  Context,
  ContextSchemaList,
  CustomContext,
  CustomContextSchema,
  CustomDictionary,
} from '@retailcrm/embed-ui-v1-types/context'

import type { HostLocation } from '@retailcrm/embed-ui-v1-types/host'

import { reactive } from 'vue'

import {
  clone,
  keysOf,
  syncArray,
  syncRecord,
} from '@/utils'

export type SandboxMode = 'preview' | 'automation' | 'standalone-test'

export type SandboxContextOverrides<M extends ContextSchemaList> = Partial<{
  [K in keyof M]: Partial<Context<M[K]>>;
}>

export type SandboxCustomEntityState = {
  schema: CustomContextSchema;
  values: CustomContext;
}

export type SandboxCustomState = {
  dictionaries: Record<string, CustomDictionary>;
  entities: Record<string, SandboxCustomEntityState>;
}

export type SandboxHttpCallRecord = {
  action: string;
  payload?: string | Record<string, unknown>;
  response: {
    body: string;
    status: number;
  };
}

export type SandboxNavigationRecord =
  | {
    kind: 'go-to';
    params?: Record<string, unknown>;
    route: string;
  }
  | {
    kind: 'push-query' | 'replace-query';
    location: HostLocation;
  }

export type SandboxHostState = {
  http: SandboxHttpCallRecord[];
  location: HostLocation;
  navigation: SandboxNavigationRecord[];
}

export type SandboxState<M extends ContextSchemaList = ContextSchemaList> = {
  contexts: {
    [K in keyof M]: Context<M[K]>;
  };
  custom: SandboxCustomState;
  host: SandboxHostState;
  mode: SandboxMode;
}

export type SandboxSnapshot<M extends ContextSchemaList = ContextSchemaList> = {
  contexts: {
    [K in keyof M]: Context<M[K]>;
  };
  custom: SandboxCustomState;
  host: SandboxHostState;
  mode: SandboxMode;
}

export type CreateSandboxStateOptions<M extends ContextSchemaList> = {
  contexts?: SandboxContextOverrides<M>;
  custom?: Partial<SandboxCustomState>;
  location?: Partial<HostLocation>;
  mode?: SandboxMode;
  schemas: M;
}

export const createSandboxState = <M extends ContextSchemaList>(
  options: CreateSandboxStateOptions<M>
): SandboxState<M> => reactive({
  contexts: createContextState(options.schemas, options.contexts),
  custom: {
    dictionaries: clone(options.custom?.dictionaries ?? {}),
    entities: clone(options.custom?.entities ?? {}),
  },
  host: {
    http: [],
    location: createLocation(options.location),
    navigation: [],
  },
  mode: options.mode ?? 'preview',
}) as SandboxState<M>

export const captureSandboxSnapshot = <M extends ContextSchemaList>(
  state: SandboxState<M>
): SandboxSnapshot<M> => clone({
    contexts: state.contexts,
    custom: state.custom,
    host: state.host,
    mode: state.mode,
  })

export const applySandboxSnapshot = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  snapshot: SandboxSnapshot<M>
) => {
  state.mode = snapshot.mode

  syncRecord(
    state.contexts as Record<string, Context<M[keyof M]>>,
    snapshot.contexts as Record<string, Context<M[keyof M]>>
  )

  syncRecord(state.custom.entities, snapshot.custom.entities)
  syncRecord(state.custom.dictionaries, snapshot.custom.dictionaries)

  state.host.location = clone(snapshot.host.location)
  syncArray(state.host.http, snapshot.host.http)
  syncArray(state.host.navigation, snapshot.host.navigation)
}

const createContextState = <M extends ContextSchemaList>(
  schemas: M,
  overrides: SandboxContextOverrides<M> | undefined
) => keysOf(schemas).reduce((contexts, key) => {
    const schema = schemas[key]
    const initial = keysOf(schema).reduce((fields, field) => ({
      ...fields,
      [field]: schema[field].defaults(),
    }), {} as Context<M[typeof key]>)

    contexts[key] = Object.assign(initial, clone(overrides?.[key] ?? {}))

    return contexts
  }, {} as {
  [K in keyof M]: Context<M[K]>;
})

const createLocation = (location: Partial<HostLocation> | undefined): HostLocation => {
  const query = clone(location?.query ?? {})
  const pathname = location?.pathname ?? '/'
  const hash = location?.hash ?? ''
  const search = location?.search ?? createSearch(query)

  return {
    hash,
    pathname,
    query,
    search,
  }
}

const createSearch = (query: HostLocation['query']) => {
  const search = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => search.append(key, item))
      return
    }

    search.set(key, value)
  })

  const serialized = search.toString()

  return serialized ? `?${serialized}` : ''
}
