import type {
  DependencySection,
  Formatting,
  InitChanges,
  PackageJson,
} from './types'

import fs from 'node:fs'

import { findDependencySection, formatRange, isTargetPackage } from './packages'

export const DEFAULT_INDENT = '  '
export const DEFAULT_NEWLINE = '\n'

export const INIT_RUNTIME_DEPENDENCIES: Array<{ name: string; range: string }> = [
  { name: '@omnicajs/vue-remote', range: '^0.2.23' },
  { name: 'pinia', range: '^2.2' },
  { name: 'vue', range: '^3.5' },
  { name: 'vue-i18n', range: '^11' },
]

export const INIT_DEV_DEPENDENCIES: Array<{ name: string; range: string }> = [
  { name: '@eslint/js', range: '^9.39' },
  { name: '@intlify/eslint-plugin-vue-i18n', range: '~4.3.0' },
  { name: '@intlify/unplugin-vue-i18n', range: '^11.1' },
  { name: '@omnicajs/eslint-plugin-dependencies', range: '^0.0.2' },
  { name: '@types/node', range: '^22.19' },
  { name: '@vitejs/plugin-vue', range: '^6.0' },
  { name: '@vue/language-server', range: '^3.2' },
  { name: 'eslint', range: '^9.39' },
  { name: 'eslint-plugin-vue', range: '^10.9' },
  { name: 'globals', range: '^16.5' },
  { name: 'less', range: '^4.6' },
  { name: 'typescript', range: '^5.9' },
  { name: 'typescript-eslint', range: '^8.59' },
  { name: 'vite', range: '^7.3' },
  { name: 'vite-svg-loader', range: '^5.1' },
  { name: 'vue-eslint-parser', range: '^10.4' },
]

export const detectFormatting = (source: string): Formatting => {
  const newline = source.includes('\r\n') ? '\r\n' : DEFAULT_NEWLINE
  const indentMatch = source.match(/\n([ \t]+)"/)

  return {
    indent: indentMatch?.[1] ?? DEFAULT_INDENT,
    newline,
    trailingNewline: source.endsWith('\n') || source.endsWith('\r\n'),
  }
}

export const serializePackageJson = (packageJson: PackageJson, formatting: Formatting): string => {
  const serialized = JSON.stringify(packageJson, null, formatting.indent)
    .replace(/\n/g, formatting.newline)

  return formatting.trailingNewline
    ? `${serialized}${formatting.newline}`
    : serialized
}

export const readPackageJson = (packageJsonPath: string): { formatting: Formatting; packageJson: PackageJson } => {
  const source = fs.readFileSync(packageJsonPath, 'utf8')

  return {
    formatting: detectFormatting(source),
    packageJson: JSON.parse(source),
  }
}

export const writePackageJson = (packageJsonPath: string, packageJson: PackageJson, formatting: Formatting): void => {
  fs.writeFileSync(packageJsonPath, serializePackageJson(packageJson, formatting), 'utf8')
}

export const readOrCreatePackageJson = (
  packageJsonPath: string
): { created: boolean; formatting: Formatting; packageJson: PackageJson } => {
  if (fs.existsSync(packageJsonPath)) {
    return {
      created: false,
      ...readPackageJson(packageJsonPath),
    }
  }

  return {
    created: true,
    formatting: {
      indent: DEFAULT_INDENT,
      newline: DEFAULT_NEWLINE,
      trailingNewline: true,
    },
    packageJson: {
      name: 'retailcrm-extension-frontend',
      private: true,
      type: 'module',
      scripts: {
        build: 'vite build',
        lint: 'eslint .',
        'lint:fix': 'eslint --fix .',
      },
      dependencies: {},
      devDependencies: {},
    },
  }
}

const ensureObjectField = (object: PackageJson, field: string): PackageJson => {
  if (!object[field] || typeof object[field] !== 'object' || Array.isArray(object[field])) {
    object[field] = {}
  }

  return object[field] as PackageJson
}

export const setMissingScript = (
  packageJson: PackageJson,
  name: string,
  command: string,
  changes: InitChanges
): void => {
  const scripts = ensureObjectField(packageJson, 'scripts')

  if (scripts[name] === command) {
    return
  }

  if (typeof scripts[name] === 'string') {
    changes.warnings.push(`script "${name}" already exists and will not be overwritten`)
    return
  }

  scripts[name] = command

  changes.packageJson.push({
    type: 'script',
    name,
    nextRange: command,
  })
}

export const setDependency = (
  packageJson: PackageJson,
  section: DependencySection,
  name: string,
  range: string,
  changes: InitChanges
): void => {
  const currentSection = findDependencySection(packageJson, name)

  if (currentSection && currentSection !== section) {
    changes.warnings.push(`${name} already exists in ${currentSection}; expected ${section}`)
    return
  }

  const dependencyMap = ensureObjectField(packageJson, section)
  const currentRange = dependencyMap[name]

  if (currentRange === range) {
    return
  }

  if (typeof currentRange === 'string' && !isTargetPackage(name)) {
    changes.warnings.push(`${name} already exists with range ${currentRange}; expected ${range}`)
    return
  }

  dependencyMap[name] = typeof currentRange === 'string'
    ? formatRange(currentRange, range.replace(/^[~^]/u, ''), range === range.replace(/^[~^]/u, ''))
    : range
  const nextRange = String(dependencyMap[name])

  changes.packageJson.push({
    type: typeof currentRange === 'string' ? 'update' : 'install',
    section,
    name,
    currentRange: typeof currentRange === 'string' ? currentRange : null,
    nextRange,
  })
}
