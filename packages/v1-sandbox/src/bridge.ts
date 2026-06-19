import type {
  Context,
  ContextSchemaList,
  CustomContextSchema,
  CustomDictionary,
  CustomFieldType,
} from '@retailcrm/embed-ui-v1-types/context'

import type { HostLocation } from '@retailcrm/embed-ui-v1-types/host'

import type { SandboxMode, SandboxSnapshot } from '@/state'

export const DEFAULT_SANDBOX_GLOBAL_KEY = '__CRM_EMBED_SANDBOX__'

export type SandboxBridgeTarget<M extends ContextSchemaList> = {
  patchContext<C extends keyof M>(context: C, patch: Partial<Context<M[C]>>): void;
  reset(snapshot?: SandboxSnapshot<M>): void;
  setContext<C extends keyof M>(context: C, value: Context<M[C]>): void;
  setCustomEntity(entity: string, schema: CustomContextSchema, values?: Record<string, CustomFieldType>): void;
  setCustomField(entity: string, code: string, value: CustomFieldType): void;
  setDictionary(code: string, dictionary: CustomDictionary): void;
  setField<C extends keyof M, F extends keyof Context<M[C]>>(context: C, field: F, value: Context<M[C]>[F]): void;
  setLocation(location: Partial<HostLocation>): void;
  setMode(mode: SandboxMode): void;
  snapshot(): SandboxSnapshot<M>;
}

export type SandboxBridge<M extends ContextSchemaList> = SandboxBridgeTarget<M>

export const createSandboxBridge = <M extends ContextSchemaList>(
  target: SandboxBridgeTarget<M>
): SandboxBridge<M> => ({
    patchContext: target.patchContext,
    reset: target.reset,
    setContext: target.setContext,
    setCustomEntity: target.setCustomEntity,
    setCustomField: target.setCustomField,
    setDictionary: target.setDictionary,
    setField: target.setField,
    setLocation: target.setLocation,
    setMode: target.setMode,
    snapshot: target.snapshot,
  })

export const installSandboxBridge = <M extends ContextSchemaList>(
  bridge: SandboxBridge<M>,
  key = DEFAULT_SANDBOX_GLOBAL_KEY
) => {
  const target = globalThis as typeof globalThis & Record<string, unknown>

  target[key] = bridge

  return () => {
    if (target[key] === bridge) {
      delete target[key]
    }
  }
}
