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

const VITE_CONFIG_FILES = [
  'vite.config.ts',
  'vite.config.js',
  'vite.config.mts',
] as const

const ESLINT_CONFIG_FILES = [
  'eslint.config.js',
  'eslint.config.mjs',
] as const

const TEMPLATE_FILE_IMPACTS = [
  {
    relativePath: 'endpoint/endpoint.worker.ts',
    impact: 'endpoint runner entry will not be generated',
  },
  {
    relativePath: 'pages/SettingsPage.vue',
    impact: 'starter settings page will not be generated',
  },
  {
    relativePath: 'widgets/OrderCommonAfterWidget.vue',
    impact: 'starter order widget will not be generated',
  },
  {
    relativePath: 'i18n/index.ts',
    impact: 'starter i18n bootstrap will not be generated',
  },
  {
    relativePath: 'i18n/locales/en-GB.json',
    impact: 'starter English locale messages will not be generated',
  },
] as const

const hasEnabledMcpConfigHook = (selectedPackages: InstallablePackage[], options: InitOptions): boolean =>
  !options.noMcp && selectedPackages.some((selectedPackage) =>
    selectedPackage.hooks?.some((hook) => hook.type === 'config' && hook.requiresMcp) ?? false
  )

const readTextIfExists = (filePath: string): string | null => {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return null
  }

  return fs.readFileSync(filePath, 'utf8')
}

const hasTextMarker = (content: string, markers: string[]): boolean =>
  markers.some((marker) => content.includes(marker))

const normalizeRelativePath = (relativePath: string): string =>
  relativePath.split(path.sep).join('/')

const getSourceRootRelative = (cwd: string, sourceRoot: string): string =>
  normalizeRelativePath(path.relative(cwd, sourceRoot) || '.')

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

const analyzeTsConfig = (
  cwd: string,
  sourceRoot: string,
  changes: InitChanges
): void => {
  const tsconfigPath = path.join(cwd, 'tsconfig.json')
  const content = readTextIfExists(tsconfigPath)

  if (!content) {
    return
  }

  let parsed: PackageJson
  try {
    parsed = JSON.parse(content) as PackageJson
  } catch {
    changes.warnings.push('tsconfig.json: cannot parse JSON; verify @ alias, JSON imports, and vue-remote tooling manually')
    return
  }

  const compilerOptions = parsed.compilerOptions && typeof parsed.compilerOptions === 'object'
    ? parsed.compilerOptions as PackageJson
    : {}
  const vueCompilerOptions = parsed.vueCompilerOptions && typeof parsed.vueCompilerOptions === 'object'
    ? parsed.vueCompilerOptions as PackageJson
    : {}
  const sourceRootRelative = getSourceRootRelative(cwd, sourceRoot)

  if (compilerOptions.moduleResolution !== 'Bundler') {
    changes.warnings.push('tsconfig.json: moduleResolution is not "Bundler"; Vite-style imports may resolve differently')
  }

  if (compilerOptions.resolveJsonModule !== true) {
    changes.warnings.push('tsconfig.json: resolveJsonModule is not enabled; JSON locale imports may not type-check')
  }

  const paths = compilerOptions.paths && typeof compilerOptions.paths === 'object'
    ? compilerOptions.paths as Record<string, unknown>
    : null
  const aliasTarget = paths?.['@/*']

  if (!Array.isArray(aliasTarget)) {
    changes.warnings.push('tsconfig.json: @/* path alias is missing; generated imports use @/')
  } else if (!aliasTarget.includes(`${sourceRootRelative}/*`)) {
    changes.warnings.push(`tsconfig.json: @/* path alias does not point to ${sourceRootRelative}/*`)
  }

  const plugins = Array.isArray(vueCompilerOptions.plugins)
    ? vueCompilerOptions.plugins
    : []

  if (!plugins.includes('@omnicajs/vue-remote/tooling')) {
    changes.warnings.push('tsconfig.json: @omnicajs/vue-remote/tooling plugin is missing; remote script modifiers may not be typed')
  }
}

const analyzeViteConfig = (
  cwd: string,
  sourceRoot: string,
  changes: InitChanges
): void => {
  const viteConfig = VITE_CONFIG_FILES
    .map((file) => ({ file, content: readTextIfExists(path.join(cwd, file)) }))
    .find(({ content }) => content !== null)

  if (!viteConfig?.content) {
    return
  }

  const sourceRootRelative = getSourceRootRelative(cwd, sourceRoot)

  if (!hasTextMarker(viteConfig.content, ['@omnicajs/vue-remote/vite-plugin', 'vueRemoteVitePlugin'])) {
    changes.warnings.push(`${viteConfig.file}: @omnicajs/vue-remote/vite-plugin is missing; remote event modifiers will not be transformed`)
  }

  if (!hasTextMarker(viteConfig.content, ['@intlify/unplugin-vue-i18n/vite', 'vueI18n'])) {
    changes.warnings.push(`${viteConfig.file}: vue-i18n Vite plugin is missing; JSON and SFC locale blocks may not be bundled`)
  }

  if (!hasTextMarker(viteConfig.content, ['vite-svg-loader', 'defaultImport: \'component\'', 'defaultImport: "component"'])) {
    changes.warnings.push(`${viteConfig.file}: SVG component loader is missing; generated SVG component imports may fail`)
  }

  if (!hasTextMarker(viteConfig.content, ['\'@\'', '"@"'])) {
    changes.warnings.push(`${viteConfig.file}: @ alias is missing; generated imports use @/`)
  } else if (!viteConfig.content.includes(sourceRootRelative) && !viteConfig.content.includes(path.basename(sourceRoot))) {
    changes.warnings.push(`${viteConfig.file}: @ alias may not point to ${sourceRootRelative}`)
  }
}

const analyzeEslintConfig = (cwd: string, changes: InitChanges): void => {
  const eslintConfig = ESLINT_CONFIG_FILES
    .map((file) => ({ file, content: readTextIfExists(path.join(cwd, file)) }))
    .find(({ content }) => content !== null)

  if (!eslintConfig?.content) {
    return
  }

  if (!eslintConfig.content.includes('@intlify/eslint-plugin-vue-i18n')) {
    changes.warnings.push(`${eslintConfig.file}: @intlify/eslint-plugin-vue-i18n is missing; dynamic or missing translation keys will not be guarded`)
  }

  if (!eslintConfig.content.includes('@omnicajs/eslint-plugin-dependencies')) {
    changes.warnings.push(`${eslintConfig.file}: @omnicajs/eslint-plugin-dependencies is missing; generated import ordering may not be enforced`)
  }

  if (!eslintConfig.content.includes('vue/block-order')) {
    changes.warnings.push(`${eslintConfig.file}: vue/block-order is missing; generated Vue block order may drift from the template`)
  }
}

const analyzeTemplateFileSkips = (
  cwd: string,
  sourceRoot: string,
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.noTemplate || options.force || options.forceFiles) {
    return
  }

  for (const { relativePath, impact } of TEMPLATE_FILE_IMPACTS) {
    if (fs.existsSync(path.join(sourceRoot, relativePath))) {
      changes.warnings.push(`${path.join(getSourceRootRelative(cwd, sourceRoot), relativePath)} already exists; ${impact}`)
    }
  }

  for (const relativePath of ['extensionrc.json', 'scripts/publish-extension.mjs', 'README.md']) {
    if (fs.existsSync(path.join(cwd, relativePath))) {
      changes.warnings.push(`${relativePath} already exists; generated project-level starter file will be skipped`)
    }
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

  analyzeTsConfig(cwd, sourceRoot, changes)
  analyzeViteConfig(cwd, sourceRoot, changes)
  analyzeEslintConfig(cwd, changes)
  analyzeTemplateFileSkips(cwd, sourceRoot, options, changes)

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
