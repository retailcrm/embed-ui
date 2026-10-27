import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type { MaybePromise } from '@retailcrm/embed-ui-v1-types/scaffolding'
import type { Rejection } from '@retailcrm/embed-ui-v1-types/context'

import type { SandboxState } from '@/core/state'

import { clone } from '@/lib/clone'

export type SandboxActionResult = {
  payload: unknown;
  rejection: Rejection | null;
}

export type SandboxActionHandler<M extends ContextSchemaList> = (
  name: string,
  args: unknown[],
  state: SandboxState<M>
) => MaybePromise<unknown>

export type SandboxActionAccessor = {
  invoke(name: string, ...args: unknown[]): Promise<SandboxActionResult>;
}

export const createSandboxActionAccessor = <M extends ContextSchemaList>(
  state: SandboxState<M>,
  handler: SandboxActionHandler<M> | undefined,
  isDisposed: () => boolean
): SandboxActionAccessor => ({
    async invoke(name, ...args) {
      let result: SandboxActionResult

      try {
        if (isDisposed()) throw new Error('Sandbox controller is disposed.')
        if (!handler) throw new Error(`Action ${name} is not available in this scenario.`)

        const payload = handler(name, clone(args), state)
        result = { payload: clone(payload instanceof Promise ? await payload : payload), rejection: null }
      } catch (error) {
        result = {
          payload: undefined,
          rejection: { message: error instanceof Error ? error.message : String(error) },
        }
      }

      state.host.actions.push({ name, args: clone(args), result: clone(result) })

      return result
    },
  })
