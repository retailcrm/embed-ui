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
  window.localStorage.clear()
})

const createLaunchBridge = (): SandboxLaunchBridge => ({
  getLaunchConfig: () => ({
    fixture: 'order-basic',
    mode: 'widget',
    pageCode: 'returns',
    targets: ['order/card:common.before'],
  }),
  launch: async () => {},
})

const createPage = (): {
  evaluated: unknown[];
  page: SandboxPlaywrightPage;
  waitForFunctionCalls: unknown[];
} => {
  const evaluated: unknown[] = []
  const waitForFunctionCalls: unknown[] = []

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
    },
    waitForFunctionCalls,
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

test('cleans up the host when launching without a descriptor', async () => {
  await expect(launchSandboxExtensionInBrowser({ mode: 'page' }))
    .rejects.toThrow('Invalid extension descriptor')
  expect(document.querySelector('#app')).toBeNull()
  expect(getSandboxLaunchBridge()).toBeUndefined()
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

test('launches extension through the existing playwright page bridge', async () => {
  const {
    evaluated,
    page,
  } = createPage()

  await launchSandboxExtensionInPlaywright(page, {
    mode: 'page',
    pageCode: 'returns',
  })

  expect(evaluated).toEqual([
    {
      key: '__CRM_EMBED_SANDBOX_LAUNCH__',
      launchConfig: {
        mode: 'page',
        pageCode: 'returns',
      },
    },
  ])
})

test('waits only for the existing launch bridge before launching through playwright', async () => {
  const { page, waitForFunctionCalls } = createPage()

  await launchSandboxExtensionInPlaywright(page, {
    mode: 'widget',
    targets: ['order/card:common.before', 'order/card:common.after'],
  })

  expect(waitForFunctionCalls).toHaveLength(1)
})
