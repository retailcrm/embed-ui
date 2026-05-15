import type { InitOptions, PackageManager } from './args'

import { createInterface } from 'node:readline/promises'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { DEFAULT_INIT_PACKAGE_IDS, INSTALLABLE_PACKAGES } from './packages'
import { PACKAGE_MANAGERS, parsePackageList } from './args'
import { resolveInstallPackages } from './packages'

const INIT_PACKAGE_IDS = new Set(DEFAULT_INIT_PACKAGE_IDS)

const resolveDefaultSourceRoot = (cwd: string, options: InitOptions): string => {
  if (options.srcDir) {
    return options.srcDir
  }

  if (options.target) {
    return options.target
  }

  return fs.existsSync(path.join(cwd, 'src')) ? './web' : './src'
}

const normalizeOptionalAnswer = (value: string): string | null => {
  const trimmed = value.trim()

  return trimmed.length ? trimmed : null
}

const askString = async (
  readline: ReturnType<typeof createInterface>,
  question: string,
  defaultValue: string
): Promise<string> => {
  const answer = normalizeOptionalAnswer(await readline.question(`${question} [${defaultValue}]: `))

  return answer ?? defaultValue
}

const askBoolean = async (
  readline: ReturnType<typeof createInterface>,
  question: string,
  defaultValue: boolean
): Promise<boolean> => {
  const suffix = defaultValue ? 'Y/n' : 'y/N'

  while (true) {
    const answer = normalizeOptionalAnswer(await readline.question(`${question} [${suffix}]: `))

    if (answer === null) {
      return defaultValue
    }

    if (/^(y|yes|д|да)$/iu.test(answer)) {
      return true
    }

    if (/^(n|no|н|нет)$/iu.test(answer)) {
      return false
    }

    console.error('Введите yes/no или нажмите Enter для значения по умолчанию.')
  }
}

const askPackageManager = async (
  readline: ReturnType<typeof createInterface>,
  detectedPackageManager: PackageManager | null,
  explicitPackageManager: PackageManager | null
): Promise<PackageManager | null> => {
  if (explicitPackageManager) {
    return explicitPackageManager
  }

  const defaultPackageManager = detectedPackageManager ?? 'npm'

  while (true) {
    const answer = await askString(
      readline,
      `Package manager (${PACKAGE_MANAGERS.join('/')})`,
      defaultPackageManager
    )

    if (PACKAGE_MANAGERS.includes(answer as PackageManager)) {
      return answer as PackageManager
    }

    console.error(`Unknown package manager: ${answer}`)
  }
}

const askPackages = async (
  readline: ReturnType<typeof createInterface>,
  options: InitOptions
): Promise<string[] | null> => {
  if (options.packages) {
    return options.packages
  }

  const defaultPackageIds = [...DEFAULT_INIT_PACKAGE_IDS, ...(options.with ?? [])]

  console.log('Пакеты для init:')
  for (const selectedPackage of INSTALLABLE_PACKAGES.filter((entry) => INIT_PACKAGE_IDS.has(entry.id))) {
    console.log(`  - ${selectedPackage.id}: ${selectedPackage.name}`)
    console.log(`    ${selectedPackage.description}`)
  }

  while (true) {
    const answer = await askString(
      readline,
      'Пакеты через запятую',
      defaultPackageIds.join(',')
    )
    const tokens = parsePackageList(answer)

    try {
      const selectedPackages = resolveInstallPackages(tokens)

      if (selectedPackages.some((selectedPackage) => selectedPackage.id === 'testing')) {
        throw new Error('@retailcrm/embed-ui-v1-testing is not published for public init yet')
      }

      return tokens
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error))
    }
  }
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

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    const nextOptions: InitOptions = { ...options }

    if (!nextOptions.agentsOnly) {
      const defaultSourceRoot = resolveDefaultSourceRoot(cwd, nextOptions)
      const sourceRoot = await askString(readline, 'Frontend source root', defaultSourceRoot)

      if (nextOptions.srcDir) {
        nextOptions.srcDir = sourceRoot
      } else {
        nextOptions.target = sourceRoot
      }

      nextOptions.packages = await askPackages(readline, nextOptions)
      nextOptions.noConfigs = nextOptions.noConfigs || !(await askBoolean(readline, 'Создать базовые конфиги', true))
      nextOptions.noTemplate = nextOptions.noTemplate || !(await askBoolean(readline, 'Создать стартовый шаблон', true))
    }

    nextOptions.packageManager = await askPackageManager(
      readline,
      detectedPackageManager,
      nextOptions.packageManager
    )
    nextOptions.noAgents = nextOptions.noAgents || !(await askBoolean(readline, 'Обновить AGENTS.md', true))
    nextOptions.noMcp = nextOptions.noMcp || !(await askBoolean(readline, 'Добавить MCP-настройки', true))

    if (!nextOptions.agentsOnly) {
      nextOptions.noInstall = nextOptions.noInstall || !(await askBoolean(readline, 'Запустить установку зависимостей', true))
    }

    return nextOptions
  } finally {
    readline.close()
  }
}
