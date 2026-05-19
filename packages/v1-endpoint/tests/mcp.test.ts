import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'

import { afterEach, expect, test } from 'vitest'

import { createEndpointMcpServer } from '../src/mcp/server'

let client: Client | null = null
let server: ReturnType<typeof createEndpointMcpServer> | null = null

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
  server = createEndpointMcpServer()

  await server.connect(serverTransport)
  await client.connect(clientTransport)

  await expect(client.listTools()).resolves.toMatchObject({ tools: [] })
  await expect(client.listPrompts()).resolves.toMatchObject({ prompts: [] })
  await expect(client.listResources()).resolves.toMatchObject({
    resources: expect.arrayContaining([
      expect.objectContaining({
        uri: 'embed-ui-v1-endpoint://targets',
      }),
    ]),
  })
})
