import type {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaList,
  CustomContextAccessor,
  CustomDictionary,
  CustomDictionaryFilter,
  CustomFieldAccessor,
  CustomFieldType,
  FieldAccessor,
  FieldGetters,
  FieldSetters,
  LogicalRejection,
  Rejection,
  RejectionHandler,
  RuntimeRejection,
  Writable,
} from '@retailcrm/embed-ui-v1-types/context'

import type { If, IsTilda, Maybe } from '@retailcrm/embed-ui-v1-types/scaffolding'

import { keysOf } from '@/utilities'
import { retain, release } from '@remote-ui/rpc'

export class HostError extends Error {
  constructor (message: string, previous: Error | undefined = undefined) {
    super(`[crm:embed:host] ${message}`)

    if (previous?.stack) {
      this.stack = `${previous.stack}\n${this.stack}`
    }
  }

  get rejection (): Rejection {
    return {
      message: this.message,
    }
  }
}

export class LogicalError extends HostError {
  get rejection (): LogicalRejection {
    return {
      type: 'logical',
      message: this.message,
    }
  }
}

export class RuntimeError extends HostError {
  get rejection (): RuntimeRejection {
    return {
      type: 'runtime',
      message: this.message,
    }
  }
}

export const createGetter = <S extends ContextSchema>(id: string, getters: FieldGetters<S>) => {
  return (<F extends keyof S>(field: '~' | F) => {
    if (field === '~') {
      return keysOf(getters).reduce((context, field) => ({
        ...context,
        [field]: getters[field](),
      }), {} as Context<S>)
    }

    if (field in getters) {
      return getters[field]()
    }

    throw new LogicalError(`Field ${String(field)} is not supported in context ${id}`)
  }) as FieldAccessor<S>['get']
}

export const createSetter = <S extends ContextSchema>(id: string, setters: FieldSetters<S>) => {
  return (<F extends keyof Writable<S>>(field: F, value: Context<S>[F]) => {
    if (!(field in setters)) {
      throw new LogicalError(`Setting field ${String(field)} is not supported in context ${id}`)
    }

    setters[field](value)
  }) as FieldAccessor<S>['set']
}

export const createContextAccessor = <M extends ContextSchemaList>(accessors: {
  [K in keyof M]: FieldAccessor<M[K]>
}, onError: Maybe<ErrorHandler> = null): ContextAccessor<M> => {
  const guard = (context: keyof M) => {
    if (!(context in accessors)) {
      throw new LogicalError(`Context ${String(context)} is not available`)
    }
  }

  return {
    get <
      C extends keyof M,
      F extends keyof M[C]
    >(context: C, field: '~' | F, onReject = null) {
      return run(() => {
        guard(context)

        return accessors[context].get(field)
      }, onReject, onError) as If<
        IsTilda<typeof field>,
        Context<M[C]>,
        Context<M[C]>[F]
      >
    },

    set (context, field, value, onReject = null){
      run(() => {
        guard(context)

        accessors[context].set(field, value)
      }, onReject, onError)
    },

    on (context, event, handler) {
      run(() => {
        guard(context)

        accessors[context].on(event, handler)
      }, null, onError)
    },
  }
}

export const createCustomContextAccessor = (
  accessors: CustomFieldAccessor[],
  queryDictionary: Maybe<(code: string, filter?: CustomDictionaryFilter) => Promise<CustomDictionary>> = null,
  onError: Maybe<ErrorHandler> = null
): CustomContextAccessor => {
  const _accessors = accessors.reduce((all, a) => {
    all[a.schema.entity] = a

    return all
  }, {} as Record<string, CustomFieldAccessor>)

  const guard = (entity: string) => {
    if (!(entity in _accessors)) {
      throw new LogicalError(`No custom context for entity ${String(entity)}`)
    }
  }

  return {
    getCustomSchema (entity: string, onReject: Maybe<RejectionHandler> = null) {
      return run(() => {
        guard(entity)

        return _accessors[entity].schema
      }, onReject, onError) ?? null
    },

    async getCustomDictionary (code: string, parameters?: {
      after?: string;
      before?: string;
      first?: number;
      last?: number;
    }, onReject?: Maybe<RejectionHandler>): Promise<CustomDictionary> {
      return (await runAsync(() => {
        if (!queryDictionary) {
          throw new LogicalError('No dictionary source provided')
        }

        return queryDictionary(code, parameters)
      }, onReject, onError)) ?? []
    },

    getCustomField (entity: string, code: string, onReject: Maybe<RejectionHandler> = null) {
      return run(() => {
        guard(entity)

        return _accessors[entity].get(code)
      }, onReject, onError) ?? null
    },

    setCustomField (entity: string, code: string, value: CustomFieldType, onReject: Maybe<RejectionHandler> = null) {
      return run(() => {
        guard(entity)

        _accessors[entity].set(code, value)
      }, onReject, onError)
    },

    onCustomFieldChange (
      entity: string,
      code: string,
      handler: (value: CustomFieldType) => void,
      onReject: Maybe<RejectionHandler> = null
    ) {
      return run(() => {
        guard(entity)

        return _accessors[entity].onChange(code, handler)
      }, onReject, onError)
    },
  }
}

export type ErrorHandler = (e: unknown) => void

function run <T>(
  fn: () => T,
  onReject: Maybe<RejectionHandler> = null,
  onError: Maybe<ErrorHandler> = null
): T | void {
  retain(onReject)

  try {
    return fn()
  } catch (e) {
    handle(e, onReject, onError)

    if (!onError) {
      throw e
    }
  } finally {
    release(onReject)
  }
}

async function runAsync <T>(
  fn: () => Promise<T>,
  onReject: Maybe<RejectionHandler> = null,
  onError: Maybe<ErrorHandler> = null
): Promise<T | void> {
  retain(onReject)

  try {
    return await fn()
  } catch (e) {
    handle(e, onReject, onError)

    if (!onError) {
      throw e
    }
  } finally {
    release(onReject)
  }
}

function handle (
  e: unknown,
  onReject: Maybe<RejectionHandler> = null,
  onError: Maybe<ErrorHandler> = null
) {
  if (onReject) {
    onReject(e instanceof HostError ? e.rejection : { message: String(e) })
  }

  if (onError) {
    onError(e)
  }
}