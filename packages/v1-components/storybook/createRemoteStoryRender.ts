import type { Callable, Lifecycle } from './endpoint'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { createEndpoint } from '@remote-ui/rpc'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { defineComponent } from 'vue'
import { onUnmounted, watch } from 'vue'

type RemoteStoryRenderOptions = {
  provider: object;
  workerUrl: URL;
}

export const createRemoteStoryRender = <TArgs extends object>({
  provider,
  workerUrl,
}: RemoteStoryRenderOptions) => (args: TArgs) => defineComponent({
    name: 'RemoteStoryRender',

    components: {
      HostedTree,
    },

    setup () {
      const receiver = createReceiver()
      const worker = new Worker(workerUrl, { type: 'module' })
      const endpoint = createEndpoint<Callable<TArgs> & Lifecycle>(worker)

      endpoint.call.run(receiver.receive, args)

      const stopWatchingArgs = watch(args, (nextArgs) => {
        endpoint.call.setProps(nextArgs)
      })

      onUnmounted(() => {
        stopWatchingArgs()

        void endpoint.call.release()
          .catch(() => {})
          .finally(() => {
            worker.terminate()
          })
      })

      return {
        provider,
        receiver,
      }
    },

    template: `
    <HostedTree :provider="provider" :receiver="receiver" />
  `,
  })
