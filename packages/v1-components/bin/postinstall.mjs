#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACKAGE_NAME = '@retailcrm/embed-ui-v1-components'

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
console.log(`[${PACKAGE_NAME}] AI docs are available in node_modules/${PACKAGE_NAME}/README.md, AGENTS.md, and docs`)
console.log(`[${PACKAGE_NAME}] Start with README.md, AGENTS.md, docs/AI.md, docs/COMPONENTS.md, and docs/profiles/*.yml`)

if (!hasAgentsFile) {
  console.log(`[${PACKAGE_NAME}] To scaffold AGENTS.md for this project, run:`)
  console.log(`  npx ${PACKAGE_NAME} init-agents`)
} else {
  console.log(`[${PACKAGE_NAME}] AGENTS.md already exists in this project, so no scaffold was created automatically`)
}
