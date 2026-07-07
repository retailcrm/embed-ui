#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-sandbox'
const DEFAULT_NEWLINE = '\n'
const DEFAULT_HOST = '0.0.0.0'
const DEFAULT_PORT = 4173
const DEFAULT_ENV_OUTPUT = '.env.sandbox'
const AGENTS_SECTION_HEADER = '## @retailcrm/embed-ui-v1-sandbox'
const AGENTS_SECTION_START = '<!-- embed-ui-agents:@retailcrm/embed-ui-v1-sandbox:start -->'
const AGENTS_SECTION_END = '<!-- embed-ui-agents:@retailcrm/embed-ui-v1-sandbox:end -->'
const HELP_TEXT = `Usage:
  npx ${PACKAGE_NAME} serve [--host 0.0.0.0] [--port 4173]
  npx ${PACKAGE_NAME} init-env [target] [--output .env.sandbox] [--force]
  npx ${PACKAGE_NAME} init-agents [target] [--force]

Options:
  --host <host>        Host to listen on. Default: ${DEFAULT_HOST}
  --port <port>        Port to listen on. Default: ${DEFAULT_PORT}
  --output <path>      Env file path for init-env. Default: ${DEFAULT_ENV_OUTPUT}
  --force              Overwrite env file or refresh managed AGENTS.md section
  -h, --help           Show this help

Examples:
  npx ${PACKAGE_NAME} serve
  npx ${PACKAGE_NAME} serve --host 127.0.0.1 --port 4174
  npx ${PACKAGE_NAME} init-env
  npx ${PACKAGE_NAME} init-env ./my-project
  npx ${PACKAGE_NAME} init-env --output .env.sandbox.local --force
  npx ${PACKAGE_NAME} init-agents
  npx ${PACKAGE_NAME} init-agents ./my-project --force
`

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const currentFile = fileURLToPath(import.meta.url)
const packageRoot = path.resolve(path.dirname(currentFile), '..')
const appDir = path.join(packageRoot, 'dist/app')
const indexPath = path.join(appDir, 'index.html')
const envDistPath = path.join(packageRoot, '.env.sandbox.dist')

const printUsage = () => {
  console.log(HELP_TEXT)
}

const parseArgs = (rawArgs) => {
  const args = [...rawArgs]
  const command = args[0] && !args[0].startsWith('-') ? args.shift() : 'serve'
  const positionals = []
  const options = {
    command,
    force: false,
    host: DEFAULT_HOST,
    output: DEFAULT_ENV_OUTPUT,
    port: DEFAULT_PORT,
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--help' || arg === '-h') {
      options.help = true
    } else if (arg === '--host') {
      options.host = args[index + 1] ?? options.host
      index += 1
    } else if (arg.startsWith('--host=')) {
      options.host = arg.slice('--host='.length)
    } else if (arg === '--port') {
      options.port = Number(args[index + 1] ?? options.port)
      index += 1
    } else if (arg.startsWith('--port=')) {
      options.port = Number(arg.slice('--port='.length))
    } else if (arg === '--output') {
      options.output = args[index + 1] ?? options.output
      index += 1
    } else if (arg.startsWith('--output=')) {
      options.output = arg.slice('--output='.length)
    } else if (arg === '--force') {
      options.force = true
    } else if (arg === '-f') {
      options.force = true
    } else if (!arg.startsWith('-')) {
      positionals.push(arg)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (positionals.length > 1) {
    throw new Error('Too many positional arguments')
  }

  if (positionals.length === 1 && command !== 'init-agents' && command !== 'init-env') {
    throw new Error(`Unexpected positional argument for ${command}: ${positionals[0]}`)
  }

  if (positionals.length === 1) {
    options.target = path.resolve(process.cwd(), positionals[0])
  } else {
    options.target = process.cwd()
  }

  if (!Number.isInteger(options.port) || options.port <= 0) {
    throw new Error(`Invalid port: ${options.port}`)
  }

  return options
}

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

const createPackageDocsPath = (target) => {
  if (isPackageRoot(packageRoot) && isInsideDirectory(target, packageRoot)) {
    return withDotPrefix(toPosixPath(path.relative(target, packageRoot)))
  }

  return `./node_modules/${PACKAGE_NAME}`
}

const createAgentsTemplate = (packageDocsPath) => `# AGENTS.md

${createAgentsSection(packageDocsPath)}`

const createAgentsSection = (packageDocsPath) => `${AGENTS_SECTION_START}
${AGENTS_SECTION_HEADER}

When working with \`${PACKAGE_NAME}\` in this project:

1. Read \`${packageDocsPath}/README.md\`.
2. Then read \`${packageDocsPath}/AGENTS.md\`.
3. Use \`${packageDocsPath}/docs/index.md\` as the documentation entrypoint.
4. Use \`${packageDocsPath}/docs/usage-guide.md\` for manual sandbox usage.
5. Use \`${packageDocsPath}/docs/strategy.md\` for unit, browser, and e2e testing strategy.
6. Use \`${packageDocsPath}/docs/examples.md\` before writing extension tests.
7. Use \`${packageDocsPath}/docs/api.md\` for public imports and API boundaries.
8. Import only from documented public package subpaths, not from \`src/*\`.
9. Keep manual preview scenarios separate from automated extension tests.
10. Prefer semantic selectors and accessible names in sandbox tests.

## Suggested Reading Order

1. \`README.md\`
2. \`AGENTS.md\`
3. \`docs/index.md\`
4. \`docs/usage-guide.md\`
5. \`docs/strategy.md\`
6. \`docs/examples.md\`
7. \`docs/api.md\`
${AGENTS_SECTION_END}
`

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

const hasPackageSection = (content) => content.includes(AGENTS_SECTION_START) || content.includes(AGENTS_SECTION_HEADER)

const replaceSection = (content, section) => {
  const markedRange = findMarkedSectionRange(content)

  if (markedRange) {
    return replaceRange(content, markedRange, section)
  }

  return appendSection(content, section)
}

const sendText = (response, status, body) => {
  response.writeHead(status, {
    'content-type': 'text/plain; charset=utf-8',
  })
  response.end(body)
}

const resolveRequestPath = (requestUrl) => {
  const url = new URL(requestUrl ?? '/', 'http://sandbox.local')
  const pathname = decodeURIComponent(url.pathname)
  const relativePath = pathname.replace(/^\/+/, '')
  const normalizedPath = path.normalize(relativePath)
  const filePath = path.resolve(appDir, normalizedPath)

  if (!filePath.startsWith(`${appDir}${path.sep}`) && filePath !== appDir) {
    return null
  }

  return filePath
}

const chooseFilePath = (requestUrl) => {
  const filePath = resolveRequestPath(requestUrl)

  if (!filePath) return null

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath
  }

  if (path.extname(filePath)) {
    return undefined
  }

  return indexPath
}

const serveFile = (request, response, filePath) => {
  const extension = path.extname(filePath)
  const contentType = CONTENT_TYPES[extension] ?? 'application/octet-stream'

  response.writeHead(200, {
    'cache-control': 'no-store',
    'content-type': contentType,
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  fs.createReadStream(filePath).pipe(response)
}

const createServer = () => http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendText(response, 405, 'Method Not Allowed')
    return
  }

  try {
    const filePath = chooseFilePath(request.url)

    if (filePath === null) {
      sendText(response, 403, 'Forbidden')
      return
    }

    if (!filePath || !fs.existsSync(filePath)) {
      sendText(response, 404, 'Not Found')
      return
    }

    serveFile(request, response, filePath)
  } catch (error) {
    sendText(response, 400, error instanceof Error ? error.message : String(error))
  }
})

const serve = ({ host, port }) => {
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Built sandbox app was not found at ${indexPath}. Run package build first.`)
  }

  const server = createServer()

  server.listen(port, host, () => {
    console.log(`v1-sandbox is available at http://${host}:${port}`)
  })
}

const initEnv = ({ force, output, target }) => {
  if (!fs.existsSync(envDistPath)) {
    throw new Error(`Env template was not found at ${envDistPath}.`)
  }

  if (!fs.existsSync(target)) {
    throw new Error(`Target path does not exist: ${target}`)
  }

  if (!fs.statSync(target).isDirectory()) {
    throw new Error(`Target path is not a directory: ${target}`)
  }

  const outputPath = path.resolve(target, output)

  if (fs.existsSync(outputPath) && !force) {
    console.log(`Env file already exists at ${outputPath}. Nothing was changed. Re-run with --force to overwrite it.`)
    return
  }

  fs.copyFileSync(envDistPath, outputPath)
  console.log(`Created ${outputPath}`)
}

const initAgents = ({ force, target }) => {
  if (!fs.existsSync(target)) {
    throw new Error(`Target path does not exist: ${target}`)
  }

  if (!fs.statSync(target).isDirectory()) {
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

try {
  const options = parseArgs(process.argv.slice(2))

  if (options.help) {
    printUsage()
  } else if (options.command === 'init-agents') {
    initAgents(options)
  } else if (options.command === 'init-env') {
    initEnv(options)
  } else if (options.command === 'serve') {
    serve(options)
  } else {
    throw new Error(`Unknown command: ${options.command}`)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  printUsage()
  process.exitCode = 1
}
