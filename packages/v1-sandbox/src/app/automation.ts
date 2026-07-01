import type { SandboxLaunchConfig } from '@/dev/types'

export const SANDBOX_APP_BRIDGE_GLOBAL_KEY = '__CRM_EMBED_SANDBOX_APP__' as const

export type SandboxLaunchInput = Partial<SandboxLaunchConfig>

export type SandboxAppBridge = {
  createLaunchUrl(config: SandboxLaunchInput): string;
  getLaunchConfig(): SandboxLaunchConfig;
  launch(config: SandboxLaunchInput): void;
}

export type SandboxAppBridgeHost = typeof globalThis & {
  [SANDBOX_APP_BRIDGE_GLOBAL_KEY]?: SandboxAppBridge;
}

export const getSandboxAppBridge = (
  host: SandboxAppBridgeHost = globalThis as SandboxAppBridgeHost
): SandboxAppBridge | undefined => host[SANDBOX_APP_BRIDGE_GLOBAL_KEY]

export const requireSandboxAppBridge = (
  host: SandboxAppBridgeHost = globalThis as SandboxAppBridgeHost
): SandboxAppBridge => {
  const bridge = getSandboxAppBridge(host)

  if (!bridge) {
    throw new Error('[sandbox:app] Sandbox app bridge is not installed.')
  }

  return bridge
}

declare global {
  interface Window {
    __CRM_EMBED_SANDBOX_APP__?: SandboxAppBridge;
  }
}
