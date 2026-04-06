import type { Field } from '@retailcrm/embed-ui-v1-types/context'

import { expect, test } from 'vitest'

import { createSandboxController } from '@/controller'
import { createSandboxRpc } from '@/rpc'

type UserContext = {
  id: Field<number, true>;
  name: Field<string>;
}

type ArticleContext = {
  title: Field<string>;
}

const schemas = {
  article: {
    title: {
      accepts: (value: unknown): value is string => typeof value === 'string',
      defaults: () => 'Draft',
      readonly: false,
    },
  },
  user: {
    id: {
      accepts: (value: unknown): value is number => typeof value === 'number',
      defaults: () => 1,
      readonly: true,
    },
    name: {
      accepts: (value: unknown): value is string => typeof value === 'string',
      defaults: () => 'Guest',
      readonly: false,
    },
  },
} satisfies {
  article: ArticleContext;
  user: UserContext;
}

test('serves reactive context access through rpc bridge', async () => {
  const sandbox = createSandboxController<typeof schemas>({
    schemas,
  })

  const { dispose, remote } = createSandboxRpc(sandbox)
  const endpoint = remote.call as {
    get(context: string, field: string): Promise<unknown>;
    set(context: string, field: string, value: unknown): Promise<void>;
  }

  expect(await endpoint.get('user', 'id')).toBe(1)
  expect(await endpoint.get('article', 'title')).toBe('Draft')

  await endpoint.set('user', 'name', 'Kirill')
  await endpoint.set('article', 'title', 'Sandbox')

  expect(sandbox.state.contexts.user.name).toBe('Kirill')
  expect(sandbox.state.contexts.article.title).toBe('Sandbox')

  dispose()
})

test('installs global bridge for automation mode', () => {
  const sandbox = createSandboxController<typeof schemas>({
    globalBridge: {
      key: '__TEST_SANDBOX__',
    },
    mode: 'automation',
    schemas,
  })

  const bridge = (globalThis as typeof globalThis & {
    __TEST_SANDBOX__?: typeof sandbox.bridge;
  }).__TEST_SANDBOX__

  expect(bridge).toBeDefined()

  bridge?.setField('article', 'title', 'Bridge title')
  bridge?.setMode('standalone-test')
  bridge?.setLocation({ pathname: '/customers/view' })

  expect(sandbox.state.contexts.article.title).toBe('Bridge title')
  expect(sandbox.state.mode).toBe('standalone-test')
  expect(sandbox.state.host.location.pathname).toBe('/customers/view')

  sandbox.dispose()

  expect((globalThis as typeof globalThis & {
    __TEST_SANDBOX__?: unknown;
  }).__TEST_SANDBOX__).toBeUndefined()
})
