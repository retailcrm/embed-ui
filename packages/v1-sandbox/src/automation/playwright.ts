import type { SandboxExtensionDescriptor } from '@/scenario'
import type { SandboxLaunchInput } from '@/automation/bridge'
import type { SandboxOrderTarget } from '@/scenario'
import type { SandboxSnapshot } from '@/core/state'

import { DEFAULT_SANDBOX_TARGET } from '@/scenario'
import { isSandboxOrderTarget } from '@/scenario'
import { parseSandboxExtensionDescriptorJson } from '@/scenario'
import { SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY } from '@/automation/bridge'

export type SandboxPlaywrightPage = {
  evaluate<R, A>(
    pageFunction: (arg: A) => R | Promise<R>,
    arg: A,
  ): Promise<R>;
  waitForFunction<R, A>(
    pageFunction: (arg: A) => R,
    arg: A,
  ): Promise<unknown>;
}

export type SandboxPlaywrightSnapshotPage = {
  evaluate<R>(
    pageFunction: () => R | Promise<R>,
  ): Promise<R>;
}

export type SandboxExtensionFixtureDescriptor = {
  pages?: Array<{ code: string }>;
  targets?: string[];
  uuid: string;
}

type SandboxWindow = Window & typeof globalThis & {
  __CRM_EMBED_SANDBOX__?: {
    snapshot(): unknown;
  };
}

export const waitForSandboxLaunchBridge = async (
  page: SandboxPlaywrightPage
): Promise<void> => {
  await page.waitForFunction((key) => {
    return Boolean(window[key as typeof SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY])
  }, SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY)
}

export const launchSandboxExtension = async (
  page: SandboxPlaywrightPage,
  config: SandboxLaunchInput
): Promise<void> => {
  await waitForSandboxLaunchBridge(page)

  await page.evaluate(({ launchConfig, key }) => {
    const bridge = window[key]

    if (!bridge) throw new Error('[sandbox] Sandbox launch bridge is not installed.')

    return bridge.launch(launchConfig)
  }, {
    key: SANDBOX_LAUNCH_BRIDGE_GLOBAL_KEY,
    launchConfig: config,
  })
}

export const getExtensionPageCodes = (
  descriptor: SandboxExtensionFixtureDescriptor
): string[] => descriptor.pages?.map(page => page.code).filter(Boolean) ?? []

export const getExtensionTargets = (
  descriptor: SandboxExtensionFixtureDescriptor
): SandboxOrderTarget[] => normalizeTargets(descriptor.targets)

export const getSandboxExtensionBaseUrl = (): string | null => {
  const value = process.env.SANDBOX_EXTENSION_URL

  if (!value) return null

  return value.endsWith('/') ? value : `${value}/`
}

export const getSandboxExtensionDescriptor = (
  value = process.env.SANDBOX_EXTENSION_DESCRIPTOR
): SandboxExtensionDescriptor | null => {
  if (!value) return null

  try {
    return parseSandboxExtensionDescriptorJson(value)
  } catch (cause) {
    throw new Error(
      '[sandbox:test] SANDBOX_EXTENSION_DESCRIPTOR must contain a valid runtime descriptor.',
      { cause }
    )
  }
}

export const hasSandboxExtensionBaseUrl = (): boolean => Boolean(getSandboxExtensionBaseUrl())

export const readSandboxSnapshot = async (
  page: SandboxPlaywrightSnapshotPage
): Promise<SandboxSnapshot> => {
  const snapshot = await page.evaluate(() => {
    const sandbox = (window as SandboxWindow).__CRM_EMBED_SANDBOX__

    if (!sandbox) {
      throw new Error('window.__CRM_EMBED_SANDBOX__ is not available')
    }

    return sandbox.snapshot()
  })

  return snapshot as SandboxSnapshot
}

const normalizeTargets = (targets: string[] | undefined): SandboxOrderTarget[] => {
  const normalizedTargets = targets?.filter(isSandboxOrderTarget) ?? []

  return normalizedTargets.length > 0 ? normalizedTargets : [DEFAULT_SANDBOX_TARGET]
}
