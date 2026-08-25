import type { Plugin } from 'vite'

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig, mergeConfig } from 'vite'

import basic from './vite.config.basic'
import promoModule from './tests/__fixtures__/extensions/promoModule/extensionrc.json'
import {
  resolveReturnsBackendRequest,
} from './tests/__fixtures__/extensions/returnsModule/backend'
import returnsModule from './tests/__fixtures__/extensions/returnsModule/extensionrc.json'

type BuildManifestEntry = {
  css?: string[];
  file: string;
  isEntry?: boolean;
  name?: string;
  src?: string;
}

const packageRoot = path.dirname(fileURLToPath(import.meta.url))
const extensionsRoot = path.resolve(packageRoot, 'tests/__fixtures__/extensions')
const outputRoot = path.resolve(packageRoot, 'artifacts/e2e/extensions')
const fixtures = new Map([
  [promoModule.uuid, 'promoModule'],
  [returnsModule.uuid, 'returnsModule'],
])

const extensionFixtureServer = (): Plugin => ({
  name: 'extension-fixture-server',
  configureServer(server) {
    const entries = readBuildEntries()

    server.middlewares.use((request, response, next) => {
      if (!request.url || !request.method) {
        next()
        return
      }

      const url = new URL(request.url, 'http://extension.test')
      const isReturnsAction = [
        '/return',
        '/returns',
        '/returns/save',
      ].includes(url.pathname)

      if (request.method === 'POST' && isReturnsAction) {
        setCorsHeaders(request.headers.origin, response)
        readPayload(request).then(payload => {
          const result = resolveReturnsBackendRequest(url.pathname, payload)

          send(response, result.status, JSON.stringify(result.body), 'application/json; charset=utf-8')
        }).catch(next)
        return
      }

      const match = url.pathname.match(/^\/extension\/([^/]+)(\/.*)?$/u)

      if (!match) {
        next()
        return
      }

      const uuid = decodeURIComponent(match[1])
      const fixture = fixtures.get(uuid)

      if (!fixture) {
        send(response, 404, 'Not found', 'text/plain; charset=utf-8')
        return
      }

      setCorsHeaders(request.headers.origin, response)

      if (request.method === 'OPTIONS') {
        response.writeHead(204)
        response.end()
        return
      }

      const action = match[2] ?? ''
      const entry = entries.get(fixture)

      if (!entry) {
        throw new Error(`E2E extension build not found ${fixture}`)
      }

      if ((request.method === 'GET' || request.method === 'HEAD') && action === '') {
        const manifest = [
          '<!doctype html>',
          '<html><head>',
          `<script type="module" src="/extension/${uuid}/script"></script>`,
          '</head><body></body></html>',
        ].join('\n')

        send(response, 200, manifest, 'text/html; charset=utf-8', request.method === 'HEAD')
        return
      }

      if ((request.method === 'GET' || request.method === 'HEAD') && action === '/script') {
        sendFile(response, path.resolve(outputRoot, entry.file), request.method === 'HEAD')
        return
      }

      if ((request.method === 'GET' || request.method === 'HEAD') && action === '/stylesheet') {
        const stylesheet = entry.css?.[0]

        if (!stylesheet) {
          send(response, 404, 'Not found', 'text/plain; charset=utf-8')
          return
        }

        sendFile(response, path.resolve(outputRoot, stylesheet), request.method === 'HEAD')
        return
      }

      if ((request.method === 'GET' || request.method === 'HEAD') && action.startsWith('/assets/')) {
        sendFile(response, path.resolve(outputRoot, action.slice(1)), request.method === 'HEAD')
        return
      }

      send(response, 404, 'Not found', 'text/plain; charset=utf-8')
    })
  },
})

const readBuildEntries = (): Map<string, BuildManifestEntry> => {
  const manifestPath = path.resolve(outputRoot, '.vite/manifest.json')

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`E2E extension manifest not found: ${manifestPath}`)
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, BuildManifestEntry>
  const entries = new Map<string, BuildManifestEntry>()

  for (const entry of Object.values(manifest)) {
    if (entry.isEntry && entry.name) entries.set(entry.name, entry)
  }

  for (const fixture of fixtures.values()) {
    if (!entries.has(fixture)) throw new Error(`E2E extension build entry not found: ${fixture}`)
  }

  return entries
}

const readPayload = async (request: NodeJS.ReadableStream): Promise<unknown> => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const body = new URLSearchParams(Buffer.concat(chunks).toString())
  const payload = body.get('payload')

  return payload ? JSON.parse(payload) as unknown : undefined
}

const setCorsHeaders = (
  origin: string | undefined,
  response: { setHeader(name: string, value: string): void }
) => {
  response.setHeader('access-control-allow-credentials', 'true')
  response.setHeader('access-control-allow-headers', 'content-type')
  response.setHeader('access-control-allow-methods', 'GET,HEAD,OPTIONS,POST')
  response.setHeader('access-control-allow-origin', origin ?? '*')
  response.setHeader('vary', 'Origin')
}

const sendFile = (
  response: Parameters<typeof send>[0],
  filePath: string,
  head: boolean
) => {
  if (!filePath.startsWith(`${outputRoot}${path.sep}`) || !fs.existsSync(filePath)) {
    send(response, 404, 'Not found', 'text/plain; charset=utf-8')
    return
  }

  const body = fs.readFileSync(filePath)
  const contentType = filePath.endsWith('.css')
    ? 'text/css; charset=utf-8'
    : 'application/javascript; charset=utf-8'

  response.writeHead(200, {
    'content-length': body.byteLength,
    'content-type': contentType,
  })
  response.end(head ? undefined : body)
}

const send = (
  response: {
    end(body?: string | Buffer): void;
    writeHead(status: number, headers?: Record<string, string | number>): void;
  },
  status: number,
  body: string,
  contentType: string,
  head = false
) => {
  response.writeHead(status, {
    'content-length': Buffer.byteLength(body),
    'content-type': contentType,
  })
  response.end(head ? undefined : body)
}

export default mergeConfig(basic, defineConfig({
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: outputRoot,
    rollupOptions: {
      input: Object.fromEntries([...fixtures.values()].map(fixture => [
        fixture,
        path.resolve(extensionsRoot, fixture, 'index.ts'),
      ])),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [extensionFixtureServer()],
  server: {
    cors: true,
    port: 4175,
    strictPort: true,
  },
}))
