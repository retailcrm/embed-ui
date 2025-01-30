import type { Manifest } from '@modulify/pkg/types/manifest'

import Logger from './lib/Logger'
import Runner from './lib/Runner'

import chalk from 'chalk'
import gitSemverTags from 'git-semver-tags'

import {
  join,
  relative,
} from 'node:path'

import {
  read,
  walk,
} from '@modulify/pkg'

import args from './args/publish'

import { DEFAULTS } from './args/release'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv }

  const log = new Logger(options)
  const sh = new Runner(log, options.dry)

  const contentOnTag = async (path: string, tag: string): Promise<string | undefined> => {
    try {
      return await sh.run('git', ['show', `${tag}:${path}`])
    } catch (e) {
      if (String(e).includes(`exists on disk, but not in '${tag}'`)) {
        return undefined
      }

      throw e
    }
  }

  const versionOnTag = async (path: string, tag: string): Promise<string | undefined> => {
    const content = await contentOnTag(relative(cwd, join(path, 'package.json')), tag)
    const manifest = JSON.parse(content ?? '{}') as Manifest

    return manifest.version
  }

  const [nextTag, prevTag] = await gitSemverTags({ tagPrefix: 'v' })

  log.info('\nPublishing packages, that have changes from tag %s to tag %s\n', [
    prevTag,
    nextTag,
  ])

  await walk([read(cwd)], async (pkg) => {
    const currVersion = pkg.manifest.version
    const prevVersion = prevTag ? await versionOnTag(pkg.path, prevTag) : undefined

    if (pkg.manifest.exports && currVersion !== prevVersion) {
      log.info('%s: %s\n', [chalk.magenta(pkg.name), currVersion])

      await sh.run('npm', [
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
