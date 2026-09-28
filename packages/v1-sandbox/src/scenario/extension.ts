import type { SandboxExtensionSource, SandboxLaunchConfig } from '@/scenario/types'

import { parseSandboxExtensionDescriptor } from '@/scenario/descriptor'

export type { SandboxExtensionSource } from '@/scenario/types'

export const resolveSandboxExtensionSource = async (
  config: SandboxLaunchConfig
): Promise<SandboxExtensionSource> => {
  const descriptor = parseSandboxExtensionDescriptor(config.descriptor)
  const entrypoint = new URL(descriptor.entrypoint)
  const backendUrl = new URL(entrypoint)
  const extensionSegmentIndex = backendUrl.pathname.lastIndexOf('/extension/')
  const basePath = extensionSegmentIndex >= 0
    ? backendUrl.pathname.slice(0, extensionSegmentIndex)
    : ''

  backendUrl.pathname = basePath || '/'
  backendUrl.search = ''
  backendUrl.hash = ''

  return {
    descriptor,
    entrypoint,
    httpBaseUrl: backendUrl.href,
  }
}
