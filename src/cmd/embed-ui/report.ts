import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { PackageChange } from './types'
import type { PackageManager } from './args'

export const createInitChanges = (): InitChanges => ({
  packageJson: [],
  directories: [],
  files: [],
  agents: [],
  hooks: [],
  install: null,
  skipped: [],
  warnings: [],
})

export const printChanges = (changes: PackageChange[]): void => {
  for (const change of changes) {
    let prefix: string

    if (change.type === 'script') {
      prefix = `scripts: ${change.name} -> ${change.nextRange}`
    } else if (change.type === 'field') {
      prefix = `${change.name} -> ${change.nextRange}`
    } else {
      prefix = change.type === 'install'
        ? `${change.section}: ${change.name} -> ${change.nextRange}`
        : `${change.section}: ${change.name} ${change.currentRange} -> ${change.nextRange}`
    }

    console.log(`  ${prefix}`)
  }
}

export const printInitReport = (
  cwd: string,
  sourceRoot: string,
  version: string,
  packageManager: PackageManager,
  changes: InitChanges,
  options: InitOptions
): void => {
  console.log(`CWD: ${cwd}`)
  console.log(`Target: ${sourceRoot}`)
  console.log(`Resolved version: ${version}`)
  console.log(`Package manager: ${packageManager}`)

  if (changes.packageJson.length > 0) {
    console.log('')
    console.log('package.json')
    printChanges(changes.packageJson)
  }

  if (changes.directories.length > 0) {
    console.log('')
    console.log('directories')
    for (const directoryPath of changes.directories) {
      console.log(`  create ${directoryPath}`)
    }
  }

  if (changes.files.length > 0) {
    console.log('')
    console.log('files')
    for (const filePath of changes.files) {
      console.log(`  create ${filePath}`)
    }
  }

  if (changes.agents.length > 0) {
    console.log('')
    console.log('AGENTS.md')
    for (const agentChange of changes.agents) {
      console.log(`  ${agentChange}`)
    }
  }

  if (changes.hooks.length > 0) {
    console.log('')
    console.log('package hooks')
    for (const hook of changes.hooks) {
      console.log(`  ${options.dryRun ? 'would run' : 'ran'} ${hook}`)
    }
  }

  if (changes.install) {
    console.log('')
    console.log('install')
    console.log(`  ${changes.install}`)
  }

  if (changes.skipped.length > 0) {
    console.log('')
    console.log('skipped')
    for (const skipped of changes.skipped) {
      console.log(`  ${skipped}`)
    }
  }

  if (changes.warnings.length > 0) {
    console.log('')
    console.log('warnings')
    for (const warning of changes.warnings) {
      console.log(`  ${warning}`)
    }
  }

  if (options.dryRun) {
    console.log('')
    console.log('Dry run enabled, no files were modified.')
  }
}
