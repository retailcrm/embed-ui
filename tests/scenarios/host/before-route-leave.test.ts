import type { BeforeRouteLeaveHook } from '@retailcrm/embed-ui-v1-types/host'
import type { Endpoint } from '@remote-ui/rpc'
import type { MessageEndpoint } from '@remote-ui/rpc'
import type { Receiver } from '@omnicajs/vue-remote/host'

import type { WidgetEndpoint, WidgetRunner } from '~types/widget'

import { HostedTree } from '@omnicajs/vue-remote/host'

import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import { createApp } from 'vue'
import { createEndpoint } from '@remote-ui/rpc'
import { createProvider, createReceiver } from '@omnicajs/vue-remote/host'
import { flushPromises } from '@vue/test-utils'
import { fromMessagePort } from '@remote-ui/rpc'
import { h } from 'vue'
import { release, retain } from '@remote-ui/rpc'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { createWidgetEndpoint } from '@/index'
import { useHost } from '@/composables'

type Approval = {
  value: boolean;
}

type MountedExtension = {
  host: {
    endpoint: Endpoint<WidgetEndpoint>;
  };
  receiver: Receiver;
}

describe('scenarios/host/before-route-leave', () => {
  let containers: HTMLElement[] = []
  let hooks: Set<BeforeRouteLeaveHook> = new Set()
  let mountedExtensions: MountedExtension[] = []

  beforeEach(() => {
    containers = []
    hooks = new Set()
    mountedExtensions = []
  })

  afterEach(async () => {
    for (const extension of mountedExtensions) {
      await extension.host.endpoint.call.release()
      await extension.receiver.flush()
    }

    for (const hook of hooks) {
      release(hook)
    }

    hooks.clear()

    for (const container of containers) {
      container.remove()
    }
  })

  test('resolves route leave hook from one extension', async () => {
    const approval = { value: true }

    await mountExtension(approval)

    expect(hooks.size).toBe(1)
    await expect(resolveBeforeRouteLeave(hooks)).resolves.toBe(true)

    approval.value = false

    await expect(resolveBeforeRouteLeave(hooks)).resolves.toBe(false)
  })

  test('resolves route leave hooks from several extensions', async () => {
    const firstApproval = { value: true }
    const secondApproval = { value: true }

    await mountExtension(firstApproval)
    await mountExtension(secondApproval)

    expect(hooks.size).toBe(2)
    await expect(resolveBeforeRouteLeave(hooks)).resolves.toBe(true)

    secondApproval.value = false

    await expect(resolveBeforeRouteLeave(hooks)).resolves.toBe(false)
  })

  async function mountExtension (approval: Approval): Promise<void> {
    const { port1, port2 } = new MessageChannel()

    port1.start()
    port2.start()

    const receiver = createReceiver()
    const host = createHostContext(fromMessagePort(port1))

    createHostApp(receiver).mount(createContainer())
    createWidgetEndpoint(createWidget(approval), fromMessagePort(port2))

    await host.endpoint.call.run(receiver.receive, 'customer/card:phone')
    await receiver.flush()
    await flushPromises()

    mountedExtensions.push({ host, receiver })
  }

  function createContainer (): HTMLElement {
    const container = document.createElement('div')

    document.body.appendChild(container)
    containers.push(container)

    return container
  }

  function createHostContext (messenger: MessageEndpoint) {
    const endpoint = createEndpoint<WidgetEndpoint>(messenger)

    endpoint.expose({
      onBeforeRouteLeave (hook: BeforeRouteLeaveHook) {
        retain(hook)
        hooks.add(hook)
      },
    })

    return { endpoint }
  }
})

async function resolveBeforeRouteLeave (hooks: Set<BeforeRouteLeaveHook>): Promise<boolean> {
  const resolutions = await Promise.all([...hooks].map(hook => hook()))

  return resolutions.every(Boolean)
}

function createWidget (approval: Approval): WidgetRunner {
  return {
    async run (createRemoteApp, root, pinia) {
      const app = createRemoteApp({
        setup () {
          const host = useHost()

          void host.onBeforeRouteLeave(() => approval.value)

          return () => h('div')
        },
      })

      app.use(pinia)
      app.mount(root)

      return () => app.unmount()
    },
  }
}

function createHostApp (receiver: Receiver) {
  const provider = createProvider({})

  return createApp({
    setup () {
      return () => h(HostedTree, {
        provider,
        receiver,
      })
    },
  })
}
