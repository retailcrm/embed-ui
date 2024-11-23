import type { ReleaseType } from 'semver'

import yargs from 'yargs'

export const DEFAULTS = {
  releaseAs: undefined as ReleaseType | undefined,
  prerelease: undefined as 'alpha' | 'beta' | 'rc' | undefined,
  dry: false,
}

const definition = yargs(process.argv)
  .usage('Usage: $0 [options]')
  .option('release-as', {
    alias: 'r',
    describe: 'Specify the release type (major|minor|patch)',
    requiresArg: true,
    string: true,
  })
  .option('prerelease', {
    alias: 'p',
    describe: 'Specify the prerelease type (alpha|beta|rc)',
    requiresArg: true,
    string: true,
  })
  .option('dry', {
    type: 'boolean',
    default: DEFAULTS.dry,
    describe: 'See the commands that running release script would run',
  })
  .check((argv) => {
    if (!['alpha', 'beta', 'rc', undefined].includes(argv.prerelease)) {
      throw Error('scripts must be an object')
    } else {
      return true
    }
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .example('$0', 'Update changelog and tag release')
  .example('$0 -m "%s: see changelog for details"', 'Update changelog and tag release with custom commit message')
  .pkgConf('release')
  .wrap(97)

export default definition
