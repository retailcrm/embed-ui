import type { SandboxPlaywrightPage } from '@/automation/playwright'

import {
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import {
  createExtensionManifestUrl,
  createExternalExtensionUrl,
  createSandboxBrowserPath,
  createSandboxPagePath,
  createSandboxWidgetPath,
} from '@/automation/playwright'
import { DefaultSandbox } from '@/scenario'
import {
  getExtensionPageCodes,
  getExtensionTargets,
  getSandboxExtensionBaseUrl,
  hasSandboxExtensionBaseUrl,
  launchSandboxExtension,
  readSandboxSnapshot,
  waitForSandboxLaunchBridge,
} from '@/automation/playwright'

describe('playwright automation helpers', () => {
  test('creates page sandbox path from direct extension entrypoint', () => {
    const path = createSandboxPagePath({
      extensionUrl: 'http://127.0.0.1:5173/web/endpoint/endpoint.worker.ts',
      manifestUrl: 'http://127.0.0.1:5173/web/endpoint/endpoint.worker.ts',
      pageCode: 'settings',
      sandboxBaseUrl: 'http://127.0.0.1:4173',
      targets: ['order/card:common.after'],
    })

    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(url.pathname).toBe('/')
    expect(url.searchParams.get('mode')).toBe('page')
    expect(url.searchParams.get('pageCode')).toBe('settings')
    expect(url.searchParams.get('targets')).toBe('order/card:common.after')
    expect(url.searchParams.get('manifestUrl')).toBe('http://127.0.0.1:5173/web/endpoint/endpoint.worker.ts')
  })

  test('creates widget sandbox path and filters invalid targets', () => {
    const path = createSandboxWidgetPath({
      extensionUrl: 'http://127.0.0.1:5173/web/endpoint/endpoint.worker.ts',
      targets: ['unknown', 'order/card:common.before'],
    })

    const url = new URL(path, 'http://127.0.0.1:4173')

    expect(url.searchParams.get('mode')).toBe('widget')
    expect(url.searchParams.get('target')).toBe('order/card:common.before')
    expect(url.searchParams.get('targets')).toBe('order/card:common.before')
  })

  test('creates sandbox paths with defaults and custom path', () => {
    const path = createSandboxBrowserPath({
      extensionUrl: '',
      fixture: DefaultSandbox.Fixture,
      manifestUrl: '',
      mode: 'widget',
      pageCode: DefaultSandbox.PageCode,
      targets: [],
      widgetId: DefaultSandbox.WidgetId,
    }, {
      sandboxBaseUrl: 'http://sandbox.test/base/',
      sandboxPath: '/preview',
    })
    const pagePath = createSandboxPagePath({
      extensionUrl: 'http://extension.test/extension/page',
      sandboxBaseUrl: 'http://sandbox.test',
    })
    const widgetPath = createSandboxWidgetPath({
      extensionUrl: 'http://extension.test/extension/widget',
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
      extensionUrl: '',
      fixture: DefaultSandbox.Fixture,
      manifestUrl: '',
      mode: 'widget',
      pageCode: DefaultSandbox.PageCode,
      targets: [],
      widgetId: DefaultSandbox.WidgetId,
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
    expect(createExternalExtensionUrl(descriptor, 'http://extension.test/extension/')).toBe('http://extension.test/extension/extension-id')
    expect(createExtensionManifestUrl(descriptor, 'http://extension.test/extension/')).toBe('http://extension.test/extension/extension-id')
  })

  test('creates manifest url from environment by default', () => {
    vi.stubEnv('SANDBOX_EXTENSION_URL', 'http://extension.test/extension/')

    try {
      expect(createExtensionManifestUrl({ uuid: 'extension-id' }))
        .toBe('http://extension.test/extension/extension-id')
    } finally {
      vi.unstubAllEnvs()
    }
  })

  test('returns empty descriptor values and requires extension base URL', () => {
    const descriptor = {
      uuid: 'extension-id',
    }

    expect(getExtensionPageCodes(descriptor)).toEqual([])
    expect(getExtensionTargets(descriptor)).toEqual(['order/card:common.before'])
    expect(() => createExternalExtensionUrl(descriptor, undefined))
      .toThrow('[sandbox:test] SANDBOX_EXTENSION_URL is required for extension browser tests.')
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
    const waitForURL = vi.fn(async (matcher: (url: URL) => boolean) => {
      expect(matcher(new URL(
        'http://sandbox.test/?mode=widget&targets=order%2Fcard%3Acommon.before%2Corder%2Fcard%3Acommon.after'
      ))).toBe(true)
      expect(matcher(new URL('http://sandbox.test/?mode=page'))).toBe(false)
    })
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

    expect(waitForFunction).toHaveBeenCalledTimes(2)
    expect(waitForURL).toHaveBeenCalledOnce()
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
