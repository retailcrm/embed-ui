import type { InitChanges } from './types'
import type { InitOptions } from './args'
import type { InstallablePackage } from './types'
import type { PackageManager } from './args'

import { runPackageHookCommand } from './package-hook-runner'

export const applyInitPackageConfigHooks = (
  cwd: string,
  selectedPackages: InstallablePackage[],
  packageManager: PackageManager,
  options: InitOptions,
  changes: InitChanges
): void => {
  for (const selectedPackage of selectedPackages) {
    for (const hook of selectedPackage.hooks ?? []) {
      if (hook.type !== 'config') {
        continue
      }

      if (hook.requiresMcp && options.noMcp) {
        continue
      }

      const args = [hook.command, cwd]

      if (hook.requiresMcp && (options.force || options.forceMcp)) {
        args.push('--force')
      }

      if (hook.requiresMcp && options.mcpClientConfigs?.length) {
        args.push('--mcp-client-configs', options.mcpClientConfigs.join(','))
      }

      runPackageHookCommand(
        cwd,
        selectedPackage.name,
        hook.binName,
        packageManager,
        args,
        hook.failureMode,
        options,
        changes
      )
    }
  }
}
