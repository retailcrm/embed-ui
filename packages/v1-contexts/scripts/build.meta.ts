import type { ContextSchema } from '@retailcrm/embed-ui-v1-types/context'

import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { SchemaList } from '~types/index'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import {
  dirname,
  join,
  resolve,
} from 'node:path'

import { keysOf } from '@/utilities'

import * as customer from '@/common/customer/card'
import * as customerPhone from '@/common/customer/card-phone'
import * as order from '@/common/order/card'
import * as user from '@/common/user/current'
import * as settings from '@/common/settings'

const schema: SchemaList = {
  [customer.id]: customer.schema,
  [customerPhone.id]: customerPhone.schema,
  [order.id]: order.schema,
  [user.id]: user.schema,
  [settings.id]: settings.schema,
}

const description: {
  [K in keyof SchemaList]: ContextSchemaDescription<SchemaList[K]>
} = {
  [customer.id]: customer.description,
  [customerPhone.id]: customerPhone.description,
  [order.id]: order.description,
  [user.id]: user.description,
  [settings.id]: settings.description,
}

const usage: {
  [K in keyof SchemaList]: ContextSchemaUsage
} = {
  [customer.id]: customer.usage,
  [customerPhone.id]: customerPhone.usage,
  [order.id]: order.usage,
  [user.id]: user.usage,
  [settings.id]: settings.usage,
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify(keysOf(schema).reduce((meta, name) => {
  const _schema = schema[name] as ContextSchema

  meta[name] = {
    fields: keysOf(_schema).map(field => {
      const accepts = _schema[field].accepts
      const documentation = description[name] as ContextSchemaDescription<ContextSchema>

      return {
        name: field,
        type: 'type' in accepts ? accepts.type : 'unknown',
        description: documentation[field].description,
        readonly: _schema[field].readonly,
      }
    }),
    usage: usage[name],
  }

  return meta
}, {} as Record<string, unknown>), null, 2))
