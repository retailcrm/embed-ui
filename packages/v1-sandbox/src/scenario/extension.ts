import type { SandboxExtensionSource, SandboxLaunchConfig } from '@/scenario/types'

import { parseSandboxExtensionDescriptor } from '@/scenario/descriptor'

export type { SandboxExtensionSource } from '@/scenario/types'

export const resolveSandboxExtensionSource = async (
  config: SandboxLaunchConfig
): Promise<SandboxExtensionSource> => {
  const descriptor = parseSandboxExtensionDescriptor(config.descriptor)
  const entrypoint = new URL(descriptor.entrypoint)

  return {
    descriptor,
    entrypoint,
    httpBaseUrl: `${entrypoint.origin}/`,
  }
}
