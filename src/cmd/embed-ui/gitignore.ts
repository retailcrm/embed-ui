import type { InitChanges } from './types'
import type { InitOptions } from './args'

import fs from 'node:fs'
import path from 'node:path'

import { DEFAULT_NEWLINE } from './package-json'

const GITIGNORE_SECTION_HEADER = '# RetailCRM embed-ui init'

const REQUIRED_GITIGNORE_ENTRIES = [
  'node_modules/',
  'dist/',
  'coverage/',
  '.env',
  '.env.*',
  '!.env.example',
  '*.log',
  'npm-debug.log*',
  'playwright-report',
  'yarn-debug.log*',
  'yarn-error.log*',
  'pnpm-debug.log*',
  '.DS_Store',
] as const

const normalizeGitignoreLine = (line: string): string =>
  line.trim().replace(/\/$/u, '')

const hasGitignoreEntry = (lines: string[], entry: string): boolean => {
  const normalizedEntry = normalizeGitignoreLine(entry)

  return lines.some((line) => normalizeGitignoreLine(line) === normalizedEntry)
}

export const updateGitignore = (cwd: string, options: InitOptions, changes: InitChanges): void => {
  if (options.agentsOnly) {
    return
  }

  const gitignorePath = path.join(cwd, '.gitignore')
  const fileExists = fs.existsSync(gitignorePath)
  const currentContent = fileExists
    ? fs.readFileSync(gitignorePath, 'utf8')
    : ''
  const lines = currentContent.split(/\r?\n/u)
  const missingEntries = REQUIRED_GITIGNORE_ENTRIES.filter((entry) => !hasGitignoreEntry(lines, entry))

  if (missingEntries.length === 0) {
    changes.skipped.push(`${gitignorePath} already contains required init entries`)
    return
  }

  const section = [
    GITIGNORE_SECTION_HEADER,
    ...missingEntries,
  ].join(DEFAULT_NEWLINE)
  const nextContent = currentContent.trimEnd()
    ? `${currentContent.trimEnd()}${DEFAULT_NEWLINE}${DEFAULT_NEWLINE}${section}${DEFAULT_NEWLINE}`
    : `${section}${DEFAULT_NEWLINE}`

  if (!options.dryRun) {
    fs.writeFileSync(gitignorePath, nextContent, 'utf8')
  }

  changes.files.push(`${fileExists ? 'update' : 'create'} ${gitignorePath}`)
}
