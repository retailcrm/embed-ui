import type { ContextSchema } from '~types/context/schema'
import type { SchemaDocumentation } from '~meta'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import {
  dirname,
  join,
  resolve,
} from 'node:path'

import { keysOf } from '@/utilities'

import {
  schemaList,
  schemaListDocumentation,
  targetListDocumentation,
  pageListDocumentation,
} from '~meta'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  contexts: keysOf(schemaList).reduce((meta, key) => {
    const schema = schemaList[key] as ContextSchema

    meta[key] = keysOf(schema).map(field => {
      const accepts = schema[field].accepts
      const documentation = schemaListDocumentation[key] as SchemaDocumentation<ContextSchema>

      return {
        name: field,
        type: 'type' in accepts ? accepts.type : 'unknown',
        description: documentation[field].description,
        readonly: schema[field].readonly,
      }
    })

    return meta
  }, {} as Record<string, unknown>),
  targets: keysOf(targetListDocumentation).map(target => ({
    id: target,
    ...targetListDocumentation[target],
  })),
  pages: pageListDocumentation,
}, null, 2))
