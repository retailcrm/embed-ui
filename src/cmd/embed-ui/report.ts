import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { PackageChange } from './types'
import type { PackageManager } from './args'

export const createInitChanges = (): InitChanges => ({
  preflight: [],
  packageJson: [],
  directories: [],
  files: [],
  agents: [],
  skills: [],
  mcp: [],
  git: [],
  hooks: [],
  install: null,
  browserInstall: null,
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
  if (!options.verbose && !options.dryRun) {
    printInitSummary(cwd, sourceRoot, version, packageManager, changes)
    return
  }

  console.log(`CWD: ${cwd}`)
  console.log(`Target: ${sourceRoot}`)
  console.log(`Resolved version: ${version}`)
  console.log(`Package manager: ${packageManager}`)

  if (changes.preflight.length > 0) {
    console.log('')
    console.log('preflight')
    for (const item of changes.preflight) {
      console.log(`  ${item}`)
    }
  }

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
      const hasAction = /^(create|update)\s/u.test(filePath)

      console.log(`  ${hasAction ? filePath : `create ${filePath}`}`)
    }
  }

  if (changes.agents.length > 0) {
    console.log('')
    console.log('AGENTS.md')
    for (const agentChange of changes.agents) {
      console.log(`  ${agentChange}`)
    }
  }

  if (changes.skills.length > 0) {
    console.log('')
    console.log('skills')
    for (const skillChange of changes.skills) {
      console.log(`  ${skillChange}`)
    }
  }

  if (changes.mcp.length > 0) {
    console.log('')
    console.log('MCP')
    for (const mcpChange of changes.mcp) {
      console.log(`  ${mcpChange}`)
    }
  }

  if (changes.hooks.length > 0) {
    console.log('')
    console.log('package hooks')
    for (const hook of changes.hooks) {
      console.log(`  ${options.dryRun ? 'would run' : 'ran'} ${hook}`)
    }
  }

  if (changes.git.length > 0) {
    console.log('')
    console.log('git')
    for (const gitChange of changes.git) {
      console.log(`  ${gitChange}`)
    }
  }

  if (changes.install) {
    console.log('')
    console.log('install')
    console.log(`  ${changes.install}`)
  }

  if (changes.browserInstall) {
    console.log('')
    console.log('browser install')
    console.log(`  ${changes.browserInstall}`)
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
    for (const warning of new Set(changes.warnings)) {
      console.log(`  ${warning}`)
    }
  }

  if (options.dryRun) {
    console.log('')
    console.log('Dry run enabled, no files were modified.')
  }
}

const printInitSummary = (
  cwd: string,
  sourceRoot: string,
  version: string,
  packageManager: PackageManager,
  changes: InitChanges
): void => {
  console.log(`Initialized ${cwd}`)
  console.log(`  source root: ${sourceRoot}`)
  console.log(`  version: ${version}`)
  console.log(`  package manager: ${packageManager}`)

  const summary = [
    changes.packageJson.length ? `package.json updated (${changes.packageJson.length} change(s))` : null,
    changes.directories.length ? `directories created: ${changes.directories.length}` : null,
    changes.files.length ? `files changed: ${changes.files.length}` : null,
    changes.agents.length ? 'AGENTS.md updated' : null,
    changes.skills.length ? `skills installed: ${changes.skills.length}` : null,
    changes.mcp.length ? 'MCP config updated' : null,
    changes.git.length ? `git: ${changes.git.join(', ')}` : null,
    changes.hooks.length ? `package hooks ran: ${changes.hooks.length}` : null,
    changes.install ? `install: ${changes.install}` : null,
    changes.browserInstall ? `browser install: ${changes.browserInstall}` : null,
  ].filter((item): item is string => typeof item === 'string')

  if (summary.length > 0) {
    console.log('')
    console.log('changes')
    for (const item of summary) {
      console.log(`  ${item}`)
    }
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
    for (const warning of new Set(changes.warnings)) {
      console.log(`  ${warning}`)
    }
  }
}
