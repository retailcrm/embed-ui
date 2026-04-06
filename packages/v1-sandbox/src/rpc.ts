import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'

import type { SandboxController, SandboxEndpointApi } from '@/controller'

import { createEndpoint, fromMessagePort } from '@remote-ui/rpc'
import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

export type SandboxRpcPair<M extends ContextSchemaList> = {
  dispose(): void;
  host: Endpoint<SandboxEndpointApi<M>>;
  remote: Endpoint<SandboxEndpointApi<M>>;
}

export const createSandboxRpc = <const M extends ContextSchemaList>(
  sandbox: SandboxController<M> | SandboxEndpointApi<M>
): SandboxRpcPair<M> => {
  const api = 'endpointApi' in sandbox ? sandbox.endpointApi : sandbox
  const { port1, port2 } = new MessageChannel()

  port1.start()
  port2.start()

  const host = createEndpoint<SandboxEndpointApi<M>>(fromMessagePort(port1))
  const remote = createEndpoint<SandboxEndpointApi<M>>(fromMessagePort(port2))

  host.expose(api)

  return {
    dispose() {
      port1.close()
      port2.close()
    },
    host,
    remote,
  }
}
