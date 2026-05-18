import type { InitOptions, PackageManager } from './args'

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { checkbox, input, select } from '@inquirer/prompts'

import { DEFAULT_INIT_PACKAGE_IDS, INSTALLABLE_PACKAGES } from './packages'
import { PACKAGE_MANAGERS } from './args'
import { resolveInstallPackages } from './packages'

type InitAction = 'configs' | 'template' | 'agents' | 'mcp' | 'install'

const INIT_ACTION_LABELS = {
  configs: 'Создать базовые конфиги',
  template: 'Создать стартовый шаблон',
  agents: 'Обновить AGENTS.md',
  mcp: 'Добавить MCP-настройки',
  install: 'Запустить установку зависимостей',
} satisfies Record<InitAction, string>

const INIT_ACTION_DESCRIPTIONS = {
  configs: 'tsconfig.json, vite.config.ts, eslint.config.js и env.d.ts',
  template: 'Vue-точка входа, страница настроек, виджет заказа, i18n и publish script',
  agents: 'Общие и пакетные инструкции для AI-агентов',
  mcp: '.mcp.json и MCP-инструкции пакетов',
  install: 'Запуск выбранного package manager после изменения package.json',
} satisfies Record<InitAction, string>

const resolveDefaultSourceRoot = (cwd: string, options: InitOptions): string => {
  if (options.srcDir) {
    return options.srcDir
  }

  if (options.target) {
    return options.target
  }

  return fs.existsSync(path.join(cwd, 'src')) ? './web' : './src'
}

const resolvePromptedPackages = async (options: InitOptions): Promise<string[] | null> => {
  if (options.packages) {
    return options.packages
  }

  const defaultPackageIds = [...DEFAULT_INIT_PACKAGE_IDS, ...(options.with ?? [])]
  if (defaultPackageIds.includes('testing')) {
    throw new Error('@retailcrm/embed-ui-v1-testing is not published for public init yet')
  }

  const selectedPackageIds = await checkbox<string>({
    message: 'Пакеты для init',
    choices: INSTALLABLE_PACKAGES
      .filter((selectedPackage) => selectedPackage.id !== 'testing')
      .map((selectedPackage) => ({
        name: `${selectedPackage.id}: ${selectedPackage.name}`,
        value: selectedPackage.id,
        checked: defaultPackageIds.includes(selectedPackage.id),
        description: selectedPackage.description,
      })),
    required: true,
  })

  resolveInstallPackages(selectedPackageIds)

  return selectedPackageIds
}

const resolveAvailableActions = (options: InitOptions): InitAction[] => {
  const actions: InitAction[] = []

  if (!options.agentsOnly && !options.noConfigs) {
    actions.push('configs')
  }

  if (!options.agentsOnly && !options.noTemplate) {
    actions.push('template')
  }

  if (!options.noAgents) {
    actions.push('agents')
  }

  if (!options.noMcp) {
    actions.push('mcp')
  }

  if (!options.agentsOnly && !options.noInstall) {
    actions.push('install')
  }

  return actions
}

const applyPromptedActions = (options: InitOptions, selectedActions: InitAction[]): void => {
  const selectedActionSet = new Set(selectedActions)

  options.noConfigs = options.noConfigs || !selectedActionSet.has('configs')
  options.noTemplate = options.noTemplate || !selectedActionSet.has('template')
  options.noAgents = options.noAgents || !selectedActionSet.has('agents')
  options.noMcp = options.noMcp || !selectedActionSet.has('mcp')
  options.noInstall = options.noInstall || !selectedActionSet.has('install')
}

const resolvePromptedActions = async (options: InitOptions): Promise<InitAction[]> => {
  const availableActions = resolveAvailableActions(options)

  if (availableActions.length === 0) {
    return []
  }

  return checkbox<InitAction>({
    message: 'Действия init',
    choices: availableActions.map((action) => ({
      name: INIT_ACTION_LABELS[action],
      value: action,
      checked: true,
      description: INIT_ACTION_DESCRIPTIONS[action],
    })),
  })
}

const resolvePromptedPackageManager = async (
  detectedPackageManager: PackageManager | null,
  explicitPackageManager: PackageManager | null
): Promise<PackageManager | null> => {
  if (explicitPackageManager) {
    return explicitPackageManager
  }

  const defaultPackageManager = detectedPackageManager ?? 'npm'

  return select<PackageManager>({
    message: 'Package manager',
    default: defaultPackageManager,
    choices: PACKAGE_MANAGERS.map((packageManager) => ({
      name: packageManager,
      value: packageManager,
    })),
  })
}

export const resolveInteractiveInitOptions = async (
  cwd: string,
  options: InitOptions,
  detectedPackageManager: PackageManager | null
): Promise<InitOptions> => {
  if (!options.interactive) {
    return options
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('Interactive init mode requires a TTY. Use explicit flags or omit --interactive.')
  }

  const nextOptions: InitOptions = { ...options }

  if (!nextOptions.agentsOnly) {
    const defaultSourceRoot = resolveDefaultSourceRoot(cwd, nextOptions)
    const sourceRoot = await input({
      message: 'Frontend source root',
      default: defaultSourceRoot,
      validate: (value) => value.trim().length > 0 || 'Укажите каталог фронтенда.',
    })

    if (nextOptions.srcDir) {
      nextOptions.srcDir = sourceRoot
    } else {
      nextOptions.target = sourceRoot
    }

    nextOptions.packages = await resolvePromptedPackages(nextOptions)
  }

  const selectedActions = await resolvePromptedActions(nextOptions)
  applyPromptedActions(nextOptions, selectedActions)

  nextOptions.packageManager = await resolvePromptedPackageManager(
    detectedPackageManager,
    nextOptions.packageManager
  )

  return nextOptions
}
