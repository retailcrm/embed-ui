import type { SandboxExtensionDescriptor } from '@/scenario'

import { getSandboxExtensionDescriptor } from '@/automation/playwright'
import { resolveSandboxExtensionResourceUrl } from '@/scenario'

const assertResourceAvailable = async (
  descriptor: SandboxExtensionDescriptor,
  field: 'entrypoint' | 'stylesheet',
  resource: string
): Promise<void> => {
  const url = resolveSandboxExtensionResourceUrl(resource, descriptor.baseUrl)

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
    })

    if (response.ok) return

    throw new Error(`HTTP ${response.status}`)
  } catch (cause) {
    throw new Error(
      `[sandbox:e2e] Extension server is unavailable. Start it and verify descriptor ${field}: ${url.href}`,
      { cause }
    )
  }
}

export const verifyConfiguredExtensionServer = async (): Promise<void> => {
  const descriptor = getSandboxExtensionDescriptor()

  if (!descriptor) return

  await assertResourceAvailable(descriptor, 'entrypoint', descriptor.entrypoint)

  if (descriptor.stylesheet) {
    await assertResourceAvailable(descriptor, 'stylesheet', descriptor.stylesheet)
  }
}

export default verifyConfiguredExtensionServer
