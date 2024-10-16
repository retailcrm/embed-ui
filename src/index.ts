import type {
  CreateEndpointOptions,
  MessageEndpoint,
} from '@remote-ui/rpc'

import type {
  Endpoint,
  EndpointApi,
} from '~types/endpoint'

import {
  createEndpoint,
  release,
  retain,
} from '@remote-ui/rpc'

export const createWidgetEndpoint = <API extends EndpointApi, T>(
  api: API,
  messenger: MessageEndpoint,
  options: CreateEndpointOptions<T>
): Endpoint<API> => {
  const endpoint = createEndpoint(messenger, options)

  let onRelease = () => {}

  endpoint.expose({
    async run (channel, placement, methods) {
      retain(channel)
      retain(methods)

      onRelease = () => {
        release(channel)
        release(methods)
      }

      await api.run(channel, placement, methods)
    },

    release () {
      api.release()

      onRelease()
      onRelease = () => {}
    },

    on (event, payload) {
      api.on(event, payload)
    },
  } as API)

  return endpoint
}
