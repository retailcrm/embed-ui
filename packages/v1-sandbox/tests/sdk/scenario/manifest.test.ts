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
    expect(source.descriptor.runner).toBe('worker')
    expect(source.descriptor.uuid).toBe('sandbox-widget')
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
    expect(source.descriptor.runner).toBe('worker')
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
    expect(source.descriptor.uuid).toBe('sandbox-widget')
    expect(source.entrypoint.href).toBe('http://localhost/src/direct-extension.js')
    expect(source.httpBaseUrl).toBeNull()
  })
})
