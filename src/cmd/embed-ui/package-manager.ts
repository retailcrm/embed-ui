import type { PackageManager } from './args'

import { execFileSync } from 'node:child_process'

export const resolvePackageManagerVersion = (packageManager: PackageManager): string | null => {
  try {
    return execFileSync(packageManager, ['--version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return null
  }
}

export const isPackageManagerAvailable = (packageManager: PackageManager): boolean =>
  resolvePackageManagerVersion(packageManager) !== null

export const assertPackageManagerAvailable = (packageManager: PackageManager): void => {
  if (!isPackageManagerAvailable(packageManager)) {
    throw new Error(
      `Package manager "${packageManager}" was selected, but its binary was not found in PATH. ` +
      `Install ${packageManager} or choose another package manager.`
    )
  }
}
