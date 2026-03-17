import type { Channel } from '@omnicajs/vue-remote/remote'

import { createEndpoint } from '@remote-ui/rpc'
import { createRemoteRenderer } from '@omnicajs/vue-remote/remote'
import { defineComponent, h } from 'vue'
import { release, retain } from '@remote-ui/rpc'

import { mountEndpointRoot } from '@/remote/endpoint'
import { UiTable, UiTableColumn } from '@/remote'

type WorkerApi = {
  run (channel: Channel): Promise<void>;
  release (): void;
}

let destroy = () => {}

createEndpoint<WorkerApi>(self as unknown as Worker).expose({
  async run (channel) {
    destroy()
    retain(channel)

    const root = await mountEndpointRoot(channel)
    const app = createRemoteRenderer(root).createApp(defineComponent({
      setup () {
        return () => h(UiTable, {
          rowKey: 'id',
          rows: [{ id: 1, name: 'Alice' }],
        }, () => [
          h(UiTableColumn, {
            label: 'Name',
            maxWidth: '40%',
            minWidth: '160px',
            width: 240,
          }, {
            default: ({ row }: { row: { name: string } }) => row.name,
          }),
        ])
      },
    }))

    app.mount(root)

    destroy = () => {
      app.unmount()
      release(channel)
    }
  },

  release () {
    destroy()
    destroy = () => {}
  },
})
