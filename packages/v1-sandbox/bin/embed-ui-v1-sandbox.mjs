#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-sandbox'
const DEFAULT_HOST = '0.0.0.0'
const DEFAULT_PORT = 4173
const DEFAULT_ENV_OUTPUT = '.env.sandbox'
const HELP_TEXT = `Usage:
  npx ${PACKAGE_NAME} serve [--host 0.0.0.0] [--port 4173]
  npx ${PACKAGE_NAME} init-env [--output .env.sandbox] [--force]

Options:
  --host <host>        Host to listen on. Default: ${DEFAULT_HOST}
  --port <port>        Port to listen on. Default: ${DEFAULT_PORT}
  --output <path>      Env file path for init-env. Default: ${DEFAULT_ENV_OUTPUT}
  --force              Overwrite env file if it already exists
  -h, --help           Show this help

Examples:
  npx ${PACKAGE_NAME} serve
  npx ${PACKAGE_NAME} serve --host 127.0.0.1 --port 4174
  npx ${PACKAGE_NAME} init-env
  npx ${PACKAGE_NAME} init-env --output .env.sandbox.local --force
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
const envDistPath = path.join(packageRoot, '.env.dist')

const printUsage = () => {
  console.log(HELP_TEXT)
}

const parseArgs = (rawArgs) => {
  const args = [...rawArgs]
  const command = args[0] && !args[0].startsWith('-') ? args.shift() : 'serve'
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
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!Number.isInteger(options.port) || options.port <= 0) {
    throw new Error(`Invalid port: ${options.port}`)
  }

  return options
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

const initEnv = ({ force, output }) => {
  if (!fs.existsSync(envDistPath)) {
    throw new Error(`Env template was not found at ${envDistPath}.`)
  }

  const outputPath = path.resolve(process.cwd(), output)

  if (fs.existsSync(outputPath) && !force) {
    throw new Error(`Env file already exists at ${outputPath}. Use --force to overwrite it.`)
  }

  fs.copyFileSync(envDistPath, outputPath)
  console.log(`Created ${outputPath}`)
}

try {
  const options = parseArgs(process.argv.slice(2))

  if (options.help) {
    printUsage()
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
