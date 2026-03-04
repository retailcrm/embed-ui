import type { EndpointApi } from '../src/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'

import { createProvider, createReceiver, HostedTree } from '@omnicajs/vue-remote/host'
import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import {
  afterEach,
  beforeEach,
  expect,
  test,
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
