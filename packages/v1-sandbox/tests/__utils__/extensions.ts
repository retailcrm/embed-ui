import type { SandboxExtensionDescriptor, SandboxOrderTarget } from '@/scenario'

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { isSandboxOrderTarget } from '@/scenario'

export type SandboxExtensionFixturePage = {
  code: string
  menu?: string
  menuItemOrdering?: number
  menuItemTitle?: Record<string, string>
  pageHelpLink?: string | null
}

export type SandboxExtensionFixtureDescriptor = {
  code?: string
  entrypoint?: string
  fixtureName?: string
  name?: string
  pages?: SandboxExtensionFixturePage[]
  runner?: string
  stylesheet?: boolean | string
  targets?: string[]
  uuid: string
  version?: string
}

const extensionsRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../__fixtures__/extensions'
)

export const readExtensionFixture = (
  extensionName: string
): SandboxExtensionFixtureDescriptor => {
  const descriptorPath = path.join(extensionsRoot, extensionName, 'extensionrc.json')

  if (!fs.existsSync(descriptorPath)) {
    throw new Error(`[sandbox:test] Extension descriptor not found: ${descriptorPath}`)
  }

  return {
    ...JSON.parse(fs.readFileSync(descriptorPath, 'utf8')) as SandboxExtensionFixtureDescriptor,
    fixtureName: extensionName,
  }
}

export const getExtensionPageCodes = (
  descriptor: SandboxExtensionFixtureDescriptor
): string[] =>
  descriptor.pages?.map(page => page.code).filter(Boolean) ?? []

export const getExtensionTargets = (
  descriptor: SandboxExtensionFixtureDescriptor
): SandboxOrderTarget[] =>
  descriptor.targets?.filter(isSandboxOrderTarget) ?? []

export const createRuntimeExtensionDescriptor = (
  descriptor: SandboxExtensionFixtureDescriptor,
  extensionBaseUrl = process.env.SANDBOX_RUNTIME_EXTENSION_URL
    ?? process.env.SANDBOX_EXTENSION_URL
): SandboxExtensionDescriptor => {
  if (!extensionBaseUrl) {
    throw new Error('[sandbox:test] SANDBOX_EXTENSION_URL is required for extension browser tests.')
  }

  if (!descriptor.fixtureName) {
    throw new Error('[sandbox:test] Extension fixture name is required for runtime descriptor.')
  }

  const baseUrl = new URL(extensionBaseUrl)
  const runtimeUrl = new URL(`/runtime/${descriptor.fixtureName}/`, baseUrl)

  return {
    baseUrl: runtimeUrl.href,
    code: descriptor.code ?? descriptor.fixtureName,
    entrypoint: 'entrypoint.js',
    pages: getExtensionPageCodes(descriptor),
    stylesheet: descriptor.stylesheet
      ? 'stylesheet.css'
      : null,
    targets: getExtensionTargets(descriptor),
  }
}
