import type { PackageNode } from '../types/worktree'

export default async function walk (
  worktree: PackageNode[],
  visit: (node: PackageNode) => Promise<void>
) {
  for (let i = 0; i < worktree.length; i++) {
    const node = worktree[i]

    await visit(node)
    await walk(node.worktree, visit)
  }
}