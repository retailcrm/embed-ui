import type { SandboxLaunchBridge } from '@/automation/bridge'
import type { SandboxPlaywrightPage } from '@/automation/playwright'

import { afterEach, expect, test } from 'vitest'

import { getSandboxLaunchBridge } from '@/automation/bridge'
import {
  launchSandboxExtension as launchSandboxExtensionInBrowser,
} from '@/automation/browser'
import {
  launchSandboxExtension as launchSandboxExtensionInPlaywright,
} from '@/automation/playwright'
import { mountSandbox } from '@/automation/browser'
import {
  requireSandboxLaunchBridge,
  SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY,
} from '@/automation/bridge'
import {
  waitForSandboxLaunchBridge as waitForBrowserSandboxLaunchBridge,
} from '@/automation/browser'
import {
  waitForSandboxLaunchBridge as waitForPlaywrightSandboxLaunchBridge,
} from '@/automation/playwright'

afterEach(() => {
  delete window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]
  document.body.innerHTML = ''
  window.history.replaceState(null, '', '/')
  window.sessionStorage.clear()
})

const createLaunchBridge = (): SandboxLaunchBridge => ({
  createLaunchUrl: () => 'http://sandbox.test/',
  getLaunchConfig: () => ({
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'returns',
    targets: ['order/card:common.before'],
    widgetId: 'sandbox-widget',
  }),
  launch: () => {},
})

const createPage = (): {
  evaluated: unknown[];
  page: SandboxPlaywrightPage;
  waitForFunctionCalls: unknown[];
  waitForUrlCalls: Array<Parameters<SandboxPlaywrightPage['waitForURL']>[0]>;
} => {
  const evaluated: unknown[] = []
  const waitForFunctionCalls: unknown[] = []
  const waitForUrlCalls: Array<Parameters<SandboxPlaywrightPage['waitForURL']>[0]> = []

  return {
    evaluated,
    page: {
      async evaluate<R, A>(_pageFunction: (arg: A) => R | Promise<R>, arg: A): Promise<R> {
        evaluated.push(arg)
        return undefined as R
      },
      async waitForFunction<R, A>(pageFunction: (arg: A) => R, arg: A): Promise<unknown> {
        waitForFunctionCalls.push({
          arg,
          pageFunction,
        })
        return undefined
      },
      async waitForURL(matcher) {
        waitForUrlCalls.push(matcher)
      },
    },
    waitForFunctionCalls,
    waitForUrlCalls,
  }
}

test('reads sandbox launch bridge from host global key', () => {
  const bridge = createLaunchBridge()
  const host = {
    [SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]: bridge,
  } as typeof globalThis & Record<typeof SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY, SandboxLaunchBridge>

  expect(getSandboxLaunchBridge(host)).toBe(bridge)
  expect(requireSandboxLaunchBridge(host)).toBe(bridge)
})

test('throws when sandbox launch bridge is missing', () => {
  const host = {} as typeof globalThis

  expect(getSandboxLaunchBridge(host)).toBeUndefined()
  expect(() => requireSandboxLaunchBridge(host)).toThrow(
    '[sandbox] Sandbox launch bridge is not installed.'
  )
})

test('waits for sandbox launch bridge in browser global', async () => {
  const bridge = createLaunchBridge()

  window.setTimeout(() => {
    window[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] = bridge
  }, 0)

  await expect(waitForBrowserSandboxLaunchBridge({
    intervalMs: 1,
    timeoutMs: 100,
  })).resolves.toBe(bridge)
})

test('fails when sandbox launch bridge is not installed in browser global', async () => {
  await expect(waitForBrowserSandboxLaunchBridge({
    intervalMs: 1,
    timeoutMs: 1,
  })).rejects.toThrow('[sandbox] Sandbox launch bridge was not installed.')
})

test('mounts sandbox and removes owned root on unmount', async () => {
  const sandbox = await mountSandbox()

  expect(document.querySelector('#app')).toBe(sandbox.root)
  expect(sandbox.root.textContent).toContain('Подключите внешнее расширение')
  expect(sandbox.bridge.getLaunchConfig().fixture).toBe('order-basic')

  sandbox.unmount()

  expect(document.querySelector('#app')).toBeNull()
})

test('launches sandbox extension by replacing browser url and remounting', async () => {
  const root = document.createElement('div')

  document.body.append(root)

  const sandbox = await launchSandboxExtensionInBrowser({
    fixture: 'order-with-delivery',
    manifestUrl: '',
    mode: 'page',
    pageCode: 'returns',
  }, {
    root,
  })

  expect(window.location.search).toContain('fixture=order-with-delivery')
  expect(window.location.search).toContain('mode=page')
  expect(window.location.search).toContain('pageCode=returns')
  expect(sandbox.root).toBe(root)
  expect(sandbox.bridge.getLaunchConfig().fixture).toBe('order-with-delivery')

  sandbox.unmount()
})

test('waits until sandbox launch bridge is available in playwright page', async () => {
  const {
    page,
    waitForFunctionCalls,
  } = createPage()

  await waitForPlaywrightSandboxLaunchBridge(page)

  expect(waitForFunctionCalls).toHaveLength(1)
  expect(waitForFunctionCalls[0]).toEqual({
    arg: '__CRM_EMBED_SANDBOX_LAUNCH__',
    pageFunction: expect.any(Function),
  })
})

test('launches extension through playwright page bridge without waiting for url when disabled', async () => {
  const {
    evaluated,
    page,
    waitForUrlCalls,
  } = createPage()

  await launchSandboxExtensionInPlaywright(page, {
    manifestUrl: 'http://extension.test/extension/returns',
    mode: 'page',
    pageCode: 'returns',
  }, {
    waitForUrl: false,
  })

  expect(waitForUrlCalls).toHaveLength(0)
  expect(evaluated).toEqual([
    {
      key: '__CRM_EMBED_SANDBOX_LAUNCH__',
      launchConfig: {
        manifestUrl: 'http://extension.test/extension/returns',
        mode: 'page',
        pageCode: 'returns',
      },
    },
  ])
})

test('waits for launch query params when launching extension through playwright page', async () => {
  const {
    page,
    waitForUrlCalls,
  } = createPage()

  await launchSandboxExtensionInPlaywright(page, {
    manifestUrl: 'http://extension.test/extension/returns',
    mode: 'widget',
    targets: [
      'order/card:common.before',
      'order/card:common.after',
    ],
  })

  expect(waitForUrlCalls).toHaveLength(1)
  expect(waitForUrlCalls[0]).toBeInstanceOf(Function)

  const matcher = waitForUrlCalls[0] as (url: URL) => boolean

  expect(matcher(new URL(
    'http://sandbox.test/'
    + '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Freturns'
    + '&mode=widget'
    + '&targets=order%2Fcard%3Acommon.before%2Corder%2Fcard%3Acommon.after'
  ))).toBe(true)
  expect(matcher(new URL(
    'http://sandbox.test/'
    + '?manifestUrl=http%3A%2F%2Fextension.test%2Fextension%2Freturns'
    + '&mode=page'
  ))).toBe(false)
})
