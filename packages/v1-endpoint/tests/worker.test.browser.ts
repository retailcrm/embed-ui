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

import { ENDPOINT_CAPABILITIES_MESSAGE, toScopedHostApiMethod } from '../src/common'

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

const waitForWorkerMessage = (worker: Worker, type: string): Promise<unknown> => {
  return new Promise(resolve => {
    const subscription = new AbortController()

    worker.addEventListener('message', event => {
      if (event.data?.type === type) {
        subscription.abort('Expected worker message received')
        resolve(event.data)
      }
    }, { signal: subscription.signal })
  })
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
  const capabilities = waitForWorkerMessage(worker, ENDPOINT_CAPABILITIES_MESSAGE)
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
    await expect(capabilities).resolves.toMatchObject({
      capabilities: {
        scopedHostApi: true,
      },
    })

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

test('release cancels a widget while its worker runner is mounting', async () => {
  const worker = new Worker(new URL('./__fixtures__/worker.ts', import.meta.url), { type: 'module' })
  const host = createRpcEndpoint<EndpointApi>(worker)
  const widgetReceiver = createReceiver()
  const widgetMount = document.createElement('div')

  mountRoot?.appendChild(widgetMount)
  createHostApp(widgetReceiver).mount(widgetMount)

  try {
    const mountPending = waitForWorkerMessage(worker, 'test:widget-mount-pending')

    worker.postMessage({ type: 'test:delay-widget-mount' })

    let runSettled = false
    const run = host.call.run(widgetReceiver.receive, {
      id: 'delayed-widget',
      target: 'order/card:common.before',
    }).then(() => {
      runSettled = true
    })

    await mountPending
    await host.call.release({ id: 'delayed-widget' })
    await expect.poll(() => runSettled).toBe(true)

    worker.postMessage({ type: 'test:continue-widget-mount' })

    await run
    await widgetReceiver.flush()
    await flushPromises()

    expect(widgetMount.querySelector('[data-qa="worker-widget"]')).toBeNull()
  } finally {
    worker.terminate()
  }
})

test('routes simultaneous worker host API calls through their run scopes', async () => {
  const worker = new Worker(new URL('./__fixtures__/worker.ts', import.meta.url), { type: 'module' })
  const host = createRpcEndpoint<EndpointApi>(worker)
  const firstReceiver = createReceiver()
  const secondReceiver = createReceiver()
  const firstMount = document.createElement('div')
  const secondMount = document.createElement('div')

  mountRoot?.appendChild(firstMount)
  mountRoot?.appendChild(secondMount)

  createHostApp(firstReceiver).mount(firstMount)
  createHostApp(secondReceiver).mount(secondMount)

  host.expose({
    [toScopedHostApiMethod('first', 'getLocation')]: () => ({
      pathname: '/first',
      search: '',
      hash: '',
      query: {},
    }),
    [toScopedHostApiMethod('second', 'getLocation')]: () => ({
      pathname: '/second',
      search: '',
      hash: '',
      query: {},
    }),
  })

  try {
    await host.call.run(firstReceiver.receive, {
      id: 'first-widget',
      target: 'order/card:common.before',
    }, 'first')
    await host.call.run(secondReceiver.receive, {
      id: 'second-widget',
      target: 'order/card:common.after',
    }, 'second')
    await firstReceiver.flush()
    await secondReceiver.flush()

    firstMount.querySelector<HTMLButtonElement>('[data-qa="worker-widget:read-location"]')?.click()
    secondMount.querySelector<HTMLButtonElement>('[data-qa="worker-widget:read-location"]')?.click()

    await waitForText(firstReceiver, firstMount, '[data-qa="worker-widget:location"]', '/first')
    await waitForText(secondReceiver, secondMount, '[data-qa="worker-widget:location"]', '/second')
  } finally {
    worker.terminate()
  }
})
