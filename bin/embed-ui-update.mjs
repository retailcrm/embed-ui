#!/usr/bin/env node

import { createInterface } from 'node:readline/promises'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import process from 'node:process'

export const ROOT_PACKAGE = '@retailcrm/embed-ui'
export const TARGET_SECTIONS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

export const INSTALLABLE_PACKAGES = [
  {
    id: 'embed-ui',
    name: ROOT_PACKAGE,
    section: 'dependencies',
    description: 'Базовый пакет с общим API и согласованными v1-зависимостями.',
  },
  {
    id: 'components',
    name: '@retailcrm/embed-ui-v1-components',
    section: 'dependencies',
    description: 'UI-компоненты для host/remote приложений.',
  },
  {
    id: 'contexts',
    name: '@retailcrm/embed-ui-v1-contexts',
    section: 'dependencies',
    description: 'Реактивные контексты RetailCRM JS API.',
  },
  {
    id: 'types',
    name: '@retailcrm/embed-ui-v1-types',
    section: 'dependencies',
    description: 'Базовые type declarations для RetailCRM JS API.',
  },
  {
    id: 'testing',
    name: '@retailcrm/embed-ui-v1-testing',
    section: 'devDependencies',
    description: 'Вспомогательные утилиты и типы для тестов интеграций.',
  },
  {
    id: 'endpoint',
    name: '@retailcrm/embed-ui-v1-endpoint',
    section: 'dependencies',
    description: 'Endpoint API для интеграций в RetailCRM.',
  },
]

const DEFAULT_INDENT = '  '
const DEFAULT_NEWLINE = '\n'
const SKIP_DIRECTORIES = new Set([
  '.git',
  '.hg',
  '.svn',
  '.yarn',
  'node_modules',
  'dist',
  'build',
  'coverage',
])

const HELP_TEXT = `Usage:
  npx @retailcrm/embed-ui [target] [version] [options]

Options:
  -t, --target <path>     Target path (default: current directory)
  -v, --version <ver>     Target version. If omitted, latest npm version is used
      --exact             Use exact version instead of range
      --dry-run           Show changes without writing package.json
      --add               Add selected embed-ui packages into one package.json
      --packages <list>   Comma-separated package ids or names for --add
  -h, --help              Show this help

Examples:
  npx @retailcrm/embed-ui
  npx @retailcrm/embed-ui --version 0.9.11
  npx @retailcrm/embed-ui ./my-project 0.9.11
  npx @retailcrm/embed-ui --target ./my-project --dry-run
  npx @retailcrm/embed-ui --add
  npx @retailcrm/embed-ui --add --packages components,contexts
`

const isSemverLike = (value) => /^v?\d+\.\d+\.\d+/.test(value)
const stripLeadingV = (value) => value.replace(/^v/, '')

const parsePackageList = (value) =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

export const parseArgs = (argv) => {
  const options = {
    target: process.cwd(),
    version: null,
    dryRun: false,
    exact: false,
    add: false,
    packages: null,
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

    if (argument === '--packages') {
      const value = argv[index + 1]
      if (!value) {
        throw new Error('Option --packages requires a value')
      }

      options.packages = parsePackageList(value)
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

    if (argument === '--add') {
      options.add = true
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

  if (options.packages && !options.add) {
    throw new Error('Option --packages can only be used together with --add')
  }

  return options
}

export const resolveLatestVersion = () => {
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

export const isTargetPackage = (name) =>
  name === ROOT_PACKAGE || name.startsWith(`${ROOT_PACKAGE}-`)

const createRange = (version, exact) => exact ? version : `^${version}`

export const formatRange = (currentRange, nextVersion, exact) => {
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

export const detectFormatting = (source) => {
  const newline = source.includes('\r\n') ? '\r\n' : DEFAULT_NEWLINE
  const indentMatch = source.match(/\n([ \t]+)"/)

  return {
    indent: indentMatch?.[1] ?? DEFAULT_INDENT,
    newline,
    trailingNewline: source.endsWith('\n') || source.endsWith('\r\n'),
  }
}

export const serializePackageJson = (packageJson, formatting) => {
  const serialized = JSON.stringify(packageJson, null, formatting.indent)
    .replace(/\n/g, formatting.newline)

  return formatting.trailingNewline
    ? `${serialized}${formatting.newline}`
    : serialized
}

const ensureDirectoryExists = (targetPath) => {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Path not found: ${targetPath}`)
  }

  const stat = fs.statSync(targetPath)
  if (!stat.isDirectory()) {
    throw new Error(`Target is not a directory: ${targetPath}`)
  }
}

export const resolvePackageJsonPath = (targetPath) => {
  if (path.basename(targetPath) === 'package.json') {
    if (!fs.existsSync(targetPath)) {
      throw new Error(`package.json not found: ${targetPath}`)
    }

    return targetPath
  }

  const packageJsonPath = path.resolve(targetPath, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found: ${packageJsonPath}`)
  }

  return packageJsonPath
}

export const collectPackageJsonPaths = (targetPath) => {
  const resolvedTarget = path.resolve(targetPath)

  if (!fs.existsSync(resolvedTarget)) {
    throw new Error(`Path not found: ${resolvedTarget}`)
  }

  if (path.basename(resolvedTarget) === 'package.json') {
    return [resolvedTarget]
  }

  ensureDirectoryExists(resolvedTarget)

  const packageJsonPaths = []

  const visit = (directoryPath) => {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    if (fs.existsSync(packageJsonPath) && fs.statSync(packageJsonPath).isFile()) {
      packageJsonPaths.push(packageJsonPath)
    }

    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.isSymbolicLink()) {
        continue
      }

      if (SKIP_DIRECTORIES.has(entry.name)) {
        continue
      }

      visit(path.join(directoryPath, entry.name))
    }
  }

  visit(resolvedTarget)

  return packageJsonPaths.sort()
}

const findDependencySection = (packageJson, packageName) => {
  for (const section of TARGET_SECTIONS) {
    const dependencyMap = packageJson[section]

    if (dependencyMap && typeof dependencyMap === 'object' && packageName in dependencyMap) {
      return section
    }
  }

  return null
}

export const updatePackageJson = (packageJson, version, exact) => {
  const updates = []

  for (const section of TARGET_SECTIONS) {
    const dependencyMap = packageJson[section]

    if (!dependencyMap || typeof dependencyMap !== 'object') {
      continue
    }

    for (const [name, currentRange] of Object.entries(dependencyMap)) {
      if (!isTargetPackage(name) || typeof currentRange !== 'string') {
        continue
      }

      const nextRange = formatRange(currentRange, version, exact)
      if (nextRange === currentRange) {
        continue
      }

      dependencyMap[name] = nextRange
      updates.push({
        type: 'update',
        section,
        name,
        currentRange,
        nextRange,
      })
    }
  }

  return updates
}

export const resolveInstallPackages = (tokens) => {
  const selectedPackages = []
  const seen = new Set()

  for (const token of tokens) {
    const normalized = token.trim()
    if (!normalized) {
      continue
    }

    const numericIndex = Number(normalized)
    const selectedPackage =
      Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= INSTALLABLE_PACKAGES.length
        ? INSTALLABLE_PACKAGES[numericIndex - 1]
        : INSTALLABLE_PACKAGES.find((entry) => entry.id === normalized || entry.name === normalized)

    if (!selectedPackage) {
      const supported = INSTALLABLE_PACKAGES
        .map((entry, index) => `${index + 1}/${entry.id}/${entry.name}`)
        .join(', ')

      throw new Error(`Unknown add target "${normalized}". Supported values: ${supported}`)
    }

    if (seen.has(selectedPackage.name)) {
      continue
    }

    seen.add(selectedPackage.name)
    selectedPackages.push(selectedPackage)
  }

  return selectedPackages
}

export const installPackages = (packageJson, packages, version, exact) => {
  const updates = []

  for (const selectedPackage of packages) {
    const section = findDependencySection(packageJson, selectedPackage.name) ?? selectedPackage.section
    const dependencyMap = packageJson[section] ?? {}

    if (!(section in packageJson)) {
      packageJson[section] = dependencyMap
    }

    const currentRange = dependencyMap[selectedPackage.name]
    const nextRange = typeof currentRange === 'string'
      ? formatRange(currentRange, version, exact)
      : createRange(version, exact)

    if (currentRange === nextRange) {
      continue
    }

    dependencyMap[selectedPackage.name] = nextRange
    updates.push({
      type: typeof currentRange === 'string' ? 'update' : 'install',
      section,
      name: selectedPackage.name,
      currentRange: typeof currentRange === 'string' ? currentRange : null,
      nextRange,
    })
  }

  return updates
}

export const promptForInstallSelection = async (packageJson) => {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('Interactive add mode requires a TTY. Use --packages to select packages explicitly.')
  }

  console.log('Выберите пакеты для установки в текущий package.json:')
  for (const [index, selectedPackage] of INSTALLABLE_PACKAGES.entries()) {
    const currentSection = findDependencySection(packageJson, selectedPackage.name)
    const installedHint = currentSection ? ` Уже есть в ${currentSection}.` : ''

    console.log(`  ${index + 1}. ${selectedPackage.name} (${selectedPackage.id})`)
    console.log(`     ${selectedPackage.description} Раздел по умолчанию: ${selectedPackage.section}.${installedHint}`)
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    while (true) {
      const answer = await readline.question(
        'Введите номера, ids или имена пакетов через запятую (например: 1,3 или components,types): '
      )

      const tokens = parsePackageList(answer)
      if (tokens.length === 0) {
        return []
      }

      try {
        return resolveInstallPackages(tokens)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(message)
      }
    }
  } finally {
    readline.close()
  }
}

const readPackageJson = (packageJsonPath) => {
  const source = fs.readFileSync(packageJsonPath, 'utf8')

  return {
    formatting: detectFormatting(source),
    packageJson: JSON.parse(source),
  }
}

const writePackageJson = (packageJsonPath, packageJson, formatting) => {
  fs.writeFileSync(packageJsonPath, serializePackageJson(packageJson, formatting), 'utf8')
}

const printChanges = (changes) => {
  for (const change of changes) {
    const prefix = change.type === 'install'
      ? `${change.section}: ${change.name} -> ${change.nextRange}`
      : `${change.section}: ${change.name} ${change.currentRange} -> ${change.nextRange}`

    console.log(`  ${prefix}`)
  }
}

export const runUpdate = (options) => {
  const version = options.version ?? resolveLatestVersion()
  const packageJsonPaths = collectPackageJsonPaths(options.target)
  const reports = []

  for (const packageJsonPath of packageJsonPaths) {
    const { formatting, packageJson } = readPackageJson(packageJsonPath)
    const updates = updatePackageJson(packageJson, version, options.exact)

    if (updates.length === 0) {
      continue
    }

    if (!options.dryRun) {
      writePackageJson(packageJsonPath, packageJson, formatting)
    }

    reports.push({ packageJsonPath, updates })
  }

  if (reports.length === 0) {
    console.log(`No ${ROOT_PACKAGE}* dependencies found or changed under ${path.resolve(options.target)}`)
    return
  }

  const totalUpdates = reports.reduce((sum, report) => sum + report.updates.length, 0)

  console.log(`Resolved version: ${version}`)
  for (const report of reports) {
    console.log(report.packageJsonPath)
    printChanges(report.updates)
  }

  if (options.dryRun) {
    console.log('Dry run enabled, package.json files were not modified')
    return
  }

  console.log(
    `Updated ${totalUpdates} dependency entries in ${reports.length} package.json file(s) under ${path.resolve(options.target)}`
  )
}

export const runAdd = async (options) => {
  const version = options.version ?? resolveLatestVersion()
  const packageJsonPath = resolvePackageJsonPath(path.resolve(options.target))
  const { formatting, packageJson } = readPackageJson(packageJsonPath)
  const selectedPackages = options.packages
    ? resolveInstallPackages(options.packages)
    : await promptForInstallSelection(packageJson)

  if (selectedPackages.length === 0) {
    console.log('Nothing selected, package.json was not modified')
    return
  }

  const updates = installPackages(packageJson, selectedPackages, version, options.exact)

  if (updates.length === 0) {
    console.log(`Selected packages are already installed with matching ranges in ${packageJsonPath}`)
    return
  }

  console.log(`Resolved version: ${version}`)
  console.log(packageJsonPath)
  printChanges(updates)

  if (options.dryRun) {
    console.log('Dry run enabled, package.json was not modified')
    return
  }

  writePackageJson(packageJsonPath, packageJson, formatting)
  console.log(`Installed ${updates.length} package entries in ${packageJsonPath}`)
}

export const main = async (argv = process.argv.slice(2)) => {
  const options = parseArgs(argv)

  if (options.add) {
    await runAdd(options)
    return
  }

  runUpdate(options)
}

const isExecutedDirectly = () => {
  const entryPath = process.argv[1]

  if (!entryPath) {
    return false
  }

  return pathToFileURL(path.resolve(entryPath)).href === import.meta.url
}

if (isExecutedDirectly()) {
  try {
    await main()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(message)
    process.exit(1)
  }
}
