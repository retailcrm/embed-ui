import type { ActionSchema, ContextSchema } from '@retailcrm/embed-ui-v1-types/context'
import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
  ObjectDescription,
} from '@retailcrm/embed-ui-v1-types/context-doc'
import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import * as customer from '@/common/customer/card'
import * as customerPhone from '@/common/customer/card-phone'
import * as order from '@/common/order/card'
import * as orderSettings from '@/common/order/card-settings'
import * as settings from '@/common/settings'
import * as user from '@/common/user/current'

import {
  actionDocumentation,
  contextDocumentation,
  customContextDocumentation,
} from './docs.profiles'

type ContextSource = {
  id: string;
  schema: ContextSchema;
  description: ContextSchemaDescription<ContextSchema>;
  usage: ContextSchemaUsage;
  types?: Record<string, Record<string, string>>;
  typesDescription?: Record<string, ObjectDescription<Record<string, unknown>>>;
}

type ActionSource = {
  scope: string;
  actions: ActionSchema;
  description: ObjectDescription<ActionSchema>;
}

type Scalar = string | number | boolean | null
type YamlValue = Scalar | YamlValue[] | { [key: string]: YamlValue }

const __dirname = dirname(fileURLToPath(import.meta.url))
const docs = resolve(__dirname, '../docs')

const contextSources = [
  customer,
  customerPhone,
  order,
  orderSettings,
  user,
  settings,
] as unknown as ContextSource[]

const actionSources = [{
  scope: order.id,
  actions: order.actions,
  description: order.actionsDescription,
}] as unknown as ActionSource[]

const quote = (value: string): string => JSON.stringify(value)

const text = (value: TranslationList | { 'en-GB': string } | undefined): string => {
  return value?.['en-GB'] ?? ''
}

const keysOf = (value: object): string[] => Object.keys(value)

const fileNameOf = (id: string): string => `${id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.yml`

const uriOf = (kind: 'contexts' | 'actions' | 'custom-contexts', id: string): string => {
  return `embed-ui-v1-contexts://${kind}/${encodeURIComponent(id)}`
}

const isRecord = (value: YamlValue): value is { [key: string]: YamlValue } => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isEmptyArray = (value: YamlValue): value is [] => {
  return Array.isArray(value) && value.length === 0
}

const isEmptyRecord = (value: YamlValue): boolean => {
  return isRecord(value) && Object.keys(value).length === 0
}

const scalar = (value: Scalar): string => {
  return typeof value === 'string' ? quote(value) : String(value)
}

const yaml = (value: YamlValue, indent = 0): string => {
  const pad = ' '.repeat(indent)

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]'
    }

    return value.map(item => {
      if (isRecord(item) || Array.isArray(item)) {
        if (isEmptyArray(item) || isEmptyRecord(item)) {
          return `${pad}- ${yaml(item)}`
        }

        return `${pad}-\n${yaml(item, indent + 2)}`
      }

      return `${pad}- ${scalar(item)}`
    }).join('\n')
  }

  if (isRecord(value)) {
    const entries = Object.entries(value).filter(([, item]) => item !== '')

    if (entries.length === 0) {
      return '{}'
    }

    return entries.map(([key, item]) => {
      if (isRecord(item) || Array.isArray(item)) {
        if (isEmptyArray(item) || isEmptyRecord(item)) {
          return `${pad}${quote(key)}: ${yaml(item)}`
        }

        return `${pad}${quote(key)}:\n${yaml(item, indent + 2)}`
      }

      return `${pad}${quote(key)}: ${scalar(item)}`
    }).join('\n')
  }

  return scalar(value)
}

const writeYaml = (path: string, value: YamlValue): void => {
  fs.writeFileSync(path, `${yaml(value)}\n`)
}

const predicateType = (predicate: unknown): string => {
  const type = (predicate as { type?: unknown }).type

  return typeof type === 'string' ? type : 'unknown'
}

const emptyRecord = (): { [key: string]: YamlValue } => ({})

const resetDir = (path: string): void => {
  fs.rmSync(path, { recursive: true, force: true })
  fs.mkdirSync(path, { recursive: true })
}

const renderIndex = (
  packageName: string,
  resources: Array<{ id: string; uri: string; file: string }>
): YamlValue => ({
  package: packageName,
  resources: resources.map(resource => ({
    id: resource.id,
    uri: resource.uri,
    file: resource.file,
  })),
})

const renderField = (source: ContextSource, name: string): YamlValue => {
  const field = source.schema[name]
  const fieldDocumentation = contextDocumentation[source.id]?.fields?.[name]
  const description = source.description[name]?.description

  return {
    name,
    type: predicateType(field.accepts),
    readonly: field.readonly,
    description: text(description),
    source_of_truth: text(fieldDocumentation?.sourceOfTruth),
    mutation: fieldDocumentation?.mutation
      ? {
        mode: fieldDocumentation.mutation.mode,
        action: fieldDocumentation.mutation.action ?? '',
        notes: text(fieldDocumentation.mutation.notes),
      }
      : {
        mode: field.readonly ? 'readonly' : 'direct',
        notes: field.readonly
          ? 'Readonly context field; use it for reading and UI calculations.'
          : 'Writable context field; set it directly through the context API when the host accepts the value.',
      },
    related_actions: fieldDocumentation?.relatedActions ?? [],
    ai_notes: fieldDocumentation?.aiNotes?.map(text) ?? [],
  }
}

const renderType = (source: ContextSource, name: string): YamlValue => {
  const typeDocumentation = contextDocumentation[source.id]?.types?.[name]
  const fields = source.types?.[name] ?? {}
  const descriptions = source.typesDescription?.[name] ?? {}

  return {
    name,
    fields: keysOf(fields).map(field => {
      const fieldDocumentation = typeDocumentation?.fields[field]

      return {
        name: field,
        type: fields[field],
        description: text(descriptions[field] as TranslationList | undefined),
        mutation: fieldDocumentation?.mutation
          ? {
            mode: fieldDocumentation.mutation.mode,
            action: fieldDocumentation.mutation.action ?? '',
            notes: text(fieldDocumentation.mutation.notes),
          }
          : emptyRecord(),
        ai_notes: fieldDocumentation?.aiNotes?.map(text) ?? [],
      }
    }),
  }
}

const renderContext = (source: ContextSource): YamlValue => {
  const documentation = contextDocumentation[source.id]
  const relatedActions = actionSources.find(action => action.scope === source.id)

  return {
    context: source.id,
    summary: text(documentation?.summary) || `Context profile for ${source.id}.`,
    language: 'en-GB',
    audience: 'ai',
    public_import: {
      usage_import: source.usage.import,
      usage_call: source.usage.call,
    },
    fields: keysOf(source.schema).map(field => renderField(source, field)),
    field_groups: Object.entries(documentation?.fieldGroups ?? {}).map(([name, group]) => ({
      name,
      fields: group.fields,
      ai_notes: group.aiNotes.map(text),
    })),
    types: keysOf(source.types ?? {}).map(type => renderType(source, type)),
    usage: {
      import: source.usage.import,
      call: source.usage.call,
    },
    related_actions: relatedActions
      ? [{
        scope: relatedActions.scope,
        uri: uriOf('actions', relatedActions.scope),
      }]
      : [],
    ai_notes: documentation?.aiNotes?.map(text) ?? [],
  }
}

const renderAction = (source: ActionSource, name: string): YamlValue => {
  const action = source.actions[name]
  const documentation = actionDocumentation[source.scope]?.actions?.[name]

  return {
    name,
    arguments: action.accepts.members.map((argument: { name: string; type: string }) => ({
      name: argument.name,
      type: argument.type,
    })),
    returns: `Promise<${action.expects.type}>`,
    description: text(source.description[name] as TranslationList | undefined),
    mutates: documentation?.mutates ?? [],
    ai_notes: documentation?.aiNotes?.map(text) ?? [],
  }
}

const renderActionScope = (source: ActionSource): YamlValue => {
  const documentation = actionDocumentation[source.scope]

  return {
    action_scope: source.scope,
    summary: text(documentation?.summary) || `Action profile for ${source.scope}.`,
    language: 'en-GB',
    audience: 'ai',
    actions: keysOf(source.actions).map(action => renderAction(source, action)),
    ai_notes: [
      'Use actions for host-mediated mutations that cannot be performed by direct context field writes.',
    ],
  }
}

const renderCustomContext = (entity: string): YamlValue => {
  const documentation = customContextDocumentation[entity]

  return {
    custom_context: entity,
    summary: text(documentation.summary),
    language: 'en-GB',
    audience: 'ai',
    public_import: {
      from: '@retailcrm/embed-ui-v1-contexts/remote/custom',
      named: [
        'useContext',
        'useDictionary',
        'isTypeOf',
      ],
    },
    supported_kinds: documentation.supportedKinds.map(kind => ({
      kind: kind.kind,
      type: kind.type,
      requires_dictionary: kind.requiresDictionary,
    })),
    usage: documentation.usage,
    write_rules: [
      'Call initialize before reading or writing custom field values.',
      'Do not write fields marked readonly in the custom schema.',
      'Use values matching the field kind; invalid values are rejected by the remote store.',
      'Load dictionaries for dictionary and multiselect_dictionary fields when labels/options are needed.',
    ],
    ai_notes: documentation.aiNotes.map(text),
  }
}

const contextDocs = join(docs, 'contexts')
const actionDocs = join(docs, 'actions')
const customContextDocs = join(docs, 'custom-contexts')

resetDir(contextDocs)
resetDir(actionDocs)
resetDir(customContextDocs)

const contextResources = contextSources.map(source => {
  const file = fileNameOf(source.id)

  writeYaml(join(contextDocs, file), renderContext(source))

  return {
    id: source.id,
    uri: uriOf('contexts', source.id),
    file: `docs/contexts/${file}`,
  }
})

const actionResources = actionSources.map(source => {
  const file = fileNameOf(source.scope)

  writeYaml(join(actionDocs, file), renderActionScope(source))

  return {
    id: source.scope,
    uri: uriOf('actions', source.scope),
    file: `docs/actions/${file}`,
  }
})

const customContextResources = Object.keys(customContextDocumentation).sort().map(entity => {
  const file = fileNameOf(entity)

  writeYaml(join(customContextDocs, file), renderCustomContext(entity))

  return {
    id: entity,
    uri: uriOf('custom-contexts', entity),
    file: `docs/custom-contexts/${file}`,
  }
})

fs.writeFileSync(
  join(contextDocs, 'index.json'),
  `${JSON.stringify(renderIndex('@retailcrm/embed-ui-v1-contexts', contextResources), null, 2)}\n`
)
fs.writeFileSync(
  join(actionDocs, 'index.json'),
  `${JSON.stringify(renderIndex('@retailcrm/embed-ui-v1-contexts', actionResources), null, 2)}\n`
)
fs.writeFileSync(
  join(customContextDocs, 'index.json'),
  `${JSON.stringify(renderIndex('@retailcrm/embed-ui-v1-contexts', customContextResources), null, 2)}\n`
)
