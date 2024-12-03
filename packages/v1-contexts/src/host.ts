import {
  Context,
  ContextAccessor,
  ContextSchema,
  ContextSchemaMap,
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
  return <F extends keyof S>(field: '~' | F) => {
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
  }
}

export const createSetter = <S extends ContextSchema>(id: string, setters: FieldSetters<S>) => {
  return <F extends keyof Writable<S>>(field: F, value: Context<S>[F]) => {
    if (!(field in setters)) {
      throw new LogicalError(`Setting field ${String(field)} is not supported in context ${id}`)
    }

    setters[field](value)
  }
}

export const createContextAccessor = <M extends ContextSchemaMap>(accessors: {
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
      guard(context)

      accessors[context].on(event, handler)
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
    if (onReject) {
      onReject(e instanceof HostError ? e.rejection : { message: String(e) })
    }

    if (onError) {
      onError(e)
      return
    }

    throw e
  } finally {
    release(onReject)
  }
}
