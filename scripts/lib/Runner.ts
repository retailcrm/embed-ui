import type {
  ExecOptions,
  PromiseWithChild,
} from 'node:child_process'

import type { ObjectEncodingOptions } from 'node:fs'

import type Logger from './Logger'

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

export default class Runner {
  private readonly dry: boolean
  private readonly logger: Logger

  constructor (logger: Logger, dry = false) {
    this.logger = logger
    this.dry = dry
  }

  async run (
    command: string,
    args: string[],
    options: ObjectEncodingOptions & ExecOptions = {}
  ) {
    return await this.call(() => promisify(execFile)(command, args, options))
  }

  async call (thread: () => PromiseWithChild<{
    stdout: string;
    stderr: string;
  }>) {
    if (this.dry) return

    try {
      const { stderr, stdout } = await thread()
      if (stderr) {
        this.logger.warn(stderr)
      }

      return stdout
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('stderr' in error ? String(error.stderr) : error.message)
      }

      throw error
    }
  }
}
