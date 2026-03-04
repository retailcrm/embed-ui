import type { Component, CreateAppFunction } from 'vue'

import type { Pinia } from 'pinia'
import type { RunIdentity } from '@/common/pages'

import type { createRemoteRenderer } from '@omnicajs/vue-remote/remote'

import { h } from 'vue'

type RemoteRoot = Parameters<typeof createRemoteRenderer>[0]

export type { RunIdentity }

export interface Runner {
  run (
    createApp: CreateAppFunction<Component<RemoteRoot> | RemoteRoot>,
    root: RemoteRoot,
    pinia: Pinia,
    code: string,
  ): Promise<() => void>
}

export const defineSingleRunner = (
  component: Component,
  beforeMount?: () => Promise<void>
): Runner => ({
  async run (createApp, root, pinia, code) {
    const app = createApp({
      setup () {
        return () => h(component, { code })
      },
    })

    app.use(pinia)

    await beforeMount?.()
    app.mount(root)

    return () => app.unmount()
  },
})

export const log = {
  warn: (text: string) => console.warn(`[Remote] ${text}`),
}

export const defineMultiRunner = (runners: Partial<Record<string, Runner>>): Runner => ({
  async run (createApp, root, pinia, code) {
    const runner = runners[code]
    if (!runner) {
      log.warn(`No runner for code "${code}"`)
      return () => {}
    }

    return runner.run(createApp, root, pinia, code)
  },
})

type RunnersMap = Record<string, Runner>

function isRunnersMap (value: Component | RunnersMap): value is RunnersMap {
  if (typeof value === 'function') return false

  const entries = Object.values(value as Record<string, unknown>)

  return entries.length > 0 && entries.every(entry =>
    typeof entry === 'object' && entry !== null && 'run' in entry
  )
}

export function defineRunner (component: Component, beforeMount?: () => Promise<void>): Runner
export function defineRunner (runners: RunnersMap): Runner
export function defineRunner (
  input: Component | RunnersMap,
  beforeMount?: () => Promise<void>
): Runner {
  if (isRunnersMap(input)) {
    return defineMultiRunner(input)
  }

  return defineSingleRunner(input, beforeMount)
}
