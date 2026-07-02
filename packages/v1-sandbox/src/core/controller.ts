import type {
  Context,
  ContextAccessor,
  ContextSchemaList,
  CustomContext,
  CustomContextAccessor,
  CustomContextSchema,
  CustomDictionary,
  CustomFieldType,
} from '@retailcrm/embed-ui-v1-types/context'

import type { HostApi, HostLocation } from '@retailcrm/embed-ui-v1-types/host'

import type { CreateSandboxStateOptions } from '@/core/state'
import type { SandboxBridge } from '@/core/globalBridge'
import type { SandboxHostApiOptions } from '@/core/hostApi'
import type { SandboxSnapshot, SandboxState } from '@/core/state'

import { applySandboxSnapshot, captureSandboxSnapshot } from '@/core/state'
import { clone } from '@/lib/clone'
import { createSandboxBridge } from '@/core/globalBridge'
import {
  createSandboxContextAccessor,
  createSandboxCustomContextAccessor,
} from '@/core/context'
import { createSandboxHostApi } from '@/core/hostApi'
import { createSandboxState } from '@/core/state'
import { installSandboxBridge } from '@/core/globalBridge'
import { syncRecord } from '@/lib/syncRecord'

export type SandboxEndpointApi<M extends ContextSchemaList> =
  & ContextAccessor<M>
  & CustomContextAccessor
  & HostApi

export type CreateSandboxControllerOptions<M extends ContextSchemaList> =
  & CreateSandboxStateOptions<M>
  & SandboxHostApiOptions<M>
  & {
    globalBridge?: false | {
      key?: string;
    };
  }

export type SandboxController<M extends ContextSchemaList> = {
  bridge: SandboxBridge<M>;
  dispose(): void;
  endpointApi: SandboxEndpointApi<M>;
  installGlobalBridge(key?: string): void;
  patchContext<C extends keyof M>(context: C, patch: Partial<Context<M[C]>>): void;
  reset(snapshot?: SandboxSnapshot<M>): void;
  setContext<C extends keyof M>(context: C, value: Context<M[C]>): void;
  setCustomEntity(entity: string, schema: CustomContextSchema, values?: CustomContext): void;
  setCustomField(entity: string, code: string, value: CustomFieldType): void;
  setDictionary(code: string, dictionary: CustomDictionary): void;
  setField<C extends keyof M, F extends keyof Context<M[C]>>(context: C, field: F, value: Context<M[C]>[F]): void;
  setLocation(location: Partial<HostLocation>): void;
  setMode(mode: SandboxState<M>['mode']): void;
  snapshot(): SandboxSnapshot<M>;
  state: SandboxState<M>;
  uninstallGlobalBridge(): void;
}

export const createSandboxController = <const M extends ContextSchemaList>(
  options: CreateSandboxControllerOptions<M>
): SandboxController<M> => {
  const state = createSandboxState(options)
  const initialSnapshot = captureSandboxSnapshot(state)
  const endpointApi = Object.assign(
    {},
    createSandboxContextAccessor(options.schemas, state),
    createSandboxCustomContextAccessor(state),
    createSandboxHostApi(state, options)
  ) as SandboxEndpointApi<M>

  let removeBridge = () => {}

  const controller: SandboxController<M> = {
    bridge: null as unknown as SandboxBridge<M>,

    dispose() {
      controller.uninstallGlobalBridge()
    },

    endpointApi,

    installGlobalBridge(key) {
      controller.uninstallGlobalBridge()
      removeBridge = installSandboxBridge(controller.bridge, key)
    },

    patchContext(context, patch) {
      controller.setContext(context, {
        ...state.contexts[context],
        ...clone(patch),
      })
    },

    reset(snapshot = initialSnapshot) {
      applySandboxSnapshot(state, snapshot)
    },

    setContext(context, value) {
      syncRecord(
        state.contexts[context] as Record<string, unknown>,
        value as Record<string, unknown>
      )
    },

    setCustomEntity(entity, schema, values = {}) {
      state.custom.entities[entity] = {
        schema: clone(schema),
        values: clone(values),
      }
    },

    setCustomField(entity, code, value) {
      if (!(entity in state.custom.entities)) {
        controller.setCustomEntity(entity, {
          entity,
          fields: [],
        })
      }

      state.custom.entities[entity].values[code] = clone(value)
    },

    setDictionary(code, dictionary) {
      state.custom.dictionaries[code] = clone(dictionary)
    },

    setField(context, field, value) {
      state.contexts[context][field] = clone(value)
    },

    setLocation(location) {
      state.host.location = {
        ...state.host.location,
        ...clone(location),
      }
    },

    setMode(mode) {
      state.mode = mode
    },

    snapshot() {
      return captureSandboxSnapshot(state)
    },

    state,

    uninstallGlobalBridge() {
      removeBridge()
      removeBridge = () => {}
    },
  }

  controller.bridge = createSandboxBridge(controller)

  if (options.globalBridge !== false) {
    controller.installGlobalBridge(options.globalBridge?.key)
  }

  return controller
}
