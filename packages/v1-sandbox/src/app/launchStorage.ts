import type { Ref } from 'vue'

import type { SandboxLaunchConfig } from '@/scenario/types'

import { shallowRef } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { z } from 'zod'

import { isSandboxOrderTarget } from '@/scenario/predicates'
import { parseSandboxExtensionDescriptor } from '@/scenario/descriptor'

const STORAGE_KEY = 'v1-sandbox:launch-config:v1'
const launchQueryKeys = [
  'descriptor', 'fixture', 'mode',
  'pageCode', 'target', 'targets',
] as const

const launchConfigSchema = z.object({
  descriptor: z.unknown().transform(parseSandboxExtensionDescriptor),
  fixture: z.string().min(1),
  mode: z.enum(['page', 'widget']),
  pageCode: z.string(),
  targets: z.array(z.string().refine(isSandboxOrderTarget)),
}).refine(config => config.mode !== 'widget' || config.targets.length > 0, {
  message: 'Select at least one widget target.',
  path: ['targets'],
})

export const hasSandboxLaunchQuery = (params: URLSearchParams): boolean =>
  launchQueryKeys.some(key => params.has(key))

export const clearSandboxLaunchQuery = (): void => {
  const url = new URL(window.location.href)

  launchQueryKeys.forEach(key => url.searchParams.delete(key))
  window.history.replaceState(window.history.state, '', url)
}

export const useSandboxLaunchStorage = () => {
  let storageError: unknown = null
  let config: Ref<SandboxLaunchConfig | null>

  try {
    config = useLocalStorage<SandboxLaunchConfig | null>(STORAGE_KEY, null, {
      deep: false,
      flush: 'sync',
      listenToStorageChanges: false,
      onError: (error) => { storageError = error },
      serializer: {
        read(raw) {
          try {
            return launchConfigSchema.parse(JSON.parse(raw))
          } catch {
            return null
          }
        },
        write: value => JSON.stringify(value),
      },
      writeDefaults: false,
    })
  } catch (error) {
    storageError = error
    config = shallowRef(null)
  }

  const initialStorageError = storageError

  return {
    config,
    save(value: SandboxLaunchConfig) {
      storageError = initialStorageError
      config.value = launchConfigSchema.parse(value)

      if (storageError) {
        throw new Error('[sandbox:storage] Failed to save launch configuration.', {
          cause: storageError,
        })
      }
    },
  }
}
