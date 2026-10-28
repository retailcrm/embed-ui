import type { Manifest } from '@modulify/pkg/types/manifest'

import { join, relative } from 'node:path'

import { Client } from '@modulify/conventional-git'

import chalk from 'chalk'
import semver from 'semver'

import { read, walk } from '@modulify/pkg'

import Logger from './lib/Logger'
import Runner from './lib/Runner'

import args from './args/publish'

import { DEFAULTS } from './args/publish'

try {
  const cwd = process.cwd()
  const options = { ...DEFAULTS, ...args.argv }

  const history = new Client({ cwd })

  const log = new Logger(options)
  const sh = new Runner(log, options.dry)

  const versionOnTag = async (path: string, tag: string): Promise<string | undefined> => {
    const content = await history.git.cmd.show(tag, relative(cwd, join(path, 'package.json')))
    const manifest = JSON.parse(content ?? '{}') as Manifest

    return manifest.version
  }

  const tags = [] as string[]

  for await (const tag of history.tags({ prefix: 'v' })) {
    tags.push(tag)
  }

  const [nextTag, prevTag] = tags.sort((a, b) => semver.rcompare(a, b))

  log.info('\nPublishing packages, that have changes from tag %s to tag %s\n', [
    prevTag,
    nextTag,
  ])

  await walk([read(cwd)], async (pkg) => {
    const currVersion = pkg.manifest.version
    const prevVersion = prevTag ? await versionOnTag(pkg.path, prevTag) : undefined

    if (pkg.manifest.exports && currVersion !== prevVersion) {
      log.info('%s: %s\n', [chalk.magenta(pkg.name), currVersion])

      const prerelease = currVersion ? semver.prerelease(currVersion) : null
      const publishTag = typeof prerelease?.[0] === 'string' ? prerelease[0] : undefined

      await sh.run('npm', [
        'publish',
        pkg.path,
        '--access', 'public',
        ...(publishTag ? ['--tag', publishTag] : []),
        ...(options.dry ? ['--dry-run'] : []),
      ])
    }
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}
