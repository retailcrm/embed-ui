import type { SandboxOrderTarget } from '@/scenario'

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
