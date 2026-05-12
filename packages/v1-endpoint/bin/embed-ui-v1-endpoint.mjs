#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-endpoint'
const DEFAULT_NEWLINE = '\n'
const AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui-v1-endpoint'
const README_MCP_SECTION_HEADER = '## MCP For AI Assistants'
const README_MCP_MARKER = 'embed-ui-v1-endpoint://targets'
const MCP_SERVER_NAME = 'retailcrm-embed-ui-v1-endpoint'
const MCP_SERVER_CONFIG = {
  command: 'npx',
  args: ['-y', '-p', PACKAGE_NAME, 'embed-ui-v1-endpoint-mcp'],
}
const MCP_CLIENT_CONFIGS = {
  cursor: {
    filePath: '.cursor/mcp.json',
    rootField: 'mcpServers',
  },
  junie: {
    filePath: '.junie/mcp/mcp.json',
    rootField: 'mcpServers',
  },
  vscode: {
    filePath: '.vscode/mcp.json',
    rootField: 'servers',
  },
}

const HELP_TEXT = `Usage:
  npx ${PACKAGE_NAME} init-agents [target] [options]
  npx ${PACKAGE_NAME} init-config [target] [options]

Options:
  -f, --force                  Replace existing managed sections and MCP server entries
      --mcp-client-configs     Comma-separated MCP client configs to create (cursor,junie,vscode)
      --dry-run                Print planned config changes without writing files
  -h, --help                   Show this help

Examples:
  npx ${PACKAGE_NAME} init-agents
  npx ${PACKAGE_NAME} init-agents ./my-project
  npx ${PACKAGE_NAME} init-agents --force
  npx ${PACKAGE_NAME} init-config ./my-project
  npx ${PACKAGE_NAME} init-config ./my-project --mcp-client-configs cursor,junie,vscode
`

const parseArgs = (argv) => {
  const options = {
    command: null,
    target: process.cwd(),
    force: false,
    dryRun: false,
    mcpClientConfigs: [],
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

    if (argument === '--dry-run') {
      options.dryRun = true
      continue
    }

    if (argument === '--mcp-client-configs') {
      const value = argv[index + 1]
      if (!value || value.startsWith('-')) {
        throw new Error('--mcp-client-configs requires a comma-separated value')
      }

      options.mcpClientConfigs = value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
      index++
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

const createAgentsSection = () => {
  return `${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`./node_modules/${PACKAGE_NAME}/README.md\`.
2. Then read the relevant guide from \`./node_modules/${PACKAGE_NAME}/docs/README.md\`.
3. Use documented public entrypoints instead of package internals:
   - \`${PACKAGE_NAME}/remote\`
   - \`${PACKAGE_NAME}/common/targets\`
4. Do not import from \`${PACKAGE_NAME}/dist/*\`, source files, or repository-only paths.
5. When the task involves widget targets, target placement, target contexts, target metadata, or choosing a target, use the package MCP server if it is available.
6. First read \`embed-ui-v1-endpoint://targets\` to discover available target profiles.
7. Then read the relevant \`embed-ui-v1-endpoint://targets/<encoded-target>\` resource before answering or changing code related to that target.
8. If MCP resources are not available, use the generated YAML profiles from \`./node_modules/${PACKAGE_NAME}/docs/targets/*.yml\` as the fallback source.
9. Prefer target profiles over guessing target placement, contexts, or semantic intent from names alone.

Suggested MCP stdio server configuration:

\`\`\`json
{
  "command": "npx",
  "args": ["-y", "-p", "${PACKAGE_NAME}", "embed-ui-v1-endpoint-mcp"]
}
\`\`\`
`
}

const createMcpReadmeSection = (clientConfigs) => {
  const clientConfigText = clientConfigs.length
    ? `Client MCP configs were also requested: ${clientConfigs.map((clientConfig) => `\`${clientConfig}\``).join(', ')}. Review the generated files and restart the AI client if it is already open.`
    : 'Client MCP configs are not created by default. For supported project-level configs, rerun init with `--mcp-client-configs cursor,junie,vscode`.'

  return `${README_MCP_SECTION_HEADER}

The project has an MCP server configuration for \`${PACKAGE_NAME}\`.
It exposes AI-friendly widget target descriptions as MCP resources.

Basic check:

\`\`\`bash
npx -p ${PACKAGE_NAME} embed-ui-v1-endpoint-mcp
\`\`\`

Primary resources:

- \`${README_MCP_MARKER}\` is the widget target index.
- \`embed-ui-v1-endpoint://targets/<encoded-target>\` is a YAML profile for one target.

${clientConfigText}

### User-Level MCP Clients

Some clients store MCP servers in a user-level config outside this repository. Init does not edit
those files. Add the same server manually and restart the client.

Claude Desktop config paths:

- macOS: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
- Windows: \`%APPDATA%\\Claude\\claude_desktop_config.json\`

Config snippet:

\`\`\`json
{
  "mcpServers": {
    "${MCP_SERVER_NAME}": {
      "command": "npx",
      "args": ["-y", "-p", "${PACKAGE_NAME}", "embed-ui-v1-endpoint-mcp"]
    }
  }
}
\`\`\`
`
}

const createAgentsTemplate = () => {
  return `# AGENTS.md

${createAgentsSection()}` + DEFAULT_NEWLINE
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

const replaceReadmeMcpSection = (content, section) => {
  const escapedHeader = README_MCP_SECTION_HEADER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sectionPattern = new RegExp(`${escapedHeader}[\\s\\S]*?(?=\\n##\\s|$)`, 'u')

  if (!sectionPattern.test(content)) {
    return appendSection(content, section)
  }

  return content
    .replace(sectionPattern, section.trimEnd())
    .replace(/\s+$/u, '') + DEFAULT_NEWLINE
}

const readJsonObject = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {}
  }

  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${filePath} must contain a JSON object`)
  }

  return parsed
}

const ensureObjectField = (object, field, filePath) => {
  const value = object[field]

  if (!value) {
    object[field] = {}
    return object[field]
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${filePath} field "${field}" must be a JSON object`)
  }

  return value
}

const writeJson = (filePath, value, dryRun) => {
  if (dryRun) {
    return
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}${DEFAULT_NEWLINE}`, 'utf8')
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

const writeMcpServerConfig = (target, relativePath, rootField, options) => {
  const filePath = path.join(target, relativePath)
  const fileExists = fs.existsSync(filePath)
  const config = readJsonObject(filePath)
  const servers = ensureObjectField(config, rootField, filePath)

  if (servers[MCP_SERVER_NAME] && !options.force) {
    console.log(`${relativePath} already contains ${MCP_SERVER_NAME}`)
    console.log('Nothing was changed. Re-run with --force to refresh that server entry.')
    return
  }

  servers[MCP_SERVER_NAME] = MCP_SERVER_CONFIG
  writeJson(filePath, config, options.dryRun)

  const action = fileExists ? 'updated' : 'created'
  console.log(`${relativePath} ${options.dryRun ? `would be ${action}` : `was ${action}`}`)
}

const resolveMcpClientConfigs = (tokens) => {
  for (const token of tokens) {
    if (!(token in MCP_CLIENT_CONFIGS)) {
      throw new Error(`Unknown MCP client config: ${token}`)
    }
  }

  return tokens
}

const updateMcpReadmeNotes = (target, clientConfigs, options) => {
  const readmePath = path.join(target, 'README.md')
  const fileExists = fs.existsSync(readmePath)
  const currentContent = fileExists
    ? fs.readFileSync(readmePath, 'utf8')
    : '# README.md\n'
  const section = createMcpReadmeSection(clientConfigs)

  if (currentContent.includes(README_MCP_MARKER) && !options.force) {
    console.log(`README.md already contains MCP setup notes at ${readmePath}`)
    console.log('Nothing was changed. Re-run with --force to refresh that section.')
    return
  }

  const nextContent = replaceReadmeMcpSection(currentContent, section)

  if (!options.dryRun) {
    fs.writeFileSync(readmePath, nextContent, 'utf8')
  }

  const action = fileExists ? 'updated' : 'created'
  console.log(`README.md ${options.dryRun ? `would be ${action}` : `was ${action}`} with MCP setup notes`)
}

const initConfig = (target, options) => {
  if (!fs.existsSync(target)) {
    throw new Error(`Target path does not exist: ${target}`)
  }

  const stat = fs.statSync(target)

  if (!stat.isDirectory()) {
    throw new Error(`Target path is not a directory: ${target}`)
  }

  const clientConfigs = resolveMcpClientConfigs(options.mcpClientConfigs)

  writeMcpServerConfig(target, '.mcp.json', 'mcpServers', options)

  for (const clientConfig of clientConfigs) {
    const config = MCP_CLIENT_CONFIGS[clientConfig]
    writeMcpServerConfig(target, config.filePath, config.rootField, options)
  }

  updateMcpReadmeNotes(target, clientConfigs, options)
}

const main = () => {
  try {
    const options = parseArgs(process.argv.slice(2))

    if (options.command === 'init-agents') {
      initAgents(options.target, options.force)
      return
    }

    if (options.command === 'init-config') {
      initConfig(options.target, options)
      return
    }

    throw new Error(`Unknown command: ${options.command}`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    console.error('')
    console.error(HELP_TEXT)
    process.exit(1)
  }
}

main()
