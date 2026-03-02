import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import basic from '@retailcrm/embed-ui-v1-contexts/dist/meta.json'

import { pageListDocumentation, targetListDocumentation } from '~meta'

import { keysOf } from '@/utilities'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  ...basic,
  targets: keysOf(targetListDocumentation).map(target => ({
    id: target,
    ...targetListDocumentation[target],
  })),
  pages: pageListDocumentation,
}, null, 2))
