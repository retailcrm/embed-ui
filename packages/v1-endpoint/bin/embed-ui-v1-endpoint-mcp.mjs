#!/usr/bin/env node

import { runEndpointMcpServer } from '../dist/mcp/server.js'

try {
  await runEndpointMcpServer()
} catch (error) {
  console.error(error)
  process.exit(1)
}
