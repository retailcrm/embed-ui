import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import basic from '@retailcrm/embed-ui-v1-contexts/dist/meta.json'
import endpoint from '@retailcrm/embed-ui-v1-endpoint/dist/meta.json'

import { pageListDocumentation } from '~meta'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  ...basic,
  targets: endpoint.targets,
  pages: pageListDocumentation.map(page => ({
    ...page,
    targets: endpoint.targets
      .map(target => target.id)
      .filter(target => target.startsWith(`${page.id}:`)),
  })),
}, null, 2))
