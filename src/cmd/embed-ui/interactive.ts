import type { InitOptions, PackageManager } from './args'

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { checkbox, input, select } from '@inquirer/prompts'

import { DEFAULT_INIT_PACKAGE_IDS, INSTALLABLE_PACKAGES } from './packages'
import { isPackageManagerAvailable } from './package-manager'
import { PACKAGE_MANAGERS } from './args'
import { resolveInstallPackages } from './packages'

type InitAction = 'configs' | 'template' | 'agents' | 'mcp' | 'git' | 'install'
type McpClientConfig = 'codex' | 'cursor' | 'junie' | 'vscode'

const INIT_ACTION_LABELS = {
  configs: 'Создать базовые конфиги',
  template: 'Создать стартовый шаблон',
  agents: 'Обновить AGENTS.md',
  mcp: 'Добавить MCP-настройки',
  git: 'Инициализировать Git',
  install: 'Запустить установку зависимостей',
} satisfies Record<InitAction, string>

const INIT_ACTION_DESCRIPTIONS = {
  configs: 'tsconfig.json, vite.config.ts, eslint.config.js и env.d.ts',
  template: 'Vue-точка входа, страница настроек, виджет заказа, i18n и publish script',
  agents: 'Общие и пакетные инструкции для AI-агентов',
  mcp: '.mcp.json и MCP-инструкции пакетов',
  git: 'git init в каталоге проекта, если Git еще не настроен',
  install: 'Запуск выбранного package manager после изменения package.json',
} satisfies Record<InitAction, string>

const MCP_CLIENT_CONFIG_LABELS = {
  codex: 'Codex CLI',
  cursor: 'Cursor',
  junie: 'Junie',
  vscode: 'VS Code',
} satisfies Record<McpClientConfig, string>

const MCP_CLIENT_CONFIG_DESCRIPTIONS = {
  codex: '.codex/config.toml for trusted Codex projects',
  cursor: '.cursor/mcp.json with ${workspaceFolder}',
  junie: '.junie/mcp/mcp.json',
  vscode: '.vscode/mcp.json with ${workspaceFolder}',
} satisfies Record<McpClientConfig, string>

const MCP_CLIENT_CONFIGS = Object.keys(MCP_CLIENT_CONFIG_LABELS) as McpClientConfig[]

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

  if (!options.agentsOnly && !isGitWorkTree(options.cwd)) {
    actions.push('git')
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
  options.initGit = options.initGit || selectedActionSet.has('git')
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
  const availablePackageManagers = PACKAGE_MANAGERS.filter(isPackageManagerAvailable)

  if (availablePackageManagers.length === 0) {
    throw new Error('No supported package manager binary was found in PATH. Install npm, yarn, pnpm, or bun and rerun init.')
  }

  return select<PackageManager>({
    message: 'Package manager',
    default: availablePackageManagers.includes(defaultPackageManager)
      ? defaultPackageManager
      : availablePackageManagers[0],
    choices: PACKAGE_MANAGERS.map((packageManager) => ({
      name: packageManager,
      value: packageManager,
      description: isPackageManagerAvailable(packageManager)
        ? 'found in PATH'
        : 'not found in PATH',
      disabled: isPackageManagerAvailable(packageManager)
        ? false
        : 'not found in PATH',
    })),
  })
}

const resolvePromptedMcpClientConfigs = async (options: InitOptions): Promise<string[] | null> => {
  if (options.noMcp || options.mcpClientConfigs) {
    return options.mcpClientConfigs
  }

  return checkbox<McpClientConfig>({
    message: 'MCP client configs',
    choices: MCP_CLIENT_CONFIGS.map((clientConfig) => ({
      name: MCP_CLIENT_CONFIG_LABELS[clientConfig],
      value: clientConfig,
      checked: false,
      description: MCP_CLIENT_CONFIG_DESCRIPTIONS[clientConfig],
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

  nextOptions.mcpClientConfigs = await resolvePromptedMcpClientConfigs(nextOptions)

  nextOptions.packageManager = await resolvePromptedPackageManager(
    detectedPackageManager,
    nextOptions.packageManager
  )

  return nextOptions
}
