import type {
  Dependencies,
  Manifest,
} from '@modulify/pkg/types/manifest'

import { GitCommander } from '@modulify/git-toolkit'

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

  const git = new GitCommander({ cwd })

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

  const files = [relative(cwd, await changelog.write(nextVersion))]

  await walk([root], async (pkg) => {
    const diff = { version: nextVersion } as Partial<Manifest>
    const manifest = pkg.manifest

    if (!empty(manifest.peerDependencies)) diff.peerDependencies = actualize(manifest.peerDependencies!)
    if (!empty(manifest.dependencies)) diff.dependencies = actualize(manifest.dependencies!)
    if (!empty(manifest.optionalDependencies)) diff.optionalDependencies = actualize(manifest.optionalDependencies!)
    if (!empty(manifest.devDependencies)) diff.devDependencies = actualize(manifest.devDependencies!)

    files.push(relative(cwd, update(pkg.path, diff, options.dry)))
  })

  await sh.run('yarn', ['install', '--no-immutable'])

  files.push(relative(cwd, 'yarn.lock'))

  if (options.dry) {
    log.info('No commiting & tagging since it was a dry run')
  } else {
    log.info(`Committing ${files.length} staged files`)

    const tag = `v${nextVersion}`

    await git.add(files)
    await git.commit({ files, message: `chore(release): ${tag}` })

    log.info('Tagging release %s', [tag])

    await git.tag({ name: tag, message: `chore(release): ${tag}` })

    const brunch = await git.revParse('HEAD', { abbrevRef: true })

    log.info('Run `%s` to publish', [
      'git push --follow-tags origin ' + String(brunch ?? '%branch%').trim(),
    ], chalk.blue(figures.info))
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
