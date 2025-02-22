import type {
  Dependencies,
  Manifest,
} from '@modulify/pkg/types/manifest'

import ChangelogWriter from './lib/ChangelogWriter'
import Logger from './lib/Logger'
import Runner from './lib/Runner'
import VersionGenerator from './lib/VersionGenerator'

import chalk from 'chalk'
import { relative } from 'node:path'

import {
  read,
  update,
  walk,
} from '@modulify/pkg'

import args from './args/release'
import figures from 'figures'

import { DEFAULTS } from './args/release'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv } as typeof DEFAULTS

  const log = new Logger(options)
  const sh = new Runner(log, options.dry)

  const generator = new VersionGenerator({
    releaseAs: options.releaseAs,
    prerelease: options.prerelease,
  })

  const root = read(cwd)

  const nextRelease = await generator.next(root.manifest.version ?? '0.0.0')
  const nextVersion = nextRelease.version

  if (nextVersion === null) {
    log.error('Unable to calculate next version')
    process.exit(1)
  }

  if (nextVersion === root.manifest.version) {
    log.info('No changes since last release')
    process.exit(0)
  }

  log.info('Root package: ' + chalk.magenta(root.name))
  log.info('Next version: ' + chalk.cyan(nextVersion))

  const changelog = new ChangelogWriter(log, {
    path: cwd,
    dry: options.dry,
  })

  const keysOf = <T extends object>(o: T) => Object.keys(o) as (keyof T)[]
  const empty = <T extends object>(o: T | undefined): o is T => !o || keysOf(o).length === 0
  const actualize = (dependencies: Dependencies) => keysOf(dependencies).reduce((all, name) => ({
    ...all,
    [name]: String(name).startsWith('@retailcrm/embed-ui-') ? '^' + nextVersion : dependencies[name],
  }), {} as Dependencies)

  const paths = [relative(cwd, await changelog.write(nextVersion))]

  await walk([root], async (pkg) => {
    const diff = { version: nextVersion } as Partial<Manifest>
    const manifest = pkg.manifest

    if (!empty(manifest.peerDependencies)) diff.peerDependencies = actualize(manifest.peerDependencies!)
    if (!empty(manifest.dependencies)) diff.dependencies = actualize(manifest.dependencies!)
    if (!empty(manifest.optionalDependencies)) diff.optionalDependencies = actualize(manifest.optionalDependencies!)
    if (!empty(manifest.devDependencies)) diff.devDependencies = actualize(manifest.devDependencies!)

    paths.push(relative(cwd, update(pkg.path, diff, options.dry)))
  })

  await sh.run('yarn', ['install', '--no-immutable'])

  paths.push(relative(cwd, 'yarn.lock'))

  if (options.dry) {
    log.info('No commiting & tagging since it was a dry run')
  } else {
    log.info(`Committing ${paths.length} staged files`)

    const tag = `v${nextVersion}`

    await sh.run('git', ['add', ...paths])
    await sh.run('git', ['commit', ...paths, '-m', `chore(release): ${tag}`])

    log.info('Tagging release %s', [tag])

    await sh.run('git', ['tag', '-a', tag, '-m', `chore(release): ${tag}`])

    const brunch = await sh.run('git', ['rev-parse', '--abbrev-ref', 'HEAD'])

    log.info('Run `%s` to publish', [
      'git push --follow-tags origin ' + String(brunch ?? '%branch%').trim(),
    ], chalk.blue(figures.info))
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
