import type { SandboxServer } from '@/node/serve'

import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

import { serveSandbox } from '@/node/serve'

let sandboxServer: SandboxServer | null = null
let tempDir: string | null = null

afterEach(async () => {
  await sandboxServer?.close()
  sandboxServer = null

  if (tempDir) {
    fs.rmSync(tempDir, {
      force: true,
      recursive: true,
    })
    tempDir = null
  }
})

const createAppDir = (): string => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'v1-sandbox-serve-'))
  fs.writeFileSync(path.join(tempDir, 'index.html'), '<main>Sandbox app</main>')
  fs.writeFileSync(path.join(tempDir, 'app.js'), 'window.__sandboxAsset = true')
  fs.writeFileSync(path.join(tempDir, 'data.json'), '{"ok":true}')
  fs.writeFileSync(path.join(tempDir, 'data.bin'), 'binary')

  return tempDir
}

const getBaseUrl = (server: SandboxServer): string => {
  const address = server.server.address()

  if (!address || typeof address === 'string') {
    throw new Error('[test] Sandbox server address is unavailable.')
  }

  return `http://127.0.0.1:${address.port}`
}

const requestRaw = async (
  server: SandboxServer,
  requestPath: string
): Promise<{
  body: string;
  status: number;
}> => {
  const address = server.server.address()

  if (!address || typeof address === 'string') {
    throw new Error('[test] Sandbox server address is unavailable.')
  }

  return await new Promise((resolve, reject) => {
    const request = http.request({
      host: '127.0.0.1',
      path: requestPath,
      port: address.port,
    }, (response) => {
      let body = ''

      response.setEncoding('utf8')
      response.on('data', chunk => {
        body += chunk
      })
      response.on('end', () => {
        resolve({
          body,
          status: response.statusCode ?? 0,
        })
      })
    })

    request.on('error', reject)
    request.end()
  })
}

test('throws when built app index is missing', async () => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'v1-sandbox-missing-'))

  await expect(serveSandbox({
    appDir: tempDir,
    host: '127.0.0.1',
    port: 0,
  })).rejects.toThrow('Built sandbox was not found')
})

test('serves app files and falls back to index for spa routes', async () => {
  sandboxServer = await serveSandbox({
    appDir: createAppDir(),
    host: '127.0.0.1',
    port: 0,
  })
  const baseUrl = getBaseUrl(sandboxServer)

  const assetResponse = await fetch(`${baseUrl}/app.js`)
  const fallbackResponse = await fetch(`${baseUrl}/orders/215/edit`)

  expect(assetResponse.status).toBe(200)
  expect(assetResponse.headers.get('content-type')).toBe('text/javascript; charset=utf-8')
  expect(await assetResponse.text()).toBe('window.__sandboxAsset = true')
  expect(fallbackResponse.status).toBe(200)
  expect(fallbackResponse.headers.get('content-type')).toBe('text/html; charset=utf-8')
  expect(await fallbackResponse.text()).toBe('<main>Sandbox app</main>')
})

test('handles head, forbidden, missing and unsupported method requests', async () => {
  sandboxServer = await serveSandbox({
    appDir: createAppDir(),
    host: '127.0.0.1',
    port: 0,
  })
  const baseUrl = getBaseUrl(sandboxServer)

  const headResponse = await fetch(`${baseUrl}/data.json`, {
    method: 'HEAD',
  })
  const missingResponse = await fetch(`${baseUrl}/missing.js`)
  const forbiddenResponse = await requestRaw(sandboxServer, '/..%2fpackage.json')
  const methodResponse = await fetch(`${baseUrl}/`, {
    method: 'POST',
  })
  const malformedResponse = await requestRaw(sandboxServer, '/%E0%A4%A')
  const binaryResponse = await fetch(`${baseUrl}/data.bin`)

  expect(headResponse.status).toBe(200)
  expect(headResponse.headers.get('content-type')).toBe('application/json; charset=utf-8')
  expect(await headResponse.text()).toBe('')
  expect(missingResponse.status).toBe(404)
  expect(await missingResponse.text()).toBe('Not Found')
  expect(forbiddenResponse).toEqual({
    body: 'Forbidden',
    status: 403,
  })
  expect(methodResponse.status).toBe(405)
  expect(await methodResponse.text()).toBe('Method Not Allowed')
  expect(malformedResponse.status).toBe(400)
  expect(malformedResponse.body).toContain('URI malformed')
  expect(binaryResponse.headers.get('content-type')).toBe('application/octet-stream')
})

test('rejects server close errors', async () => {
  sandboxServer = await serveSandbox({
    appDir: createAppDir(),
    host: '127.0.0.1',
    port: 0,
  })
  const originalClose = sandboxServer.server.close

  sandboxServer.server.close = vi.fn((callback) => {
    callback?.(new Error('close failed'))

    return sandboxServer?.server
  }) as typeof sandboxServer.server.close

  await expect(sandboxServer.close()).rejects.toThrow('close failed')

  sandboxServer.server.close = originalClose
})

test('resolves default app directory when appDir is omitted', async () => {
  const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)

  sandboxServer = await serveSandbox({
    host: '127.0.0.1',
    port: 0,
  })

  expect(sandboxServer.appDir).toContain(`${path.sep}src${path.sep}app`)
  expect(existsSpy).toHaveBeenCalled()
})
