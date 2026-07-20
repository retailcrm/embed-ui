import type { Field } from '@retailcrm/embed-ui-v1-types/context'

import { expect, test, vi } from 'vitest'

import { createSandboxHostApi, createSandboxState } from '@/core'

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

test('host api handles relative routes, array params and empty query', () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state)
  const leaveHook = vi.fn()

  hostApi.onBeforeRouteLeave(leaveHook)
  hostApi.goTo('orders?source=url', {
    ids: [1, 2],
    skipped: undefined,
  })

  expect(state.host.location).toEqual({
    hash: '',
    pathname: '/orders',
    query: {
      ids: ['1', '2'],
    },
    search: '?ids=1&ids=2',
  })

  hostApi.goTo('', {})

  expect(state.host.location.pathname).toBe('')

  hostApi.replaceQuery({})

  expect(state.host.location.search).toBe('')
  expect(leaveHook).not.toHaveBeenCalled()
})

test('host api keeps route query when navigation params are omitted', () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state)

  hostApi.goTo('/orders?source=url')

  expect(state.host.location).toMatchObject({
    pathname: '/orders',
    query: {},
    search: '?source=url',
  })
})

test('host api serializes non-error middleware failures', async () => {
  const state = createSandboxState({
    schemas,
  })
  const hostApi = createSandboxHostApi(state, {
    httpMiddleware: () => Promise.reject('middleware failed'),
  })

  await expect(hostApi.httpCall('/returns')).resolves.toEqual({
    body: JSON.stringify({
      error: 'middleware failed',
      ok: false,
    }),
    status: 500,
  })
})
