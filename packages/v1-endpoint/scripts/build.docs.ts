import type { TargetName } from '@/common/targets'

import * as fs from 'node:fs'

import { fileURLToPath } from 'node:url'

import { dirname, join, resolve } from 'node:path'

import { targets } from '@/common/targets'
import { targetsDocumentation } from '@/common/targets.documentation'

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs = resolve(__dirname, '../docs/targets/')

const targetNames = Object.keys(targets) as TargetName[]

const pageLabels: Record<string, string> = {
  'customer/card': 'customer card',
  'order/card': 'full order form',
  'order/mg': 'chat order form',
}

const quote = (value: string): string => JSON.stringify(value)

const paragraph = (value: string): string => `>\n  ${value}`

const list = (values: readonly string[], indent = '  '): string => values.length === 0
  ? ' []'
  : `\n${values.map(value => `${indent}- ${quote(value)}`).join('\n')}`

const fileNameOf = (target: string): string => `${target.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.yml`

const pageOf = (target: string): string => target.split(':')[0]

const areaOf = (target: string): string => target.split(':')[1] ?? ''

const sentenceOf = (value: string): string => /[.!?]$/.test(value) ? value : `${value}.`

const renderTarget = (target: TargetName): string => {
  const config = targets[target]
  const documentation = targetsDocumentation[target]
  const page = pageOf(target)
  const pageLabel = pageLabels[page] ?? page
  const description = documentation.description['en-GB']
  const location = documentation.location['en-GB']

  return `target: ${quote(target)}
summary: ${paragraph(`${sentenceOf(description)} It is placed in the ${pageLabel}: ${location}.`)}
language: en-GB
audience: ai

public_import:
  from: ${quote('@retailcrm/embed-ui-v1-endpoint/common')}
  named:
    - targets
    - TargetName

runner_import:
  from: ${quote('@retailcrm/embed-ui-v1-endpoint/remote/widgets')}
  named:
    - defineWidgetRunner
    - defineMultiRunner

page:
  id: ${quote(page)}
  label: ${quote(pageLabel)}
  area: ${quote(areaOf(target))}

description: ${quote(description)}
location: ${quote(location)}

target_config:
  contexts:${list(config.contexts, '    ')}
  custom_contexts:${list(config.customContexts, '    ')}
  action_scopes:${list(config.actions, '    ')}

use_when:
  - ${quote(`Place a widget exactly at ${target}.`)}
  - ${quote(`The widget belongs to the ${pageLabel} and should appear at this location: ${location}.`)}
  - ${quote('The widget can work with the contexts listed in target_config.contexts.')}

avoid_when:
  - ${quote('The widget belongs to a different page, section, or field-level insertion point.')}
  - ${quote('The widget requires contexts, custom contexts, or action scopes that are not listed in target_config.')}

ai_notes:
  - ${quote('Use the target id as the runner registration key.')}
  - ${quote('Use targets[target].contexts as the source of truth for context availability.')}
  - ${quote('Do not duplicate target context lists in generated widget code.')}
${target.startsWith('order/')
    ? `  - ${quote('Order card and chat order form targets share the same order form data contract.')}\n`
    : ''}`
}

fs.rmSync(docs, { recursive: true, force: true })
fs.mkdirSync(docs, { recursive: true })

for (const target of targetNames) {
  fs.writeFileSync(join(docs, fileNameOf(target)), renderTarget(target))
}
