import type { Ref } from 'vue'

import type { SandboxLaunchConfig } from '@/scenario/types'

import { shallowRef } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import { parseSandboxLaunchConfig } from '@/scenario/launch'

const STORAGE_KEY = 'v1-sandbox:launch-config:v1'
const parseStoredConfig = (raw: string): SandboxLaunchConfig | null => {
  try {
    return parseSandboxLaunchConfig(JSON.parse(raw))
  } catch {
    return null
  }
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
        read: parseStoredConfig,
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
      config.value = parseSandboxLaunchConfig(value)

      if (storageError) {
        throw new Error('[sandbox:storage] Failed to save launch configuration.', {
          cause: storageError,
        })
      }
    },
  }
}
