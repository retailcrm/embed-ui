import * as fs from 'node:fs'

import process from 'node:process'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const packageJson = join(packageRoot, 'package.json')

type ResourceKind = 'contexts' | 'actions' | 'custom-contexts'

type ResourceIndex = {
  package: string;
  resources: Array<{
    id: string;
    uri: string;
    file: string;
  }>;
}

type ProfileResource = {
  id: string;
  uri: string;
  file: string;
  content: string;
}

type ProfileGroup = {
  kind: ResourceKind;
  indexUri: string;
  title: string;
  description: string;
  profileTitle: (id: string) => string;
  profileDescription: (id: string) => string;
}

const groups: ProfileGroup[] = [{
  kind: 'contexts',
  indexUri: 'embed-ui-v1-contexts://contexts',
  title: 'v1-contexts predefined contexts index',
  description: 'Machine-readable index of predefined context profiles provided by @retailcrm/embed-ui-v1-contexts.',
  profileTitle: id => `Context ${id}`,
  profileDescription: id => `AI-friendly YAML profile for predefined context ${id}.`,
}, {
  kind: 'actions',
  indexUri: 'embed-ui-v1-contexts://actions',
  title: 'v1-contexts action scopes index',
  description: 'Machine-readable index of action scope profiles provided by @retailcrm/embed-ui-v1-contexts.',
  profileTitle: id => `Action scope ${id}`,
  profileDescription: id => `AI-friendly YAML profile for action scope ${id}.`,
}, {
  kind: 'custom-contexts',
  indexUri: 'embed-ui-v1-contexts://custom-contexts',
  title: 'v1-contexts custom contexts index',
  description: 'Machine-readable index of custom context profiles provided by @retailcrm/embed-ui-v1-contexts.',
  profileTitle: id => `Custom context ${id}`,
  profileDescription: id => `AI-friendly YAML profile for custom context entity ${id}.`,
}]

const readPackageVersion = (): string => {
  const content = fs.readFileSync(packageJson, 'utf8')

  return JSON.parse(content).version
}

const readIndex = (kind: ResourceKind): ResourceIndex => {
  const index = join(packageRoot, 'docs', kind, 'index.json')

  if (!fs.existsSync(index)) {
    return {
      package: '@retailcrm/embed-ui-v1-contexts',
      resources: [],
    }
  }

  return JSON.parse(fs.readFileSync(index, 'utf8')) as ResourceIndex
}

const readProfileResources = (kind: ResourceKind): ProfileResource[] => {
  return readIndex(kind).resources.map(resource => ({
    ...resource,
    content: fs.readFileSync(join(packageRoot, resource.file), 'utf8'),
  }))
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

export const createContextsMcpServer = (): McpServer => {
  const server = new McpServer({
    name: '@retailcrm/embed-ui-v1-contexts',
    version: readPackageVersion(),
  })

  const compatibilityTool = server.registerTool('mcp-compatibility-noop', {
    description: 'Disabled compatibility tool used only to make tools/list return an empty list for clients that probe it.',
  }, () => ({
    content: [],
  }))
  const compatibilityPrompt = server.registerPrompt('mcp-compatibility-noop', {
    description: 'Disabled compatibility prompt used only to make prompts/list return an empty list for clients that probe it.',
  }, () => ({
    messages: [],
  }))
  compatibilityTool.disable()
  compatibilityPrompt.disable()

  for (const group of groups) {
    const resources = readProfileResources(group.kind)

    server.registerResource(`v1-contexts ${group.kind} index`, group.indexUri, {
      title: group.title,
      description: group.description,
      mimeType: 'application/json',
    }, uri => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify({
          package: '@retailcrm/embed-ui-v1-contexts',
          resources: resources.map(resource => ({
            id: resource.id,
            uri: resource.uri,
            file: resource.file,
          })),
        }, null, 2),
      }],
    }))

    for (const resource of resources) {
      server.registerResource(`v1-contexts ${group.kind} ${resource.id}`, resource.uri, {
        title: group.profileTitle(resource.id),
        description: group.profileDescription(resource.id),
        mimeType: 'application/yaml',
        annotations: {
          audience: ['assistant'],
          priority: 0.8,
        },
      }, uri => ({
        contents: [{
          uri: uri.href,
          mimeType: 'application/yaml',
          text: resource.content,
        }],
      }))
    }
  }

  return server
}

export const runContextsMcpServer = async (): Promise<void> => {
  const server = createContextsMcpServer()

  await server.connect(new StdioServerTransport())
  await waitForCloseSignal()
  await server.close()
}
