#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-contexts'
const DEFAULT_NEWLINE = '\n'
const AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui-v1-contexts'
const AGENTS_SECTION_START = '<!-- embed-ui-agents:@retailcrm/embed-ui-v1-contexts:start -->'
const AGENTS_SECTION_END = '<!-- embed-ui-agents:@retailcrm/embed-ui-v1-contexts:end -->'
const README_MCP_SECTION_HEADER = '## MCP For AI Assistants: @retailcrm/embed-ui-v1-contexts'
const README_MCP_MARKER = 'embed-ui-v1-contexts://contexts'
const MCP_SERVER_NAME = 'retailcrm-embed-ui-v1-contexts'
const SKILL_NAME = 'embed-ui-v1-contexts-usage'
const SKILL_TEMPLATE_PATH = `templates/skills/${SKILL_NAME}/SKILL.md.txt`
const MCP_BIN_NAME = process.platform === 'win32' ? 'embed-ui-v1-contexts-mcp.cmd' : 'embed-ui-v1-contexts-mcp'
const RELATIVE_MCP_BIN_PATH = `./node_modules/.bin/${MCP_BIN_NAME}`
const CLAUDE_PROJECT_MCP_BIN_PATH = `\${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/${MCP_BIN_NAME}`
const WORKSPACE_MCP_BIN_PATH = `\${workspaceFolder}/node_modules/.bin/${MCP_BIN_NAME}`
const MCP_CLIENT_CONFIGS = {
  codex: {
    type: 'codex-file',
    filePath: '.codex/config.toml',
    command: RELATIVE_MCP_BIN_PATH,
  },
  cursor: {
    type: 'file',
    filePath: '.cursor/mcp.json',
    rootField: 'mcpServers',
    command: WORKSPACE_MCP_BIN_PATH,
  },
  junie: {
    type: 'file',
    filePath: '.junie/mcp/mcp.json',
    rootField: 'mcpServers',
    command: RELATIVE_MCP_BIN_PATH,
  },
  vscode: {
    type: 'file',
    filePath: '.vscode/mcp.json',
    rootField: 'servers',
    command: WORKSPACE_MCP_BIN_PATH,
    config: {
      type: 'stdio',
    },
  },
}

const HELP_TEXT = `Usage:
  npx ${PACKAGE_NAME} init-agents [target] [options]
  npx ${PACKAGE_NAME} init-config [target] [options]
  npx ${PACKAGE_NAME} init-skills [target] [options]

Options:
  -f, --force                  Replace existing managed sections and MCP server entries
      --mcp-client-configs     Comma-separated project-level MCP client configs to create (codex,cursor,junie,vscode)
      --dry-run                Print planned config changes without writing files
  -h, --help                   Show this help

Examples:
  npx ${PACKAGE_NAME} init-agents
  npx ${PACKAGE_NAME} init-skills
  npx ${PACKAGE_NAME} init-agents ./my-project
  npx ${PACKAGE_NAME} init-agents --force
  npx ${PACKAGE_NAME} init-config ./my-project
  npx ${PACKAGE_NAME} init-config ./my-project --mcp-client-configs codex,cursor,junie,vscode
`

const resolveLocalMcpBinPath = (target) => path.join(target, 'node_modules', '.bin', MCP_BIN_NAME)

const createMcpServerConfig = (command, config = {}) => ({
  ...config,
  command,
})

const printMcpNotice = (message) => {
  console.log(`MCP: ${message}`)
}

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const createSkill = () => fs.readFileSync(path.join(packageRoot, SKILL_TEMPLATE_PATH), 'utf8')

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
  return `${AGENTS_SECTION_START}
${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`./node_modules/${PACKAGE_NAME}/README.md\`.
2. Then read \`./node_modules/${PACKAGE_NAME}/docs/ru/CONCEPT.md\`.
3. Then read \`./node_modules/${PACKAGE_NAME}/docs/ru/CUSTOM.md\` if custom fields or custom dictionaries are involved.
4. Use documented public entrypoints instead of package internals:
   - \`${PACKAGE_NAME}/remote\`
   - \`${PACKAGE_NAME}/remote/settings\`
   - \`${PACKAGE_NAME}/remote/user/current\`
   - \`${PACKAGE_NAME}/remote/order/card\`
   - \`${PACKAGE_NAME}/remote/order/card-settings\`
   - \`${PACKAGE_NAME}/remote/customer/card\`
   - \`${PACKAGE_NAME}/remote/customer/card-phone\`
   - \`${PACKAGE_NAME}/remote/custom\`
   - \`${PACKAGE_NAME}/host\`
5. Do not import from \`${PACKAGE_NAME}/dist/*\`, source files, or repository-only paths.
6. When the task involves available contexts, context fields, actions, action scopes, custom contexts, custom fields, or dictionaries, use the package MCP server if it is available.
7. First read \`embed-ui-v1-contexts://contexts\`, \`embed-ui-v1-contexts://actions\`, or \`embed-ui-v1-contexts://custom-contexts\` to discover available profiles.
8. Then read the relevant resource before answering or changing code:
   - \`embed-ui-v1-contexts://contexts/<encoded-context>\`
   - \`embed-ui-v1-contexts://actions/<encoded-scope>\`
   - \`embed-ui-v1-contexts://custom-contexts/<encoded-entity>\`
9. A project \`.mcp.json\` may require restarting or reconnecting the AI client before MCP resources appear in the current session.
10. If MCP resources are not available, use generated YAML profiles from \`./node_modules/${PACKAGE_NAME}/docs/contexts/*.yml\`, \`./node_modules/${PACKAGE_NAME}/docs/actions/*.yml\`, and \`./node_modules/${PACKAGE_NAME}/docs/custom-contexts/*.yml\` as fallback sources.
11. Prefer generated profiles over guessing context shape, field names, action scopes, or semantic intent from names alone.

Suggested MCP stdio server configuration:

\`\`\`json
{
  "command": "${CLAUDE_PROJECT_MCP_BIN_PATH}"
}
\`\`\`
${AGENTS_SECTION_END}
`
}

const createMcpReadmeSection = (clientConfigs) => {
  const clientConfigText = clientConfigs.length
    ? `Client MCP configs were also requested: ${clientConfigs.map((clientConfig) => `\`${clientConfig}\``).join(', ')}. Review the generated files and restart the AI client if it is already open.`
    : 'Client MCP configs are not created by default. For supported project-level configs, rerun init with `--mcp-client-configs codex,cursor,junie,vscode`.'

  return `${README_MCP_SECTION_HEADER}

The project has an MCP server configuration for \`${PACKAGE_NAME}\`.
It exposes AI-friendly context, action, and custom context descriptions as MCP resources.
If the AI client was already running, restart or reconnect it before expecting these resources
to appear in that session.

Basic check:

\`\`\`bash
./node_modules/.bin/embed-ui-v1-contexts-mcp
\`\`\`

Primary resources:

- \`${README_MCP_MARKER}\` is the context profile index.
- \`embed-ui-v1-contexts://contexts/<encoded-context>\` is a YAML profile for one context.
- \`embed-ui-v1-contexts://actions\` is the action scope profile index.
- \`embed-ui-v1-contexts://actions/<encoded-scope>\` is a YAML profile for one action scope.
- \`embed-ui-v1-contexts://custom-contexts\` is the custom context profile index.
- \`embed-ui-v1-contexts://custom-contexts/<encoded-entity>\` is a YAML profile for one custom context entity.

${clientConfigText}

The root \`.mcp.json\` is compatible with Claude Code project scope and uses
\`${CLAUDE_PROJECT_MCP_BIN_PATH}\` so the server is resolved from the project directory.
Cursor and VS Code project configs use \`${WORKSPACE_MCP_BIN_PATH}\`. Codex and Junie use
\`${RELATIVE_MCP_BIN_PATH}\`.

### Codex CLI

Codex supports project-scoped MCP config in \`.codex/config.toml\` for trusted projects.
Create it with:

\`\`\`bash
npx ${PACKAGE_NAME} init-config --mcp-client-configs codex
codex mcp list
\`\`\`

If the server does not appear, trust the project in Codex and restart the session. The
project-level config keeps this repository pinned to its own local
\`./node_modules/.bin/embed-ui-v1-contexts-mcp\` binary.

### User-Level MCP Clients

Some clients store MCP servers in a user-level config outside this repository. Init does not edit
those files. Add the same server manually and restart the client. Use this only when this machine
works with one Embed UI project/version, because multiple user-level servers from different
projects can expose the same resource URIs and confuse the AI client.

Codex CLI user-level setup:

\`\`\`bash
codex mcp add ${MCP_SERVER_NAME} -- "$(realpath ./node_modules/.bin/embed-ui-v1-contexts-mcp)"
codex mcp list
codex mcp get ${MCP_SERVER_NAME}
\`\`\`

Equivalent \`~/.codex/config.toml\` block:

\`\`\`toml
[mcp_servers.${MCP_SERVER_NAME}]
command = "/absolute/path/to/project/node_modules/.bin/embed-ui-v1-contexts-mcp"
\`\`\`

Claude Desktop config paths:

- macOS: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
- Windows: \`%APPDATA%\\Claude\\claude_desktop_config.json\`

Config snippet:

\`\`\`json
{
  "mcpServers": {
    "${MCP_SERVER_NAME}": {
      "command": "/absolute/path/to/project/node_modules/.bin/embed-ui-v1-contexts-mcp"
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

const findMarkedSectionRange = (content) => {
  const start = content.indexOf(AGENTS_SECTION_START)
  const end = content.indexOf(AGENTS_SECTION_END, start + AGENTS_SECTION_START.length)

  if (start === -1 && end === -1) {
    return null
  }

  if (start === -1 || end === -1) {
    throw new Error(`AGENTS.md contains an incomplete ${PACKAGE_NAME} managed section marker pair`)
  }

  return {
    start,
    end: end + AGENTS_SECTION_END.length,
  }
}

const hasPackageSection = (content) =>
  content.includes(AGENTS_SECTION_START) || content.includes(AGENTS_SECTION_HEADER)

const appendSection = (content, section) => {
  const trimmed = content.replace(/\s+$/u, '')

  if (!trimmed.length) {
    return `${section}${DEFAULT_NEWLINE}`
  }

  return `${trimmed}${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}${section}${DEFAULT_NEWLINE}`
}

const replaceSection = (content, section) => {
  const markedRange = findMarkedSectionRange(content)

  if (markedRange) {
    return `${content.slice(0, markedRange.start)}${section.trimEnd()}${content.slice(markedRange.end)}`
      .replace(/\s+$/u, '') + DEFAULT_NEWLINE
  }

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

const createCodexMcpTomlSection = (serverConfig) => {
  return `[mcp_servers.${MCP_SERVER_NAME}]
command = "${serverConfig.command.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"
`
}

const writeCodexMcpServerConfig = (target, options, serverConfig) => {
  const relativePath = MCP_CLIENT_CONFIGS.codex.filePath
  const filePath = path.join(target, relativePath)
  const fileExists = fs.existsSync(filePath)
  const currentContent = fileExists ? fs.readFileSync(filePath, 'utf8') : ''
  const section = createCodexMcpTomlSection(serverConfig)
  const escapedServerName = MCP_SERVER_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sectionPattern = new RegExp(`(^|\\n)\\[mcp_servers\\.${escapedServerName}\\][\\s\\S]*?(?=\\n\\[|$)`, 'u')
  const hasServerSection = sectionPattern.test(currentContent)

  if (hasServerSection && !options.force) {
    console.log(`${relativePath} already contains ${MCP_SERVER_NAME}`)
    console.log('Nothing was changed. Re-run with --force to refresh that server entry.')
    return false
  }

  const nextContent = hasServerSection
    ? currentContent
      .replace(sectionPattern, (match, prefix) => `${prefix}${section.trimEnd()}`)
      .replace(/\s+$/u, '') + DEFAULT_NEWLINE
    : appendSection(currentContent, section)

  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, nextContent, 'utf8')
  }

  const action = fileExists ? 'updated' : 'created'
  console.log(`${relativePath} ${options.dryRun ? `would be ${action}` : `was ${action}`}`)
  return true
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

const initSkills = (target, options) => {
  if (!fs.existsSync(target)) {
    throw new Error(`Target path does not exist: ${target}`)
  }

  const stat = fs.statSync(target)

  if (!stat.isDirectory()) {
    throw new Error(`Target path is not a directory: ${target}`)
  }

  const skillPath = path.join(target, '.agents', 'skills', SKILL_NAME, 'SKILL.md')
  const fileExists = fs.existsSync(skillPath)

  if (fileExists && !options.force) {
    console.log(`${skillPath} already exists`)
    console.log('Nothing was changed. Re-run with --force to refresh that skill.')
    return
  }

  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(skillPath), { recursive: true })
    fs.writeFileSync(skillPath, createSkill(), 'utf8')
  }

  const action = fileExists ? 'updated' : 'created'
  console.log(`SKILL: ${options.dryRun ? `would ${action}` : action} ${skillPath}`)
}

const writeMcpServerConfig = (target, relativePath, rootField, options, serverConfig) => {
  const filePath = path.join(target, relativePath)
  const fileExists = fs.existsSync(filePath)
  const config = readJsonObject(filePath)
  const servers = ensureObjectField(config, rootField, filePath)

  if (servers[MCP_SERVER_NAME] && !options.force) {
    console.log(`${relativePath} already contains ${MCP_SERVER_NAME}`)
    console.log('Nothing was changed. Re-run with --force to refresh that server entry.')
    return false
  }

  servers[MCP_SERVER_NAME] = serverConfig
  writeJson(filePath, config, options.dryRun)

  const action = fileExists ? 'updated' : 'created'
  console.log(`${relativePath} ${options.dryRun ? `would be ${action}` : `was ${action}`}`)
  return true
}

const printFileClientMcpNotice = (clientConfig, target, serverConfig) => {
  const config = MCP_CLIENT_CONFIGS[clientConfig]

  printMcpNotice(`${clientConfig} MCP config points to local binary ${serverConfig.command}. Restart or reconnect the client to use new resources.`)
  printMcpNotice(`${clientConfig} config file: ${path.join(target, config.filePath)}`)
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
  const serverConfig = createMcpServerConfig(CLAUDE_PROJECT_MCP_BIN_PATH)
  const absoluteMcpBinPath = resolveLocalMcpBinPath(target)

  writeMcpServerConfig(target, '.mcp.json', 'mcpServers', options, serverConfig)
  printMcpNotice(`Project MCP config points to local binary ${serverConfig.command}. Restart or reconnect MCP clients to use new resources.`)
  if (!fs.existsSync(absoluteMcpBinPath)) {
    printMcpNotice(`Local MCP binary is not available yet. Install project dependencies before starting MCP clients: ${absoluteMcpBinPath}`)
  }

  for (const clientConfig of clientConfigs) {
    const config = MCP_CLIENT_CONFIGS[clientConfig]

    if (config.type === 'codex-file') {
      const codexServerConfig = createMcpServerConfig(config.command)

      writeCodexMcpServerConfig(target, options, codexServerConfig)
      printMcpNotice(`codex project config points to local binary ${codexServerConfig.command}. Trust the project and restart Codex to use new resources.`)
      continue
    }

    const clientServerConfig = createMcpServerConfig(config.command, config.config)

    writeMcpServerConfig(target, config.filePath, config.rootField, options, clientServerConfig)
    printFileClientMcpNotice(clientConfig, target, clientServerConfig)
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

    if (options.command === 'init-skills') {
      initSkills(options.target, options)
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
