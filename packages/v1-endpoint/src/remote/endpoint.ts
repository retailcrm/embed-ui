import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Endpoint, MessageEndpoint } from '@remote-ui/rpc'

import type { EndpointApi } from '@/common/extension'
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

export type Runner = {
  widget: WidgetRunner;
  page: PageRunner;
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
  const destructors = {
    widgets: new Map<string, () => void>(),
    pages: new Map<string, () => void>(),
  }

  endpoint.expose({
    async run (
      channel: Channel,
      config: WidgetRunConfig | PageRunIdentity
    ) {
      if ('id' in config) {
        destructors.widgets.get(config.id)?.()
        destructors.widgets.delete(config.id)
      } else {
        destructors.pages.get(config.code)?.()
        destructors.pages.delete(config.code)
      }

      retain(channel)

      const root = await mountEndpointRoot(channel) as Parameters<typeof createRemoteRenderer>[0]
      const { createApp } = createRemoteRenderer(root)

      const pinia = createPinia()

      pinia.use(injectEndpoint(endpoint))
      pinia.use(injectAccessor(endpoint))

      const destroy = 'id' in config
        ? await runner.widget.run(createApp, root, pinia, config.target)
        : await runner.page.run(createApp, root, pinia, config.code)

      if ('id' in config) {
        destructors.widgets.set(config.id, () => { destroy(); release(channel) })
      } else {
        destructors.pages.set(config.code, () => { destroy(); release(channel) })
      }
    },

    release (config: WidgetRunIdentity | PageRunIdentity) {
      if ('id' in config) {
        destructors.widgets.get(config.id)?.()
        destructors.widgets.delete(config.id)
      } else {
        destructors.pages.get(config.code)?.()
        destructors.pages.delete(config.code)
      }
    },

    reset () {
      destructors.widgets.forEach(destroy => destroy())
      destructors.widgets.clear()

      destructors.pages.forEach(destroy => destroy())
      destructors.pages.clear()
    },
  })

  return endpoint as Endpoint<EndpointApi>
}
