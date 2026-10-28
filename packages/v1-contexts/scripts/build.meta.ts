import type { ActionSchema } from '@retailcrm/embed-ui-v1-types/context'
import type { ActionSchemaList } from '~types/index'
import type { ContextSchema } from '@retailcrm/embed-ui-v1-types/context'
import type { ContextSchemaDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { ContextSchemaUsage } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { ObjectDescription } from '@retailcrm/embed-ui-v1-types/context-doc'
import type { SchemaList } from '~types/index'
import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import { keysOf } from '@/utilities'

import * as customer from '@/common/customer/card'
import * as customerPhone from '@/common/customer/card-phone'
import * as order from '@/common/order/card'
import * as orderSettings from '@/common/order/card-settings'
import * as settings from '@/common/settings'
import * as ticket from '@/common/ticket/view'
import * as ticketEdit from '@/common/ticket/edit'
import * as ticketEditSettings from '@/common/ticket/edit-settings'
import * as ticketSettings from '@/common/ticket/view-settings'
import * as user from '@/common/user/current'

const schema: SchemaList = {
  [customer.id]: customer.schema,
  [customerPhone.id]: customerPhone.schema,
  [order.id]: order.schema,
  [orderSettings.id]: orderSettings.schema,
  [user.id]: user.schema,
  [settings.id]: settings.schema,
  [ticketEdit.id]: ticketEdit.schema,
  [ticketEditSettings.id]: ticketEditSettings.schema,
  [ticket.id]: ticket.schema,
  [ticketSettings.id]: ticketSettings.schema,
}

const description: {
  [K in keyof SchemaList]: ContextSchemaDescription<SchemaList[K]>
} = {
  [customer.id]: customer.description,
  [customerPhone.id]: customerPhone.description,
  [order.id]: order.description,
  [orderSettings.id]: orderSettings.description,
  [user.id]: user.description,
  [settings.id]: settings.description,
  [ticketEdit.id]: ticketEdit.description,
  [ticketEditSettings.id]: ticketEditSettings.description,
  [ticket.id]: ticket.description,
  [ticketSettings.id]: ticketSettings.description,
}

const usage: {
  [K in keyof SchemaList]: ContextSchemaUsage
} = {
  [customer.id]: customer.usage,
  [customerPhone.id]: customerPhone.usage,
  [order.id]: order.usage,
  [orderSettings.id]: orderSettings.usage,
  [user.id]: user.usage,
  [settings.id]: settings.usage,
  [ticketEdit.id]: ticketEdit.usage,
  [ticketEditSettings.id]: ticketEditSettings.usage,
  [ticket.id]: ticket.usage,
  [ticketSettings.id]: ticketSettings.usage,
}

const actions: ActionSchemaList = {
  [order.id]: order.actions,
  [ticketEdit.id]: ticketEdit.actions,
  [ticket.id]: ticket.actions,
}

const actionsDescription: {
  [K in keyof ActionSchemaList]: ObjectDescription<ActionSchemaList[K]>;
} = {
  [order.id]: order.actionsDescription,
  [ticketEdit.id]: ticketEdit.actionsDescription,
  [ticket.id]: ticket.actionsDescription,
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = resolve(__dirname, '../dist/')

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

type ObjectMeta = {
  name: string;
  fields: ObjectFieldMeta[];
}

type ObjectFieldMeta = {
  name: string;
  type: string;
  description: TranslationList
}

const types: ObjectMeta[] = [{
  name: 'Dimensions',
  fields: [{
    name: 'L',
    type: 'number|null',
    description: {
      'en-GB': 'Length',
      'es-ES': 'Longitud',
      'ru-RU': 'Длина',
    },
  }, {
    name: 'W',
    type: 'number|null',
    description: {
      'en-GB': 'Width',
      'es-ES': 'Anchura',
      'ru-RU': 'Ширина',
    },
  }, {
    name: 'H',
    type: 'number|null',
    description: {
      'en-GB': 'Height',
      'es-ES': 'Altura',
      'ru-RU': 'Высота',
    },
  }],
}, {
  name: 'Money',
  fields: [{
    name: 'amount',
    type: 'number',
    description: {
      'en-GB': 'Amount',
      'es-ES': 'Cantidad',
      'ru-RU': 'Количество',
    },
  }, {
    name: 'currency',
    type: 'string',
    description: {
      'en-GB': 'Currency code',
      'es-ES': 'Código de moneda',
      'ru-RU': 'Символьный код валюты',
    },
  }],
}, {
  name: 'Weight',
  fields: [{
    name: 'value',
    type: 'number',
    description: {
      'en-GB': 'Weight value',
      'es-ES': 'Valor del peso',
      'ru-RU': 'Значение веса',
    },
  }, {
    name: 'unit',
    type: '\'grams\'|\'kilograms\'|\'tons\'',
    description: {
      'en-GB': 'Weight unit',
      'es-ES': 'Unidad de peso',
      'ru-RU': 'Единица измерения',
    },
  }],
}]

fs.writeFileSync(join(dist, 'meta.json'), JSON.stringify({
  types: [
    ...keysOf(order.typesDescription).reduce((meta, name) => {
      const types = order.types[name] as Record<string, string>
      const descriptions = order.typesDescription[name]

      meta.push({
        name,
        fields: keysOf(descriptions).map(field => ({
          name: field as string,
          type: types[field as string],
          description: descriptions[field],
        })),
      })

      return meta
    }, [] as Array<{ name: string; fields: ObjectFieldMeta[]; }>),
    ...keysOf(ticket.typesDescription).map(name => ({
      name,
      fields: keysOf(ticket.typesDescription[name]).map(field => ({
        name: field as string,
        type: (ticket.types[name] as Record<string, string>)[field as string],
        description: ticket.typesDescription[name][field],
      })),
    })),
    ...[ticketEdit, ticketEditSettings].flatMap(source => Object.keys(source.typesDescription)
      .filter(name => !Object.hasOwn(ticket.typesDescription, name))
      .map(name => ({
        name,
        fields: Object.entries((source.typesDescription as Record<string, Record<string, TranslationList>>)[name]).map(([field, description]) => ({
          name: field,
          type: (source.types as Record<string, Record<string, string>>)[name][field],
          description,
        })),
      }))),
    ...types,
  ],
  actions: keysOf(actions).reduce((meta, scope) => {
    const scopeActions = actions[scope] as ActionSchema
    const scopeDescription = actionsDescription[scope] as ObjectDescription<ActionSchema>

    meta[scope] = Object.keys(scopeActions).map(name => ({
      name,
      arguments: scopeActions[name].accepts.members,
      returns: `Promise<${scopeActions[name].expects.type}>`,
      description: scopeDescription[name],
    }))

    return meta
  }, {} as {
    [K in keyof ActionSchemaList]: Array<{
      name: string;
      arguments: Array<{ name: string, type: string }>;
      returns: string;
      description: TranslationList;
    }>;
  }),
  contexts: keysOf(schema).reduce((meta, name) => {
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
  }, {} as Record<string, unknown>),
}, null, 2))
