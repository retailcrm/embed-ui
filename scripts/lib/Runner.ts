import type {
  ExecOptions,
  PromiseWithChild,
} from 'node:child_process'

import type { ObjectEncodingOptions } from 'node:fs'

import type Logger from './Logger'

import {
  exec,
  execFile,
} from 'node:child_process'

import { promisify } from 'node:util'

import chalk from 'chalk'
import figures from 'figures'

export default class Runner {
  private readonly dry: boolean
  private readonly logger: Logger
  private readonly scripts: Record<string, string>

  constructor (logger: Logger, { dry, scripts }: {
    dry: boolean;
    scripts?: Record<string, string>;
  }) {
    this.logger = logger
    this.dry = dry
    this.scripts = scripts ?? {}
  }

  async runCommand (
    command: string,
    args: string[],
    options: ObjectEncodingOptions & ExecOptions = {}
  ) {
    return await this.run(() => promisify(execFile)(command, args, options))
  }

  async runHook (hookName: string) {
    if (!this.scripts[hookName]) {
      return Promise.resolve()
    }

    const command = this.scripts[hookName]

    this.logger.info('Running lifecycle script "%s"', [hookName])
    this.logger.info('- execute command: "%s"', [command], chalk.blue(figures.info))

    return await this.run(() => promisify(exec)(command))
  }

  async run (thread: () => PromiseWithChild<{
    stdout: string;
    stderr: string;
  }>) {
    if (this.dry) {
      return
    }

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
