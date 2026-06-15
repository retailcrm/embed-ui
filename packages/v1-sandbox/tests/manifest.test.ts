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
    url: string;
  }
): Response => ({
  headers: new Headers({
    'content-type': init.contentType,
  }),
  json: async () => body,
  ok: true,
  status: 200,
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

  test('uses core-style html endpoint as external source', async () => {
    const fetcher = vi.fn(async (url: string | URL | Request) => {
      const href = String(url)

      if (href.endsWith('/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7')) {
        return response(
          '<html><head><script type="module" src="/dist/returnsModule/extension.js"></script></head></html>',
          {
            contentType: 'text/html',
            url: 'http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7',
          }
        )
      }

      return response('', {
        contentType: 'application/javascript',
        url: 'http://web-extensions-server.simla.local/dist/returnsModule/extension.js',
      })
    })

    const source = await resolveSandboxExtensionSource(config({
      manifestUrl: 'http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7',
      mode: 'page',
      pageCode: 'returns',
    }), { fetch: fetcher as typeof fetch })

    expect(source.manifest).toBeNull()
    expect(source.descriptor.pages).toEqual(['returns'])
    expect(source.descriptor.stylesheet).toBe(
      'http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7/stylesheet'
    )
    expect(source.entrypoint.href).toBe(
      'http://web-extensions-server.simla.local/dist/returnsModule/extension.js'
    )
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
