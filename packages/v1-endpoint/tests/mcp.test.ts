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
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fview%3Aheader.after' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fview%3Acommon.before' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fview%3Acustomer.after' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fview%3Aissues.after' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fedit%3Acommon.before' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fedit%3Acustomer.after' }),
      expect.objectContaining({ uri: 'embed-ui-v1-endpoint://targets/ticket%2Fedit%3Aissues.after' }),
    ]),
  })

  await expect(client.readResource({
    uri: 'embed-ui-v1-endpoint://targets/order%2Fmg%3Alist.after',
  })).resolves.toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('embed-ui-v1-contexts://contexts/order%2Fcard'),
    }],
  })
  await expect(client.readResource({
    uri: 'embed-ui-v1-endpoint://targets/order%2Fmg%3Alist.after',
  })).resolves.toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('embed-ui-v1-contexts://actions/order%2Fcard'),
    }],
  })
  const ticketProfile = await client.readResource({
    uri: 'embed-ui-v1-endpoint://targets/ticket%2Fview%3Aissues.after',
  })

  expect(ticketProfile).toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('embed-ui-v1-contexts://contexts/ticket%2Fview%3Asettings'),
    }],
  })
  expect(ticketProfile.contents[0].text).toContain('embed-ui-v1-contexts://actions/ticket%2Fview')
  expect(ticketProfile.contents[0].text).toContain('One slot for the entire questions section, not one per issue')

  const editorProfile = await client.readResource({
    uri: 'embed-ui-v1-endpoint://targets/ticket%2Fedit%3Aissues.after',
  })

  expect(editorProfile).toMatchObject({
    contents: [{
      mimeType: 'application/yaml',
      text: expect.stringContaining('After the channel, ticket description and tags'),
    }],
  })
  expect(editorProfile.contents[0].text).toContain('embed-ui-v1-contexts://contexts/ticket%2Fedit%3Asettings')
  expect(editorProfile.contents[0].text).toContain('embed-ui-v1-contexts://actions/ticket%2Fedit')
  expect(editorProfile.contents[0].text).toContain('embed-ui-v1-contexts://custom-contexts/ticket')
  expect(editorProfile.contents[0].text).toContain('One slot for the entire form, not one per issue')
  expect(editorProfile.contents[0].text).toContain('Editable fields, links, text, checkboxes and switches')
  expect(editorProfile.contents[0].text).toContain('CRM owns validation, saving and closing')
})
