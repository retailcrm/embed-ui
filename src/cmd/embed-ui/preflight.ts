import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage, PackageJson } from './types'
import type { PackageManager } from './args'

import fs from 'node:fs'
import path from 'node:path'

import { findDependencySection } from './packages'
import {
  hasExistingDependency,
  I18N_RUNTIME_DEPENDENCY,
  INIT_DEV_DEPENDENCIES,
  INIT_RUNTIME_DEPENDENCIES,
  readPackageJson,
} from './package-json'

const LOCKFILES: Array<{ file: string; packageManager: PackageManager }> = [
  { file: 'yarn.lock', packageManager: 'yarn' },
  { file: 'package-lock.json', packageManager: 'npm' },
  { file: 'pnpm-lock.yaml', packageManager: 'pnpm' },
  { file: 'bun.lockb', packageManager: 'bun' },
]

const CONFIG_FILES = [
  'tsconfig.json',
  'vite.config.ts',
  'vite.config.js',
  'vite.config.mts',
  'eslint.config.js',
  'eslint.config.mjs',
  'env.d.ts',
] as const

const SCRIPT_NAMES = ['build', 'dev', 'eslint', 'eslint:fix', 'lint', 'test'] as const

const hasEnabledMcpConfigHook = (selectedPackages: InstallablePackage[], options: InitOptions): boolean =>
  !options.noMcp && selectedPackages.some((selectedPackage) =>
    selectedPackage.hooks?.some((hook) => hook.type === 'config' && hook.requiresMcp) ?? false
  )

const resolveRangeMajor = (range: string): number | null => {
  const match = range.match(/\d+/u)

  return match ? Number(match[0]) : null
}

const describePathState = (cwd: string, relativePath: string): string => {
  const targetPath = path.join(cwd, relativePath)

  if (!fs.existsSync(targetPath)) {
    return `${relativePath}: missing`
  }

  return `${relativePath}: found`
}

const readExistingPackageJson = (
  packageJsonPath: string,
  changes: InitChanges
): PackageJson | null => {
  if (!fs.existsSync(packageJsonPath)) {
    changes.preflight.push('package.json: missing; it will be created')
    return null
  }

  const { packageJson } = readPackageJson(packageJsonPath)
  changes.preflight.push('package.json: found')

  return packageJson
}

const analyzeDependency = (
  packageJson: PackageJson,
  name: string,
  expectedRange: string,
  expectedSection: string,
  options: InitOptions,
  changes: InitChanges
): void => {
  const section = findDependencySection(packageJson, name)

  if (!section) {
    return
  }

  const dependencyMap = packageJson[section]
  const currentRange = typeof dependencyMap === 'object' && dependencyMap
    ? (dependencyMap as Record<string, unknown>)[name]
    : null

  if (section !== expectedSection) {
    if (options.fixSections) {
      changes.preflight.push(`${name}: will move from ${section} to ${expectedSection}`)
    } else {
      changes.warnings.push(`${name} already exists in ${section}; expected ${expectedSection}. Use --fix-sections to move it.`)
    }
  }

  if (typeof currentRange !== 'string') {
    return
  }

  const currentMajor = resolveRangeMajor(currentRange)
  const expectedMajor = resolveRangeMajor(expectedRange)

  if (currentMajor !== null && expectedMajor !== null && currentMajor !== expectedMajor) {
    if (options.forceDeps) {
      changes.preflight.push(`${name}: will replace ${currentRange} with ${expectedRange}`)
    } else {
      changes.warnings.push(`${name} has range ${currentRange}; expected compatible ${expectedRange}. Use --force-deps to replace it.`)
    }
  }
}

const analyzePackageJson = (
  packageJson: PackageJson,
  selectedPackages: InstallablePackage[],
  version: string,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (packageJson.type === 'module') {
    changes.preflight.push('package.json type: module')
  } else if (packageJson.type) {
    changes.warnings.push(`package.json already has type "${String(packageJson.type)}"; expected "module"`)
  } else {
    changes.preflight.push('package.json type: missing; "module" will be added')
  }

  const scripts = packageJson.scripts
  if (scripts && typeof scripts === 'object' && !Array.isArray(scripts)) {
    for (const scriptName of SCRIPT_NAMES) {
      if (scriptName in scripts) {
        changes.preflight.push(`script ${scriptName}: found`)
      }
    }
  }

  const selectedRange = options.exact ? version : `^${version}`
  for (const selectedPackage of selectedPackages) {
    analyzeDependency(packageJson, selectedPackage.name, selectedRange, selectedPackage.section, options, changes)
  }

  for (const dependency of INIT_RUNTIME_DEPENDENCIES) {
    if (dependency.name === I18N_RUNTIME_DEPENDENCY && hasExistingDependency(packageJson, dependency.name)) {
      changes.preflight.push(`${dependency.name}: found; i18n dependency setup will be skipped to avoid conflicts with existing project configuration`)
      continue
    }

    analyzeDependency(packageJson, dependency.name, dependency.range, 'dependencies', options, changes)
  }

  for (const dependency of INIT_DEV_DEPENDENCIES) {
    analyzeDependency(packageJson, dependency.name, dependency.range, 'devDependencies', options, changes)
  }
}

export const applyInitPreflight = (
  cwd: string,
  sourceRoot: string,
  packageManager: PackageManager,
  selectedPackages: InstallablePackage[],
  version: string,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.agentsOnly) {
    changes.preflight.push('agents-only mode: package.json, configs, and template files are skipped')
    return
  }

  changes.preflight.push(`source root: ${path.relative(cwd, sourceRoot) || '.'}`)

  const existingLockfiles = LOCKFILES.filter(({ file }) => fs.existsSync(path.join(cwd, file)))
  if (existingLockfiles.length === 0) {
    changes.preflight.push(`lockfile: none; using ${packageManager}`)
  } else {
    changes.preflight.push(`lockfile: ${existingLockfiles.map(({ file }) => file).join(', ')}; using ${packageManager}`)
  }

  if (existingLockfiles.length > 1) {
    changes.warnings.push(`Multiple lockfiles found: ${existingLockfiles.map(({ file }) => file).join(', ')}`)
  }

  if (!options.target && !options.srcDir && fs.existsSync(path.join(cwd, 'src')) && path.basename(sourceRoot) === 'web') {
    changes.warnings.push('src/ already exists; generated frontend source root resolved to web/')
  }

  changes.preflight.push(describePathState(cwd, 'src'))
  changes.preflight.push(describePathState(cwd, 'web'))

  for (const configFile of CONFIG_FILES) {
    if (fs.existsSync(path.join(cwd, configFile))) {
      changes.preflight.push(`${configFile}: found; generated config will be skipped unless --force-files is used`)
    }
  }

  if (hasEnabledMcpConfigHook(selectedPackages, options)) {
    changes.preflight.push('v1-endpoint init-config: enabled')

    if (options.mcpClientConfigs?.length) {
      changes.preflight.push(`MCP client configs requested: ${options.mcpClientConfigs.join(', ')}`)
    }
  }

  const packageJson = readExistingPackageJson(path.join(cwd, 'package.json'), changes)
  if (packageJson) {
    analyzePackageJson(packageJson, selectedPackages, version, options, changes)
  }
}
