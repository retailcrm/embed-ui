import type { SandboxExtensionDescriptor } from '@/scenario'
import type { SandboxExtensionFixtureDescriptor } from './extensions'
import type { SandboxLaunchConfig, SandboxOrderTarget } from '@/scenario'

import { DEFAULT_SANDBOX_TARGET } from '@/scenario/targets'
import { DefaultSandbox } from '@/scenario'

import {
  createSandboxBrowserPath as createPublicSandboxBrowserPath,
  createSandboxPagePath as createPublicSandboxPagePath,
  createSandboxWidgetPath as createPublicSandboxWidgetPath,
  getSandboxExtensionBaseUrl,
  hasSandboxExtensionBaseUrl,
  readSandboxSnapshot,
} from '@/automation/playwright'

import {
  createRuntimeExtensionDescriptor,
  getExtensionPageCodes,
  getExtensionTargets,
} from './extensions'

export {
  getSandboxExtensionBaseUrl,
  hasSandboxExtensionBaseUrl,
  readSandboxSnapshot,
}

export const createSandboxBrowserPath = (config: SandboxLaunchConfig): string => createPublicSandboxBrowserPath(
  config,
  { sandboxPath: '/tests/__bootstrap__/index.html' }
)

export const createSandboxPageConfig = (
  descriptor: SandboxExtensionFixtureDescriptor,
  pageCode = getExtensionPageCodes(descriptor)[0]
): SandboxLaunchConfig & { descriptor: SandboxExtensionDescriptor } => ({
  descriptor: createRuntimeExtensionDescriptor(descriptor),
  fixture: DefaultSandbox.Fixture,
  mode: 'page',
  pageCode: pageCode ?? DefaultSandbox.PageCode,
  targets: [getExtensionTargets(descriptor)[0] ?? DEFAULT_SANDBOX_TARGET],
})

export const createSandboxWidgetConfig = (
  descriptor: SandboxExtensionFixtureDescriptor,
  target = getExtensionTargets(descriptor)[0]
): SandboxLaunchConfig & { descriptor: SandboxExtensionDescriptor } => ({
  descriptor: createRuntimeExtensionDescriptor(descriptor),
  fixture: DefaultSandbox.Fixture,
  mode: 'widget',
  pageCode: DefaultSandbox.PageCode,
  targets: [target ?? DEFAULT_SANDBOX_TARGET],
})

export const createSandboxPagePath = (
  descriptor: SandboxExtensionFixtureDescriptor,
  pageCode?: string
): string =>
  createPublicSandboxPagePath({
    ...createSandboxPageConfig(descriptor, pageCode),
    sandboxPath: '/tests/__bootstrap__/index.html',
  })

export const createSandboxDescriptorPagePath = (
  descriptor: SandboxExtensionFixtureDescriptor,
  pageCode = getExtensionPageCodes(descriptor)[0]
): string =>
  createPublicSandboxPagePath({
    descriptor: createRuntimeExtensionDescriptor(descriptor),
    pageCode: pageCode ?? DefaultSandbox.PageCode,
    sandboxPath: '/tests/__bootstrap__/index.html',
  })

export const createSandboxWidgetPath = (
  descriptor: SandboxExtensionFixtureDescriptor,
  target?: SandboxOrderTarget
): string =>
  createPublicSandboxWidgetPath({
    ...createSandboxWidgetConfig(descriptor, target),
    sandboxPath: '/tests/__bootstrap__/index.html',
  })
