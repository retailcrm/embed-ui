import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import {
  getSandboxLaunchBridge,
  requireSandboxLaunchBridge,
  SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY,
} from '@/automation/bridge'

describe('sandbox launch bridge', () => {
  afterEach(() => {
    delete (globalThis as typeof globalThis & Record<string, unknown>)[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]
  })

  test('reads installed bridge from provided host', () => {
    const bridge = {
      createLaunchUrl: () => 'http://sandbox.test/',
      getLaunchConfig: () => ({
        extensionUrl: '',
        fixture: 'order-basic',
        manifestUrl: '',
        mode: 'widget' as const,
        pageCode: 'returns',
        targets: ['order/card:common.before' as const],
        widgetId: 'sandbox-widget',
      }),
      launch: () => {},
    }
    const host = {
      [SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]: bridge,
    } as typeof globalThis & {
      [SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]: typeof bridge;
    }

    expect(getSandboxLaunchBridge(host)).toBe(bridge)
    expect(requireSandboxLaunchBridge(host)).toBe(bridge)
  })

  test('throws when bridge is not installed', () => {
    const host = {} as typeof globalThis

    expect(getSandboxLaunchBridge(host)).toBeUndefined()
    expect(() => requireSandboxLaunchBridge(host))
      .toThrow('[sandbox] Sandbox launch bridge is not installed.')
  })

  test('reads bridge from default global host', () => {
    const bridge = {
      createLaunchUrl: () => 'http://sandbox.test/',
      getLaunchConfig: () => ({
        extensionUrl: '',
        fixture: 'order-basic',
        manifestUrl: '',
        mode: 'widget' as const,
        pageCode: 'returns',
        targets: ['order/card:common.before' as const],
        widgetId: 'sandbox-widget',
      }),
      launch: () => {},
    }

    const host = globalThis as typeof globalThis & Record<string, unknown>

    host[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY] = bridge

    expect(getSandboxLaunchBridge()).toBe(bridge)
    expect(requireSandboxLaunchBridge()).toBe(bridge)
  })
})
