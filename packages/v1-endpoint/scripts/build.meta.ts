import type { TargetName } from '@/common/targets'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import { targets } from '@/common/targets'
import { targetsDocumentation } from '@/common/targets.documentation'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

const targetNames = Object.keys(targets) as TargetName[]

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  targets: targetNames.map(target => ({
    ...targets[target],
    ...targetsDocumentation[target],
  })),
}, null, 2))
