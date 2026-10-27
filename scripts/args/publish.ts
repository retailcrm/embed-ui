import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'

const definition = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('dry', {
    type: 'boolean',
    default: false,
    describe: 'Show the publication plan without uploading packages',
  })
  .option('check', {
    type: 'boolean',
    default: false,
    describe: 'Check publication prerequisites without uploading packages',
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .strict()
  .wrap(97)

export default definition
