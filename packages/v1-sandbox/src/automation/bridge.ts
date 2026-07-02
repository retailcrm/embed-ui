import type { SandboxLaunchConfig } from '@/scenario/types'

export const SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY = '__CRM_EMBED_SANDBOX_LAUNCH__' as const

export type SandboxLaunchInput = Partial<SandboxLaunchConfig>

export type SandboxLaunchBridge = {
  createLaunchUrl(config: SandboxLaunchInput): string;
  getLaunchConfig(): SandboxLaunchConfig;
  launch(config: SandboxLaunchInput): void;
}

export type SandboxLaunchBridgeHost = typeof globalThis & {
  [SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]?: SandboxLaunchBridge;
}

export const getSandboxLaunchBridge = (
  host: SandboxLaunchBridgeHost = globalThis as SandboxLaunchBridgeHost
): SandboxLaunchBridge | undefined => host[SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY]

export const requireSandboxLaunchBridge = (
  host: SandboxLaunchBridgeHost = globalThis as SandboxLaunchBridgeHost
): SandboxLaunchBridge => {
  const bridge = getSandboxLaunchBridge(host)

  if (!bridge) {
    throw new Error('[sandbox] Sandbox launch bridge is not installed.')
  }

  return bridge
}

declare global {
  interface Window {
    __CRM_EMBED_SANDBOX_LAUNCH__?: SandboxLaunchBridge;
  }
}
