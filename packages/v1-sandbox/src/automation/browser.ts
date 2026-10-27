import '@retailcrm/embed-ui-v1-components/dist/host.css'
import '@/app/styles.css'

import type { App as VueApp } from 'vue'

import type { ContextSchemaList } from '@retailcrm/embed-ui-v1-types/context'
import type { Endpoint } from '@remote-ui/rpc'
import type { OrderSandboxSchemas } from '@/scenario/fixtures'
import type { PageRunIdentity } from '@retailcrm/embed-ui-v1-endpoint/remote'
import type { Receiver } from '@omnicajs/vue-remote/host'
import type { SandboxController } from '@/core'
import type { SandboxFixtureSchemas } from '@/scenario/fixtures'
import type { SandboxHostMiddleware } from '@/core'
import type { SandboxLaunchBridge } from '@/automation/bridge'
import type { SandboxLaunchInput } from '@/automation/bridge'
import type { SandboxTarget } from '@/scenario'
import type { SandboxWorkerApi } from '@/app/types'
import type { WidgetRunConfig } from '@retailcrm/embed-ui-v1-endpoint/remote'

import { createApp } from 'vue'

import { createProvider } from '@retailcrm/embed-ui-v1-components/host'
import { createReceiver } from '@omnicajs/vue-remote/host'
import { createEndpoint as createRpcEndpoint } from '@remote-ui/rpc'
import { fromWebWorker } from '@remote-ui/rpc'

import { h } from 'vue'
import { HostedTree } from '@omnicajs/vue-remote/host'
import { markRaw, nextTick } from 'vue'

import { createSandbox } from '@/app/createSandbox'

import { getSandboxLaunchBridge } from '@/automation/bridge'

import SourceWorker from '@/automation/source.worker.ts?worker&inline'

import { createFixtureSandboxController } from '@/scenario/fixtures'
import { isTargetForSandboxFixture } from '@/scenario/fixtures'

type RunConfig = PageRunIdentity | WidgetRunConfig

export type MountedSandbox = {
  app: VueApp<Element>;
  bridge: SandboxLaunchBridge;
  root: HTMLElement;
  unmount(): void;
}

export type MountSandboxOptions = {
  root?: HTMLElement;
}

export type WaitForSandboxLaunchBridgeOptions = {
  intervalMs?: number;
  timeoutMs?: number;
}

export type ExtensionSourceWorker = {
  ready: Promise<void>;
  worker: Worker;
}

export type CreateSandboxWorkerRuntimeOptions<F extends string = string> = {
  descriptorUuid?: string;
  fixture?: F;
  httpMiddleware?: SandboxHostMiddleware<SandboxFixtureSchemas<F>>;
  ready?: Promise<void>;
  worker: Worker;
}

export type SandboxWorkerRuntime<M extends ContextSchemaList = OrderSandboxSchemas> = {
  container: HTMLElement;
  controller: SandboxController<M>;
  flush(): Promise<void>;
  flushOnce(): Promise<void>;
  patchContext: SandboxController<M>['patchContext'];
  read: SandboxController<M>['snapshot'];
  reset: SandboxController<M>['reset'];
  runPage(code: string): Promise<HTMLElement>;
  runWidget(target: SandboxTarget): Promise<HTMLElement>;
  snapshot: SandboxController<M>['snapshot'];
  teardown(): Promise<void>;
  unmountHost(): void;
}

export const mountSandbox = async (
  options: MountSandboxOptions = {}
): Promise<MountedSandbox> => {
  const ownsRoot = !options.root
  const root = options.root ?? createDefaultRoot()
  const app = createSandbox()

  app.mount(root)

  const bridge = await waitForSandboxLaunchBridge()

  return {
    app,
    bridge,
    root,
    unmount() {
      app.unmount()
      if (ownsRoot) {
        root.remove()
      }
    },
  }
}

export const launchSandboxExtension = async (
  config: SandboxLaunchInput,
  options: MountSandboxOptions = {}
): Promise<MountedSandbox> => {
  const mounted = await mountSandbox(options)

  try {
    await mounted.bridge.launch(config)
    return mounted
  } catch (error) {
    mounted.unmount()
    throw error
  }
}

export const waitForSandboxLaunchBridge = async (
  options: WaitForSandboxLaunchBridgeOptions = {}
): Promise<SandboxLaunchBridge> => {
  const timeoutMs = options.timeoutMs ?? 5_000
  const intervalMs = options.intervalMs ?? 10
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const bridge = getSandboxLaunchBridge()

    if (bridge) {
      return bridge
    }

    await new Promise(resolve => window.setTimeout(resolve, intervalMs))
  }

  throw new Error('[sandbox] Sandbox launch bridge was not installed.')
}

export const createExtensionSourceWorker = (entrypoint: URL | string): ExtensionSourceWorker => {
  const worker = new SourceWorker({
    type: 'module',
  })
  const ready = new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      worker.removeEventListener('error', onError)
      worker.removeEventListener('message', onMessage)
    }

    const onError = (event: ErrorEvent) => {
      cleanup()
      reject(event.error ?? new Error(event.message || '[sandbox:test] Extension worker failed.'))
    }

    const onMessage = (event: MessageEvent<{ message?: string; type?: string }>) => {
      if (event.data?.type === 'sandbox:test-worker-error') {
        cleanup()
        reject(new Error(event.data.message || '[sandbox:test] Extension worker failed.'))

        return
      }

      if (event.data?.type !== 'sandbox:test-worker-ready') return

      cleanup()
      resolve()
    }

    worker.addEventListener('error', onError)
    worker.addEventListener('message', onMessage)
  })
  const entrypointUrl = typeof entrypoint === 'string' ? entrypoint : entrypoint.href

  worker.postMessage({
    entrypoint: entrypointUrl,
    type: 'sandbox:test-load-extension',
  })

  return {
    ready,
    worker,
  }
}

export const createSandboxWorkerRuntime = async <F extends string = 'order-basic'>({
  descriptorUuid,
  fixture,
  httpMiddleware,
  ready,
  worker,
}: CreateSandboxWorkerRuntimeOptions<F>): Promise<SandboxWorkerRuntime<SandboxFixtureSchemas<F>>> => {
  await ready

  const container = document.createElement('div')
  const endpoint = createRpcEndpoint<SandboxWorkerApi>(fromWebWorker(worker))
  const receiver = markRaw(createReceiver())
  const controller = createFixtureSandboxController(fixture ?? 'order-basic', {
    descriptorUuid,
    globalBridge: false,
    httpMiddleware: httpMiddleware as SandboxHostMiddleware<ContextSchemaList> | undefined,
  }) as unknown as SandboxController<SandboxFixtureSchemas<F>>
  const endpointApi = controller.endpointApi

  document.body.append(container)

  const host = createHost(receiver)
  let hostMounted = false
  let currentRunConfig: RunConfig | null = null

  endpoint.expose({
    ...endpointApi,
    get: (...args: Parameters<typeof endpointApi.get>) => endpointApi.get(...args),
    httpCall: (...args: Parameters<typeof endpointApi.httpCall>) => endpointApi.httpCall(...args),
  } as unknown as SandboxWorkerApi)

  host.mount(container)
  hostMounted = true

  const flushOnce = async () => {
    await nextTick()
    await receiver.flush()
    await waitTick()
  }

  const flush = async () => {
    await flushOnce()
    await flushOnce()
  }

  const releaseCurrentRun = async () => {
    if (!currentRunConfig) return

    const config = currentRunConfig

    await runWorkerCall(worker, () => endpoint.call.release(config))
    controller.disposeContextSubscriptions()
    currentRunConfig = null
    await flush()
  }

  const run = async (config: RunConfig) => {
    await releaseCurrentRun()

    currentRunConfig = config
    await runWorkerCall(worker, () => endpoint.call.run(receiver.receive, config))
    await flush()

    return container
  }

  const unmountHost = () => {
    if (!hostMounted) return

    host.unmount()
    hostMounted = false
  }

  return {
    container,
    controller,
    flush,
    flushOnce,
    patchContext: controller.patchContext,
    read: controller.snapshot,
    reset: controller.reset,
    runPage: code => run({ code }),
    runWidget: target => {
      if (!isTargetForSandboxFixture(target, fixture ?? 'order-basic')) {
        return Promise.reject(new Error('Widget target does not match the selected fixture.'))
      }
      return run({ id: `browser-widget:${target}`, target })
    },
    snapshot: controller.snapshot,
    async teardown() {
      try {
        await releaseCurrentRun()
      } catch {
        await resetEndpoint(endpoint)
      }

      controller.dispose()
      endpoint.terminate()
      worker.terminate()
      unmountHost()
      container.remove()
    },
    unmountHost,
  }
}

const createDefaultRoot = (): HTMLElement => {
  const root = document.createElement('div')

  root.id = 'app'
  document.body.append(root)

  return root
}

const createHost = (receiver: Receiver): VueApp<Element> => {
  const provider = markRaw(createProvider())

  return createApp({
    name: 'SandboxWorkerRuntimeHost',

    setup() {
      return () => h(HostedTree, {
        provider,
        receiver,
      })
    },
  })
}

const resetEndpoint = async (endpoint: Endpoint<SandboxWorkerApi>) => {
  try {
    await Promise.race([
      endpoint.call.reset(),
      new Promise<void>(resolve => window.setTimeout(resolve, 1000)),
    ])
  } catch {
    // Worker may already be gone after a failed mount; teardown should still clean DOM.
  }
}

const runWorkerCall = async <T>(
  worker: Worker,
  operation: () => Promise<T>,
  timeoutMs = 10_000
): Promise<T> => await new Promise<T>((resolve, reject) => {
  const timerId = window.setTimeout(() => {
    cleanup()
    reject(new Error(`[sandbox:test] Worker call timed out after ${timeoutMs}ms.`))
  }, timeoutMs)

  const cleanup = () => {
    window.clearTimeout(timerId)
    worker.removeEventListener('error', onError)
    worker.removeEventListener('messageerror', onMessageError)
  }

  const onError = (event: ErrorEvent) => {
    cleanup()
    const location = event.filename
      ? ` (${event.filename}:${event.lineno}:${event.colno})`
      : ''

    reject(event.error ?? new Error(`${event.message || '[sandbox:test] Worker failed.'}${location}`))
  }

  const onMessageError = () => {
    cleanup()
    reject(new Error('[sandbox:test] Worker message failed to deserialize.'))
  }

  worker.addEventListener('error', onError)
  worker.addEventListener('messageerror', onMessageError)

  operation()
    .then((result) => {
      cleanup()
      resolve(result)
    })
    .catch((error: unknown) => {
      cleanup()
      reject(error)
    })
})

const waitTick = async () => {
  await new Promise<void>(resolve => window.setTimeout(resolve, 0))
}
