import type { InitOptions } from './args'
import type { PackageManager } from './args'

import path from 'node:path'

import { randomUUID } from 'node:crypto'

import endpointWorkerTemplate from './templates/endpoint.worker.ts.txt?raw'
import envDtsTemplate from './templates/env.d.ts.txt?raw'
import eslintConfigTemplate from './templates/eslint.config.js.txt?raw'
import extensionIconTemplate from './templates/extension.svg.txt?raw'
import i18nIndexTemplate from './templates/i18n-index.ts.txt?raw'
import orderWidgetTemplate from './templates/OrderCommonAfterWidget.vue.txt?raw'
import publishScriptTemplate from './templates/publish-extension.mjs.txt?raw'
import readmeEnGBTemplate from './templates/README.en-GB.md.txt?raw'
import readmeEsESTemplate from './templates/README.es-ES.md.txt?raw'
import readmeRuRUTemplate from './templates/README.ru-RU.md.txt?raw'
import settingsPageTemplate from './templates/SettingsPage.vue.txt?raw'
import tsConfigTemplate from './templates/tsconfig.json.txt?raw'
import viteConfigTemplate from './templates/vite.config.ts.txt?raw'

import { DEFAULT_NEWLINE } from './package-json'

const toPosixRelative = (from: string, to: string): string => {
  const relativePath = path.relative(from, to) || '.'

  return relativePath.split(path.sep).join('/')
}

const quoteJsString = (value: string): string => `'${value.replace(/\\/gu, '\\\\').replace(/'/gu, '\\\'')}'`

const replaceTemplateVars = (template: string, vars: Record<string, string>): string => {
  let content = template

  for (const [key, value] of Object.entries(vars)) {
    content = content.replaceAll(`__${key}__`, value)
  }

  return content
}

const readmeTemplates = {
  'en-GB': readmeEnGBTemplate,
  'es-ES': readmeEsESTemplate,
  'ru-RU': readmeRuRUTemplate,
} as const

type ReadmeLocale = keyof typeof readmeTemplates

const normalizeLocale = (value: string | undefined): ReadmeLocale | null => {
  const normalized = value?.split('.')[0].replace('_', '-').toLowerCase()

  if (!normalized) {
    return null
  }

  if (normalized.startsWith('ru')) {
    return 'ru-RU'
  }

  if (normalized.startsWith('es')) {
    return 'es-ES'
  }

  if (normalized.startsWith('en')) {
    return 'en-GB'
  }

  return null
}

const detectReadmeLocale = (): ReadmeLocale => {
  const envCandidates = [
    process.env.LANGUAGE?.split(':')[0],
    process.env.LC_ALL,
    process.env.LC_MESSAGES,
    process.env.LANG,
  ]

  for (const candidate of envCandidates) {
    const locale = normalizeLocale(candidate)
    if (locale) {
      return locale
    }
  }

  return 'en-GB'
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

export const createEnvDts = (): string => envDtsTemplate

export const createTsConfig = (cwd: string, sourceRoot: string): string => replaceTemplateVars(
  tsConfigTemplate,
  {
    SOURCE_ROOT_RELATIVE: toPosixRelative(cwd, sourceRoot),
  }
)

export const createViteConfig = (cwd: string, sourceRoot: string): string => replaceTemplateVars(
  viteConfigTemplate,
  {
    ENTRY_PATH: quoteJsString(toPosixRelative(cwd, path.join(sourceRoot, 'endpoint/endpoint.worker.ts'))),
    LOCALE_INCLUDE_PATTERN: toPosixRelative(cwd, path.join(sourceRoot, 'i18n/locales')),
    SOURCE_ROOT_PATH: quoteJsString(toPosixRelative(cwd, sourceRoot)),
  }
)

export const createEslintConfig = (cwd: string, sourceRoot: string): string => replaceTemplateVars(
  eslintConfigTemplate,
  {
    LOCALE_DIR_PATTERN: `./${toPosixRelative(cwd, path.join(sourceRoot, 'i18n/locales'))}/*.{json,json5,yaml,yml}`,
  }
)

export const createEndpointWorker = (options: InitOptions): string => replaceTemplateVars(
  endpointWorkerTemplate,
  {
    PAGE_CODE: quoteJsString(options.pageCode),
    WIDGET_TARGET: quoteJsString(options.widgetTarget),
  }
)

export const createI18nIndex = (): string => i18nIndexTemplate

export const createSettingsPage = (): string => settingsPageTemplate

export const createOrderWidget = (): string => orderWidgetTemplate

export const createMessages = (): string => `${JSON.stringify({}, null, 2)}${DEFAULT_NEWLINE}`

export const createExtensionConfig = (options: InitOptions): string => `${JSON.stringify({
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

export const createExtensionIcon = (): string => extensionIconTemplate

export const createPublishScript = (): string => publishScriptTemplate

export const createReadme = (
  cwd: string,
  sourceRoot: string,
  options: InitOptions,
  packageManager: PackageManager
): string => replaceTemplateVars(
  readmeTemplates[detectReadmeLocale()],
  {
    PACKAGE_MANAGER: packageManager,
    PACKAGE_MANAGER_RUN: createPackageManagerRunCommand(packageManager),
    PAGE_CODE: options.pageCode,
    SOURCE_ROOT: toPosixRelative(cwd, sourceRoot),
    WIDGET_TARGET: options.widgetTarget,
  }
)
