#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT_PACKAGE = '@retailcrm/embed-ui'
const TARGET_SECTIONS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

const HELP_TEXT = `Usage:
  npx @retailcrm/embed-ui [target] [version] [options]

Options:
  -t, --target <path>     Target project path (default: current directory)
  -v, --version <ver>     Target version. If omitted, latest npm version is used
      --exact             Use exact version instead of range
      --dry-run           Show changes without writing package.json
  -h, --help              Show this help

Examples:
  npx @retailcrm/embed-ui
  npx @retailcrm/embed-ui --version 0.9.11
  npx @retailcrm/embed-ui ./my-project 0.9.11
  npx @retailcrm/embed-ui --target ./my-project --dry-run
`

const isSemverLike = (value) => /^v?\d+\.\d+\.\d+/.test(value)
const stripLeadingV = (value) => value.replace(/^v/, '')

const parseArgs = (argv) => {
  const options = {
    target: process.cwd(),
    version: null,
    dryRun: false,
    exact: false,
  }

  const positionals = []

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]

    if (argument === '-h' || argument === '--help') {
      console.log(HELP_TEXT)
      process.exit(0)
    }

    if (argument === '-t' || argument === '--target') {
      const value = argv[index + 1]
      if (!value) {
        throw new Error('Option --target requires a value')
      }

      options.target = path.resolve(process.cwd(), value)
      index++
      continue
    }

    if (argument === '-v' || argument === '--version') {
      const value = argv[index + 1]
      if (!value) {
        throw new Error('Option --version requires a value')
      }

      options.version = stripLeadingV(value)
      index++
      continue
    }

    if (argument === '--dry-run') {
      options.dryRun = true
      continue
    }

    if (argument === '--exact') {
      options.exact = true
      continue
    }

    if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`)
    }

    positionals.push(argument)
  }

  if (positionals.length > 2) {
    throw new Error('Too many positional arguments')
  }

  if (positionals.length >= 1) {
    const first = positionals[0]
    if (!options.version && isSemverLike(first)) {
      options.version = stripLeadingV(first)
    } else {
      options.target = path.resolve(process.cwd(), first)
    }
  }

  if (positionals.length === 2) {
    if (options.version) {
      throw new Error('Version is already specified')
    }

    options.version = stripLeadingV(positionals[1])
  }

  return options
}

const resolveLatestVersion = () => {
  const output = execFileSync(
    'npm',
    ['view', ROOT_PACKAGE, 'version'],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  ).trim()

  if (!output) {
    throw new Error(`Cannot resolve latest version for ${ROOT_PACKAGE}`)
  }

  return output
}

const isTargetPackage = (name) =>
  name === ROOT_PACKAGE || name.startsWith(`${ROOT_PACKAGE}-`)

const formatRange = (currentRange, nextVersion, exact) => {
  if (exact) {
    return nextVersion
  }

  if (currentRange.startsWith('workspace:')) {
    return currentRange
  }

  if (currentRange.startsWith('~')) {
    return `~${nextVersion}`
  }

  if (currentRange.startsWith('^')) {
    return `^${nextVersion}`
  }

  return `^${nextVersion}`
}

const main = () => {
  const options = parseArgs(process.argv.slice(2))
  const version = options.version ?? resolveLatestVersion()

  const packageJsonPath = path.resolve(options.target, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found: ${packageJsonPath}`)
  }

  const source = fs.readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(source)

  const updates = []

  for (const section of TARGET_SECTIONS) {
    const dependencyMap = packageJson[section]

    if (!dependencyMap || typeof dependencyMap !== 'object') {
      continue
    }

    for (const [name, currentRange] of Object.entries(dependencyMap)) {
      if (!isTargetPackage(name)) {
        continue
      }

      if (typeof currentRange !== 'string') {
        continue
      }

      const nextRange = formatRange(currentRange, version, options.exact)
      if (nextRange === currentRange) {
        continue
      }

      dependencyMap[name] = nextRange
      updates.push({
        section,
        name,
        currentRange,
        nextRange,
      })
    }
  }

  if (updates.length === 0) {
    console.log(`No ${ROOT_PACKAGE}* dependencies found or changed in ${packageJsonPath}`)
    return
  }

  console.log(`Resolved version: ${version}`)
  for (const update of updates) {
    console.log(
      `${update.section}: ${update.name} ${update.currentRange} -> ${update.nextRange}`
    )
  }

  if (options.dryRun) {
    console.log('Dry run enabled, package.json was not modified')
    return
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8')
  console.log(`Updated ${updates.length} dependency entries in ${packageJsonPath}`)
}

try {
  main()
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exit(1)
}
