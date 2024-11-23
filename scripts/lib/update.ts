import type { PackageManifest } from '../types/worktree'

import detectIndent from 'detect-indent'
import { detectNewline } from 'detect-newline'
import { resolve } from 'node:path'
import stringifyPackage from 'stringify-package'

import * as fs from 'node:fs'

const rewrite = (path: string, diff: Partial<PackageManifest>) => {
  const content = fs.readFileSync(path, 'utf8')

  const indent = detectIndent(content).indent
  const newline = detectNewline(content)

  fs.writeFileSync(path, stringifyPackage({
    ...JSON.parse(content),
    ...diff,
  }, indent, newline), 'utf8')

  return path
}

export default (path: string, diff: Partial<PackageManifest>, dry = false) => {
  return dry
    ? resolve(path, 'package.json')
    : rewrite(resolve(path, 'package.json'), diff)
}
