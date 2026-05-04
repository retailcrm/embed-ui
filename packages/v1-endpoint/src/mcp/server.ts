import * as fs from 'node:fs'

import process from 'node:process'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const targetDocs = join(packageRoot, 'docs/targets')
const packageJson = join(packageRoot, 'package.json')

type TargetProfile = {
  id: string;
  file: string;
  uri: string;
  content: string;
}

const targetUri = (target: string): string =>
  `embed-ui-v1-endpoint://targets/${encodeURIComponent(target)}`

const readPackageVersion = (): string => {
  const content = fs.readFileSync(packageJson, 'utf8')

  return JSON.parse(content).version
}

const readTargetProfiles = (): TargetProfile[] => {
  if (!fs.existsSync(targetDocs)) {
    return []
  }

  return fs.readdirSync(targetDocs)
    .filter(file => file.endsWith('.yml'))
    .sort()
    .map(file => {
      const content = fs.readFileSync(join(targetDocs, file), 'utf8')
      const target = content.match(/^target: "(.+)"$/m)?.[1]

      if (!target) {
        throw new Error(`Target profile ${file} does not contain target field`)
      }

      return {
        id: target,
        file,
        uri: targetUri(target),
        content,
      }
    })
}

const waitForCloseSignal = (): Promise<void> => {
  const keepAlive = setInterval(() => undefined, 2 ** 31 - 1)

  process.stdin.resume()

  return new Promise(resolve => {
    const close = (): void => {
      clearInterval(keepAlive)
      resolve()
    }

    process.once('SIGINT', close)
    process.once('SIGTERM', close)
  })
}

export const createEndpointMcpServer = (): McpServer => {
  const server = new McpServer({
    name: '@retailcrm/embed-ui-v1-endpoint',
    version: readPackageVersion(),
  })

  const targets = readTargetProfiles()

  server.registerResource('v1-endpoint targets index', 'embed-ui-v1-endpoint://targets', {
    title: 'v1-endpoint widget targets index',
    description: 'Machine-readable index of built-in widget targets provided by @retailcrm/embed-ui-v1-endpoint.',
    mimeType: 'application/json',
  }, uri => ({
    contents: [{
      uri: uri.href,
      mimeType: 'application/json',
      text: JSON.stringify({
        package: '@retailcrm/embed-ui-v1-endpoint',
        resources: targets.map(target => ({
          target: target.id,
          uri: target.uri,
          file: `docs/targets/${target.file}`,
        })),
      }, null, 2),
    }],
  }))

  for (const target of targets) {
    server.registerResource(`v1-endpoint target ${target.id}`, target.uri, {
      title: `Target ${target.id}`,
      description: `AI-friendly YAML profile for widget target ${target.id}.`,
      mimeType: 'application/yaml',
      annotations: {
        audience: ['assistant'],
        priority: 0.8,
      },
    }, uri => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/yaml',
        text: target.content,
      }],
    }))
  }

  return server
}

export const runEndpointMcpServer = async (): Promise<void> => {
  const server = createEndpointMcpServer()

  await server.connect(new StdioServerTransport())
  await waitForCloseSignal()
  await server.close()
}
