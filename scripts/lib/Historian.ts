import type { Manifest } from '@modulify/pkg/types/manifest'
import type Runner from './Runner'

import gitSemverTags from 'git-semver-tags'

import {
  join,
  relative,
} from 'node:path'

export default class Historian {
  private readonly runner: Runner

  constructor (runner: Runner) {
    this.runner = runner
  }

  async tags () {
    return gitSemverTags({ tagPrefix: 'v' })
  }

  async versionOnTag (path: string, tag: string): Promise<string | null> {
    try {
      const manifestOnTag = await this.runner.runCommand('git', [
        'show',
        `${tag}:${relative(process.cwd(), join(path, 'package.json'))}`,
      ])

      const { version } = JSON.parse(manifestOnTag ?? '{}') as Manifest

      return version ?? null
    } catch (e) {
      if (String(e).includes(`exists on disk, but not in '${tag}'`)) {
        return null
      }

      throw e
    }
  }
}
