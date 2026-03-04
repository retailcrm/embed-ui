import type { Endpoint } from '@remote-ui/rpc'

import type { RemoteApi } from '@/common/extension'

import type { Runner } from './endpoint'

import { createEndpoint } from './endpoint'

export const runEndpoint = (runner: Runner): Endpoint<RemoteApi> =>
  createEndpoint(runner, self as unknown as Worker)
