import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import {
  dirname,
  join,
  resolve,
} from 'node:path'

import { keysOf } from '@/utilities'

import contexts from '@retailcrm/embed-ui-v1-contexts/dist/meta.json'

import {
  targetListDocumentation,
  pageListDocumentation,
} from '~meta'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  contexts: keysOf(contexts).reduce((fields, key) => {
    fields[key] = contexts[key].fields

    return fields
  }, {} as Record<string, unknown>),
  targets: keysOf(targetListDocumentation).map(target => ({
    id: target,
    ...targetListDocumentation[target],
  })),
  pages: pageListDocumentation,
  contextsUsage: keysOf(contexts).reduce((usage, key) => {
    usage[key] = contexts[key].usage

    return usage
  }, {} as Record<string, unknown>),
}, null, 2))
