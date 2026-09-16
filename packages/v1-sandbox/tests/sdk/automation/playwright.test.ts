import type { SandboxPlaywrightPage } from '@/automation/playwright'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import {
  createSandboxBrowserPath,
  createSandboxPagePath,
  createSandboxWidgetPath,
} from '@/automation/playwright'
import { DefaultSandbox } from '@/scenario'
import {
  getExtensionPageCodes,
  getExtensionTargets,
  getSandboxExtensionBaseUrl,
  getSandboxExtensionDescriptor,
  hasSandboxExtensionBaseUrl,
  launchSandboxExtension,
  readSandboxSnapshot,
  waitForSandboxLaunchBridge,
} from '@/automation/playwright'

afterEach(() => {
  vi.unstubAllEnvs()
})

const descriptor = {
  runner: 'worker' as const,
  entrypoint: 'http://extension.test/script',
  pages: ['settings'],
  stylesheet: null,
  targets: ['order/card:common.after' as const],
}

describe('playwright automation helpers', () => {
  test('uses the default sandbox URL', () => {
    const path = createSandboxPagePath({
      descriptor,
      pageCode: 'settings',
    })
    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(url.pathname).toBe('/')
    expect(url.searchParams.get('mode')).toBe('page')
    expect(url.searchParams.get('pageCode')).toBe('settings')
  })

  test('creates sandbox path from runtime descriptor', () => {
    const descriptor = {
      runner: 'worker' as const,
      entrypoint: 'https://extension.test/runtime/worker.js',
      pages: ['settings'],
      stylesheet: null,
      targets: ['order/card:common.after' as const],
    }
    const path = createSandboxPagePath({
      descriptor,
      pageCode: 'settings',
      sandboxBaseUrl: 'http://127.0.0.1:4173',
    })
    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(JSON.parse(url.searchParams.get('descriptor') ?? '')).toEqual(descriptor)
    expect(url.searchParams.has('manifestUrl')).toBe(false)
    expect(url.searchParams.has('extensionUrl')).toBe(false)
  })

  test('creates page sandbox path from direct extension entrypoint', () => {
    const path = createSandboxPagePath({
      descriptor,

      pageCode: 'settings',
      sandboxBaseUrl: 'http://127.0.0.1:4173',
      targets: ['order/card:common.after'],
    })

    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(url.pathname).toBe('/')
    expect(url.searchParams.get('mode')).toBe('page')
    expect(url.searchParams.get('pageCode')).toBe('settings')
    expect(url.searchParams.get('targets')).toBe('order/card:common.after')
    expect(JSON.parse(url.searchParams.get('descriptor') ?? '')).toEqual(descriptor)
  })

  test.each([createSandboxWidgetPath, createSandboxPagePath])(
    'uses descriptor targets when no override is provided (%#)',
    createPath => {
      const url = new URL(createPath({ descriptor }), 'http://127.0.0.1:4173')

      expect(url.searchParams.get('target')).toBe('order/card:common.after')
      expect(url.searchParams.get('targets')).toBe('order/card:common.after')
    }
  )

  test('creates widget sandbox path and filters invalid targets', () => {
    const path = createSandboxWidgetPath({
      descriptor,
      targets: ['unknown', 'order/card:common.before'],
    })

    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(url.searchParams.get('mode')).toBe('widget')
    expect(url.searchParams.get('target')).toBe('order/card:common.before')
    expect(url.searchParams.get('targets')).toBe('order/card:common.before')
  })

  test('creates sandbox paths with defaults and custom path', () => {
    const path = createSandboxBrowserPath({
      descriptor,
      fixture: DefaultSandbox.Fixture,
      mode: 'widget',
      pageCode: DefaultSandbox.PageCode,
      targets: [],
    }, {
      sandboxBaseUrl: 'http://sandbox.test/base/',
      sandboxPath: '/preview',
    })
    const pagePath = createSandboxPagePath({
      descriptor,
      sandboxBaseUrl: 'http://sandbox.test',
    })
    const widgetPath = createSandboxWidgetPath({
      descriptor,
      sandboxBaseUrl: 'http://sandbox.test',
      targets: ['unknown'],
    })

    expect(new URL(path, 'http://sandbox.test').pathname).toBe('/preview')
    expect(new URL(pagePath, 'http://sandbox.test').searchParams.get('pageCode'))
      .toBe(DefaultSandbox.PageCode)
    expect(new URL(widgetPath, 'http://sandbox.test').searchParams.get('target'))
      .toBe('order/card:common.before')
  })

  test('creates browser path with default options', () => {
    const path = createSandboxBrowserPath({
      descriptor,
      fixture: DefaultSandbox.Fixture,
      mode: 'widget',
      pageCode: DefaultSandbox.PageCode,
      targets: [],
    })

    expect(new URL(path, 'http://127.0.0.1:4173').pathname).toBe('/')
  })

  test('reads fixture descriptor values', () => {
    const descriptor = {
      pages: [{ code: 'settings' }],
      targets: ['unknown', 'order/card:common.after'],
      uuid: 'extension-id',
    }

    expect(getExtensionPageCodes(descriptor)).toEqual(['settings'])
    expect(getExtensionTargets(descriptor)).toEqual(['order/card:common.after'])
  })

  test('reads extension base URL from environment', () => {
    vi.stubEnv('SANDBOX_EXTENSION_URL', 'http://extension.test/extension')

    expect(hasSandboxExtensionBaseUrl()).toBe(true)
    expect(getSandboxExtensionBaseUrl()).toBe('http://extension.test/extension/')
  })

  test('returns null when extension base URL is not configured', () => {
    vi.stubEnv('SANDBOX_EXTENSION_URL', '')

    expect(hasSandboxExtensionBaseUrl()).toBe(false)
    expect(getSandboxExtensionBaseUrl()).toBeNull()
  })

  test('keeps trailing slash in extension base URL', () => {
    vi.stubEnv('SANDBOX_EXTENSION_URL', 'http://extension.test/extension/')

    expect(getSandboxExtensionBaseUrl()).toBe('http://extension.test/extension/')
  })

  test('reads runtime descriptor from environment', () => {
    const descriptor = {
      runner: 'worker' as const,
      entrypoint: 'http://extension.test/extension/id/script',
      pages: ['settings'],
      stylesheet: null,
      targets: [],
    }

    vi.stubEnv('SANDBOX_EXTENSION_DESCRIPTOR', JSON.stringify(descriptor))

    expect(getSandboxExtensionDescriptor()).toEqual(descriptor)
  })

  test('reports invalid runtime descriptor from environment', () => {
    vi.stubEnv('SANDBOX_EXTENSION_DESCRIPTOR', '{"code":"promoModule"}')

    expect(() => getSandboxExtensionDescriptor()).toThrow(
      '[sandbox:test] SANDBOX_EXTENSION_DESCRIPTOR must contain a valid runtime descriptor.'
    )
  })

  test('waits for launch bridge and launches extension', async () => {
    const waitForFunction = vi.fn(async (callback, key) => {
      const previousWindow = globalThis.window

      try {
        globalThis.window = {
          [key]: {},
        } as unknown as Window & typeof globalThis

        expect(callback(key)).toBe(true)
      } finally {
        globalThis.window = previousWindow
      }
    })
    const waitForURL = vi.fn(async () => undefined)
    const evaluate = vi.fn(async (callback, arg) => {
      const launch = vi.fn()
      const previousWindow = globalThis.window

      try {
        globalThis.window = {
          [arg.key]: { launch },
        } as unknown as Window & typeof globalThis

        callback(arg)
        expect(launch).toHaveBeenCalledWith(arg.launchConfig)
      } finally {
        globalThis.window = previousWindow
      }
    })
    const page = {
      evaluate,
      waitForFunction,
      waitForURL,
    } as unknown as SandboxPlaywrightPage

    await waitForSandboxLaunchBridge(page)
    await launchSandboxExtension(page, {
      fixture: undefined,
      mode: 'widget',
      targets: [
        'order/card:common.before',
        'order/card:common.after',
      ],
    })

    expect(waitForFunction).toHaveBeenCalledTimes(3)
    expect(waitForURL).not.toHaveBeenCalled()
    expect(evaluate).toHaveBeenCalledOnce()
  })

  test('launches extension without waiting for URL', async () => {
    const page = {
      evaluate: vi.fn(async () => undefined),
      waitForFunction: vi.fn(async () => undefined),
      waitForURL: vi.fn(async () => undefined),
    } as unknown as SandboxPlaywrightPage

    await launchSandboxExtension(page, {
      mode: 'page',
    }, {
      waitForUrl: false,
    })

    expect(page.waitForURL).not.toHaveBeenCalled()
  })

  test('reads sandbox snapshot from page global', async () => {
    const snapshot = {
      host: {
        http: [],
      },
    }
    const page = {
      evaluate: async <R>(callback: () => R | Promise<R>): Promise<R> => {
        const previousWindow = globalThis.window

        try {
          globalThis.window = {
            __CRM_EMBED_SANDBOX__: {
              snapshot: () => snapshot,
            },
          } as unknown as Window & typeof globalThis

          return await callback()
        } finally {
          globalThis.window = previousWindow
        }
      },
    }

    await expect(readSandboxSnapshot(page)).resolves.toBe(snapshot)
  })

  test('fails when sandbox snapshot global is unavailable', async () => {
    const page = {
      evaluate: async <R>(callback: () => R | Promise<R>): Promise<R> => {
        const previousWindow = globalThis.window

        try {
          globalThis.window = {} as Window & typeof globalThis

          return await callback()
        } finally {
          globalThis.window = previousWindow
        }
      },
    }

    await expect(readSandboxSnapshot(page))
      .rejects.toThrow('window.__CRM_EMBED_SANDBOX__ is not available')
  })
})
