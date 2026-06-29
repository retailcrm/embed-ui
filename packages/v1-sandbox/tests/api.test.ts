import type { Field } from '@retailcrm/embed-ui-v1-types/context'

import { expect, test } from 'vitest'

import { createSandboxHostApi } from '@/host'
import { createSandboxState } from '@/state'

type SettingsContext = {
  title: Field<string>;
}

const schemas = {
  settings: {
    title: {
      accepts: (value: unknown): value is string => typeof value === 'string',
      defaults: () => 'Sandbox',
      readonly: false,
    },
  },
} satisfies {
  settings: SettingsContext;
}

test('host api exposes cloned location', () => {
  const state = createSandboxState({
    location: {
      pathname: '/orders',
      query: {
        status: 'new',
      },
    },
    schemas,
  })
  const hostApi = createSandboxHostApi(state)
  const location = hostApi.getLocation()

  location.query.status = 'changed'

  expect(hostApi.getLocation()).toMatchObject({
    pathname: '/orders',
    query: {
      status: 'new',
    },
    search: '?status=new',
  })
})

test('host api records route navigation and query updates', () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state)

  hostApi.goTo('/orders/215/edit', {
    tab: 'customer',
  })
  hostApi.pushQuery({
    status: 'new',
  }, {
    preserveExisting: true,
  })
  hostApi.replaceQuery({
    page: 2,
    tags: ['vip', 'bad'],
  })

  expect(state.host.location).toMatchObject({
    pathname: '/orders/215/edit',
    query: {
      page: '2',
      tags: ['vip', 'bad'],
    },
    search: '?page=2&tags=vip&tags=bad',
  })
  expect(state.host.navigation).toMatchObject([
    {
      kind: 'go-to',
      route: '/orders/215/edit',
    },
    {
      kind: 'push-query',
    },
    {
      kind: 'replace-query',
    },
  ])
})

test('host api uses fallback http response without middleware', async () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state, {
    descriptorUuid: 'module',
  })
  const response = await hostApi.httpCall('/unknown', {
    ok: true,
  })

  expect(response).toEqual({
    body: JSON.stringify({
      ok: true,
    }),
    status: 200,
  })
  expect(state.host.http.at(-1)).toMatchObject({
    action: '/unknown',
    payload: {
      ok: true,
    },
    response,
    uuid: 'module',
  })
})

test('host api resolves dynamic descriptor and backend url for http middleware', async () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state, {
    getDescriptorUuid: () => 'dynamic-module',
    getHttpCallBaseUrl: () => 'http://extension.test',
    httpMiddleware: request => ({
      body: JSON.stringify(request),
      status: 201,
    }),
  })
  const response = await hostApi.httpCall('/returns')

  expect(response.status).toBe(201)
  expect(JSON.parse(response.body)).toMatchObject({
    action: '/returns',
    httpBaseUrl: 'http://extension.test',
    uuid: 'dynamic-module',
  })
  expect(state.host.http.at(-1)?.uuid).toBe('dynamic-module')
})
