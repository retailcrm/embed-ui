#!/usr/bin/env node

import { runContextsMcpServer } from '../dist/mcp/server.js'

try {
  await runContextsMcpServer()
} catch (error) {
  console.error(error)
  process.exit(1)
}
