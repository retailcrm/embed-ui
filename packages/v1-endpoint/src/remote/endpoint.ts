import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Endpoint, MessageEndpoint } from '@remote-ui/rpc'

import type { EndpointApi, EndpointCapabilitiesMessage } from '@/common/extension'
import type { RemoteApi } from '@/common/extension'

import type { RunIdentity as PageRunIdentity, Runner as PageRunner } from './pages'

import type {
  RunConfig as WidgetRunConfig,
  RunIdentity as WidgetRunIdentity,
  Runner as WidgetRunner,
} from './widgets'

import { createEndpoint as _createEndpoint } from '@remote-ui/rpc'
import { createPinia } from 'pinia'
import { createRemoteRenderer } from '@omnicajs/vue-remote/remote'
import { injectAccessor } from '@retailcrm/embed-ui-v1-contexts/remote/custom'
import { injectEndpoint } from '@retailcrm/embed-ui-v1-contexts/remote'
import { mountEndpointRoot } from '@retailcrm/embed-ui-v1-components/remote'

import { release, retain } from '@remote-ui/rpc'

import { defineRunner as definePageRunner } from './pages'
import { defineRunner as defineWidgetRunner } from './widgets'
import { ENDPOINT_CAPABILITIES_MESSAGE } from '../common/extension'
import { toScopedHostApiMethod } from '../common/extension'

export type Runner = {
  widget: WidgetRunner;
  page: PageRunner;
}

type RunConfig = WidgetRunConfig | PageRunIdentity
type RunIdentity = WidgetRunIdentity | PageRunIdentity

type RemoteRun = {
  channel: Channel;
  cancellation: Promise<void>;
  cancel: () => void;
  cancelled: boolean;
  channelReleased: boolean;
  destroy?: () => void;
}

const createRun = (channel: Channel): RemoteRun => {
  let cancel: () => void = () => undefined
  const cancellation = new Promise<void>(resolve => {
    cancel = resolve
  })

  return {
    channel,
    cancellation,
    cancel,
    cancelled: false,
    channelReleased: false,
  }
}

const disposeRun = (run: RemoteRun): void => {
  if (!run.cancelled) {
    run.cancelled = true
    run.cancel()
  }

  const destroy = run.destroy
  run.destroy = undefined

  try {
    destroy?.()
  } finally {
    if (!run.channelReleased) {
      run.channelReleased = true
      release(run.channel)
    }
  }
}

class RunRegistry {
  private readonly widgets = new Map<string, RemoteRun>()
  private readonly pages = new Map<string, RemoteRun>()

  replace (config: RunConfig, run: RemoteRun): void {
    this.release(config)
    this.entries(config).set(this.key(config), run)
  }

  delete (config: RunIdentity, run: RemoteRun): void {
    const entries = this.entries(config)

    if (entries.get(this.key(config)) === run) {
      entries.delete(this.key(config))
    }
  }

  release (config: RunIdentity): void {
    const entries = this.entries(config)
    const key = this.key(config)
    const run = entries.get(key)

    if (!run) {
      return
    }

    entries.delete(key)
    disposeRun(run)
  }

  reset (): void {
    const runs = [
      ...this.widgets.values(),
      ...this.pages.values(),
    ]

    this.widgets.clear()
    this.pages.clear()
    runs.forEach(disposeRun)
  }

  private entries (config: RunIdentity): Map<string, RemoteRun> {
    return 'id' in config ? this.widgets : this.pages
  }

  private key (config: RunIdentity): string {
    return 'id' in config ? config.id : config.code
  }
}

export type { RemoteApi }

export const defineRunner = (config: {
  pages: Parameters<typeof definePageRunner>;
  widgets: Parameters<typeof defineWidgetRunner>;
}): Runner => ({
  page: definePageRunner(...config.pages),
  widget: defineWidgetRunner(...config.widgets),
})

export const createEndpoint = (
  runner: Runner,
  messenger: MessageEndpoint
): Endpoint<RemoteApi> => {
  const endpoint = _createEndpoint<EndpointApi>(messenger)
  const runs = new RunRegistry()

  messenger.postMessage({
    type: ENDPOINT_CAPABILITIES_MESSAGE,
    capabilities: {
      scopedHostApi: true,
    },
  } satisfies EndpointCapabilitiesMessage)

  endpoint.expose({
    async run (
      channel: Channel,
      config: RunConfig,
      hostApiScope?: string
    ) {
      const run = createRun(channel)
      runs.replace(config, run)
      retain(channel)

      try {
        const mounting = mountRun(run, config, runner, endpoint, hostApiScope)

        await Promise.race([mounting, run.cancellation])
      } catch (error) {
        runs.delete(config, run)
        disposeRun(run)

        throw error
      }
    },

    release (config: RunIdentity) {
      runs.release(config)
    },

    reset () {
      runs.reset()
    },
  })

  return endpoint as Endpoint<EndpointApi>
}

const mountRun = async (
  run: RemoteRun,
  config: RunConfig,
  runner: Runner,
  endpoint: Endpoint<EndpointApi>,
  hostApiScope?: string
): Promise<void> => {
  const root = await mountEndpointRoot(run.channel) as Parameters<typeof createRemoteRenderer>[0]
  const { createApp } = createRemoteRenderer(root)
  const pinia = createPinia()
  const hostEndpoint = createHostEndpoint(endpoint, hostApiScope)

  pinia.use(injectEndpoint(hostEndpoint))
  pinia.use(injectAccessor(hostEndpoint))

  run.destroy = 'id' in config
    ? await runner.widget.run(createApp, root, pinia, config.target)
    : await runner.page.run(createApp, root, pinia, config.code)

  if (run.cancelled) {
    disposeRun(run)
  }
}

const createHostEndpoint = (
  endpoint: Endpoint<EndpointApi>,
  scope?: string
): Endpoint<EndpointApi> => {
  if (!scope) {
    return endpoint
  }

  return {
    ...endpoint,
    call: new Proxy(endpoint.call, {
      get (target, method, receiver) {
        return typeof method === 'string'
          ? Reflect.get(target, toScopedHostApiMethod(scope, method), receiver)
          : Reflect.get(target, method, receiver)
      },
    }),
  }
}
