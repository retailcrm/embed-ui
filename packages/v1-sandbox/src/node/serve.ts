import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

export const DEFAULT_SANDBOX_SERVE_HOST = '0.0.0.0'
export const DEFAULT_SANDBOX_SERVE_PORT = 4173

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
} as const

export type ServeSandboxOptions = {
  appDir?: string;
  host?: string;
  port?: number;
}

export type SandboxServer = {
  appDir: string;
  baseUrl: string;
  close(): Promise<void>;
  server: http.Server;
}

export const serveSandbox = async (
  options: ServeSandboxOptions = {}
): Promise<SandboxServer> => {
  const host = options.host ?? DEFAULT_SANDBOX_SERVE_HOST
  const port = options.port ?? DEFAULT_SANDBOX_SERVE_PORT
  const appDir = options.appDir ?? resolveDefaultAppDir()
  const indexPath = path.join(appDir, 'index.html')

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Built sandbox was not found at ${indexPath}. Run package build first.`)
  }

  const server = createSandboxStaticServer({
    appDir,
    indexPath,
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, host, resolve)
  })

  return {
    appDir,
    baseUrl: `http://${host}:${port}`,
    close: () => new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    }),
    server,
  }
}

type StaticServerOptions = {
  appDir: string;
  indexPath: string;
}

const createSandboxStaticServer = ({
  appDir,
  indexPath,
}: StaticServerOptions): http.Server => http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendText(response, 405, 'Method Not Allowed')
    return
  }

  try {
    const filePath = chooseFilePath(request.url, appDir, indexPath)

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

const sendText = (response: http.ServerResponse, status: number, body: string) => {
  response.writeHead(status, {
    'content-type': 'text/plain; charset=utf-8',
  })
  response.end(body)
}

const chooseFilePath = (
  requestUrl: string | undefined,
  appDir: string,
  indexPath: string
): string | null | undefined => {
  const filePath = resolveRequestPath(requestUrl, appDir)

  if (!filePath) return filePath

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath
  }

  if (path.extname(filePath)) {
    return undefined
  }

  return indexPath
}

const resolveRequestPath = (
  requestUrl: string | undefined,
  appDir: string
): string | null => {
  const url = new URL(requestUrl ?? '/', 'http://sandbox.local')
  const pathname = decodeURIComponent(url.pathname)
  const relativePath = pathname.replace(/^\/+/u, '')
  const normalizedPath = path.normalize(relativePath)
  const filePath = path.resolve(appDir, normalizedPath)

  if (!filePath.startsWith(`${appDir}${path.sep}`) && filePath !== appDir) {
    return null
  }

  return filePath
}

const serveFile = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  filePath: string
) => {
  const extension = path.extname(filePath)
  const contentType = CONTENT_TYPES[extension as keyof typeof CONTENT_TYPES] ?? 'application/octet-stream'

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

const resolveDefaultAppDir = (): string => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  const candidates = [
    path.resolve(currentDir, '../app'),
    path.resolve(currentDir, '../../dist/app'),
  ]

  return candidates.find(candidate => fs.existsSync(candidate)) ?? candidates[0]
}
