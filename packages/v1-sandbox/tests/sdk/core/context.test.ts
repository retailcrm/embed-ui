import type {
  CustomContextSchema,
  Field,
  Rejection,
} from '@retailcrm/embed-ui-v1-types/context'

import { expect } from 'vitest'
import { nextTick } from 'vue'
import { test, vi } from 'vitest'

import { createSandboxController } from '@/core'

type OrderContext = {
  id: Field<number, true>;
  number: Field<string>;
}

const field = <T, R extends boolean = false>(
  value: T,
  readonly = false as R
): Field<T, R> => ({
    accepts: (input: unknown): input is T => typeof input === typeof value,
    defaults: () => value,
    readonly,
  })

const schemas = {
  'order/card': {
    id: field<number, true>(215, true),
    number: field('215C'),
  },
} satisfies {
  'order/card': OrderContext;
}

const customSchema = {
  entity: 'order',
  fields: [
    {
      code: 'comment',
      initial: null,
      kind: 'string',
      readonly: false,
    },
    {
      code: 'readonly_note',
      initial: 'locked',
      kind: 'string',
      readonly: true,
    },
    {
      code: 'source',
      dictionaryCode: 'order-source',
      initial: null,
      kind: 'dictionary',
      readonly: false,
    },
  ],
} satisfies CustomContextSchema

const createCustomSandbox = () => {
  const sandbox = createSandboxController<typeof schemas>({
    schemas,
  })

  sandbox.setDictionary('order-source', [
    {
      code: 'web',
      cursor: 'cursor-web',
      text: 'Website',
    },
    {
      code: 'phone',
      cursor: 'cursor-phone',
      text: 'Phone',
    },
    {
      code: 'api',
      cursor: 'cursor-api',
      text: 'API',
    },
  ])
  sandbox.setCustomEntity('order', customSchema, {
    comment: 'Initial comment',
    readonly_note: 'locked',
    source: 'web',
  })

  return sandbox
}

test('serves paginated custom dictionaries as cloned values', async () => {
  const sandbox = createCustomSandbox()

  expect(await sandbox.endpointApi.getCustomDictionary('order-source', {
    first: 1,
  })).toEqual([
    {
      code: 'web',
      cursor: 'cursor-web',
      text: 'Website',
    },
  ])
  expect(await sandbox.endpointApi.getCustomDictionary('order-source', {
    after: 'cursor-web',
    first: 2,
  })).toEqual([
    {
      code: 'phone',
      cursor: 'cursor-phone',
      text: 'Phone',
    },
    {
      code: 'api',
      cursor: 'cursor-api',
      text: 'API',
    },
  ])
  expect(await sandbox.endpointApi.getCustomDictionary('order-source', {
    after: 'missing-cursor',
  })).toEqual([])

  const cloned = await sandbox.endpointApi.getCustomDictionary('order-source', {
    first: 1,
  })

  cloned[0].text = 'Changed outside'

  expect(await sandbox.endpointApi.getCustomDictionary('order-source', {
    first: 1,
  })).toEqual([
    {
      code: 'web',
      cursor: 'cursor-web',
      text: 'Website',
    },
  ])
})

test('serves custom schema and fields as cloned values', () => {
  const sandbox = createCustomSandbox()
  const schema = sandbox.endpointApi.getCustomSchema('order')

  expect(schema).toEqual(customSchema)

  schema?.fields.push({
    code: 'external_mutation',
    initial: null,
    kind: 'string',
    readonly: false,
  })

  expect(sandbox.endpointApi.getCustomSchema('order')).toEqual(customSchema)
  expect(sandbox.endpointApi.getCustomField('order', 'comment')).toBe('Initial comment')
})

test('sets custom fields and notifies watchers', async () => {
  const sandbox = createCustomSandbox()
  const handler = vi.fn()
  const stop = sandbox.endpointApi.onCustomFieldChange('order', 'comment', handler)

  sandbox.endpointApi.setCustomField('order', 'comment', 'Updated comment')
  await nextTick()

  expect(sandbox.endpointApi.getCustomField('order', 'comment')).toBe('Updated comment')
  expect(handler).toHaveBeenCalledWith('Updated comment')

  if (typeof stop === 'function') {
    stop()
  }

  sandbox.endpointApi.setCustomField('order', 'comment', 'After stop')
  await nextTick()

  expect(handler).toHaveBeenCalledTimes(1)
})

test('disposes context field subscriptions', async () => {
  const sandbox = createCustomSandbox()
  const handler = vi.fn()

  sandbox.endpointApi.on('order/card', 'change:number', handler)
  sandbox.patchContext('order/card', {
    number: '216C',
  })
  await nextTick()

  expect(handler).toHaveBeenCalledOnce()
  expect(handler).toHaveBeenLastCalledWith('216C')

  sandbox.disposeContextSubscriptions()
  sandbox.patchContext('order/card', {
    number: '217C',
  })
  await nextTick()

  expect(handler).toHaveBeenCalledOnce()
})

test('rejects missing custom dictionary requests', async () => {
  const sandbox = createCustomSandbox()
  const onReject = vi.fn<(rejection: Rejection) => void>()

  await expect(sandbox.endpointApi.getCustomDictionary('missing', {}, onReject))
    .rejects
    .toThrow('Dictionary missing is not available')
  expect(onReject).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('Dictionary missing is not available') as string,
  }))
})

test('rejects invalid custom schema and field access', () => {
  const sandbox = createCustomSandbox()
  const onReject = vi.fn<(rejection: Rejection) => void>()

  expect(() => sandbox.endpointApi.getCustomSchema('missing', onReject))
    .toThrow('Custom entity missing is not available')
  expect(() => sandbox.endpointApi.getCustomField('order', 'missing', onReject))
    .toThrow('Custom field missing is not available in entity order')
  expect(() => sandbox.endpointApi.onCustomFieldChange('missing', 'comment', vi.fn(), onReject))
    .toThrow('Custom entity missing is not available')
  expect(onReject).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('Custom entity missing is not available') as string,
  }))
  expect(onReject).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('Custom field missing is not available in entity order') as string,
  }))
})

test('rejects unsupported and readonly custom field writes', () => {
  const sandbox = createCustomSandbox()
  const onReject = vi.fn<(rejection: Rejection) => void>()

  expect(() => sandbox.endpointApi.setCustomField('order', 'missing', 'value', onReject))
    .toThrow('Custom field missing is not available in entity order')
  expect(() => sandbox.endpointApi.setCustomField('order', 'readonly_note', 'changed', onReject))
    .toThrow('Custom field readonly_note is readonly in entity order')
  expect(onReject).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('Custom field missing is not available in entity order') as string,
  }))
  expect(onReject).toHaveBeenCalledWith(expect.objectContaining({
    message: expect.stringContaining('Custom field readonly_note is readonly in entity order') as string,
  }))
})
