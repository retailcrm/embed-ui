import args from './args/publish'

import { runPublication } from './lib/publication'

try {
  await runPublication({ ...await args.parse(), mode: 'publish' })
} catch (error) {
  console.error(error)
  process.exit(1)
}
