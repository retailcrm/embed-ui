import type Logger from './Logger'

import type {
  PackageManifest,
  PackageNode,
} from '../types/worktree'

import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import * as glob from 'glob'

const readManifest = (pkgPath: string) => {
  const content = readFileSync(resolve(pkgPath, 'package.json'), 'utf8')
  return JSON.parse(content) as PackageManifest
}

export default class Reader {
  private logger: Logger

  constructor (logger: Logger) {
    this.logger = logger
  }

  read (path: string) {
    const root = this._readNode(path, path, null, 0)

    root.workspaces.forEach(w => {
      this._readWorkspaces(w, path, root.worktree)
    })

    return root
  }

  private _readNode (
    path: string,
    parentPath: string,
    parentWorkspace: string | null = null,
    level = 1
  ): PackageNode {
    const manifest = readManifest(path)

    return {
      name: manifest.name ?? 'NONE',
      level,
      version: manifest.version ?? '0.0.0',
      path,
      ...(manifest.main ? { main: manifest.main } : {}),
      ...(manifest.module ? { module: manifest.module } : {}),
      ...(manifest.exports ? { exports: manifest.exports } : {}),
      dependencies: manifest.dependencies ?? {},
      devDependencies: manifest.devDependencies ?? {},
      optionalDependencies: manifest.optionalDependencies ?? {},
      peerDependencies: manifest.peerDependencies ?? {},
      workspaces: manifest.workspaces ?? [],
      worktree: [],
      parentPath,
      parentWorkspace,
    }
  }

  private _readWorkspaces (
    workspace: string,
    parentPath: string,
    parentSubtree: PackageNode[] = [],
    parentWorkspace: string | null = null,
    level = 1
  ) {
    const pattern = join(parentPath, workspace)

    glob.sync(pattern).forEach(path => {
      try {
        const node = this._readNode(
          path,
          parentPath,
          parentWorkspace,
          level
        )

        parentSubtree.push(node)

        node.workspaces.forEach(w => {
          this._readWorkspaces(w, path, node.worktree, workspace, level + 1)
        })
      } catch (e) {
        if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
          this.logger.warn('Empty workspace found: %s', [path])
        } else {
          throw e
        }
      }
    })
  }
}
