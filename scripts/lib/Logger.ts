import chalk from 'chalk'
import figures from 'figures'

import * as util from 'node:util'

export default class Logger {
  private readonly dry: boolean

  constructor ({ dry }: { dry: boolean; }) {
    this.dry = dry
  }

  get figure () {
    return this.dry
      ? chalk.yellow(figures.tick)
      : chalk.green(figures.tick)
  }

  info (template: string, context: unknown[] = [], figure: string | undefined = undefined) {
    console.info(this.format(template, context, figure))
  }

  warn (template: string, context: unknown[] = [], figure = figures.warning) {
    console.warn(chalk.yellow(this.format(template, context, figure)))
  }

  error (template: string, context: unknown[] = [], figure = figures.cross) {
    console.error(chalk.red(this.format(template, context, figure)))
  }

  format (template: string, context: unknown[] = [], figure: string | undefined = undefined) {
    const bold = (arg: unknown) => chalk.bold(arg)
    const message = util.format(template, ...context.map(bold))

    return (figure ?? this.figure) + ' ' + message
  }
}
