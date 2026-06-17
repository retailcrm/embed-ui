import type { SandboxLaunchConfig } from '@/dev/launch'

import {
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { resolveSandboxExtensionSource } from '@/dev/manifest'

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
  test('loads descriptor manifest and resolves worker entrypoint', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/manifest.json')) {
        return response({
          entrypoint: './entry.js',
          runner: 'worker',
          targets: ['order/card:common.after'],
          uuid: 'external-extension',
        }, {
          contentType: 'application/json',
          url: 'http://sandbox.local/extensions/demo/manifest.json',
        })
      }

      return response('', {
        contentType: 'application/javascript',
        url: 'http://sandbox.local/extensions/demo/entry.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config(), { fetch: fetcher as typeof fetch })

    expect(source.descriptor).toMatchObject({
      entrypoint: 'http://sandbox.local/extensions/demo/entry.js',
      runner: 'worker',
      targets: ['order/card:common.after'],
      uuid: 'external-extension',
    })
    expect(source.entrypoint.href).toBe('http://sandbox.local/extensions/demo/entry.js')
  })

  test('resolves html entrypoint to first head script', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/manifest.json')) {
        return response({
          entrypoint: './index.html',
          runner: 'worker',
          uuid: 'html-extension',
        }, {
          contentType: 'application/json',
          url: 'http://sandbox.local/extensions/html/manifest.json',
        })
      }

      return response('<html><head><script src="./assets/entry.js"></script></head></html>', {
        contentType: 'text/html',
        url: 'http://sandbox.local/extensions/html/index.html',
      })
    })

    const source = await resolveSandboxExtensionSource(config(), { fetch: fetcher as typeof fetch })

    expect(source.entrypoint.href).toBe('http://sandbox.local/extensions/html/assets/entry.js')
  })

  test('infers iframe runner from core-style html endpoint script', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/extension/module-id')) {
        return response(
          '<html><head><script type="module" src="/dist/allTargetsButton.js"></script></head></html>',
          {
            contentType: 'text/html',
            url: 'http://extension-host.local/extension/module-id',
          }
        )
      }

      if (href.endsWith('/extension/module-id/stylesheet')) {
        return response('', {
          contentType: 'text/plain',
          ok: false,
          status: 404,
          url: 'http://extension-host.local/extension/module-id/stylesheet',
        })
      }

      return response('throw new Error("This does not appear to be a child iframe")', {
        contentType: 'application/javascript',
        url: 'http://extension-host.local/dist/allTargetsButton.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension-host.local/extension/module-id',
    }), { fetch: fetcher as typeof fetch })

    expect(source.manifest).toBeNull()
    expect(source.descriptor.pages).toEqual([])
    expect(source.descriptor.runner).toBe('iframe')
    expect(source.descriptor.stylesheet).toBeNull()
    expect(source.entrypoint.href).toBe(
      'http://extension-host.local/extension/module-id'
    )
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
            url: 'http://extension-host.local/extension/module-id',
          }
        )
      }

      if (href.endsWith('/extension/module-id/stylesheet')) {
        return response('', {
          contentType: 'text/css',
          url: 'http://extension-host.local/extension/module-id/stylesheet',
        })
      }

      return response('runEndpoint(defineRunner({ widgets: [{}], pages: [{ returns: definePageRunner(ReturnsPage) }] }))', {
        contentType: 'application/javascript',
        url: 'http://extension-host.local/dist/returnsModule.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension-host.local/extension/module-id',
    }), { fetch: fetcher as typeof fetch })

    expect(source.manifest).toBeNull()
    expect(source.descriptor.pages).toEqual(['returns'])
    expect(source.descriptor.runner).toBe('worker')
    expect(source.descriptor.stylesheet).toBe(
      'http://extension-host.local/extension/module-id/stylesheet'
    )
    expect(source.entrypoint.href).toBe(
      'http://extension-host.local/dist/returnsModule.js'
    )
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
            url: 'http://extension-host.local/extension/module-id',
          }
        )
      }

      if (href.endsWith('/extension/module-id/stylesheet')) {
        return response('', {
          contentType: 'text/css',
          url: 'http://extension-host.local/extension/module-id/stylesheet',
        })
      }

      return response('runEndpoint(defineRunner({ pages: [{ returns: definePageRunner(ReturnsPage) }] }))', {
        contentType: 'application/javascript',
        url: 'http://extension-host.local/dist/returnsModule.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://extension-host.local/extension/module-id',
      mode: 'page',
      pageCode: 'orders-dashboard',
    }), { fetch: fetcher as typeof fetch })

    expect(source.descriptor.pages).toEqual(['returns'])
  })

  test('keeps iframe manifest entrypoint as html page', async () => {
    const fetcher = vi.fn(async () => response({
      entrypoint: './index.html',
      runner: 'iframe',
      targets: ['order/card:common.before'],
      uuid: 'iframe-extension',
    }, {
      contentType: 'application/json',
      url: 'http://sandbox.local/extensions/iframe/manifest.json',
    }))

    const source = await resolveSandboxExtensionSource(config(), { fetch: fetcher as typeof fetch })

    expect(source.descriptor).toMatchObject({
      entrypoint: 'http://sandbox.local/extensions/iframe/index.html',
      runner: 'iframe',
      targets: ['order/card:common.before'],
      uuid: 'iframe-extension',
    })
    expect(source.entrypoint.href).toBe('http://sandbox.local/extensions/iframe/index.html')
    expect(fetcher).toHaveBeenCalledTimes(1)
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

    expect(source.manifest).toBeNull()
    expect(source.descriptor.entrypoint).toBe('/src/direct-extension.js')
    expect(source.entrypoint.href).toBe('http://localhost/src/direct-extension.js')
  })
})
