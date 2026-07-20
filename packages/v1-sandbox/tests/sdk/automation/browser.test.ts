import type { SandboxLaunchBridge } from '@/automation/bridge'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import {
  createExtensionSourceWorker,
  createSandboxWorkerRuntime,
  launchSandboxExtension,
  mountSandbox,
} from '@/automation/browser'
import { SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY } from '@/automation/bridge'
import { waitForSandboxLaunchBridge } from '@/automation/browser'

const mocks = vi.hoisted(() => ({
  createController: vi.fn(),
  createEndpoint: vi.fn(),
  createProvider: vi.fn(() => ({})),
  createReceiver: vi.fn(),
  createSandbox: vi.fn(),
  fromWebWorker: vi.fn(worker => worker),
  sourceWorkers: [] as Worker[],
}))

vi.mock('@/app/createSandbox', () => ({
  createSandbox: mocks.createSandbox,
}))

vi.mock('@/automation/source.worker.ts?worker&inline', () => ({
  default: class SourceWorkerMock extends EventTarget {
    postMessage = vi.fn()
    terminate = vi.fn()

    constructor() {
      super()
      mocks.sourceWorkers.push(this as unknown as Worker)
    }
  },
}))

vi.mock('@remote-ui/rpc', () => ({
  createEndpoint: mocks.createEndpoint,
  fromWebWorker: mocks.fromWebWorker,
}))

vi.mock('@retailcrm/embed-ui-v1-components/host', () => ({
  createProvider: mocks.createProvider,
}))

vi.mock('@omnicajs/vue-remote/host', () => ({
  createReceiver: mocks.createReceiver,
  HostedTree: {
    name: 'HostedTreeStub',
    render: () => null,
  },
}))

vi.mock('@/scenario/fixtures', () => ({
  createOrderSandboxController: mocks.createController,
}))

class WorkerStub extends EventTarget {
  terminate = vi.fn()
}

const createLaunchBridge = (): SandboxLaunchBridge => ({
  createLaunchUrl: config => `/?fixture=${config.fixture ?? 'order-basic'}&mode=${config.mode ?? 'widget'}`,
  getLaunchConfig: () => ({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'returns',
    targets: ['order/card:common.before'],
    widgetId: 'sandbox-widget',
  }),
  launch: vi.fn(),
})

const createEndpoint = () => ({
  call: {
    release: vi.fn(async () => undefined),
    reset: vi.fn(async () => undefined),
    run: vi.fn(async () => undefined),
  },
  expose: vi.fn(),
  terminate: vi.fn(),
})

const createController = () => {
  const snapshot = vi.fn(() => ({
    contexts: {},
    host: {
      http: [],
      location: {
        query: {},
      },
    },
  }))

  return {
    dispose: vi.fn(),
    disposeContextSubscriptions: vi.fn(),
    endpointApi: {
      get: vi.fn(),
      httpCall: vi.fn(),
    },
    patchContext: vi.fn(),
    reset: vi.fn(),
    snapshot,
  }
}

const installSandboxAppMock = (bridge: SandboxLaunchBridge) => {
  const app = {
    mount: vi.fn(() => {
      window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] = bridge
    }),
    unmount: vi.fn(),
  }

  mocks.createSandbox.mockReturnValue(app)

  return app
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.sourceWorkers.length = 0
  document.body.innerHTML = ''
  delete window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]
  window.history.replaceState(null, '', '/')
})

afterEach(() => {
  vi.useRealTimers()
})

describe('browser sandbox mounting', () => {
  test('mounts sandbox into owned root and removes it on unmount', async () => {
    const app = installSandboxAppMock(createLaunchBridge())
    const sandbox = await mountSandbox()

    expect(sandbox.root.id).toBe('app')
    expect(document.body.contains(sandbox.root)).toBe(true)
    expect(app.mount).toHaveBeenCalledWith(sandbox.root)

    sandbox.unmount()

    expect(app.unmount).toHaveBeenCalledOnce()
    expect(document.body.contains(sandbox.root)).toBe(false)
  })

  test('keeps provided root and remounts extension into it', async () => {
    const app = installSandboxAppMock(createLaunchBridge())
    const root = document.createElement('div')

    document.body.append(root)

    const sandbox = await launchSandboxExtension({
      fixture: 'order-with-delivery',
      mode: 'page',
    }, { root })

    expect(window.location.search).toBe('?fixture=order-with-delivery&mode=page')
    expect(sandbox.root).toBe(root)
    expect(mocks.createSandbox).toHaveBeenCalledTimes(2)
    expect(app.unmount).toHaveBeenCalledOnce()

    sandbox.unmount()

    expect(document.body.contains(root)).toBe(true)
  })

  test('launches extension with default mount options', async () => {
    installSandboxAppMock(createLaunchBridge())

    const sandbox = await launchSandboxExtension({})

    expect(sandbox.root.id).toBe('app')

    sandbox.unmount()

    expect(document.querySelector('#app')).toBeNull()
  })

  test('waits for bridge and reports timeout', async () => {
    const bridge = createLaunchBridge()

    window.setTimeout(() => {
      window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] = bridge
    }, 0)

    await expect(waitForSandboxLaunchBridge({
      intervalMs: 1,
      timeoutMs: 100,
    })).resolves.toBe(bridge)

    delete window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]

    await expect(waitForSandboxLaunchBridge({ timeoutMs: 0 }))
      .rejects.toThrow('[sandbox] Sandbox launch bridge was not installed.')
  })
})

describe('extension source worker', () => {
  test('loads string entrypoint and resolves ready message', async () => {
    const source = createExtensionSourceWorker('http://extension.test/index.ts')
    const worker = source.worker as unknown as WorkerStub & {
      postMessage: ReturnType<typeof vi.fn>;
    }

    expect(worker.postMessage).toHaveBeenCalledWith({
      entrypoint: 'http://extension.test/index.ts',
      type: 'sandbox:test-load-extension',
    })

    worker.dispatchEvent(new MessageEvent('message', {
      data: { type: 'ignored' },
    }))
    worker.dispatchEvent(new MessageEvent('message', {
      data: { type: 'sandbox:test-worker-ready' },
    }))

    await expect(source.ready).resolves.toBeUndefined()
  })

  test('loads URL entrypoint and rejects worker protocol error', async () => {
    const source = createExtensionSourceWorker(new URL('http://extension.test/index.ts'))
    const worker = source.worker as unknown as WorkerStub & {
      postMessage: ReturnType<typeof vi.fn>;
    }

    expect(worker.postMessage).toHaveBeenCalledWith({
      entrypoint: 'http://extension.test/index.ts',
      type: 'sandbox:test-load-extension',
    })

    worker.dispatchEvent(new MessageEvent('message', {
      data: {
        message: 'Cannot load extension',
        type: 'sandbox:test-worker-error',
      },
    }))

    await expect(source.ready).rejects.toThrow('Cannot load extension')
  })

  test('rejects native worker error', async () => {
    const source = createExtensionSourceWorker('http://extension.test/index.ts')
    const worker = source.worker as unknown as WorkerStub
    const error = new Error('Worker crashed')

    worker.dispatchEvent(new ErrorEvent('error', { error }))

    await expect(source.ready).rejects.toBe(error)
  })

  test('uses fallback messages for source worker failures', async () => {
    const protocolFailure = createExtensionSourceWorker('http://extension.test/protocol.ts')

    protocolFailure.worker.dispatchEvent(new MessageEvent('message', {
      data: { type: 'sandbox:test-worker-error' },
    }))

    await expect(protocolFailure.ready).rejects.toThrow('[sandbox:test] Extension worker failed.')

    const nativeFailure = createExtensionSourceWorker('http://extension.test/native.ts')

    nativeFailure.worker.dispatchEvent(new ErrorEvent('error'))

    await expect(nativeFailure.ready).rejects.toThrow('[sandbox:test] Extension worker failed.')
  })
})

describe('sandbox worker runtime', () => {
  test('runs page and widget and releases runtime resources', async () => {
    const endpoint = createEndpoint()
    const controller = createController()
    const receiver = {
      flush: vi.fn(async () => undefined),
      receive: vi.fn(),
    }
    const worker = new WorkerStub()

    mocks.createEndpoint.mockReturnValue(endpoint)
    mocks.createController.mockReturnValue(controller)
    mocks.createReceiver.mockReturnValue(receiver)

    const runtime = await createSandboxWorkerRuntime({
      descriptorUuid: 'extension-id',
      fixture: 'order-with-delivery',
      httpMiddleware: vi.fn(),
      ready: Promise.resolve(),
      worker: worker as unknown as Worker,
    })

    expect(document.body.contains(runtime.container)).toBe(true)
    expect(mocks.createController).toHaveBeenCalledWith('order-with-delivery', {
      descriptorUuid: 'extension-id',
      globalBridge: false,
      httpMiddleware: expect.any(Function),
    })
    expect(endpoint.expose).toHaveBeenCalledWith(expect.objectContaining({
      get: expect.any(Function),
      httpCall: expect.any(Function),
    }))

    await expect(runtime.runPage('returns')).resolves.toBe(runtime.container)
    await expect(runtime.runWidget('order/card:common.after')).resolves.toBe(runtime.container)

    expect(endpoint.call.run).toHaveBeenNthCalledWith(1, receiver.receive, { code: 'returns' })
    expect(endpoint.call.release).toHaveBeenCalledWith({ code: 'returns' })
    expect(controller.disposeContextSubscriptions).toHaveBeenCalledOnce()
    expect(endpoint.call.run).toHaveBeenNthCalledWith(2, receiver.receive, {
      id: 'browser-widget:order/card:common.after',
      target: 'order/card:common.after',
    })
    expect(runtime.read()).toEqual(runtime.snapshot())

    runtime.patchContext('order/card', {})
    runtime.reset()
    runtime.unmountHost()
    runtime.unmountHost()
    await runtime.teardown()

    expect(controller.disposeContextSubscriptions).toHaveBeenCalledTimes(2)
    expect(endpoint.terminate).toHaveBeenCalledOnce()
    expect(worker.terminate).toHaveBeenCalledOnce()
    expect(controller.dispose).toHaveBeenCalledOnce()
    expect(document.body.contains(runtime.container)).toBe(false)
  })

  test('resets endpoint when current run cannot be released', async () => {
    const endpoint = createEndpoint()
    const controller = createController()
    const worker = new WorkerStub()

    mocks.createEndpoint.mockReturnValue(endpoint)
    mocks.createController.mockReturnValue(controller)
    mocks.createReceiver.mockReturnValue({
      flush: vi.fn(async () => undefined),
      receive: vi.fn(),
    })

    const runtime = await createSandboxWorkerRuntime({
      worker: worker as unknown as Worker,
    })

    await runtime.runPage('returns')
    endpoint.call.release.mockRejectedValueOnce(new Error('Worker unavailable'))
    endpoint.call.reset.mockRejectedValueOnce(new Error('Endpoint unavailable'))

    await expect(runtime.teardown()).resolves.toBeUndefined()

    expect(endpoint.call.reset).toHaveBeenCalledOnce()
    expect(endpoint.terminate).toHaveBeenCalledOnce()
  })

  test('reports worker error while running extension', async () => {
    const endpoint = createEndpoint()
    const controller = createController()
    const worker = new WorkerStub()

    mocks.createEndpoint.mockReturnValue(endpoint)
    mocks.createController.mockReturnValue(controller)
    mocks.createReceiver.mockReturnValue({
      flush: vi.fn(async () => undefined),
      receive: vi.fn(),
    })
    endpoint.call.run.mockImplementationOnce(() => new Promise(() => {}))

    const runtime = await createSandboxWorkerRuntime({
      worker: worker as unknown as Worker,
    })
    const runPromise = runtime.runPage('returns')

    await Promise.resolve()
    await Promise.resolve()

    worker.dispatchEvent(new ErrorEvent('error', {
      colno: 7,
      filename: 'extension.worker.ts',
      lineno: 12,
      message: 'Worker crashed',
    }))

    await expect(runPromise).rejects.toThrow('Worker crashed (extension.worker.ts:12:7)')
    await runtime.teardown()
  })

  test('reports fallback worker error without native error details', async () => {
    const endpoint = createEndpoint()
    const controller = createController()
    const worker = new WorkerStub()

    mocks.createEndpoint.mockReturnValue(endpoint)
    mocks.createController.mockReturnValue(controller)
    mocks.createReceiver.mockReturnValue({
      flush: vi.fn(async () => undefined),
      receive: vi.fn(),
    })
    endpoint.call.run.mockImplementationOnce(() => new Promise(() => {}))

    const runtime = await createSandboxWorkerRuntime({
      worker: worker as unknown as Worker,
    })
    const runPromise = runtime.runPage('returns')

    await Promise.resolve()
    await Promise.resolve()
    worker.dispatchEvent(new ErrorEvent('error'))

    await expect(runPromise).rejects.toThrow('[sandbox:test] Worker failed.')
    await runtime.teardown()
  })
})
