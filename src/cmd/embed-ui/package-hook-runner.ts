import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackageHook } from './types'
import type { PackageManager } from './args'

import fs from 'node:fs'
import path from 'node:path'

import { resolvePackageManagerVersion } from './package-manager'
import { runCommandWithTerminalStatus } from './terminal'

interface ResolvedHookCommand {
  command: string;
  args: string[];
  display: string;
  source: 'local' | 'transient';
}

const resolveLocalBinPath = (cwd: string, binName: string): string | null => {
  const binPath = path.join(cwd, 'node_modules', '.bin', process.platform === 'win32' ? `${binName}.cmd` : binName)

  return fs.existsSync(binPath) ? binPath : null
}

const hasLocalPackage = (cwd: string, packageName: string): boolean =>
  fs.existsSync(path.join(cwd, 'node_modules', packageName, 'package.json'))

const createPackageSpec = (packageName: string, version: string | null): string =>
  version && version !== 'not used' ? `${packageName}@${version}` : packageName

const resolveMajorVersion = (version: string | null): number | null => {
  const major = version?.match(/^\d+/u)?.[0]

  return major ? Number(major) : null
}

const resolveDownloadCommand = (
  packageName: string,
  binName: string,
  packageManager: PackageManager,
  args: string[],
  packageVersion: string | null,
  versionResolver: (packageManager: PackageManager) => string | null
): ResolvedHookCommand => {
  const packageSpec = createPackageSpec(packageName, packageVersion)

  if (packageManager === 'yarn') {
    const yarnMajor = resolveMajorVersion(versionResolver('yarn'))

    if (yarnMajor !== null && yarnMajor >= 2) {
      const commandArgs = ['dlx', '-p', packageSpec, binName, ...args]

      return {
        command: 'yarn',
        args: commandArgs,
        display: `yarn ${commandArgs.join(' ')}`,
        source: 'transient',
      }
    }

    const commandArgs = ['-y', '--loglevel=error', '-p', packageSpec, binName, ...args]

    return {
      command: 'npx',
      args: commandArgs,
      display: `npx ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  if (packageManager === 'pnpm') {
    const commandArgs = ['dlx', '--package', packageSpec, binName, ...args]

    return {
      command: 'pnpm',
      args: commandArgs,
      display: `pnpm ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  if (packageManager === 'bun') {
    const commandArgs = ['x', '--package', packageSpec, binName, ...args]

    return {
      command: 'bun',
      args: commandArgs,
      display: `bun ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  const commandArgs = ['exec', '--yes', '--loglevel=error', '--package', packageSpec, '--', binName, ...args]

  return {
    command: 'npm',
    args: commandArgs,
    display: `npm ${commandArgs.join(' ')}`,
    source: 'transient',
  }
}

export const resolvePackageHookCommand = (
  cwd: string,
  packageName: string,
  binName: string,
  packageManager: PackageManager,
  args: string[],
  packageVersion: string | null = null,
  versionResolver: (packageManager: PackageManager) => string | null = resolvePackageManagerVersion
): ResolvedHookCommand => {
  const localBinPath = resolveLocalBinPath(cwd, binName)

  if (localBinPath) {
    return {
      command: localBinPath,
      args,
      display: `${localBinPath} ${args.join(' ')}`,
      source: 'local',
    }
  }

  if (hasLocalPackage(cwd, packageName)) {
    throw new Error(
      `${packageName} is installed, but ${binName} was not found in node_modules/.bin. ` +
      'Reinstall dependencies or check the package bin metadata.'
    )
  }

  return resolveDownloadCommand(packageName, binName, packageManager, args, packageVersion, versionResolver)
}

const getExecErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    const output = [
      'stderr' in error ? error.stderr : null,
      'stdout' in error ? error.stdout : null,
    ]
      .map((value) => value instanceof Buffer ? value.toString('utf8') : value)
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
      .map((value) => value.trim())
      .join('\n')

    if (output) {
      return output
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return String(error)
}

const appendMcpHookNotices = (output: string, changes: InitChanges): void => {
  for (const line of output.split(/\r?\n/u)) {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('MCP: ')) {
      changes.mcp.push(trimmedLine.slice('MCP: '.length))
    }
  }
}

export const runPackageHookCommand = async (
  cwd: string,
  packageName: string,
  binName: string,
  packageManager: PackageManager,
  args: string[],
  failureMode: InstallablePackageHook['failureMode'],
  options: InitOptions,
  changes: InitChanges
): Promise<void> => {
  const command = resolvePackageHookCommand(
    cwd,
    packageName,
    binName,
    packageManager,
    args,
    options.version
  )

  changes.hooks.push(command.display)

  if (options.dryRun) {
    return
  }

  try {
    const result = await runCommandWithTerminalStatus(
      command.command,
      command.args,
      { cwd },
      `Running ${packageName} ${args[0]}`
    )

    appendMcpHookNotices(result.stdout, changes)
  } catch (error) {
    if (command.source === 'transient' && failureMode === 'advisory') {
      changes.warnings.push(`Package hook ${command.display} was skipped: ${getExecErrorMessage(error)}`)
      return
    }

    throw error
  }
}
