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
import { randomUUID } from 'node:crypto'

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

declare module '*.svg' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

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
  const sourceRootPath = toPosixRelative(cwd, sourceRoot)

  return `import { fileURLToPath } from 'node:url'

import path from 'node:path'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import vueI18n from '@intlify/unplugin-vue-i18n/vite'

import svgLoader from 'vite-svg-loader'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component',
    }),
    vueI18n({
      defaultSFCLang: 'json',
      include: path.resolve(root, '${toPosixRelative(cwd, path.join(sourceRoot, 'i18n/locales'))}/**/*.{json,json5,yaml,yml}'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(root, ${quoteJsString(sourceRootPath)}),
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(root, ${quoteJsString(entryPath)}),
    },
  },
})
`
}

const createEslintConfig = (cwd: string, sourceRoot: string): string => {
  const localeDirPattern = `./${toPosixRelative(cwd, path.join(sourceRoot, 'i18n/locales'))}/*.{json,json5,yaml,yml}`

  return `import { defineConfig } from 'eslint/config'

import globals from 'globals'

import pluginDependencies from '@omnicajs/eslint-plugin-dependencies'
import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginVueI18n from '@intlify/eslint-plugin-vue-i18n'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    settings: {
      'vue-i18n': {
        localeDir: {
          pattern: '${localeDirPattern}',
          localeKey: 'file',
        },
        messageSyntaxVersion: '^11.0.0',
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...pluginVueI18n.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: {
      '@intlify/vue-i18n': pluginVueI18n,
      dependencies: pluginDependencies,
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

      '@intlify/vue-i18n/key-format-style': ['error', 'camelCase', {
        allowArray: true,
      }],
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      '@intlify/vue-i18n/no-raw-text': ['warn', {
        ignorePattern: '^[-–—~+#:()&=×%/\\\\d\\\\s\\u00A0\\n,.<>•]+$',
        ignoreText: ['API', 'CRM', ''],
      }],
      '@intlify/vue-i18n/no-unknown-locale': 'error',
      '@intlify/vue-i18n/no-unused-keys': 'error',
      '@intlify/vue-i18n/sfc-locale-attr': 'error',

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
          [
            'type-import',
            'type-external',
            'type-vue-components',
            'type-internal',
            'type-parent',
            'type-sibling',
            'type-index',
          ],
          'builtin',
          'value-external',
          'value-vue-components',
          'value-internal',
          ['value-parent', 'value-sibling'],
          'index',
          'ts-equals-import',
          'unknown',
        ],
        customGroups: [{
          groupName: 'type-vue-components',
          selector: 'type',
          elementNamePattern: ['\\\\.(svg|vue)$'],
        }, {
          groupName: 'value-vue-components',
          elementNamePattern: ['\\\\.(svg|vue)$'],
        }],
        newlinesInside: 1,
        partitions: {
          orderBy: 'type-first',
          splitBy: {
            comments: false,
            newlines: true,
          },
        },
      }],
    },
  },
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
}

const createEndpointWorker = (options: InitOptions): string => `import type { App } from 'vue'

import { watch } from 'vue'

import { useField } from '@retailcrm/embed-ui'

import {
  definePageRunner,
  defineRunner,
  defineWidgetRunner,
  runEndpoint,
} from '@retailcrm/embed-ui-v1-endpoint/remote'
import {
  useContext as useSettingsContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/settings'

import OrderCommonAfterWidget from '../widgets/OrderCommonAfterWidget.vue'

import SettingsPage from '../pages/SettingsPage.vue'

import { i18n } from '../i18n'

const setupApp = async (app: App) => {
  app.use(i18n)

  const settings = useSettingsContext()
  await settings.initialize()

  const locale = useField(settings, 'system.locale')

  i18n.global.locale.value = locale.value

  watch(locale, value => {
    i18n.global.locale.value = value
  })
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

const createSettingsPage = (): string => `<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import ExtensionIcon from '@/shared/assets/extension.svg'

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <main :class="$style.settingsPage">
    <ExtensionIcon
      :class="$style.icon"
      aria-hidden="true"
    />
    <h1 :class="$style.title">{{ t('title') }}</h1>
    <p :class="$style.description">{{ t('description') }}</p>
  </main>
</template>

<style lang="less" module>
.settingsPage {
  display: grid;
  gap: 8px;
}

.icon {
  width: 32px;
  height: 32px;
  color: #2563eb;
}

.title {
  margin: 0;
  font-size: 20px;
  line-height: 1.3;
}

.description {
  margin: 0;
  color: #4f5664;
  line-height: 1.5;
}
</style>

<i18n locale="en-GB" lang="json">
{
  "title": "Extension settings",
  "description": "Prepare embedded interface settings here."
}
</i18n>

<i18n locale="es-ES" lang="json">
{
  "title": "Configuracion de la extension",
  "description": "Aqui puede preparar la configuracion de la interfaz integrada."
}
</i18n>

<i18n locale="ru-RU" lang="json">
{
  "title": "Настройки расширения",
  "description": "Здесь можно подготовить настройки встроенного интерфейса."
}
</i18n>
`

const createOrderWidget = (): string => `<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  target: string
}>()

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <section :class="$style.orderCommonAfterWidget">
    <h2 :class="$style.title">{{ t('title') }}</h2>
    <p :class="$style.description">{{ t('description') }}</p>
    <small :class="$style.target">{{ props.target }}</small>
  </section>
</template>

<style lang="less" module>
.orderCommonAfterWidget {
  display: grid;
  gap: 6px;
}

.title {
  margin: 0;
  font-size: 16px;
  line-height: 1.35;
}

.description {
  margin: 0;
  color: #4f5664;
  line-height: 1.5;
}

.target {
  color: #747b88;
  font-size: 12px;
}
</style>

<i18n locale="en-GB" lang="json">
{
  "title": "Order widget",
  "description": "Starter widget for the order form."
}
</i18n>

<i18n locale="es-ES" lang="json">
{
  "title": "Widget del pedido",
  "description": "Widget inicial para el formulario del pedido."
}
</i18n>

<i18n locale="ru-RU" lang="json">
{
  "title": "Виджет заказа",
  "description": "Стартовый виджет для формы заказа."
}
</i18n>
`

const createMessages = (): string => `${JSON.stringify({}, null, 2)}${DEFAULT_NEWLINE}`

const createExtensionConfig = (options: InitOptions): string => `${JSON.stringify({
  code: 'retailcrm-extension-frontend',
  name: 'RetailCRM Extension Frontend',
  uuid: randomUUID(),
  version: '1.0.0',
  targets: [options.widgetTarget],
  pages: [options.pageCode],
  stylesheet: true,
  entrypointType: 'script',
  runner: 'worker',
}, null, 2)}${DEFAULT_NEWLINE}`

const createExtensionIcon = (): string => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" stroke="currentColor" stroke-width="1.5" />
  <path d="m8 10 4 2 4-2M12 12v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>
`

const createPublishScript = (): string => `#!/usr/bin/env node

import { fileURLToPath } from 'node:url'

import fs from 'node:fs'

import path from 'node:path'

import { spawnSync } from 'node:child_process'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const args = new Set(process.argv.slice(2))
const archiveOnly = args.has('--archive-only')

const readJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'))

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return
  }

  for (const line of fs.readFileSync(filePath, 'utf8').split(/\\r?\\n/u)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\\'') && value.endsWith('\\''))) {
      value = value.slice(1, -1)
    }

    process.env[key] ??= value
  }
}

const assertNonEmptyString = (value, field) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('Field "' + field + '" must be a non-empty string')
  }

  return value
}

const assertStringArray = (value, field) => {
  if (value === undefined) {
    return []
  }

  if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || item.trim() === '')) {
    throw new Error('Field "' + field + '" must be an array of non-empty strings')
  }

  return value
}

const listFiles = (directoryPath, basePath = directoryPath) => {
  const result = []

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name)
    const relativePath = path.relative(basePath, entryPath).split(path.sep).join('/')

    if (entry.isDirectory()) {
      result.push(...listFiles(entryPath, basePath))
      continue
    }

    if (entry.isFile()) {
      result.push(relativePath)
    }
  }

  return result
}

const normalizeManifestPath = (value) => typeof value === 'string' && value.startsWith('./')
  ? value.slice(2)
  : value

const pickBuildArtifacts = (distDir, code) => {
  const files = listFiles(distDir)
    .filter(file => file !== 'manifest.json')
    .filter(file => file !== code + '.zip')
    .filter(file => !file.endsWith('.map'))

  const viteManifestPath = path.join(distDir, '.vite/manifest.json')

  if (fs.existsSync(viteManifestPath)) {
    const viteManifest = readJsonFile(viteManifestPath)
    const entries = Object.values(viteManifest)
    const entry = entries.find(item => item && item.isEntry) ?? entries[0]

    if (entry?.file) {
      return {
        files,
        scriptFile: normalizeManifestPath(entry.file),
        styleFile: Array.isArray(entry.css) ? normalizeManifestPath(entry.css[0]) : null,
      }
    }
  }

  return {
    files,
    scriptFile: files.find(file => file.endsWith('.js')) ?? null,
    styleFile: files.find(file => file.endsWith('.css')) ?? null,
  }
}

const zipExtension = (distDir, code, extensionManifest, files) => {
  const archivePath = path.join(distDir, 'extension.zip')
  const manifestPath = path.join(distDir, 'manifest.json')
  const previousManifest = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath) : null

  fs.writeFileSync(manifestPath, JSON.stringify(extensionManifest), 'utf8')

  try {
    const zipResult = spawnSync('zip', ['-rFS', archivePath, ...files, 'manifest.json'], {
      cwd: distDir,
      stdio: 'inherit',
    })

    if (zipResult.error) {
      throw new Error('Zip command failed: ' + zipResult.error.message)
    }

    if (zipResult.status !== 0) {
      throw new Error('Zip archive creation failed')
    }
  } finally {
    if (previousManifest) {
      fs.writeFileSync(manifestPath, previousManifest)
    } else {
      fs.rmSync(manifestPath, { force: true })
    }
  }

  return archivePath
}

loadEnvFile(path.join(projectRoot, '.env'))

const configPath = path.join(projectRoot, 'extensionrc.json')

if (!fs.existsSync(configPath)) {
  console.error('Config not found: ' + configPath)
  process.exit(1)
}

let config

try {
  config = readJsonFile(configPath)
} catch (error) {
  console.error('Cannot read extensionrc.json:', error)
  process.exit(1)
}

try {
  const code = config.code ?? 'retailcrm-extension-frontend'
  const uuid = assertNonEmptyString(config.uuid, 'uuid')
  const version = assertNonEmptyString(config.version, 'version')
  const targets = assertStringArray(config.targets, 'targets')
  const pages = assertStringArray(config.pages, 'pages')
  const runner = config.runner ?? 'worker'

  if (targets.length === 0 && pages.length === 0) {
    throw new Error('Specify at least one target or page in extensionrc.json')
  }

  const distDir = path.join(projectRoot, 'dist')

  if (!fs.existsSync(distDir)) {
    throw new Error('Build directory not found: ' + distDir)
  }

  const { files, scriptFile, styleFile } = pickBuildArtifacts(distDir, code)

  if (!scriptFile) {
    throw new Error('Missing JS build artifact. Run npm run build before publishing.')
  }

  const extensionManifest = {
    code,
    version,
    entrypoint: scriptFile,
    scripts: [scriptFile],
    runner,
  }

  if (targets.length > 0) {
    extensionManifest.targets = targets
  }

  if (pages.length > 0) {
    extensionManifest.pages = pages
  }

  if (styleFile) {
    extensionManifest.stylesheet = styleFile
  }

  const archivePath = zipExtension(distDir, code, extensionManifest, files)

  console.log('Archive created: ' + archivePath)

  if (archiveOnly) {
    process.exit(0)
  }

  const crmHost = process.env.CRM_API_HOST
  const crmKey = process.env.CRM_API_KEY
  const baseUrl = config.baseUrl || process.env.MODULE_URL || process.env.EXTENSION_BASE_URL

  if (!crmHost || !crmKey) {
    throw new Error('Missing CRM_API_HOST or CRM_API_KEY in .env')
  }

  if (!baseUrl) {
    throw new Error('Missing MODULE_URL or EXTENSION_BASE_URL in .env or baseUrl in extensionrc.json')
  }

  const embedJs = {
    entrypoint: config.entrypoint || '/extension/' + uuid + '/script',
    runner,
  }

  if (targets.length > 0) {
    embedJs.targets = targets
  }

  if (pages.length > 0) {
    embedJs.pages = pages
  }

  if (styleFile && config.stylesheet !== false) {
    embedJs.stylesheet = typeof config.stylesheet === 'string'
      ? config.stylesheet
      : '/extension/' + uuid + '/stylesheet'
  }

  const integrationModule = {
    code,
    integrationCode: code,
    active: true,
    name: config.name || code,
    clientId: config.clientId || 'client-id-xxx',
    baseUrl,
    integrations: {
      embedJs,
    },
  }

  const form = new FormData()
  form.append('integrationModule', JSON.stringify(integrationModule))

  const response = await fetch(new URL('/api/v5/integration-modules/' + code + '/edit', crmHost), {
    method: 'POST',
    headers: {
      'X-Api-Key': crmKey,
    },
    body: form,
  })

  const text = await response.text()

  if (!response.ok) {
    console.error('Request failed: ' + response.status + ' ' + response.statusText)
    console.error(text)
    process.exit(1)
  }

  console.log(text)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
`

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
  setMissingScript(packageJson, 'publish-extension', 'node scripts/publish-extension.mjs', changes)

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
  writeFileIfAllowed(path.join(cwd, 'eslint.config.js'), createEslintConfig(cwd, sourceRoot), options, changes)
}

const applyInitTemplate = (cwd: string, sourceRoot: string, options: InitOptions, changes: InitChanges): void => {
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
  writeFileIfAllowed(path.join(sourceRoot, 'shared/assets/extension.svg'), createExtensionIcon(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/index.ts'), createI18nIndex(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/en-GB.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/es-ES.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'i18n/locales/ru-RU.json'), createMessages(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'pages/SettingsPage.vue'), createSettingsPage(), options, changes)
  writeFileIfAllowed(path.join(sourceRoot, 'widgets/OrderCommonAfterWidget.vue'), createOrderWidget(), options, changes)
  writeFileIfAllowed(path.join(cwd, 'extensionrc.json'), createExtensionConfig(options), options, changes)
  writeFileIfAllowed(path.join(cwd, 'scripts/publish-extension.mjs'), createPublishScript(), options, changes)
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
    applyInitTemplate(cwd, sourceRoot, options, changes)
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
