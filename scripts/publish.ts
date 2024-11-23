import type { PackageNode } from './types/worktree'

import Historian from './lib/Historian'
import Logger from './lib/Logger'
import Reader from './lib/Reader'
import Runner from './lib/Runner'

import chalk from 'chalk'
import walk from './lib/walk'

import args from './args/publish'

import { DEFAULTS } from './args/release'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv }

  const logger = new Logger(options)
  const reader = new Reader(logger)
  const runner = new Runner(logger, options)

  const historian = new Historian(runner)

  const root = reader.read(cwd)

  const [nextTag, prevTag] = await historian.tags()

  logger.info('\nPublishing packages, that have changes from tag %s to tag %s\n', [
    prevTag,
    nextTag,
  ])

  const publish = async (pkg: PackageNode) => {
    logger.info('%s: %s\n', [chalk.magenta(pkg.name), pkg.version])

    await runner.runCommand('npm', [
      'publish',
      pkg.path,
      '--access', 'public',
      ...(options.dry ? ['--dry-run'] : []),
    ])
  }

  await publish(root)

  await walk(root.worktree, async (pkg) => {
    const prevVersion = prevTag
      ? await historian.versionOnTag(pkg.path, prevTag)
      : null

    if (pkg.exports && pkg.version !== prevVersion) {
      await publish(pkg)
    }
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}
