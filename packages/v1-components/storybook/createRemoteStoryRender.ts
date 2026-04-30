import type { Callable, Lifecycle } from './endpoint'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { createEndpoint } from '@remote-ui/rpc'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { defineComponent } from 'vue'
import { onUnmounted, watch } from 'vue'

import { storybookHostProvider } from './provider'

type RemoteStoryRenderOptions = {
  provider?: object;
  worker: {
    new (options?: WorkerOptions): Worker;
  };
}

export const createRemoteStoryRender = <TArgs extends object>({
  provider = storybookHostProvider,
  worker: Worker,
}: RemoteStoryRenderOptions) => (args: TArgs) => defineComponent({
    name: 'RemoteStoryRender',

    components: {
      HostedTree,
    },

    setup () {
      const receiver = createReceiver()
      const worker = new Worker()
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
