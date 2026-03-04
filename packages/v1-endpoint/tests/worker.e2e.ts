import type { EndpointApi } from '../src/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'

import { createApp } from 'vue'
import { createProvider, createReceiver } from '@omnicajs/vue-remote/host'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'
import { ref } from 'vue'

import {
  afterEach,
  beforeEach,
  expect,
  test,
} from 'vitest'

function createHostApp (receiver: Receiver) {
  const provider = createProvider()

  return createApp({
    setup () {
      const tree = ref<{ forceUpdate (): void } | null>(null)

      return () => h(HostedTree, {
        ref: tree,
        provider,
        receiver,
      })
    },
  })
}

async function waitForText (
  receiver: Receiver,
  mount: HTMLElement,
  selector: string,
  expected: string
) {
  for (let i = 0; i < 30; i += 1) {
    if (mount.querySelector(selector)?.textContent === expected) {
      return
    }

    await new Promise(resolve => setTimeout(resolve, 10))
    await receiver.flush()
    await flushPromises()
  }

  expect(mount.querySelector(selector)?.textContent).toBe(expected)
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

test('runEndpoint bootstraps worker and updates host after remote updates', async () => {
  const worker = new Worker(new URL('./__fixtures__/worker.ts', import.meta.url), { type: 'module' })
  const host = createRpcEndpoint<EndpointApi>(worker)
  const pageReceiver = createReceiver()
  const widgetReceiver = createReceiver()
  const pageMount = document.createElement('div')
  const widgetMount = document.createElement('div')

  mountRoot?.appendChild(pageMount)
  mountRoot?.appendChild(widgetMount)

  createHostApp(pageReceiver).mount(pageMount)
  createHostApp(widgetReceiver).mount(widgetMount)

  try {
    await host.call.run(pageReceiver.receive, { code: 'orders' })
    await pageReceiver.flush()
    await flushPromises()

    expect(
      pageMount.querySelector('[data-qa="worker-page:orders"]')?.textContent
    ).toMatch(/^orders:[01]$/)
    await waitForText(pageReceiver, pageMount, '[data-qa="worker-page:orders"]', 'orders:1')

    await host.call.run(widgetReceiver.receive, { id: 'w-1', target: 'order/card:common.before' })
    await widgetReceiver.flush()
    await flushPromises()

    expect(
      widgetMount.querySelector('[data-qa="worker-widget"]')?.textContent
    ).toMatch(/^order\/card:common\.before:[01]$/)
    await waitForText(widgetReceiver, widgetMount, '[data-qa="worker-widget"]', 'order/card:common.before:1')

    await host.call.release({ id: 'w-1' })
    await widgetReceiver.flush()
    await pageReceiver.flush()

    expect(widgetMount.querySelector('[data-qa="worker-widget"]')).toBeNull()
    expect(pageMount.querySelector('[data-qa="worker-page:orders"]')).not.toBeNull()

    await host.call.reset()
    await pageReceiver.flush()
    await widgetReceiver.flush()

    expect(pageMount.querySelector('[data-qa="worker-page:orders"]')).toBeNull()
  } finally {
    worker.terminate()
  }
})
