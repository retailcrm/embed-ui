import type { Channel } from '@omnicajs/vue-remote/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'

import {
  afterEach,
  beforeEach,
  expect,
  test,
} from 'vitest'

import { createApp } from 'vue'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'

import { createProvider as createHostProvider } from '@/host'

type WorkerApi = {
  run (channel: Channel): Promise<void>;
  release (): void;
}

function createHostApp (receiver: Receiver) {
  const provider = createHostProvider()

  return createApp({
    setup () {
      return () => h(HostedTree, {
        provider,
        receiver,
      })
    },
  })
}

async function waitForTableCol (receiver: Receiver, mount: HTMLElement): Promise<HTMLTableColElement> {
  for (let i = 0; i < 30; i += 1) {
    const col = mount.querySelector('col')

    if (col instanceof HTMLTableColElement && col.getAttribute('style')?.includes('width: 240px;')) {
      return col
    }

    await new Promise(resolve => setTimeout(resolve, 10))
    await receiver.flush()
    await flushPromises()
  }

  throw new Error('Timed out waiting for rendered table col in host DOM')
}

let mountRoot: HTMLElement | null = null

beforeEach(() => {
  mountRoot = document.createElement('div')
  document.body.appendChild(mountRoot)
})

afterEach(() => {
  mountRoot?.remove()
  mountRoot = null
})

test('worker renders UiTable col width and style in browser runtime', async () => {
  const worker = new Worker(new URL('./__fixtures__/table.worker.ts', import.meta.url), { type: 'module' })
  const host = createRpcEndpoint<WorkerApi>(worker)
  const receiver = createReceiver()
  const mount = document.createElement('div')

  mountRoot?.appendChild(mount)
  createHostApp(receiver).mount(mount)

  try {
    await host.call.run(receiver.receive)
    await receiver.flush()
    await flushPromises()

    const col = await waitForTableCol(receiver, mount)

    expect(mount.querySelector('tbody td')?.textContent).toBe('Alice')
    expect(col.getAttribute('width')).toBe('240')
    expect(col.getAttribute('style')).toContain('width: 240px;')
    expect(col.getAttribute('style')).toContain('min-width: 160px;')
    expect(col.getAttribute('style')).toContain('max-width: 40%;')
  } finally {
    await host.call.release()
    worker.terminate()
  }
})
