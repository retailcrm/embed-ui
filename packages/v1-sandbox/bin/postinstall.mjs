#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-sandbox'

const currentFile = fileURLToPath(import.meta.url)
const packageRoot = path.resolve(path.dirname(currentFile), '..')
const isInstalledFromNodeModules = packageRoot.includes(`${path.sep}node_modules${path.sep}`)

if (!isInstalledFromNodeModules) {
  process.exit(0)
}

const targetRoot = process.env.INIT_CWD

if (!targetRoot) {
  process.exit(0)
}

const agentsPath = path.join(targetRoot, 'AGENTS.md')
const hasAgentsFile = fs.existsSync(agentsPath)

console.log('')
console.log(`[${PACKAGE_NAME}] Docs are available in node_modules/${PACKAGE_NAME}/README.md, AGENTS.md, and docs`)
console.log(`[${PACKAGE_NAME}] Start with README.md, AGENTS.md, docs/index.md, docs/usage-guide.md, docs/strategy.md, docs/examples.md, and docs/api.md`)

if (!hasAgentsFile) {
  console.log(`[${PACKAGE_NAME}] To scaffold AGENTS.md for this project, run:`)
  console.log(`  npx ${PACKAGE_NAME} init-agents`)
} else {
  console.log(`[${PACKAGE_NAME}] AGENTS.md already exists in this project, so no scaffold was created automatically`)
}

console.log(`[${PACKAGE_NAME}] To create a sandbox env template, run:`)
console.log(`  npx ${PACKAGE_NAME} init-env`)
