#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-components'
const DEFAULT_NEWLINE = '\n'
const AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui-v1-components'

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

const createAgentsTemplate = () => {
  return `# AGENTS.md

${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`./node_modules/${PACKAGE_NAME}/docs/AI.md\`.
2. Then read \`./node_modules/${PACKAGE_NAME}/docs/COMPONENTS.md\`.
3. Then open the relevant profile from \`./node_modules/${PACKAGE_NAME}/docs/profiles/<Component>.yml\`.
4. Prefer those docs and profiles over guessing from internal implementation files.
5. Import only from documented public entrypoints:
   - \`${PACKAGE_NAME}/remote\`
   - \`${PACKAGE_NAME}/host\`
   - \`${PACKAGE_NAME}/assets/...\`
6. Prefer \`${PACKAGE_NAME}/remote\` for extension UI code.
7. Do not import from package-internal files such as \`dist/*\`, repository-only paths, or source internals.

## Suggested Reading Order

1. \`docs/AI.md\`
2. \`docs/COMPONENTS.md\`
3. The relevant profile from \`docs/profiles/*.yml\`
4. \`docs/FORMAT.md\` if you need to understand profile structure
5. Storybook and public types only when no profile exists yet
` + DEFAULT_NEWLINE
}

const createAgentsSection = () => {
  return `${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`./node_modules/${PACKAGE_NAME}/docs/AI.md\`.
2. Then read \`./node_modules/${PACKAGE_NAME}/docs/COMPONENTS.md\`.
3. Then open the relevant profile from \`./node_modules/${PACKAGE_NAME}/docs/profiles/<Component>.yml\`.
4. Prefer those docs and profiles over guessing from internal implementation files.
5. Import only from documented public entrypoints:
   - \`${PACKAGE_NAME}/remote\`
   - \`${PACKAGE_NAME}/host\`
   - \`${PACKAGE_NAME}/assets/...\`
6. Prefer \`${PACKAGE_NAME}/remote\` for extension UI code.
7. Do not import from package-internal files such as \`dist/*\`, repository-only paths, or source internals.

## Suggested Reading Order

1. \`docs/AI.md\`
2. \`docs/COMPONENTS.md\`
3. The relevant profile from \`docs/profiles/*.yml\`
4. \`docs/FORMAT.md\` if you need to understand profile structure
5. Storybook and public types only when no profile exists yet
`
}

const hasPackageSection = (content) => content.includes(AGENTS_SECTION_HEADER)

const appendSection = (content, section) => {
  const trimmed = content.replace(/\s+$/u, '')

  if (!trimmed.length) {
    return `${section}${DEFAULT_NEWLINE}`
  }

  return `${trimmed}${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}${section}${DEFAULT_NEWLINE}`
}

const replaceSection = (content, section) => {
  const escapedHeader = AGENTS_SECTION_HEADER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sectionPattern = new RegExp(`${escapedHeader}[\\s\\S]*?(?=\\n##\\s|$)`, 'u')

  if (!sectionPattern.test(content)) {
    return appendSection(content, section)
  }

  return content
    .replace(sectionPattern, section.trimEnd())
    .replace(/\s+$/u, '') + DEFAULT_NEWLINE
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
  const section = createAgentsSection()

  if (!fs.existsSync(agentsPath)) {
    fs.writeFileSync(agentsPath, createAgentsTemplate(), 'utf8')

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
