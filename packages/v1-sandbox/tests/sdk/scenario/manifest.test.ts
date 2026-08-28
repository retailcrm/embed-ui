import type { SandboxLaunchConfig } from '@/scenario'

import {
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { resolveSandboxExtensionSource } from '@/scenario'

const config = (overrides: Partial<SandboxLaunchConfig> = {}): SandboxLaunchConfig => ({
  extensionUrl: '/src/direct-extension.js',
  fixture: 'order-basic',
  manifestUrl: '/extension/manifest.json',
  mode: 'widget',
  pageCode: 'orders-dashboard',
  targets: ['order/card:common.before'],
  widgetId: 'sandbox-widget',
  ...overrides,
})

const response = (
  body: unknown,
  init: {
    contentType: string;
    ok?: boolean;
    status?: number;
    url: string;
  }
): Response => ({
  headers: new Headers({
    'content-type': init.contentType,
  }),
  json: async () => body,
  ok: init.ok ?? true,
  status: init.status ?? 200,
  text: async () => String(body),
  url: init.url,
} as Response)

describe('resolveSandboxExtensionSource', () => {
  test('uses descriptor resources directly without fetching legacy manifest', async () => {
    const fetcher = vi.fn()
    const descriptor = {
      baseUrl: 'https://extension.test/runtime/',
      code: 'returns-module',
      entrypoint: 'worker.js',
      pages: ['returns'],
      stylesheet: 'styles.css',
      targets: ['order/card:common.after' as const],
    }

    const source = await resolveSandboxExtensionSource(config({
      descriptor,
      manifestUrl: 'http://legacy.test/extension/demo',
    }), { fetch: fetcher as typeof fetch })

    expect(source).toEqual({
      descriptor: {
        ...descriptor,
        entrypoint: 'https://extension.test/runtime/worker.js',
        stylesheet: 'https://extension.test/runtime/styles.css',
      },
      entrypoint: new URL('https://extension.test/runtime/worker.js'),
      httpBaseUrl: 'https://extension.test/runtime/',
      manifestUrl: null,
    })
    expect(fetcher).not.toHaveBeenCalled()
  })

  test('rejects failed manifest response', async () => {
    const fetcher = vi.fn(async () => response('', {
      contentType: 'text/plain',
      ok: false,
      status: 503,
      url: 'http://extension.test/extension/demo',
    }))

    await expect(resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension.test/extension/demo',
    }), { fetch: fetcher as typeof fetch })).rejects.toThrow(
      'Failed to load manifest \'http://extension.test/extension/demo\' (503)'
    )
  })

  test('uses a javascript manifest as worker entrypoint and infers page codes', async () => {
    const script = `
      runEndpoint(defineRunner({
        pages: [{
          returns: definePageRunner(ReturnsPage, { label: "Returns \\"archive\\"" }),
          'settings-page': definePageRunner(SettingsPage, { nested: [() => ({ value: 1 })] }),
          \`preview-page\`: definePageRunner(PreviewPage),
        }],
      }))
    `
    const fetcher = vi.fn(async () => response(script, {
      contentType: 'text/javascript; charset=utf-8',
      url: '',
    }))

    const source = await resolveSandboxExtensionSource(config({
      extensionUrl: '',
      manifestUrl: 'http://extension.test/extension/demo/script',
      mode: 'page',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual([
      'returns',
      'settings-page',
    ])
    expect(source.entrypoint.href).toBe('http://extension.test/extension/demo/script')
    expect(source.httpBaseUrl).toBe('http://extension.test/')
  })

  test('uses an unknown manifest content type as a direct worker entrypoint', async () => {
    const fetcher = vi.fn(async () => response('', {
      contentType: 'application/octet-stream',
      url: '',
    }))

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension.test/assets/worker.bin',
      mode: 'page',
      pageCode: 'settings',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual(['settings'])
    expect(source.entrypoint.href).toBe('http://extension.test/assets/worker.bin')
  })

  test('resolves html entrypoint to first head script', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/extensions/html/index.html')) {
        return response('<html><head><script src="./assets/entry.js"></script></head></html>', {
          contentType: 'text/html',
          url: 'http://sandbox.test/extensions/html/index.html',
        })
      }

      return response('runEndpoint(defineRunner({ widgets: [] }))', {
        contentType: 'application/javascript',
        url: 'http://sandbox.test/extensions/html/assets/entry.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://sandbox.test/extensions/html/index.html',
    }), { fetch: fetcher as typeof fetch })

    expect(source.entrypoint.href).toBe('http://sandbox.test/extensions/html/assets/entry.js')
    expect(source.httpBaseUrl).toBe('http://sandbox.test/')
    expect(source.descriptor.code).toBe('sandbox-widget')
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  test('infers worker runner from core-style html endpoint script', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/extension/module-id')) {
        return response(
          '<html><head><script type="module" src="/dist/returnsModule.js"></script></head></html>',
          {
            contentType: 'text/html',
            url: 'http://extension-host.test/extension/module-id',
          }
        )
      }

      if (href.endsWith('/extension/module-id/stylesheet')) {
        return response('', {
          contentType: 'text/css',
          url: 'http://extension-host.test/extension/module-id/stylesheet',
        })
      }

      return response('runEndpoint(defineRunner({ widgets: [{}], pages: [{ returns: definePageRunner(ReturnsPage) }] }))', {
        contentType: 'application/javascript',
        url: 'http://extension-host.test/dist/returnsModule.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension-host.test/extension/module-id',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual(['returns'])
    expect(source.descriptor.stylesheet).toBe(
      'http://extension-host.test/extension/module-id/stylesheet'
    )
    expect(source.entrypoint.href).toBe(
      'http://extension-host.test/dist/returnsModule.js'
    )
    expect(source.httpBaseUrl).toBe('http://extension-host.test/')
    expect(fetcher).toHaveBeenCalledTimes(3)
  })

  test('infers worker pages from core-style script even when page mode is requested', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/extension/module-id')) {
        return response(
          '<html><head><script type="module" src="/dist/returnsModule.js"></script></head></html>',
          {
            contentType: 'text/html',
            url: 'http://extension-host.test/extension/module-id',
          }
        )
      }

      if (href.endsWith('/extension/module-id/stylesheet')) {
        return response('', {
          contentType: 'text/css',
          url: 'http://extension-host.test/extension/module-id/stylesheet',
        })
      }

      return response('runEndpoint(defineRunner({ pages: [{ returns: definePageRunner(ReturnsPage) }] }))', {
        contentType: 'application/javascript',
        url: 'http://extension-host.test/dist/returnsModule.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension-host.test/extension/module-id',
      mode: 'page',
      pageCode: 'orders-dashboard',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual(['returns'])
  })

  test('keeps direct extension url fallback when manifest url is empty', async () => {
    const fetcher = vi.fn(async () => response('', {
      contentType: 'application/javascript',
      url: 'http://localhost/src/direct-extension.js',
    }))

    const source = await resolveSandboxExtensionSource(config({
      extensionUrl: '/src/direct-extension.js',
      manifestUrl: '',
    }), {
      fetch: fetcher as typeof fetch,
    })

    expect(source.descriptor.entrypoint).toBe('/src/direct-extension.js')
    expect(source.descriptor.code).toBe('sandbox-widget')
    expect(source.entrypoint.href).toBe('http://localhost/src/direct-extension.js')
    expect(source.httpBaseUrl).toBeNull()
  })

  test('resolves an html direct extension fallback', async () => {
    const fetcher = vi.fn(async () => response(
      '<html><head><script type="module" src="./worker.js"></script></head></html>',
      {
        contentType: 'text/html',
        url: 'http://extension.test/demo/index.html',
      }
    ))

    const source = await resolveSandboxExtensionSource(config({
      extensionUrl: 'http://extension.test/demo/index.html',
      manifestUrl: '',
    }), { fetch: fetcher as typeof fetch })

    expect(source.entrypoint.href).toBe('http://extension.test/demo/worker.js')
    expect(source.httpBaseUrl).toBe('http://extension.test/')
  })

  test('rejects failed or invalid direct extension fallbacks', async () => {
    const failedFetcher = vi.fn(async () => response('', {
      contentType: 'text/plain',
      ok: false,
      status: 404,
      url: 'http://extension.test/missing',
    }))
    const htmlFetcher = vi.fn(async () => response('<html><head></head></html>', {
      contentType: 'text/html',
      url: 'http://extension.test/no-script',
    }))

    await expect(resolveSandboxExtensionSource(config({
      extensionUrl: 'http://extension.test/missing',
      manifestUrl: '',
    }), { fetch: failedFetcher as typeof fetch })).rejects.toThrow(
      'Failed to load entrypoint \'http://extension.test/missing\' (404)'
    )
    await expect(resolveSandboxExtensionSource(config({
      extensionUrl: 'http://extension.test/no-script',
      manifestUrl: '',
    }), { fetch: htmlFetcher as typeof fetch })).rejects.toThrow(
      'is not a JS module and does not have a script in <head>'
    )
  })

  test('rejects html manifest without script and failed script response', async () => {
    const noScriptFetcher = vi.fn(async () => response('<html><head></head></html>', {
      contentType: 'text/html',
      url: 'http://extension.test/extension/no-script',
    }))
    const failedScriptFetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      return href.endsWith('/extension/failed-script')
        ? response('<html><head><script src="./script.js"></script></head></html>', {
          contentType: 'text/html',
          url: href,
        })
        : response('', {
          contentType: 'application/javascript',
          ok: false,
          status: 500,
          url: href,
        })
    })

    await expect(resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension.test/extension/no-script',
    }), { fetch: noScriptFetcher as typeof fetch })).rejects.toThrow(
      'does not have a script in <head>'
    )
    await expect(resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension.test/extension/failed-script',
    }), { fetch: failedScriptFetcher as typeof fetch })).rejects.toThrow(
      'Failed to load entrypoint \'http://extension.test/extension/script.js\' (500)'
    )
  })

  test('omits unavailable core stylesheet and falls back from malformed pages source', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const href = String(url)

      if (init?.method === 'HEAD') {
        return response('', {
          contentType: 'text/css',
          ok: false,
          status: 404,
          url: href,
        })
      }

      if (href.endsWith('/extension/demo')) {
        return response('<html><head><script src="./script"></script></head></html>', {
          contentType: 'text/html',
          url: href,
        })
      }

      return response('defineRunner({ pages: [{ broken: "unterminated', {
        contentType: 'application/javascript',
        url: href,
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension.test/extension/demo',
      mode: 'page',
      pageCode: 'fallback-page',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual(['fallback-page'])
    expect(source.descriptor.stylesheet).toBeNull()
  })

  test('rejects malformed manifest URL', async () => {
    await expect(resolveSandboxExtensionSource(config({
      manifestUrl: 'http://[invalid',
    }))).rejects.toThrow('Invalid URL \'http://[invalid\'')
  })
})
