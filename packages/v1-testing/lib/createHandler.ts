import type {
  ContextSchema,
  EventHandler,
  EventMap,
  TypeOf,
  FieldGetters,
} from '@retailcrm/embed-ui-v1-types/context'

import { retain } from '@remote-ui/rpc'
import { watch } from 'vue'

const keysOf = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[]

export const createHandler = <S extends ContextSchema>(id: string, getters: FieldGetters<S>) => {
  type EventName = keyof EventMap<S>
  type FieldName = keyof S

  const map = keysOf(getters).reduce((eventMap, field) => {
    eventMap[`change:${String(field)}` as EventName] = field as EventMap<S>[EventName]

    return eventMap
  }, {} as EventMap<S>)

  return <E extends keyof EventMap<S>>(event: E, handler: EventHandler<S, E>) => {
    if (!(event in map)) {
      throw new Error(`[crm:embed:host] Event ${String(event)} is not supported in context ${id}`)
    }

    retain(handler)

    watch(getters[map[event] as FieldName], handler as (payload: TypeOf<S[FieldName]>) => void)
  }
}
