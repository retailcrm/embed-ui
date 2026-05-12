import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackageHook } from './types'
import type { PackageManager } from './args'

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

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

const resolveDownloadCommand = (
  packageName: string,
  binName: string,
  packageManager: PackageManager,
  args: string[]
): ResolvedHookCommand => {
  if (packageManager === 'yarn') {
    const commandArgs = ['dlx', '-p', packageName, binName, ...args]

    return {
      command: 'yarn',
      args: commandArgs,
      display: `yarn ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  if (packageManager === 'pnpm') {
    const commandArgs = ['dlx', '--package', packageName, binName, ...args]

    return {
      command: 'pnpm',
      args: commandArgs,
      display: `pnpm ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  if (packageManager === 'bun') {
    const commandArgs = ['x', '--package', packageName, binName, ...args]

    return {
      command: 'bun',
      args: commandArgs,
      display: `bun ${commandArgs.join(' ')}`,
      source: 'transient',
    }
  }

  const commandArgs = ['exec', '--yes', '--package', packageName, '--', binName, ...args]

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
  args: string[]
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

  return resolveDownloadCommand(packageName, binName, packageManager, args)
}

const getExecErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return String(error)
}

export const runPackageHookCommand = (
  cwd: string,
  packageName: string,
  binName: string,
  packageManager: PackageManager,
  args: string[],
  failureMode: InstallablePackageHook['failureMode'],
  options: InitOptions,
  changes: InitChanges
): void => {
  const command = resolvePackageHookCommand(cwd, packageName, binName, packageManager, args)

  changes.hooks.push(command.display)

  if (options.dryRun) {
    return
  }

  try {
    execFileSync(command.command, command.args, {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    if (command.source === 'transient' && failureMode === 'advisory') {
      changes.warnings.push(`Package hook ${command.display} was skipped: ${getExecErrorMessage(error)}`)
      return
    }

    throw error
  }
}
