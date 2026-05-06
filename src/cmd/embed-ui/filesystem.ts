import type { InitChanges } from './types'
import type { InitOptions } from './args'

import fs from 'node:fs'
import path from 'node:path'

const SKIP_DIRECTORIES = new Set([
  '.git',
  '.hg',
  '.svn',
  '.yarn',
  'node_modules',
  'dist',
  'build',
  'coverage',
])

const ensureDirectoryExists = (targetPath: string): void => {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Path not found: ${targetPath}`)
  }

  const stat = fs.statSync(targetPath)
  if (!stat.isDirectory()) {
    throw new Error(`Target is not a directory: ${targetPath}`)
  }
}

export const resolvePackageJsonPath = (targetPath: string): string => {
  if (path.basename(targetPath) === 'package.json') {
    if (!fs.existsSync(targetPath)) {
      throw new Error(`package.json not found: ${targetPath}`)
    }

    return targetPath
  }

  const packageJsonPath = path.resolve(targetPath, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found: ${packageJsonPath}`)
  }

  return packageJsonPath
}

export const collectPackageJsonPaths = (targetPath: string): string[] => {
  const resolvedTarget = path.resolve(targetPath)

  if (!fs.existsSync(resolvedTarget)) {
    throw new Error(`Path not found: ${resolvedTarget}`)
  }

  if (path.basename(resolvedTarget) === 'package.json') {
    return [resolvedTarget]
  }

  ensureDirectoryExists(resolvedTarget)

  const packageJsonPaths: string[] = []

  const visit = (directoryPath: string): void => {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    if (fs.existsSync(packageJsonPath) && fs.statSync(packageJsonPath).isFile()) {
      packageJsonPaths.push(packageJsonPath)
    }

    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.isSymbolicLink()) {
        continue
      }

      if (SKIP_DIRECTORIES.has(entry.name)) {
        continue
      }

      visit(path.join(directoryPath, entry.name))
    }
  }

  visit(resolvedTarget)

  return packageJsonPaths.sort()
}

export const writeFileIfAllowed = (
  filePath: string,
  content: string,
  options: InitOptions,
  changes: InitChanges
): boolean => {
  if (fs.existsSync(filePath) && !options.forceFiles && !options.force) {
    changes.warnings.push(`${filePath} already exists and will not be overwritten`)
    return false
  }

  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content, 'utf8')
  }

  changes.files.push(filePath)
  return true
}

export const ensureDirectory = (directoryPath: string, options: InitOptions, changes: InitChanges): void => {
  if (fs.existsSync(directoryPath)) {
    if (!fs.statSync(directoryPath).isDirectory()) {
      throw new Error(`Target path is not a directory: ${directoryPath}`)
    }

    changes.skipped.push(`${directoryPath} already exists`)
    return
  }

  if (!options.dryRun) {
    fs.mkdirSync(directoryPath, { recursive: true })
  }

  changes.directories.push(directoryPath)
}
