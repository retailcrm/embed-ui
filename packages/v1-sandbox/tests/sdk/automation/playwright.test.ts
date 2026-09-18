import type { SandboxPlaywrightPage } from '@/automation/playwright'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

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

describe('playwright automation helpers', () => {
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
    const evaluate = vi.fn(async (callback, arg) => {
      const launch = vi.fn()
      const previousWindow = globalThis.window

      try {
        globalThis.window = {
          [arg.key]: { launch },
        } as unknown as Window & typeof globalThis

        await callback(arg)
        expect(launch).toHaveBeenCalledWith(arg.launchConfig)
      } finally {
        globalThis.window = previousWindow
      }
    })
    const page = {
      evaluate,
      waitForFunction,
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
    expect(evaluate).toHaveBeenCalledOnce()
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
