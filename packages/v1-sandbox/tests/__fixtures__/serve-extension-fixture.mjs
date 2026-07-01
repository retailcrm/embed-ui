#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'

import { build } from 'vite'
import vueRemoteVitePlugin from '@omnicajs/vue-remote/vite-plugin'

const DEFAULT_FIXTURE = 'example-order-sidebar'
const DEFAULT_HOST = '127.0.0.1'
const DEFAULT_PORT = 4274

const currentFile = fileURLToPath(import.meta.url)
const fixturesRoot = path.dirname(currentFile)
const serveRoot = path.join(fixturesRoot, '.serve')

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
])

const getCorsHeaders = request => {
  const origin = request.headers.origin

  return origin
    ? {
      'access-control-allow-credentials': 'true',
      'access-control-allow-origin': origin,
      'access-control-allow-private-network': 'true',
      'access-control-allow-methods': 'GET, HEAD, OPTIONS',
      vary: 'Origin',
    }
    : {}
}

const createStaticServer = root => http.createServer((request, response) => {
  const corsHeaders = getCorsHeaders(request)

  if (request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders)
    response.end()
    return
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, corsHeaders)
    response.end()
    return
  }

  const url = new URL(request.url ?? '/', 'http://fixture.local')
  const pathname = decodeURIComponent(url.pathname)
  const relativePath = pathname === '/'
    ? 'index.html'
    : pathname.replace(/^\/+/u, '')
  const filePath = path.resolve(root, relativePath)

  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
    response.writeHead(403, corsHeaders)
    response.end()
    return
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404, corsHeaders)
      response.end()
      return
    }

    response.writeHead(200, {
      ...corsHeaders,
      'cache-control': 'no-store',
      'content-length': stats.size,
      'content-type': contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream',
    })

    if (request.method === 'HEAD') {
      response.end()
      return
    }

    fs.createReadStream(filePath).pipe(response)
  })
})

const parseArgs = (rawArgs) => {
  const options = {
    fixture: DEFAULT_FIXTURE,
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
  }

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index]

    if (arg === '--fixture') {
      options.fixture = rawArgs[index + 1] ?? options.fixture
      index += 1
    } else if (arg.startsWith('--fixture=')) {
      options.fixture = arg.slice('--fixture='.length)
    } else if (arg === '--host') {
      options.host = rawArgs[index + 1] ?? options.host
      index += 1
    } else if (arg.startsWith('--host=')) {
      options.host = arg.slice('--host='.length)
    } else if (arg === '--port') {
      options.port = Number(rawArgs[index + 1] ?? options.port)
      index += 1
    } else if (arg.startsWith('--port=')) {
      options.port = Number(arg.slice('--port='.length))
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!Number.isInteger(options.port) || options.port <= 0) {
    throw new Error(`Invalid port: ${options.port}`)
  }

  return options
}

const serve = async () => {
  const options = parseArgs(process.argv.slice(2))
  const fixtureRoot = path.resolve(fixturesRoot, options.fixture)
  const fixtureOutDir = path.join(serveRoot, options.fixture)

  if (!fixtureRoot.startsWith(`${fixturesRoot}${path.sep}`)) {
    throw new Error(`Fixture must be inside ${fixturesRoot}`)
  }

  await build({
    base: './',
    clearScreen: false,
    configFile: false,
    logLevel: 'warn',
    plugins: [
      vueRemoteVitePlugin(),
    ],
    root: fixtureRoot,
    build: {
      emptyOutDir: true,
      modulePreload: false,
      outDir: fixtureOutDir,
      target: 'esnext',
    },
  })

  const server = createStaticServer(fixtureOutDir)

  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(options.port, options.host, resolve)
  })

  console.log(`  ➜  Local:   http://${options.host}:${options.port}/`)

  const close = async () => {
    server.close(() => {
      process.exit(0)
    })
  }

  process.once('SIGINT', () => { void close() })
  process.once('SIGTERM', () => { void close() })
}

serve().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
