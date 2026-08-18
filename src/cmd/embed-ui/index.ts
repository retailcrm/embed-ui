import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage, PackageChange } from './types'
import type { PackageManager, UpdateOptions } from './args'

import { createInterface } from 'node:readline/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { applyInitAgents } from './agents'
import { applyInitPackageConfigHooks } from './package-hooks'
import { applyInitPreflight } from './preflight'
import { applyInitSkills } from './skills'
import { assertPackageManagerAvailable } from './package-manager'
import { collectPackageJsonPaths } from './filesystem'
import {
  createDevScript,
  createEndpointWorker,
  createEnvDts,
  createEslintConfig,
  createExtensionConfig,
  createExtensionIcon,
  createI18nIndex,
} from './templates'
import { createInitChanges } from './report'
import { createMessages, createOrderWidget } from './templates'
import { createPlaywrightConfig } from './templates'
import { createPublishScript } from './templates'
import { createRange } from './packages'
import { createReadme } from './templates'
import { createSandboxBrowserTest, createSandboxE2eTest } from './templates'
import { createServeScript } from './templates'
import { createSettingsPage, createTsConfig, createViteConfig } from './templates'
import { createVitestBrowserConfig } from './templates'
import { DEFAULT_INIT_PACKAGE_IDS } from './packages'
import { ensureDirectory } from './filesystem'
import { hasExistingDependency } from './package-json'
import {
  I18N_RUNTIME_DEPENDENCY,
  INIT_DEV_DEPENDENCIES,
  INIT_RUNTIME_DEPENDENCIES,
} from './package-json'
import { installPackages } from './packages'
import { PACKAGE_MANAGERS, parseArgs, parseInitArgs } from './args'
import { printChanges, printInitReport } from './report'
import { promptForInstallSelection } from './packages'
import { readOrCreatePackageJson, readPackageJson } from './package-json'
import {
  removeGeneratedScript,
  renameGeneratedScript,
  replaceGeneratedScript,
} from './package-json'
import { resolveDefaultInitVersion } from './packages'
import { resolveInstallPackages } from './packages'
import { resolveInteractiveInitOptions } from './interactive'
import { resolveLatestVersion } from './packages'
import { resolvePackageJsonPath } from './filesystem'
import { resolvePackageManagerVersion } from './package-manager'
import { ROOT_PACKAGE } from './packages'
import { runCommandWithTerminalStatus } from './terminal'
import { setDependency, setMissingScript } from './package-json'
import { updateGitignore } from './gitignore'
import { updatePackageJson } from './packages'
import { writeFileIfAllowed } from './filesystem'
import { writePackageJson } from './package-json'

export type { CliOptions, InitOptions, UpdateOptions } from './args'
export { parseArgs, parseInitArgs }

const DEFAULT_INIT_DIRS = ['endpoint', 'pages', 'widgets', 'shared', 'i18n']

const detectPackageManagerByLockfile = (cwd: string): PackageManager | null => {
  const knownLockfiles = [
    { packageManager: 'yarn', file: 'yarn.lock' },
    { packageManager: 'npm', file: 'package-lock.json' },
    { packageManager: 'pnpm', file: 'pnpm-lock.yaml' },
    { packageManager: 'bun', file: 'bun.lockb' },
  ] satisfies Array<{ packageManager: PackageManager; file: string }>
  const lockfiles = knownLockfiles.filter(({ file }) => fs.existsSync(path.join(cwd, file)))

  return lockfiles.length === 1 ? lockfiles[0].packageManager : null
}

const resolvePackageManagerMajorVersion = (packageManager: PackageManager): number | null => {
  const major = resolvePackageManagerVersion(packageManager)?.match(/^\d+/u)?.[0]

  return major ? Number(major) : null
}

const promptForPackageManager = async (): Promise<PackageManager> => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    while (true) {
      const answer = await readline.question('Choose package manager (yarn/npm/pnpm/bun): ')
      if (PACKAGE_MANAGERS.includes(answer as PackageManager)) {
        return answer as PackageManager
      }

      console.error(`Unknown package manager: ${answer}`)
    }
  } finally {
    readline.close()
  }
}

const resolvePackageManager = async (
  cwd: string,
  explicitPackageManager: PackageManager | null
): Promise<PackageManager> => {
  if (explicitPackageManager) {
    if (!PACKAGE_MANAGERS.includes(explicitPackageManager)) {
      throw new Error(`Unknown package manager: ${explicitPackageManager}`)
    }

    return explicitPackageManager
  }

  const packageManager = detectPackageManagerByLockfile(cwd)
  if (packageManager) {
    return packageManager
  }

  if (process.stdin.isTTY && process.stdout.isTTY) {
    return promptForPackageManager()
  }

  return 'npm'
}

const createPackageManagerRunCommand = (packageManager: PackageManager): string => {
  if (packageManager === 'npm') {
    return 'npm run'
  }

  if (packageManager === 'bun') {
    return 'bun run'
  }

  return packageManager
}

const resolveInitPackages = (
  tokens: string[] | null,
  extraTokens: string[] | null
): InstallablePackage[] => {
  const packageIds = tokens ?? [...DEFAULT_INIT_PACKAGE_IDS, ...(extraTokens ?? [])]
  const packages = resolveInstallPackages(packageIds)

  for (const selectedPackage of packages) {
    if (selectedPackage.id === 'testing') {
      throw new Error('@retailcrm/embed-ui-v1-testing is not published for public init yet')
    }
  }

  return packages
}

const hasEnabledPackageHook = (selectedPackages: InstallablePackage[], options: InitOptions): boolean =>
  selectedPackages.some((selectedPackage) => selectedPackage.hooks?.some((hook) => {
    if (hook.type === 'agents') {
      return !options.noAgents && (!hook.requiresMcp || !options.noMcp)
    }

    if (hook.type === 'config') {
      return !options.agentsOnly && !options.skillsOnly && (!hook.requiresMcp || !options.noMcp)
    }

    if (hook.type === 'skills') {
      return !options.noSkills
    }

    return false
  }) ?? false)

const shouldRequirePackageManagerBinary = (
  selectedPackages: InstallablePackage[],
  options: InitOptions
): boolean =>
  !options.dryRun && (!options.noInstall || hasEnabledPackageHook(selectedPackages, options))

const isGuidanceOnlyInit = (options: InitOptions): boolean =>
  options.agentsOnly || options.skillsOnly

const resolveInitCwd = (options: InitOptions): string => {
  const cwd = path.resolve(options.cwd)

  if (!fs.existsSync(cwd)) {
    throw new Error(`cwd does not exist: ${cwd}`)
  }

  if (!fs.statSync(cwd).isDirectory()) {
    throw new Error(`cwd is not a directory: ${cwd}`)
  }

  return cwd
}

const resolveInitSourceRoot = (cwd: string, options: InitOptions): string => {
  if (options.srcDir) {
    return path.resolve(cwd, options.srcDir)
  }

  if (options.target) {
    return path.resolve(cwd, options.target)
  }

  const srcPath = path.join(cwd, 'src')
  if (!fs.existsSync(srcPath)) {
    return srcPath
  }

  return path.join(cwd, 'web')
}

const isGitWorkTree = (cwd: string): boolean => {
  try {
    execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd,
      stdio: ['ignore', 'pipe', 'ignore'],
    })

    return true
  } catch {
    return false
  }
}

export const runUpdate = (options: UpdateOptions): void => {
  const version = options.version ?? resolveLatestVersion()
  const packageJsonPaths = collectPackageJsonPaths(options.target)
  const reports: Array<{ packageJsonPath: string; updates: PackageChange[] }> = []

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

export const runAdd = async (options: UpdateOptions): Promise<void> => {
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

const applyInitPackageJson = (
  cwd: string,
  selectedPackages: InstallablePackage[],
  version: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): string => {
  const packageJsonPath = path.join(cwd, 'package.json')
  const {
    created,
    formatting,
    packageJson,
  } = readOrCreatePackageJson(packageJsonPath)

  if (!packageJson.type) {
    packageJson.type = 'module'
    changes.packageJson.push({ type: 'field', name: 'type', nextRange: 'module' })
  } else if (packageJson.type !== 'module') {
    changes.warnings.push('package.json already has type field and it is not "module"')
  }

  setMissingScript(packageJson, 'build', 'vite build', changes)
  setMissingScript(packageJson, 'dev', 'node scripts/dev.mjs', changes)
  setMissingScript(packageJson, 'eslint', 'eslint .', changes)
  setMissingScript(packageJson, 'eslint:fix', 'eslint --fix .', changes)
  setMissingScript(packageJson, 'publish-extension', 'node scripts/publish-extension.mjs', changes)
  const packageManagerRun = createPackageManagerRunCommand(packageManager)

  replaceGeneratedScript(
    packageJson,
    'test',
    `${packageManagerRun} test:unit && ${packageManagerRun} test:browser && ${packageManagerRun} test:e2e`,
    `${packageManagerRun} test:browser && ${packageManagerRun} test:e2e`,
    changes
  )
  removeGeneratedScript(
    packageJson,
    'test:unit',
    'vitest --run --config vitest.config.ts',
    changes
  )
  setMissingScript(packageJson, 'test', `${packageManagerRun} test:browser && ${packageManagerRun} test:e2e`, changes)
  setMissingScript(packageJson, 'test:browser', 'vitest --run --config vitest.config.browser.ts', changes)
  setMissingScript(packageJson, 'test:e2e', 'playwright test -c vitest.config.playwright.ts', changes)
  setMissingScript(packageJson, 'test:browsers:install', 'playwright install chromium', changes)
  renameGeneratedScript(
    packageJson,
    'serve:extension',
    'extension:serve',
    'node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175',
    'node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175',
    changes
  )
  setMissingScript(packageJson, 'extension:serve', 'node scripts/serve-extension.mjs --host 127.0.0.1 --port 4175', changes)
  setMissingScript(packageJson, 'sandbox:serve', 'embed-ui-v1-sandbox serve --host 127.0.0.1 --port 4173', changes)

  for (const selectedPackage of selectedPackages) {
    setDependency(
      packageJson,
      selectedPackage.section,
      selectedPackage.name,
      createRange(version, options.exact),
      changes,
      options
    )
  }

  for (const dependency of INIT_RUNTIME_DEPENDENCIES) {
    if (dependency.name === I18N_RUNTIME_DEPENDENCY && hasExistingDependency(packageJson, dependency.name)) {
      changes.skipped.push(`${dependency.name} already exists; i18n dependency setup skipped to avoid conflicts with existing project configuration`)
      continue
    }

    setDependency(packageJson, 'dependencies', dependency.name, dependency.range, changes, options)
  }

  for (const dependency of INIT_DEV_DEPENDENCIES) {
    setDependency(packageJson, 'devDependencies', dependency.name, dependency.range, changes, options)
  }

  if (!packageJson.packageManager && options.packageManager) {
    const packageManagerVersion = resolvePackageManagerVersion(packageManager)

    if (packageManagerVersion) {
      const nextPackageManager = `${packageManager}@${packageManagerVersion}`

      packageJson.packageManager = nextPackageManager
      changes.packageJson.push({
        type: 'field',
        name: 'packageManager',
        nextRange: nextPackageManager,
      })
    } else {
      changes.warnings.push(`Cannot resolve ${packageManager} version; packageManager field was not written`)
    }
  }

  if (!options.dryRun && (created || changes.packageJson.length > 0)) {
    writePackageJson(packageJsonPath, packageJson, formatting)
  }

  return packageJsonPath
}

const applyInitDirectories = (sourceRoot: string, options: InitOptions, changes: InitChanges): void => {
  if (options.noDirs || isGuidanceOnlyInit(options)) {
    return
  }

  const dirs = options.dirs ?? DEFAULT_INIT_DIRS
  const unknownDir = dirs.find((dir) => ![...DEFAULT_INIT_DIRS, 'src', 'tests'].includes(dir))
  if (unknownDir) {
    throw new Error(`Unknown directory preset: ${unknownDir}`)
  }

  ensureDirectory(sourceRoot, options, changes)

  for (const dir of dirs) {
    if (dir === 'src') {
      continue
    }

    ensureDirectory(path.join(sourceRoot, dir), options, changes)
  }

  if (dirs.includes('i18n')) {
    ensureDirectory(path.join(sourceRoot, 'i18n/locales'), options, changes)
  }
}

const applyInitConfigs = (
  cwd: string,
  sourceRoot: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.noConfigs || isGuidanceOnlyInit(options)) {
    return
  }

  writeFileIfAllowed(path.join(cwd, 'tsconfig.json'), createTsConfig(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'vite.config.ts'), createViteConfig(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'vitest.config.browser.ts'), createVitestBrowserConfig(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'vitest.config.playwright.ts'), createPlaywrightConfig(cwd, sourceRoot, packageManager), options, changes)
  writeFileIfAllowed(path.join(cwd, 'env.d.ts'), createEnvDts(), options, changes)
  writeFileIfAllowed(path.join(cwd, 'eslint.config.js'), createEslintConfig(cwd, sourceRoot), options, changes)
}

const applyInitTemplate = (
  cwd: string,
  sourceRoot: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.noTemplate || isGuidanceOnlyInit(options)) {
    return
  }

  if (options.template !== 'order-card') {
    throw new Error(`Unknown template: ${options.template}`)
  }

  writeFileIfAllowed(
    path.join(sourceRoot, 'endpoint/endpoint.worker.ts'),
    createEndpointWorker(options),
    options,
    changes
  )
  writeFileIfAllowed(path.join(sourceRoot, 'shared/assets/extension.svg'), createExtensionIcon(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/index.ts'), createI18nIndex(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/en-GB.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/es-ES.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/ru-RU.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'pages/SettingsPage.vue'), createSettingsPage(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'widgets/OrderCommonAfterWidget.vue'), createOrderWidget(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'tests/browser/starter.test.browser.ts'), createSandboxBrowserTest(cwd, sourceRoot, options), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'tests/e2e/starter.e2e.ts'), createSandboxE2eTest(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'extensionrc.json'), createExtensionConfig(options), options, changes)
  writeFileIfAllowed(path.join(cwd, 'scripts/publish-extension.mjs'), createPublishScript(), options, changes)
  writeFileIfAllowed(path.join(cwd, 'scripts/dev.mjs'), createDevScript(packageManager), options, changes)
  writeFileIfAllowed(path.join(cwd, 'scripts/serve-extension.mjs'), createServeScript(), options, changes)
  writeFileIfAllowed(path.join(cwd, 'README.md'), createReadme(cwd, sourceRoot, options, packageManager), options, changes)
}

const runInstall = async (
  cwd: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges,
  packageJsonChanged: boolean
): Promise<void> => {
  if (options.noInstall || isGuidanceOnlyInit(options)) {
    return
  }

  if (!packageJsonChanged && !options.force) {
    changes.skipped.push('install skipped because package.json was not changed')
    return
  }

  const args = resolveInstallArgs(packageManager)
  changes.install = `${packageManager} ${args.join(' ')}`

  if (options.dryRun) {
    return
  }

  try {
    await runCommandWithTerminalStatus(
      packageManager,
      args,
      { cwd },
      `Installing dependencies with ${packageManager}`
    )
  } catch (error) {
    printExecErrorOutput(error)
    throw error
  }
}

const resolveRunScriptArgs = (packageManager: PackageManager, scriptName: string): string[] => {
  if (packageManager === 'npm' || packageManager === 'bun') {
    return ['run', scriptName]
  }

  return [scriptName]
}

const createRunScriptCommand = (packageManager: PackageManager, scriptName: string): string =>
  `${createPackageManagerRunCommand(packageManager)} ${scriptName}`

const runBrowserInstall = async (
  cwd: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges,
  packageJsonChanged: boolean
): Promise<void> => {
  if (options.noInstall || isGuidanceOnlyInit(options)) {
    return
  }

  if (!packageJsonChanged && !options.force) {
    changes.skipped.push('browser install skipped because package.json was not changed')
    return
  }

  const scriptName = 'test:browsers:install'
  const args = resolveRunScriptArgs(packageManager, scriptName)
  changes.browserInstall = createRunScriptCommand(packageManager, scriptName)

  if (options.dryRun) {
    return
  }

  try {
    await runCommandWithTerminalStatus(
      packageManager,
      args,
      { cwd },
      'Installing Playwright Chromium'
    )
  } catch (error) {
    printExecErrorOutput(error)
    throw error
  }
}

const applyInitGit = async (cwd: string, options: InitOptions, changes: InitChanges): Promise<void> => {
  if (!options.initGit) {
    return
  }

  if (isGitWorkTree(cwd)) {
    changes.skipped.push('git init skipped because cwd is already inside a Git work tree')
    return
  }

  changes.git.push('git init')

  if (options.dryRun) {
    return
  }

  await runCommandWithTerminalStatus('git', ['init'], { cwd }, 'Initializing Git repository')
}

const resolveInstallArgs = (packageManager: PackageManager): string[] => {
  if (packageManager === 'yarn' && resolvePackageManagerMajorVersion(packageManager) === 1) {
    return ['install', '--silent']
  }

  if (packageManager === 'npm') {
    return ['install', '--loglevel=error']
  }

  if (packageManager === 'pnpm') {
    return ['install', '--loglevel=error']
  }

  if (packageManager === 'bun') {
    return ['install', '--silent']
  }

  return ['install']
}

const printExecErrorOutput = (error: unknown): void => {
  if (!error || typeof error !== 'object') {
    return
  }

  const execError = error as Partial<Record<'stdout' | 'stderr', unknown>>

  for (const field of ['stdout', 'stderr'] as const) {
    const value = execError[field]
    const output = value instanceof Buffer ? value.toString('utf8') : value

    if (typeof output === 'string' && output.trim().length > 0) {
      console.error(output.trim())
    }
  }
}

export const runInit = async (options: InitOptions): Promise<void> => {
  const cwd = resolveInitCwd(options)
  const interactiveOptions = await resolveInteractiveInitOptions(
    cwd,
    options,
    detectPackageManagerByLockfile(cwd)
  )
  const sourceRoot = resolveInitSourceRoot(cwd, interactiveOptions)

  if (fs.existsSync(sourceRoot) && !fs.statSync(sourceRoot).isDirectory()) {
    throw new Error(`Target path is not a directory: ${sourceRoot}`)
  }

  const selectedPackages = resolveInitPackages(interactiveOptions.packages, interactiveOptions.with)
  const version = isGuidanceOnlyInit(interactiveOptions)
    ? interactiveOptions.version ?? 'not used'
    : interactiveOptions.version ?? resolveDefaultInitVersion()
  const resolvedOptions = version === 'not used'
    ? interactiveOptions
    : { ...interactiveOptions, version }
  const packageManager = isGuidanceOnlyInit(interactiveOptions)
    ? interactiveOptions.packageManager ?? detectPackageManagerByLockfile(cwd) ?? 'npm'
    : await resolvePackageManager(cwd, interactiveOptions.packageManager)
  const changes = createInitChanges()

  if (shouldRequirePackageManagerBinary(selectedPackages, resolvedOptions)) {
    assertPackageManagerAvailable(packageManager)
  }

  applyInitPreflight(cwd, sourceRoot, packageManager, selectedPackages, version, resolvedOptions, changes)
  await applyInitGit(cwd, resolvedOptions, changes)

  let packageJsonPath: string | null = null
  if (!isGuidanceOnlyInit(resolvedOptions)) {
    packageJsonPath = applyInitPackageJson(cwd, selectedPackages, version, packageManager, resolvedOptions, changes)
    updateGitignore(cwd, resolvedOptions, changes)
    applyInitDirectories(sourceRoot, resolvedOptions, changes)
    applyInitConfigs(cwd, sourceRoot, packageManager, resolvedOptions, changes)
    applyInitTemplate(cwd, sourceRoot, packageManager, resolvedOptions, changes)
  }

  const packageJsonChanged = Boolean(packageJsonPath && changes.packageJson.length > 0)

  await runInstall(cwd, packageManager, resolvedOptions, changes, packageJsonChanged)
  await runBrowserInstall(cwd, packageManager, resolvedOptions, changes, packageJsonChanged)
  await applyInitPackageConfigHooks(cwd, selectedPackages, packageManager, resolvedOptions, changes)
  await applyInitSkills(cwd, selectedPackages, packageManager, resolvedOptions, changes)
  await applyInitAgents(cwd, selectedPackages, packageManager, resolvedOptions, changes)
  printInitReport(cwd, sourceRoot, version, packageManager, changes, resolvedOptions)
}

export const main = async (argv: string[] = process.argv.slice(2)): Promise<void> => {
  const options = parseArgs(argv)

  if (options.command === 'init') {
    await runInit(options)
    return
  }

  if (options.add) {
    await runAdd(options)
    return
  }

  runUpdate(options)
}

export const isSameExecutablePath = (entryPath: string, moduleUrl: string): boolean => {
  try {
    return fs.realpathSync(entryPath) === fs.realpathSync(fileURLToPath(moduleUrl))
  } catch {
    return false
  }
}

const isExecutedDirectly = (): boolean => {
  const entryPath = process.argv[1]

  if (!entryPath) {
    return false
  }

  return isSameExecutablePath(path.resolve(entryPath), import.meta.url)
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
