import yargs from 'yargs'

export const DEFAULTS = {
  dry: false,
}

const definition = yargs(process.argv)
  .usage('Usage: $0 [options]')
  .option('dry', {
    type: 'boolean',
    default: DEFAULTS.dry,
    describe: 'See the commands that running release script would run',
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .example('$0', 'Update changelog and tag release')
  .example('$0 -m "%s: see changelog for details"', 'Update changelog and tag release with custom commit message')
  .pkgConf('release')
  .wrap(97)

export default definition
