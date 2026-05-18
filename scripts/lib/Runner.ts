import type Logger from './Logger'

import type {
  ExecFileOptionsWithStringEncoding,
  PromiseWithChild,
} from 'node:child_process'

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

type RunnerExecOptions = Omit<ExecFileOptionsWithStringEncoding, 'encoding'>

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
    options: RunnerExecOptions = {}
  ) {
    return await this.call(() => promisify(execFile)(command, args, {
      ...options,
      encoding: 'utf8',
    }))
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
