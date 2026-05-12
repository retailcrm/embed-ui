import type {
  DependencySection,
  InstallablePackage,
  PackageChange,
  PackageJson,
} from './types'

import { createInterface } from 'node:readline/promises'
import { execFileSync } from 'node:child_process'
import process from 'node:process'

import { parsePackageList } from './args'
import { TARGET_SECTIONS } from './types'

export const ROOT_PACKAGE = '@retailcrm/embed-ui'

export const INSTALLABLE_PACKAGES: InstallablePackage[] = [
  {
    id: 'embed-ui',
    name: ROOT_PACKAGE,
    section: 'dependencies',
    description: 'Базовый пакет с общим API и согласованными v1-зависимостями.',
  },
  {
    id: 'components',
    name: '@retailcrm/embed-ui-v1-components',
    section: 'dependencies',
    description: 'UI-компоненты для host/remote приложений.',
    hooks: [
      {
        type: 'agents',
        binName: 'embed-ui-v1-components',
        command: 'init-agents',
        failureMode: 'advisory',
      },
    ],
  },
  {
    id: 'contexts',
    name: '@retailcrm/embed-ui-v1-contexts',
    section: 'dependencies',
    description: 'Реактивные контексты RetailCRM JS API.',
  },
  {
    id: 'types',
    name: '@retailcrm/embed-ui-v1-types',
    section: 'dependencies',
    description: 'Базовые type declarations для RetailCRM JS API.',
  },
  {
    id: 'testing',
    name: '@retailcrm/embed-ui-v1-testing',
    section: 'devDependencies',
    description: 'Вспомогательные утилиты и типы для тестов интеграций.',
  },
  {
    id: 'endpoint',
    name: '@retailcrm/embed-ui-v1-endpoint',
    section: 'dependencies',
    description: 'Endpoint API для интеграций в RetailCRM.',
    hooks: [
      {
        type: 'agents',
        binName: 'embed-ui-v1-endpoint',
        command: 'init-agents',
        failureMode: 'advisory',
        requiresMcp: true,
      },
      {
        type: 'config',
        binName: 'embed-ui-v1-endpoint',
        command: 'init-config',
        failureMode: 'advisory',
        requiresMcp: true,
      },
    ],
  },
]

export const resolveLatestVersion = (): string => {
  const output = execFileSync(
    'npm',
    ['view', ROOT_PACKAGE, 'version'],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  ).trim()

  if (!output) {
    throw new Error(`Cannot resolve latest version for ${ROOT_PACKAGE}`)
  }

  return output
}

export const isTargetPackage = (name: string): boolean =>
  name === ROOT_PACKAGE || name.startsWith(`${ROOT_PACKAGE}-`)

export const createRange = (version: string, exact: boolean): string => exact ? version : `^${version}`

export const formatRange = (currentRange: string, nextVersion: string, exact: boolean): string => {
  if (exact) {
    return nextVersion
  }

  if (currentRange.startsWith('workspace:')) {
    return currentRange
  }

  if (currentRange.startsWith('~')) {
    return `~${nextVersion}`
  }

  if (currentRange.startsWith('^')) {
    return `^${nextVersion}`
  }

  return `^${nextVersion}`
}

export const findDependencySection = (packageJson: PackageJson, packageName: string): DependencySection | null => {
  for (const section of TARGET_SECTIONS) {
    const dependencyMap = packageJson[section] as Record<string, unknown> | undefined

    if (dependencyMap && typeof dependencyMap === 'object' && packageName in dependencyMap) {
      return section
    }
  }

  return null
}

export const updatePackageJson = (
  packageJson: PackageJson,
  version: string,
  exact: boolean
): PackageChange[] => {
  const updates: PackageChange[] = []

  for (const section of TARGET_SECTIONS) {
    const dependencyMap = packageJson[section] as Record<string, unknown> | undefined

    if (!dependencyMap || typeof dependencyMap !== 'object') {
      continue
    }

    for (const [name, currentRange] of Object.entries(dependencyMap)) {
      if (!isTargetPackage(name) || typeof currentRange !== 'string') {
        continue
      }

      const nextRange = formatRange(currentRange, version, exact)
      if (nextRange === currentRange) {
        continue
      }

      dependencyMap[name] = nextRange
      updates.push({
        type: 'update',
        section,
        name,
        currentRange,
        nextRange,
      })
    }
  }

  return updates
}

export const resolveInstallPackages = (tokens: string[]): InstallablePackage[] => {
  const selectedPackages: InstallablePackage[] = []
  const seen = new Set<string>()

  for (const token of tokens) {
    const normalized = token.trim()
    if (!normalized) {
      continue
    }

    const numericIndex = Number(normalized)
    const selectedPackage =
      Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= INSTALLABLE_PACKAGES.length
        ? INSTALLABLE_PACKAGES[numericIndex - 1]
        : INSTALLABLE_PACKAGES.find((entry) => entry.id === normalized || entry.name === normalized)

    if (!selectedPackage) {
      const supported = INSTALLABLE_PACKAGES
        .map((entry, index) => `${index + 1}/${entry.id}/${entry.name}`)
        .join(', ')

      throw new Error(`Unknown add target "${normalized}". Supported values: ${supported}`)
    }

    if (seen.has(selectedPackage.name)) {
      continue
    }

    seen.add(selectedPackage.name)
    selectedPackages.push(selectedPackage)
  }

  return selectedPackages
}

export const installPackages = (
  packageJson: PackageJson,
  packages: InstallablePackage[],
  version: string,
  exact: boolean
): PackageChange[] => {
  const updates: PackageChange[] = []

  for (const selectedPackage of packages) {
    const section = findDependencySection(packageJson, selectedPackage.name) ?? selectedPackage.section
    const dependencyMap = (packageJson[section] ?? {}) as Record<string, unknown>

    if (!(section in packageJson)) {
      packageJson[section] = dependencyMap
    }

    const currentRange = dependencyMap[selectedPackage.name]
    const nextRange = typeof currentRange === 'string'
      ? formatRange(currentRange, version, exact)
      : createRange(version, exact)

    if (currentRange === nextRange) {
      continue
    }

    dependencyMap[selectedPackage.name] = nextRange
    updates.push({
      type: typeof currentRange === 'string' ? 'update' : 'install',
      section,
      name: selectedPackage.name,
      currentRange: typeof currentRange === 'string' ? currentRange : null,
      nextRange,
    })
  }

  return updates
}

export const promptForInstallSelection = async (packageJson: PackageJson): Promise<InstallablePackage[]> => {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('Interactive add mode requires a TTY. Use --packages to select packages explicitly.')
  }

  console.log('Выберите пакеты для установки в текущий package.json:')
  for (const [index, selectedPackage] of INSTALLABLE_PACKAGES.entries()) {
    const currentSection = findDependencySection(packageJson, selectedPackage.name)
    const installedHint = currentSection ? ` Уже есть в ${currentSection}.` : ''

    console.log(`  ${index + 1}. ${selectedPackage.name} (${selectedPackage.id})`)
    console.log(`     ${selectedPackage.description} Раздел по умолчанию: ${selectedPackage.section}.${installedHint}`)
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    while (true) {
      const answer = await readline.question(
        'Введите номера, ids или имена пакетов через запятую (например: 1,3 или components,types): '
      )

      const tokens = parsePackageList(answer)
      if (tokens.length === 0) {
        return []
      }

      try {
        return resolveInstallPackages(tokens)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(message)
      }
    }
  } finally {
    readline.close()
  }
}
