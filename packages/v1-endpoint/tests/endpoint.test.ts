import type { EndpointApi } from '../src/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type * as RemoteRpc from '@remote-ui/rpc'

import { createProvider, createReceiver, HostedTree } from '@omnicajs/vue-remote/host'
import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import {
  afterEach,
  beforeEach,
  expect,
  test,
  vi,
} from 'vitest'

import { createApp } from 'vue'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { flushPromises } from '@vue/test-utils'
import { fromMessagePort } from '@remote-ui/rpc'
import { h, ref } from 'vue'

import {
  createEndpoint as createRemoteEndpoint,
  defineRunner as defineRemoteRunner,
} from '../src/remote'

const {
  exposeEndpointApi,
  releaseChannel,
  retainChannel,
} = vi.hoisted(() => ({
  exposeEndpointApi: vi.fn(),
  releaseChannel: vi.fn(),
  retainChannel: vi.fn(),
}))

vi.mock('@remote-ui/rpc', async importOriginal => {
  const original = await importOriginal<typeof RemoteRpc>()

  return {
    ...original,
    createEndpoint: (messenger: RemoteRpc.MessageEndpoint) => {
      const endpoint = original.createEndpoint(messenger)

      return {
        ...endpoint,
        expose: (api: Record<string, unknown>) => {
          exposeEndpointApi(api)
          endpoint.expose(api)
        },
      }
    },
    release: (value: unknown) => {
      releaseChannel(value)

      return original.release(value)
    },
    retain: (value: unknown) => {
      retainChannel(value)

      return original.retain(value)
    },
  }
})

function deferred<T> () {
  let resolve!: (value: T) => void
  const promise = new Promise<T>(resolvePromise => {
    resolve = resolvePromise
  })

  return { promise, resolve }
}

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

let mountRoot: HTMLElement | null = null

beforeEach(() => {
  exposeEndpointApi.mockClear()
  releaseChannel.mockClear()
  retainChannel.mockClear()
  mountRoot = document.createElement('div')
  document.body.appendChild(mountRoot)
})

afterEach(() => {
  mountRoot?.remove()
  mountRoot = null
})

test('runs widget and page simultaneously and releases independently via defineRemoteRunner', async () => {
  const { port1, port2 } = new MessageChannel()
  const host = createRpcEndpoint<EndpointApi>(fromMessagePort(port1))
  const channel = fromMessagePort(port2)
  const pageReceiver = createReceiver()
  const widgetReceiver = createReceiver()
  const pageMount = document.createElement('div')
  const widgetMount = document.createElement('div')

  port1.start()
  port2.start()

  mountRoot?.appendChild(pageMount)
  mountRoot?.appendChild(widgetMount)

  createHostApp(pageReceiver).mount(pageMount)
  createHostApp(widgetReceiver).mount(widgetMount)

  const runner = defineRemoteRunner({
    pages: [{
      props: {
        code: {
          type: String,
          required: true,
        },
      },

      setup (props: { code: string }) {
        return () => h('div', {
          'data-qa': `page:${props.code}`,
        }, `page:${props.code}`)
      },
    }],

    widgets: [{
      props: {
        target: {
          type: String,
          required: true,
        },
      },

      setup (props: { target: string }) {
        return () => h('div', {
          'data-qa': 'widget:w-1',
        }, `${props.target}:w-1`)
      },
    }],
  })

  createRemoteEndpoint(runner, channel)

  await host.call.run(pageReceiver.receive, { code: 'orders' })
  await pageReceiver.flush()
  await flushPromises()

  await host.call.run(widgetReceiver.receive, { id: 'w-1', target: 'order/card:common.before' })
  await widgetReceiver.flush()
  await flushPromises()

  expect(pageMount.querySelector('[data-qa="page:orders"]')).not.toBeNull()
  expect(widgetMount.querySelector('[data-qa="widget:w-1"]')).not.toBeNull()

  await host.call.release({ id: 'w-1' })
  await widgetReceiver.flush()
  await pageReceiver.flush()

  expect(widgetMount.querySelector('[data-qa="widget:w-1"]')).toBeNull()
  expect(pageMount.querySelector('[data-qa="page:orders"]')).not.toBeNull()

  await host.call.release({ code: 'orders' })
  await pageReceiver.flush()
  await widgetReceiver.flush()

  expect(pageMount.querySelector('[data-qa="page:orders"]')).toBeNull()
})

test('replaces run with same widget id and supports reset via defineRemoteRunner', async () => {
  const { port1, port2 } = new MessageChannel()
  const host = createRpcEndpoint<EndpointApi>(fromMessagePort(port1))
  const channel = fromMessagePort(port2)
  const widgetReceiver1 = createReceiver()
  const widgetReceiver2 = createReceiver()
  const pageReceiver = createReceiver()
  const widgetMount1 = document.createElement('div')
  const widgetMount2 = document.createElement('div')
  const pageMount = document.createElement('div')

  port1.start()
  port2.start()

  mountRoot?.appendChild(widgetMount1)
  mountRoot?.appendChild(widgetMount2)
  mountRoot?.appendChild(pageMount)

  createHostApp(widgetReceiver1).mount(widgetMount1)
  createHostApp(widgetReceiver2).mount(widgetMount2)
  createHostApp(pageReceiver).mount(pageMount)

  createRemoteEndpoint(defineRemoteRunner({
    pages: [{
      props: {
        code: {
          type: String,
          required: true,
        },
      },
      setup (props: { code: string }) {
        return () => h('div', { 'data-qa': `page:${props.code}` }, props.code)
      },
    }],

    widgets: [{
      props: {
        target: {
          type: String,
          required: true,
        },
      },
      setup (props: { target: string }) {
        return () => h('div', { 'data-qa': 'widget:w-1' }, props.target)
      },
    }],
  }), channel)

  await host.call.run(widgetReceiver1.receive, { id: 'w-1', target: 'order/card:common.before' })
  await widgetReceiver1.flush()
  await flushPromises()

  await host.call.run(widgetReceiver2.receive, { id: 'w-1', target: 'order/card:common.after' })
  await widgetReceiver2.flush()
  await widgetReceiver1.flush()
  await flushPromises()

  expect(widgetMount2.querySelector('[data-qa="widget:w-1"]')).not.toBeNull()

  await host.call.run(pageReceiver.receive, { code: 'customers' })
  await pageReceiver.flush()
  await flushPromises()

  await host.call.reset()
  await widgetReceiver1.flush()
  await widgetReceiver2.flush()
  await pageReceiver.flush()

  expect(widgetMount2.querySelector('[data-qa="widget:w-1"]')).toBeNull()
  expect(pageMount.querySelector('[data-qa="page:customers"]')).toBeNull()
})

test('cancels a widget released while its runner is mounting', async () => {
  const { port1, port2 } = new MessageChannel()
  const host = createRpcEndpoint<EndpointApi>(fromMessagePort(port1))
  const channel = fromMessagePort(port2)
  const widgetReceiver = createReceiver()
  const widgetMount = document.createElement('div')
  const continueMount = deferred<void>()
  const beforeMount = vi.fn(() => continueMount.promise)

  port1.start()
  port2.start()

  mountRoot?.appendChild(widgetMount)
  createHostApp(widgetReceiver).mount(widgetMount)
  createRemoteEndpoint(defineRemoteRunner({
    pages: [{ render: () => null }],
    widgets: [{
      render: () => h('div', { 'data-qa': 'delayed-widget' }, 'mounted'),
    }, beforeMount],
  }), channel)

  let runSettled = false
  const run = host.call.run(widgetReceiver.receive, {
    id: 'delayed-widget',
    target: 'order/card:common.before',
  }).then(() => {
    runSettled = true
  })

  await vi.waitFor(() => expect(beforeMount).toHaveBeenCalledOnce())
  await host.call.release({ id: 'delayed-widget' })
  await flushPromises()

  const settledBeforeMountCompletes = runSettled

  continueMount.resolve()
  await run
  await widgetReceiver.flush()
  await flushPromises()

  expect(settledBeforeMountCompletes).toBe(true)
  expect(widgetMount.querySelector('[data-qa="delayed-widget"]')).toBeNull()
})

test('releases a retained channel when widget mount fails', async () => {
  const { port1, port2 } = new MessageChannel()
  const channel = fromMessagePort(port2)
  const widgetReceiver = createReceiver()

  port1.start()
  port2.start()

  createRemoteEndpoint(defineRemoteRunner({
    pages: [{ render: () => null }],
    widgets: [{ render: () => null }, () => {
      throw new Error('Widget mount failed')
    }],
  }), channel)

  const remoteApi = exposeEndpointApi.mock.calls[0][0] as EndpointApi

  await expect(remoteApi.run(widgetReceiver.receive, {
    id: 'failed-widget',
    target: 'order/card:common.before',
  })).rejects.toThrow('Widget mount failed')

  expect(retainChannel).toHaveBeenCalledOnce()
  expect(releaseChannel).toHaveBeenCalledOnce()
})
