import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

const WORKER_READY = 'sandbox:extension-worker-ready'
const WORKER_READY_ERROR = 'sandbox:extension-worker-error'

afterEach(() => {
  vi.resetModules()
  vi.unstubAllGlobals()

  delete (globalThis as typeof globalThis & {
    __SANDBOX_WORKER_BOOTSTRAPPED__?: boolean;
  }).__SANDBOX_WORKER_BOOTSTRAPPED__
})

test('reports missing extension URL', async () => {
  const postMessage = vi.fn()

  vi.stubGlobal('self', {
    location: {
      href: 'http://sandbox.test/remoteBootstrap.worker.js',
    },
    postMessage,
  })

  await import('@/app/runtime/remoteBootstrap.worker.ts?case=missing-extension')

  expect(postMessage).toHaveBeenCalledWith({
    error: '[sandbox:manifest] Missing extension worker URL.',
    type: WORKER_READY_ERROR,
  })
})

test('reports ready when extension module imports', async () => {
  const postMessage = vi.fn()
  const extensionUrl = 'data:text/javascript,globalThis.__SANDBOX_WORKER_BOOTSTRAPPED__%20%3D%20true'

  vi.stubGlobal('self', {
    location: {
      href: `http://sandbox.test/remoteBootstrap.worker.js?extension=${encodeURIComponent(extensionUrl)}`,
    },
    postMessage,
  })

  await import('@/app/runtime/remoteBootstrap.worker.ts?case=ready')

  await vi.waitFor(() => {
    expect(postMessage).toHaveBeenCalledWith({
      type: WORKER_READY,
    })
  })
  expect((globalThis as typeof globalThis & {
    __SANDBOX_WORKER_BOOTSTRAPPED__?: boolean;
  }).__SANDBOX_WORKER_BOOTSTRAPPED__).toBe(true)
})

test('reports import error when extension module fails', async () => {
  const postMessage = vi.fn()
  const extensionUrl = 'data:text/javascript,throw%20new%20Error(%22worker%20failed%22)'

  vi.stubGlobal('self', {
    location: {
      href: `http://sandbox.test/remoteBootstrap.worker.js?extension=${encodeURIComponent(extensionUrl)}`,
    },
    postMessage,
  })

  await import('@/app/runtime/remoteBootstrap.worker.ts?case=failure')

  await vi.waitFor(() => {
    expect(postMessage).toHaveBeenCalledWith({
      error: 'worker failed',
      type: WORKER_READY_ERROR,
    })
  })
})
