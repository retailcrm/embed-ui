import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage } from './types'

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { DEFAULT_NEWLINE } from './package-json'

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
  options: InitOptions,
  changes: InitChanges
): void => {
  const args: string[] = [
    '-y',
    '-p',
    packageName,
    binName,
    'init-agents',
    cwd,
  ]

  if (options.force || options.forceAgents) {
    args.push('--force')
  }

  changes.hooks.push(`npx ${args.join(' ')}`)

  if (options.dryRun) {
    return
  }

  execFileSync('npx', args, {
    cwd,
    stdio: 'inherit',
  })
}

export const applyInitAgents = (
  cwd: string,
  selectedPackages: InstallablePackage[],
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.noAgents) {
    return
  }

  updateRootAgents(cwd, options, changes)

  const selectedIds = new Set(selectedPackages.map((entry) => entry.id))

  if (selectedIds.has('components')) {
    runInitAgentsHook(
      '@retailcrm/embed-ui-v1-components',
      'embed-ui-v1-components',
      cwd,
      options,
      changes
    )
  }

  if (selectedIds.has('endpoint')) {
    if (options.noMcp) {
      changes.warnings.push('Skipping v1-endpoint init-agents because it currently includes MCP instructions')
      return
    }

    runInitAgentsHook(
      '@retailcrm/embed-ui-v1-endpoint',
      'embed-ui-v1-endpoint',
      cwd,
      options,
      changes
    )
  }
}
