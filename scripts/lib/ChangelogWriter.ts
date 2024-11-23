import type Logger from './Logger'

import chalk from 'chalk'
import conventionalChangelog from 'conventional-changelog'
import createPreset from 'conventional-changelog-conventionalcommits'
import { join } from 'node:path'

import * as fs from 'node:fs'
import semver from 'semver'

export type Options = {
  name?: string;
  path: string;
  header?: string;
  dry?: boolean;
  verbose?: boolean;
}

export default class ChangelogWriter {
  private readonly logger: Logger

  private readonly name: string
  private readonly path: string

  private readonly header: string

  private readonly dry: boolean
  private readonly verbose: boolean

  constructor (logger: Logger, options: Options) {
    this.logger = logger

    this.path = options.path
    this.name = options.name ?? 'CHANGELOG.md'

    this.header = options.header ?? '# Changelog\n\n'

    this.dry = options.dry ?? false
    this.verbose = options.verbose ?? false
  }

  sync (filePath: string) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK)
      return true
    } catch (e) {
      if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
        fs.writeFileSync(filePath, '\n')
        return false
      }

      throw e
    }
  }

  read (filePath: string) {
    const content = this.dry ? '' : fs.readFileSync(filePath, 'utf-8')
    const start = content.search(/(^#+ \[?[0-9]+\.[0-9]+\.[0-9]+|<a name=)/m)

    return start !== -1
      ? content.substring(start)
      : content
  }

  async write (newVersion: string): Promise<string> {
    const path = join(this.path, this.name)
    const preset = Object.assign(await createPreset({
      preMajor: semver.lt(newVersion, '1.0.0', false),
    }), {
      name: 'conventionalcommits',
    })

    return new Promise((resolve, reject) => {
      sync(path)
      const content = this.read(path)

      let changes = ''

      conventionalChangelog({
        preset,
        tagPrefix: 'v',
        ...(this.verbose ? {
          debug: console.info.bind(console, 'conventional-changelog'),
        } : {}),
      }, {
        version: newVersion,
      }, {
        merges: null,
        path: this.path,
      })
        .on('error', reject)
        .on('data', buffer => { changes += buffer.toString() })
        .on('end', () => {
          if (this.dry) {
            console.info(`\n---\n${chalk.gray(changes.trim())}\n---\n`)
          } else {
            fs.writeFileSync(
              path,
              this.header + '\n' + (changes + content).replace(/\n+$/, '\n')
            )

            this.logger.info('Changelog stored to %s', [path])
          }

          return resolve(path)
        })
    })
  }
}

function sync (filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      fs.writeFileSync(filePath, '\n')
      return false
    }

    throw e
  }
}