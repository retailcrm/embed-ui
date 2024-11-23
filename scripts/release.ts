import type {
  PackageDependencies,
  PackageManifest,
} from './types/worktree'

import ChangelogWriter from './lib/ChangelogWriter'
import Logger from './lib/Logger'
import Reader from './lib/Reader'
import Runner from './lib/Runner'
import VersionGenerator from './lib/VersionGenerator'

import chalk from 'chalk'
import { relative } from 'node:path'
import update from './lib/update'
import walk from './lib/walk'

import args from './args/release'
import figures from 'figures'

import { DEFAULTS } from './args/release'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv } as typeof DEFAULTS

  const logger = new Logger(options)
  const reader = new Reader(logger)
  const runner = new Runner(logger, options)

  const generator = new VersionGenerator({
    releaseAs: options.releaseAs,
    prerelease: options.prerelease,
  })

  const root = reader.read(cwd)

  const nextRelease = await generator.next(root.version)
  const nextVersion = nextRelease.version

  if (nextVersion === null) {
    logger.error('Unable to calculate next version')
    process.exit(1)
  }

  if (nextVersion === root.version) {
    logger.info('No changes since last release')
    process.exit(0)
  }

  logger.info('Root package: ' + chalk.magenta(root.name))
  logger.info('Next version: ' + chalk.cyan(nextVersion))

  const changelog = new ChangelogWriter(logger, {
    path: cwd,
    dry: options.dry,
  })

  const paths = [
    relative(cwd, await changelog.write(nextVersion)),
    relative(cwd, update(cwd, { version: nextVersion }, options.dry)),
  ]

  const keysOf = <T extends object>(o: T) => Object.keys(o) as (keyof T)[]
  const empty = (o: object) => keysOf(o).length === 0
  const actualize = (dependencies: PackageDependencies) => keysOf(dependencies).reduce((all, name) => ({
    ...all,
    [name]: name.startsWith('@retailcrm/embed-ui-') ? '^' + nextVersion : dependencies[name],
  }), {} as PackageDependencies)

  await walk(root.worktree, async (pkg) => {
    const diff = { version: nextVersion } as Partial<PackageManifest>

    if (!empty(pkg.peerDependencies)) diff.peerDependencies = actualize(pkg.peerDependencies)
    if (!empty(pkg.dependencies)) diff.dependencies = actualize(pkg.dependencies)
    if (!empty(pkg.optionalDependencies)) diff.optionalDependencies = actualize(pkg.optionalDependencies)
    if (!empty(pkg.devDependencies)) diff.devDependencies = actualize(pkg.devDependencies)

    paths.push(relative(cwd, update(pkg.path, diff)))
  })

  await runner.runCommand('yarn', ['install'])

  paths.push(relative(cwd, 'yarn.lock'))

  if (options.dry) {
    logger.info('No commiting & tagging since it was a dry run')
  } else {
    logger.info(`Committing ${paths.length} staged files`)

    const tag = `v${nextVersion}`

    await runner.runCommand('git', ['add', ...paths])
    await runner.runCommand('git', ['commit', ...paths, '-m', `chore(release): ${tag}`])

    logger.info('Tagging release %s', [tag])

    await runner.runCommand('git', ['tag', '-a', tag, '-m', `chore(release): ${tag}`])

    const brunch = await runner.runCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD'])

    logger.info('Run `%s` to publish', [
      'git push --follow-tags origin ' + String(brunch ?? '%branch%').trim(),
    ], chalk.blue(figures.info))
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
