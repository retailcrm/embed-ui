import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage, PackageChange } from './types'
import type { PackageManager, UpdateOptions } from './args'

import { createInterface } from 'node:readline/promises'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import process from 'node:process'

import { applyInitAgents } from './agents'
import { collectPackageJsonPaths } from './filesystem'
import { createInitChanges } from './report'
import { createRange } from './packages'
import { DEFAULT_NEWLINE } from './package-json'
import { ensureDirectory } from './filesystem'
import { INIT_DEV_DEPENDENCIES, INIT_RUNTIME_DEPENDENCIES } from './package-json'
import { installPackages } from './packages'
import { PACKAGE_MANAGERS, parseArgs, parseInitArgs } from './args'
import { printChanges, printInitReport } from './report'
import { promptForInstallSelection } from './packages'
import { readOrCreatePackageJson, readPackageJson } from './package-json'
import { resolveInstallPackages, resolveLatestVersion } from './packages'
import { resolvePackageJsonPath } from './filesystem'
import { ROOT_PACKAGE } from './packages'
import { setDependency, setMissingScript } from './package-json'
import { updatePackageJson } from './packages'
import { writeFileIfAllowed } from './filesystem'
import { writePackageJson } from './package-json'

export type { CliOptions, InitOptions, UpdateOptions } from './args'
export { parseArgs, parseInitArgs }

const DEFAULT_INIT_PACKAGE_IDS = ['embed-ui', 'components', 'contexts', 'types', 'endpoint']
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

const resolvePackageManagerVersion = (packageManager: PackageManager): string | null => {
  try {
    return execFileSync(packageManager, ['--version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return null
  }
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

const toPosixRelative = (from: string, to: string): string => {
  const relativePath = path.relative(from, to) || '.'

  return relativePath.split(path.sep).join('/')
}

const quoteJsString = (value: string): string => `'${value.replace(/\\/gu, '\\\\').replace(/'/gu, '\\\'')}'`

const createEnvDts = () => `/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}
`

const createTsConfig = (cwd: string, sourceRoot: string): string => {
  const sourceRootRelative = toPosixRelative(cwd, sourceRoot)

  return `${JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      useDefineForClassFields: true,
      module: 'ESNext',
      moduleResolution: 'Bundler',
      strict: true,
      jsx: 'preserve',
      resolveJsonModule: true,
      isolatedModules: true,
      skipLibCheck: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      baseUrl: '.',
      paths: {
        '@/*': [`${sourceRootRelative}/*`],
      },
    },
    include: [
      `${sourceRootRelative}/**/*`,
      'env.d.ts',
    ],
    vueCompilerOptions: {
      plugins: ['@omnicajs/vue-remote/tooling'],
    },
  }, null, 2)}${DEFAULT_NEWLINE}`
}

const createViteConfig = (cwd: string, sourceRoot: string): string => {
  const entryPath = toPosixRelative(cwd, path.join(sourceRoot, 'endpoint/endpoint.worker.ts'))

  return `import path from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: path.resolve(root, ${JSON.stringify(entryPath)}),
    },
  },
})
`
}

const createEslintConfig = () => `import { defineConfig } from 'eslint/config'

import globals from 'globals'

import pluginDependencies from '@omnicajs/eslint-plugin-dependencies'
import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

const staticTranslationKeysRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require static vue-i18n translation keys',
    },
    messages: {
      dynamicKey: 'Translation keys must be static string literals.',
    },
    schema: [],
  },
  create (context) {
    const i18nFunctions = new Set(['$t', '$te'])
    const i18nObjects = new Set(['i18n'])

    const unwrap = (node) => node?.type === 'ChainExpression' ? node.expression : node
    const isStaticKey = (node) => {
      const unwrapped = unwrap(node)

      return (unwrapped?.type === 'Literal' && typeof unwrapped.value === 'string')
        || (unwrapped?.type === 'TemplateLiteral' && unwrapped.expressions.length === 0)
    }
    const isUseI18nCall = (node) => unwrap(node)?.type === 'CallExpression'
      && unwrap(unwrap(node).callee)?.type === 'Identifier'
      && unwrap(unwrap(node).callee).name === 'useI18n'
    const registerUseI18nBinding = (node) => {
      if (!isUseI18nCall(node.init)) {
        return
      }

      if (node.id.type === 'Identifier') {
        i18nObjects.add(node.id.name)
        return
      }

      if (node.id.type !== 'ObjectPattern') {
        return
      }

      for (const property of node.id.properties) {
        if (property.type !== 'Property') {
          continue
        }

        const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
        const value = property.value.type === 'Identifier' ? property.value.name : null

        if ((key === 't' || key === 'te') && value) {
          i18nFunctions.add(value)
        }
      }
    }
    const isTranslationCallee = (callee) => {
      const unwrapped = unwrap(callee)

      if (unwrapped?.type === 'Identifier') {
        return i18nFunctions.has(unwrapped.name)
      }

      if (unwrapped?.type !== 'MemberExpression') {
        return false
      }

      const object = unwrap(unwrapped.object)
      const property = unwrap(unwrapped.property)
      const propertyName = property?.type === 'Identifier' ? property.name : property?.value

      if (!['$t', '$te', 't', 'te'].includes(propertyName)) {
        return false
      }

      return object?.type === 'ThisExpression'
        || (object?.type === 'Identifier' && i18nObjects.has(object.name))
    }

    return {
      VariableDeclarator: registerUseI18nBinding,
      CallExpression (node) {
        if (!isTranslationCallee(node.callee)) {
          return
        }

        if (!isStaticKey(node.arguments[0])) {
          context.report({ node: node.arguments[0] ?? node, messageId: 'dynamicKey' })
        }
      },
    }
  },
}

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    plugins: {
      dependencies: pluginDependencies,
      'retailcrm-init': {
        rules: {
          'static-translation-keys': staticTranslationKeysRule,
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'eqeqeq': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-debugger': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],

      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      }],

      'dependencies/import-style': ['error', {
        maxSingleLineLength: 90,
        maxSingleLineSpecifiers: 3,
      }],
      'dependencies/separate-type-imports': 'error',
      'dependencies/separate-type-partitions': 'error',
      'dependencies/sort-named-imports': ['error', {
        type: 'alphabetical',
        ignoreAlias: true,
      }],
      'dependencies/sort-imports': ['error', {
        type: 'alphabetical',
        imports: {
          orderBy: 'alias',
          splitDeclarations: true,
        },
        groups: [
          'side-effect-style',
          'side-effect',
          ['type-import', 'type-external', 'type-internal', 'type-parent', 'type-sibling', 'type-index'],
          'builtin',
          'value-external',
          'value-internal',
          ['value-parent', 'value-sibling'],
          'index',
          'unknown',
        ],
        newlinesInside: 1,
      }],

      'retailcrm-init/static-translation-keys': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: pluginTs.parser },
    },
    rules: {
      'vue/attributes-order': 'error',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': ['error', {
        html: {
          component: 'always',
          normal: 'always',
          void: 'always',
        },
        math: 'always',
        svg: 'always',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: { max: 1 },
      }],
    },
  },
  { ignores: ['dist/**', 'coverage/**'] },
])
`

const createEndpointWorker = (options: InitOptions): string => `import type { App } from 'vue'

import {
  definePageRunner,
  defineRunner,
  defineWidgetRunner,
  runEndpoint,
} from '@retailcrm/embed-ui-v1-endpoint/remote'

import { i18n } from '../i18n'
import SettingsPage from '../pages/SettingsPage.vue'
import OrderCommonAfterWidget from '../widgets/OrderCommonAfterWidget.vue'

const setupApp = (app: App) => {
  app.use(i18n)
}

const runner = defineRunner({
  pages: [{
    ${quoteJsString(options.pageCode)}: definePageRunner(SettingsPage, setupApp),
  }],
  widgets: [{
    ${quoteJsString(options.widgetTarget)}: defineWidgetRunner(OrderCommonAfterWidget, setupApp),
  }],
})

runEndpoint(runner)
`

const createI18nIndex = (): string => `import { createI18n } from 'vue-i18n'

import enGB from './locales/en-GB.json'
import esES from './locales/es-ES.json'
import ruRU from './locales/ru-RU.json'

const messages = {
  'en-GB': enGB,
  'es-ES': esES,
  'ru-RU': ruRU,
} as const

export type Locale = keyof typeof messages
export type MessageSchema = typeof enGB

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: 'ru-RU',
  fallbackLocale: 'en-GB',
  messages,
})
`

const createSettingsPage = (): string => `<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="settings-page">
    <h1>{{ t('settings.title') }}</h1>
    <p>{{ t('settings.description') }}</p>
  </main>
</template>
`

const createOrderWidget = (): string => `<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  target: string
}>()

const { t } = useI18n()
</script>

<template>
  <section class="order-common-after-widget">
    <h2>{{ t('orderCommonAfter.title') }}</h2>
    <p>{{ t('orderCommonAfter.description') }}</p>
    <small>{{ props.target }}</small>
  </section>
</template>
`

const createMessages = (locale: 'en-GB' | 'es-ES' | 'ru-RU'): string => `${JSON.stringify({
  settings: {
    title: locale === 'ru-RU' ? 'Настройки расширения' : locale === 'es-ES' ? 'Configuracion de la extension' : 'Extension settings',
    description: locale === 'ru-RU'
      ? 'Здесь можно подготовить настройки встроенного интерфейса.'
      : locale === 'es-ES'
        ? 'Aqui puede preparar la configuracion de la interfaz integrada.'
        : 'Prepare embedded interface settings here.',
  },
  orderCommonAfter: {
    title: locale === 'ru-RU' ? 'Виджет заказа' : locale === 'es-ES' ? 'Widget del pedido' : 'Order widget',
    description: locale === 'ru-RU'
      ? 'Стартовый виджет для формы заказа.'
      : locale === 'es-ES'
        ? 'Widget inicial para el formulario del pedido.'
        : 'Starter widget for the order form.',
  },
}, null, 2)}${DEFAULT_NEWLINE}`

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
  setMissingScript(packageJson, 'lint', 'eslint .', changes)
  setMissingScript(packageJson, 'lint:fix', 'eslint --fix .', changes)

  for (const selectedPackage of selectedPackages) {
    setDependency(
      packageJson,
      selectedPackage.section,
      selectedPackage.name,
      createRange(version, options.exact),
      changes
    )
  }

  for (const dependency of INIT_RUNTIME_DEPENDENCIES) {
    setDependency(packageJson, 'dependencies', dependency.name, dependency.range, changes)
  }

  for (const dependency of INIT_DEV_DEPENDENCIES) {
    setDependency(packageJson, 'devDependencies', dependency.name, dependency.range, changes)
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
  if (options.noDirs || options.agentsOnly) {
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
  options: InitOptions,
  changes: InitChanges
): void => {
  if (options.agentsOnly) {
    return
  }

  writeFileIfAllowed(path.join(cwd, 'tsconfig.json'), createTsConfig(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'vite.config.ts'), createViteConfig(cwd, sourceRoot), options, changes)
  writeFileIfAllowed(path.join(cwd, 'env.d.ts'), createEnvDts(), options, changes)
  writeFileIfAllowed(path.join(cwd, 'eslint.config.js'), createEslintConfig(), options, changes)
}

const applyInitTemplate = (sourceRoot: string, options: InitOptions, changes: InitChanges): void => {
  if (options.noTemplate || options.agentsOnly) {
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
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/index.ts'), createI18nIndex(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/en-GB.json'), createMessages('en-GB'), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/es-ES.json'), createMessages('es-ES'), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/ru-RU.json'), createMessages('ru-RU'), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'pages/SettingsPage.vue'), createSettingsPage(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'widgets/OrderCommonAfterWidget.vue'), createOrderWidget(), options, changes)
}

const runInstall = (
  cwd: string,
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges,
  packageJsonChanged: boolean
): void => {
  if (options.noInstall || options.agentsOnly) {
    return
  }

  if (!packageJsonChanged && !options.force) {
    changes.skipped.push('install skipped because package.json was not changed')
    return
  }

  const args = ['install']
  changes.install = `${packageManager} ${args.join(' ')}`

  if (options.dryRun) {
    return
  }

  execFileSync(packageManager, args, {
    cwd,
    stdio: 'inherit',
  })
}

export const runInit = async (options: InitOptions): Promise<void> => {
  const cwd = resolveInitCwd(options)
  const sourceRoot = resolveInitSourceRoot(cwd, options)

  if (fs.existsSync(sourceRoot) && !fs.statSync(sourceRoot).isDirectory()) {
    throw new Error(`Target path is not a directory: ${sourceRoot}`)
  }

  const selectedPackages = resolveInitPackages(options.packages, options.with)
  const version = options.agentsOnly
    ? options.version ?? 'not used'
    : options.version ?? resolveLatestVersion()
  const packageManager = options.agentsOnly
    ? options.packageManager ?? detectPackageManagerByLockfile(cwd) ?? 'npm'
    : await resolvePackageManager(cwd, options.packageManager)
  const changes = createInitChanges()

  let packageJsonPath: string | null = null
  if (!options.agentsOnly) {
    packageJsonPath = applyInitPackageJson(cwd, selectedPackages, version, packageManager, options, changes)
    applyInitDirectories(sourceRoot, options, changes)
    applyInitConfigs(cwd, sourceRoot, options, changes)
    applyInitTemplate(sourceRoot, options, changes)
  }

  applyInitAgents(cwd, selectedPackages, options, changes)
  runInstall(cwd, packageManager, options, changes, Boolean(packageJsonPath && changes.packageJson.length > 0))
  printInitReport(cwd, sourceRoot, version, packageManager, changes, options)
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

const isExecutedDirectly = (): boolean => {
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
