import type { Field } from '@retailcrm/embed-ui-v1-types/context'

import { expect, test } from 'vitest'

import { createSandboxController, createSandboxRpc } from '@/core'

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
  const endpoint = remote.call as unknown as {
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

test('keeps endpoint context references valid after reset', async () => {
  const sandbox = createSandboxController<typeof schemas>({
    schemas,
  })

  const { dispose, remote } = createSandboxRpc(sandbox)
  const endpoint = remote.call as unknown as {
    get(context: string, field: string): Promise<unknown>;
    set(context: string, field: string, value: unknown): Promise<void>;
  }

  await endpoint.set('article', 'title', 'Changed')

  expect(await endpoint.get('article', 'title')).toBe('Changed')

  sandbox.reset()

  expect(sandbox.state.contexts.article.title).toBe('Draft')
  expect(await endpoint.get('article', 'title')).toBe('Draft')

  dispose()
})

test('keeps endpoint context references valid after patchContext', async () => {
  const sandbox = createSandboxController<typeof schemas>({
    schemas,
  })

  const { dispose, remote } = createSandboxRpc(sandbox)
  const endpoint = remote.call as unknown as {
    get(context: string, field: string): Promise<unknown>;
  }

  sandbox.patchContext('article', {
    title: 'Patched from editor',
  })

  expect(sandbox.state.contexts.article.title).toBe('Patched from editor')
  expect(await endpoint.get('article', 'title')).toBe('Patched from editor')

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

test('supports controller without global bridge and creates missing custom entity', () => {
  const sandbox = createSandboxController<typeof schemas>({
    globalBridge: false,
    schemas,
  })

  sandbox.setCustomField('order', 'comment', 'Created on demand')

  expect(sandbox.state.custom.entities.order).toEqual({
    schema: {
      entity: 'order',
      fields: [],
    },
    values: {
      comment: 'Created on demand',
    },
  })
  sandbox.uninstallGlobalBridge()
  sandbox.dispose()
})

test('resets controller to an explicit snapshot', () => {
  const sandbox = createSandboxController<typeof schemas>({
    globalBridge: false,
    schemas,
  })
  const snapshot = sandbox.snapshot()

  snapshot.contexts.article.title = 'Snapshot title'
  sandbox.reset(snapshot)

  expect(sandbox.state.contexts.article.title).toBe('Snapshot title')
})

test('creates rpc directly from endpoint api', async () => {
  const sandbox = createSandboxController<typeof schemas>({
    globalBridge: false,
    schemas,
  })
  const { dispose, remote } = createSandboxRpc<typeof schemas>(sandbox.endpointApi)
  const endpoint = remote.call as unknown as {
    get(context: 'article', field: 'title'): Promise<unknown>;
  }

  await expect(endpoint.get('article', 'title')).resolves.toBe('Draft')

  dispose()
  sandbox.dispose()
})
