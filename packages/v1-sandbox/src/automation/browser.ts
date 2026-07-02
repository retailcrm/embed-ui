import type { App as VueApp } from 'vue'

import type { SandboxLaunchBridge } from '@/automation/bridge'
import type { SandboxLaunchInput } from '@/automation/bridge'

import { createSandbox } from '@/app/createSandbox'
import { getSandboxLaunchBridge } from '@/automation/bridge'

export type MountedSandbox = {
  app: VueApp<Element>;
  bridge: SandboxLaunchBridge;
  root: HTMLElement;
  unmount(): void;
}

export type MountSandboxOptions = {
  root?: HTMLElement;
}

export type WaitForSandboxLaunchBridgeOptions = {
  intervalMs?: number;
  timeoutMs?: number;
}

export const mountSandbox = async (
  options: MountSandboxOptions = {}
): Promise<MountedSandbox> => {
  const ownsRoot = !options.root
  const root = options.root ?? createDefaultRoot()
  const app = createSandbox()

  app.mount(root)

  const bridge = await waitForSandboxLaunchBridge()

  return {
    app,
    bridge,
    root,
    unmount() {
      app.unmount()
      if (ownsRoot) {
        root.remove()
      }
    },
  }
}

export const launchSandboxExtension = async (
  config: SandboxLaunchInput,
  options: MountSandboxOptions = {}
): Promise<MountedSandbox> => {
  const sandbox = await mountSandbox(options)
  const launchUrl = sandbox.bridge.createLaunchUrl(config)

  sandbox.unmount()
  window.history.replaceState(null, '', launchUrl)

  return mountSandbox(options.root ? { root: options.root } : {})
}

export const waitForSandboxLaunchBridge = async (
  options: WaitForSandboxLaunchBridgeOptions = {}
): Promise<SandboxLaunchBridge> => {
  const timeoutMs = options.timeoutMs ?? 5_000
  const intervalMs = options.intervalMs ?? 10
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    const bridge = getSandboxLaunchBridge()

    if (bridge) {
      return bridge
    }

    await new Promise(resolve => window.setTimeout(resolve, intervalMs))
  }

  throw new Error('[sandbox] Sandbox launch bridge was not installed.')
}

const createDefaultRoot = (): HTMLElement => {
  const root = document.createElement('div')

  root.id = 'app'
  document.body.append(root)

  return root
}
