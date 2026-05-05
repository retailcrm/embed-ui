#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-components'
const DEFAULT_NEWLINE = '\n'
const AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui-v1-components'
const AGENTS_SECTION_START = '<!-- embed-ui-agents:start -->'
const AGENTS_SECTION_END = '<!-- embed-ui-agents:end -->'

const HELP_TEXT = `Usage:
  npx ${PACKAGE_NAME} init-agents [target] [options]

Options:
  -f, --force           Replace existing package section in AGENTS.md
  -h, --help            Show this help

Examples:
  npx ${PACKAGE_NAME} init-agents
  npx ${PACKAGE_NAME} init-agents ./my-project
  npx ${PACKAGE_NAME} init-agents --force
`

const toPosixPath = (value) => value.split(path.sep).join('/')

const withDotPrefix = (value) => {
  if (!value || value === '.') {
    return '.'
  }

  return value.startsWith('.') ? value : `./${value}`
}

const isPackageRoot = (directory) => {
  const packageJsonPath = path.join(directory, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    return false
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    return packageJson.name === PACKAGE_NAME
  } catch {
    return false
  }
}

const isInsideDirectory = (parent, child) => {
  const relativePath = path.relative(parent, child)

  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
}

const addNestedPackageCandidates = (start, addCandidate) => {
  const packagePath = path.join('node_modules', ...PACKAGE_NAME.split('/'))
  const ignoredDirectories = new Set(['.git', '.yarn', 'dist', 'node_modules'])
  const queue = [path.resolve(start)]
  const seen = new Set(queue)

  for (let index = 0; index < queue.length; index++) {
    const current = queue[index]

    addCandidate(path.join(current, packagePath))

    let entries = []

    try {
      entries = fs.readdirSync(current, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.') || ignoredDirectories.has(entry.name)) {
        continue
      }

      const next = path.join(current, entry.name)

      if (!seen.has(next)) {
        seen.add(next)
        queue.push(next)
      }
    }
  }
}

const getCurrentPackageRoot = () => {
  const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

  return isPackageRoot(packageRoot) ? packageRoot : null
}

const findPackageRoot = (target) => {
  const candidates = []
  const seen = new Set()

  const addCandidate = (candidate) => {
    const resolved = path.resolve(candidate)

    if (!seen.has(resolved)) {
      seen.add(resolved)
      candidates.push(resolved)
    }
  }

  const addNodeModulesCandidates = (start) => {
    const packagePath = path.join('node_modules', ...PACKAGE_NAME.split('/'))
    let current = path.resolve(start)

    while (true) {
      addCandidate(path.join(current, packagePath))

      const parent = path.dirname(current)

      if (parent === current) {
        break
      }

      current = parent
    }
  }

  addCandidate(target)
  addNodeModulesCandidates(target)
  addNestedPackageCandidates(target, addCandidate)

  const currentPackageRoot = getCurrentPackageRoot()

  if (currentPackageRoot && isInsideDirectory(target, currentPackageRoot)) {
    addCandidate(currentPackageRoot)
  }

  const packageRoot = candidates.find(isPackageRoot)

  if (!packageRoot) {
    throw new Error(
      `Cannot find local ${PACKAGE_NAME}. Install it in this project or run init-agents from the package workspace.`
    )
  }

  return packageRoot
}

const createPackageDocsPath = (target) => {
  const packageRoot = findPackageRoot(target)
  const relativePath = path.relative(target, packageRoot)

  return withDotPrefix(toPosixPath(relativePath))
}

const parseArgs = (argv) => {
  const options = {
    command: null,
    target: process.cwd(),
    force: false,
  }

  const positionals = []

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]

    if (argument === '-h' || argument === '--help') {
      console.log(HELP_TEXT)
      process.exit(0)
    }

    if (argument === '-f' || argument === '--force') {
      options.force = true
      continue
    }

    if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`)
    }

    positionals.push(argument)
  }

  if (!positionals.length) {
    throw new Error('Command is required')
  }

  options.command = positionals[0]

  if (positionals.length >= 2) {
    options.target = path.resolve(process.cwd(), positionals[1])
  }

  if (positionals.length > 2) {
    throw new Error('Too many positional arguments')
  }

  return options
}

const createAgentsTemplate = (packageDocsPath) => {
  return `# AGENTS.md

${createAgentsSection(packageDocsPath)}`
}

const createAgentsSection = (packageDocsPath) => {
  return `${AGENTS_SECTION_START}
${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`${packageDocsPath}/README.md\`.
2. Then read \`${packageDocsPath}/AGENTS.md\`.
3. Then read \`${packageDocsPath}/docs/AI.md\`.
4. Then read \`${packageDocsPath}/docs/COMPONENTS.md\`.
5. Then read \`${packageDocsPath}/docs/PROFILES.md\`.
6. Then open relevant component profiles from \`${packageDocsPath}/docs/profiles/components/*.yml\`.
7. For complete pages, modals, sidebars, filters, tables, or settings layouts, open the relevant
   page profile from \`${packageDocsPath}/docs/profiles/pages/*.yml\`.
8. Prefer those docs and profiles over guessing from internal implementation files.
9. Import only from documented public entrypoints:
   - \`${PACKAGE_NAME}/remote\`
   - \`${PACKAGE_NAME}/host\`
   - \`${PACKAGE_NAME}/assets/...\`
10. Prefer \`${PACKAGE_NAME}/remote\` for extension UI code.
11. Do not import from package-internal files such as \`dist/*\`, repository-only paths, or source internals.

## Suggested Reading Order

1. \`README.md\`
2. \`AGENTS.md\`
3. \`docs/AI.md\`
4. \`docs/COMPONENTS.md\`
5. \`docs/PROFILES.md\`
6. The relevant component profile from \`docs/profiles/components/*.yml\`
7. The relevant page profile from \`docs/profiles/pages/*.yml\` for full-screen or overlay composition
8. \`docs/FORMAT.md\` if you need to understand profile structure
9. Public type declarations only when no profile exists yet
${AGENTS_SECTION_END}
`
}

const findMarkedSectionRange = (content) => {
  const start = content.indexOf(AGENTS_SECTION_START)
  const end = content.indexOf(AGENTS_SECTION_END, start + AGENTS_SECTION_START.length)

  if (start === -1 && end === -1) {
    return null
  }

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`AGENTS.md contains incomplete ${PACKAGE_NAME} section markers`)
  }

  return {
    start,
    end: end + AGENTS_SECTION_END.length,
  }
}

const findLegacySectionRange = (content) => {
  const escapedHeader = AGENTS_SECTION_HEADER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const headerPattern = new RegExp(`(^|\\n)${escapedHeader}(?=\\n|$)`, 'u')
  const match = headerPattern.exec(content)

  if (!match) {
    return null
  }

  const start = match.index + match[1].length
  const afterHeader = content.slice(start + AGENTS_SECTION_HEADER.length)
  const nextExternalHeading = /\n## (?!Suggested Reading Order\b)[^\n]*/u.exec(afterHeader)

  return {
    start,
    end: nextExternalHeading
      ? start + AGENTS_SECTION_HEADER.length + nextExternalHeading.index
      : content.length,
  }
}

const hasPackageSection = (content) => {
  return Boolean(findMarkedSectionRange(content) || findLegacySectionRange(content))
}

const appendSection = (content, section) => {
  const trimmed = content.replace(/\s+$/u, '')

  if (!trimmed.length) {
    return `${section.trimEnd()}${DEFAULT_NEWLINE}`
  }

  return `${trimmed}${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}${section.trimEnd()}${DEFAULT_NEWLINE}`
}

const replaceRange = (content, range, section) => {
  const before = content.slice(0, range.start).replace(/\s+$/u, '')
  const after = content.slice(range.end).replace(/^\s+/u, '')
  const parts = []

  if (before) {
    parts.push(before)
  }

  parts.push(section.trimEnd())

  if (after) {
    parts.push(after)
  }

  return `${parts.join(`${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}`)}${DEFAULT_NEWLINE}`
}

const replaceSection = (content, section) => {
  const markedRange = findMarkedSectionRange(content)

  if (markedRange) {
    return replaceRange(content, markedRange, section)
  }

  const legacyRange = findLegacySectionRange(content)

  if (legacyRange) {
    return replaceRange(content, legacyRange, section)
  }

  return appendSection(content, section)
}

const initAgents = (target, force) => {
  if (!fs.existsSync(target)) {
    throw new Error(`Target path does not exist: ${target}`)
  }

  const stat = fs.statSync(target)

  if (!stat.isDirectory()) {
    throw new Error(`Target path is not a directory: ${target}`)
  }

  const agentsPath = path.join(target, 'AGENTS.md')
  const packageDocsPath = createPackageDocsPath(target)
  const section = createAgentsSection(packageDocsPath)

  if (!fs.existsSync(agentsPath)) {
    fs.writeFileSync(agentsPath, createAgentsTemplate(packageDocsPath), 'utf8')

    console.log(`AGENTS.md was created at ${agentsPath}`)
    console.log('Next step: review it and adjust project-specific rules if needed.')
    return
  }

  const currentContent = fs.readFileSync(agentsPath, 'utf8')

  if (force) {
    fs.writeFileSync(agentsPath, replaceSection(currentContent, section), 'utf8')
    console.log(`AGENTS.md was updated at ${agentsPath}`)
    console.log(`The ${PACKAGE_NAME} section was refreshed.`)
    return
  }

  if (hasPackageSection(currentContent)) {
    console.log(`AGENTS.md already contains a ${PACKAGE_NAME} section at ${agentsPath}`)
    console.log('Nothing was changed. Re-run with --force to refresh that section.')
    return
  }

  fs.writeFileSync(agentsPath, appendSection(currentContent, section), 'utf8')

  console.log(`AGENTS.md was updated at ${agentsPath}`)
  console.log(`The ${PACKAGE_NAME} instructions were appended to the end of the file.`)
}

const main = () => {
  try {
    const options = parseArgs(process.argv.slice(2))

    if (options.command !== 'init-agents') {
      throw new Error(`Unknown command: ${options.command}`)
    }

    initAgents(options.target, options.force)
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    console.error('')
    console.error(HELP_TEXT)
    process.exit(1)
  }
}

main()
