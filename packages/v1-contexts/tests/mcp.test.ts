import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'

import { afterEach, expect, test } from 'vitest'

import { createContextsMcpServer } from '../src/mcp/server'

let client: Client | null = null
let server: ReturnType<typeof createContextsMcpServer> | null = null

afterEach(async () => {
  await client?.close()
  await server?.close()

  client = null
  server = null
})

test('supports Codex startup probes without tools or prompts', async () => {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

  client = new Client({
    name: 'test-client',
    version: '0.0.0',
  })
  server = createContextsMcpServer()

  await server.connect(serverTransport)
  await client.connect(clientTransport)

  await expect(client.listTools()).resolves.toMatchObject({ tools: [] })
  await expect(client.listPrompts()).resolves.toMatchObject({ prompts: [] })
  await expect(client.listResources()).resolves.toMatchObject({
    resources: expect.arrayContaining([
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://contexts',
      }),
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://contexts/order%2Fcard',
      }),
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://actions',
      }),
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://actions/order%2Fcard',
      }),
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://custom-contexts',
      }),
      expect.objectContaining({
        uri: 'embed-ui-v1-contexts://custom-contexts/order',
      }),
    ]),
  })

  await expect(client.readResource({
    uri: 'embed-ui-v1-contexts://contexts',
  })).resolves.toMatchObject({
    contents: [{
      mimeType: 'application/json',
      text: expect.stringContaining('embed-ui-v1-contexts://contexts/order%2Fcard'),
    }],
  })
  await expect(client.readResource({
    uri: 'embed-ui-v1-contexts://contexts/order%2Fcard',
  })).resolves.toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('"context": "order/card"'),
    }],
  })
  await expect(client.readResource({
    uri: 'embed-ui-v1-contexts://actions/order%2Fcard',
  })).resolves.toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('"action_scope": "order/card"'),
    }],
  })
})
