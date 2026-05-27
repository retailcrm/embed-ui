import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage, InstallablePackageHook } from './types'
import type { PackageManager } from './args'

import { runPackageHookCommand } from './package-hook-runner'

const runInitSkillsHook = async (
  packageName: string,
  binName: string,
  cwd: string,
  packageManager: PackageManager,
  failureMode: InstallablePackageHook['failureMode'],
  options: InitOptions,
  changes: InitChanges
): Promise<void> => {
  const args: string[] = ['init-skills', cwd]

  if (options.force || options.forceSkills) {
    args.push('--force')
  }

  await runPackageHookCommand(
    cwd,
    packageName,
    binName,
    packageManager,
    args,
    failureMode,
    options,
    changes
  )
}

export const applyInitSkills = async (
  cwd: string,
  selectedPackages: InstallablePackage[],
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): Promise<void> => {
  if (options.noSkills) {
    return
  }

  for (const selectedPackage of selectedPackages) {
    for (const hook of selectedPackage.hooks ?? []) {
      if (hook.type !== 'skills') {
        continue
      }

      await runInitSkillsHook(
        selectedPackage.name,
        hook.binName,
        cwd,
        packageManager,
        hook.failureMode,
        options,
        changes
      )
    }
  }
}
