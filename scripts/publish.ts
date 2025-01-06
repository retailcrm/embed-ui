import Historian from './lib/Historian'
import Logger from './lib/Logger'
import Runner from './lib/Runner'

import chalk from 'chalk'

import {
  read,
  walk,
} from '@modulify/pkg'

import args from './args/publish'

import { DEFAULTS } from './args/release'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv }

  const logger = new Logger(options)
  const runner = new Runner(logger, options)

  const historian = new Historian(runner)

  const root = read(cwd)

  const [nextTag, prevTag] = await historian.tags()

  logger.info('\nPublishing packages, that have changes from tag %s to tag %s\n', [
    prevTag,
    nextTag,
  ])

  await walk([root], async (pkg) => {
    const currVersion = pkg.manifest.version ?? null
    const prevVersion = prevTag
      ? await historian.versionOnTag(pkg.path, prevTag)
      : null

    if (pkg.manifest.exports && currVersion !== prevVersion) {
      logger.info('%s: %s\n', [chalk.magenta(pkg.name), pkg.manifest.version])

      await runner.runCommand('npm', [
        'publish',
        pkg.path,
        '--access', 'public',
        ...(options.dry ? ['--dry-run'] : []),
      ])
    }
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}
