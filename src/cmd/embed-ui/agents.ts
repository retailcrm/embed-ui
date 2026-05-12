import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage, InstallablePackageHook } from './types'
import type { PackageManager } from './args'

import fs from 'node:fs'
import path from 'node:path'

import { DEFAULT_NEWLINE } from './package-json'
import { runPackageHookCommand } from './package-hook-runner'

const ROOT_AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui'

const createRootAgentsSection = (): string => `${ROOT_AGENTS_SECTION_HEADER}

When working with RetailCRM embedded UI in this project:

1. Use documented public package entrypoints instead of package internals.
2. Read package README files from \`./node_modules/@retailcrm/embed-ui*\` before changing integration code.
3. Prefer package-provided \`AGENTS.md\`, MCP resources, YAML profiles, and docs over guessing from source names.
4. Keep widget targets, page codes, contexts, and host API contracts aligned with package documentation.
`

const appendOrReplaceSection = (
  content: string,
  header: string,
  section: string,
  force: boolean
): string | null => {
  const escapedHeader = header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sectionPattern = new RegExp(`${escapedHeader}[\\s\\S]*?(?=\\n##\\s|$)`, 'u')

  if (sectionPattern.test(content)) {
    if (!force) {
      return null
    }

    return content.replace(sectionPattern, section.trimEnd()).replace(/\s+$/u, '') + DEFAULT_NEWLINE
  }

  const trimmed = content.replace(/\s+$/u, '')

  return `${trimmed}${trimmed ? `${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}` : ''}${section}${DEFAULT_NEWLINE}`
}

const updateRootAgents = (cwd: string, options: InitOptions, changes: InitChanges): void => {
  const agentsPath = path.join(cwd, 'AGENTS.md')
  const section = createRootAgentsSection()
  const content = fs.existsSync(agentsPath)
    ? fs.readFileSync(agentsPath, 'utf8')
    : '# AGENTS.md\n'
  const nextContent = appendOrReplaceSection(content, ROOT_AGENTS_SECTION_HEADER, section, options.force || options.forceAgents)

  if (nextContent === null) {
    changes.skipped.push(`${agentsPath} already contains ${ROOT_AGENTS_SECTION_HEADER}`)
    return
  }

  if (!options.dryRun) {
    fs.writeFileSync(agentsPath, nextContent, 'utf8')
  }

  changes.agents.push(`update ${agentsPath}`)
}

const runInitAgentsHook = (
  packageName: string,
  binName: string,
  cwd: string,
  packageManager: PackageManager,
  failureMode: InstallablePackageHook['failureMode'],
  options: InitOptions,
  changes: InitChanges
): void => {
  const args: string[] = ['init-agents', cwd]

  if (options.force || options.forceAgents) {
    args.push('--force')
  }

  runPackageHookCommand(
    cwd,
    packageName,
    binName,
    packageManager,
    args,
    failureMode,
    options,
    changes
  )
}

export const applyInitAgents = (
  cwd: string,
  selectedPackages: InstallablePackage[],
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.noAgents) {
    return
  }

  updateRootAgents(cwd, options, changes)

  for (const selectedPackage of selectedPackages) {
    for (const hook of selectedPackage.hooks ?? []) {
      if (hook.type !== 'agents') {
        continue
      }

      if (hook.requiresMcp && options.noMcp) {
        changes.warnings.push(`Skipping ${selectedPackage.id} ${hook.command} because it currently includes MCP instructions`)
        continue
      }

      runInitAgentsHook(
        selectedPackage.name,
        hook.binName,
        cwd,
        packageManager,
        hook.failureMode,
        options,
        changes
      )
    }
  }
}
