import type {
  ContextAccessor,
  ContextSchema,
  CustomContextAccessor,
  CustomContextSchema,
  CustomFieldAccessor,
  Rejection,
} from '@retailcrm/embed-ui-v1-types/context'

import type { Endpoint } from '@remote-ui/rpc'

import {
  createContextAccessor,
  createCustomContextAccessor,
  createGetter,
  createSetter,
  LogicalError,
} from '@/host'

import {
  defineActions,
  defineContext,
  injectEndpoint,
} from '@/remote'

import {
  injectAccessor,
  useContext,
  useDictionary,
} from '@/remote/custom'

import {
  createPinia,
  setActivePinia,
} from 'pinia'
import { createApp } from 'vue'

import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

const actionSchema = {
  save: {
    accepts: Object.assign(
      (args: unknown[]): args is [number] => Array.isArray(args) && args.length === 1 && typeof args[0] === 'number',
      { members: [{ name: 'value', type: 'number' }] }
    ),
    expects: Object.assign(
      (payload: unknown): payload is string => typeof payload === 'string',
      { type: 'string' }
    ),
  },
}

const customSchema: CustomContextSchema = {
  entity: 'order',
  fields: [{
    kind: 'boolean',
    code: 'flag',
    readonly: false,
    initial: false,
  }, {
    kind: 'date',
    code: 'date',
    readonly: false,
    initial: null,
  }, {
    kind: 'datetime',
    code: 'datetime',
    readonly: false,
    initial: null,
  }, {
    kind: 'dictionary',
    code: 'dictionary',
    readonly: false,
    initial: null,
    dictionaryCode: 'd',
  }, {
    kind: 'multiselect_dictionary',
    code: 'multi',
    readonly: false,
    initial: [],
    dictionaryCode: 'm',
  }, {
    kind: 'email',
    code: 'email',
    readonly: false,
    initial: null,
  }, {
    kind: 'integer',
    code: 'integer',
    readonly: false,
    initial: null,
  }, {
    kind: 'numeric',
    code: 'numeric',
    readonly: false,
    initial: null,
  }, {
    kind: 'string',
    code: 'string',
    readonly: false,
    initial: null,
  }, {
    kind: 'text',
    code: 'text',
    readonly: false,
    initial: null,
  }, {
    kind: 'string',
    code: 'readonly',
    readonly: true,
    initial: null,
  }],
}

describe('context accessor edge cases', () => {
  describe('host accessors', () => {
    test('reject unsupported fields in createGetter and createSetter', () => {
      const getter = createGetter('test/getter', {
        id: () => 1,
      })
      const setter = createSetter('test/setter', {
        id: () => {},
      })

      expect(getter('id')).toBe(1)
      expect(() => getter('missing' as never)).toThrow(LogicalError)

      setter('id', 2)
      expect(() => setter('missing' as never, 2)).toThrow(LogicalError)
    })

    test('forward host errors to rejection callback without onError handler', () => {
      const rejection = vi.fn<(r: Rejection) => void>()
      const accessor = createContextAccessor({} as never)

      expect(() => accessor.get('missing' as never, '~' as never, rejection)).toThrow(LogicalError)
      expect(rejection).toHaveBeenCalled()
    })

    test('report host errors through onError handler when it is configured', () => {
      const onError = vi.fn()
      const accessor = createContextAccessor({} as never, onError)

      expect(accessor.get('missing' as never, '~' as never, vi.fn())).toBeUndefined()
      expect(onError).toHaveBeenCalled()
    })

    test('handle custom dictionary failures and missing entities', async () => {
      const schema: CustomContextSchema = {
        entity: 'order',
        fields: [{
          kind: 'string',
          code: 'name',
          readonly: false,
          initial: null,
        }],
      }

      const accessor: CustomFieldAccessor = {
        schema,
        get: (code) => code === 'name' ? 'value' : null,
        set: () => {},
        onChange: () => () => {},
      }

      const rejection = vi.fn<(r: Rejection) => void>()
      const onError = vi.fn()

      const withoutDictionary = createCustomContextAccessor([accessor])
      await expect(withoutDictionary.getCustomDictionary('dict')).rejects.toThrow(LogicalError)

      const withErrorHandler = createCustomContextAccessor([accessor], null, onError)
      await expect(withErrorHandler.getCustomDictionary('dict')).resolves.toEqual([])
      expect(onError).toHaveBeenCalled()

      const dictionaryError = new Error('Dictionary failed')
      const withThrowingDictionary = createCustomContextAccessor(
        [accessor],
        async () => {
          throw dictionaryError
        }
      )

      await expect(withThrowingDictionary.getCustomDictionary('dict', {}, rejection)).rejects.toThrow(dictionaryError)
      expect(rejection).toHaveBeenCalled()

      expect(withoutDictionary.getCustomSchema('order')).toEqual(schema)
      expect(() => withoutDictionary.getCustomSchema('missing')).toThrow(LogicalError)
      expect(() => withoutDictionary.getCustomField('missing', 'name')).toThrow(LogicalError)
      expect(() => withoutDictionary.setCustomField('missing', 'name', 'value')).toThrow(LogicalError)
      expect(() => withoutDictionary.onCustomFieldChange('missing', 'name', () => {})).toThrow(LogicalError)
    })
  })

  describe('remote context and actions', () => {
    const endpoint = {
      call: {
        get: vi.fn(),
        on: vi.fn(),
        set: vi.fn(),
        invoke: vi.fn(),
      },
    } as unknown as Endpoint<ContextAccessor & {
      invoke (name: string, ...args: unknown[]): Promise<{ payload: unknown, rejection: Rejection | null }>
    }>

    beforeEach(() => {
      const pinia = createPinia()
      pinia.use(injectEndpoint(endpoint))
      createApp({ template: '<div />' }).use(pinia)
      setActivePinia(pinia)

      endpoint.call.get = vi.fn()
      endpoint.call.on = vi.fn()
      endpoint.call.set = vi.fn()
      endpoint.call.invoke = vi.fn()
    })

    test('initialize context and validate writable and readonly set paths', async () => {
      const schema = {
        readonlyValue: {
          accepts: (value: unknown): value is number => typeof value === 'number',
          defaults: () => 1,
          readonly: true,
        },
        writableValue: {
          accepts: (value: unknown): value is number => typeof value === 'number',
          defaults: () => 0,
          readonly: false,
        },
      } satisfies ContextSchema

      const useCounter = defineContext<'counter', typeof schema>('counter', schema)
      const counter = useCounter()

      endpoint.call.get = vi.fn(async () => null)
      await counter.initialize()

      endpoint.call.get = vi.fn(async () => ({
        readonlyValue: 5,
        writableValue: 7,
      }))
      await counter.initialize()

      expect(endpoint.call.on).toHaveBeenCalled()
      expect(counter.readonlyValue).toBe(5)
      expect(counter.writableValue).toBe(7)

      counter.set('writableValue', 10)
      expect(endpoint.call.set).toHaveBeenCalledWith('counter', 'writableValue', 10, null)

      expect(() => counter.set('readonlyValue' as never, 5 as never)).toThrow('readonly')
      expect(() => counter.set('missing' as never, 1 as never)).toThrow('not present')
      expect(() => counter.set('writableValue', 'x' as never)).toThrow('Invalid value')
    })

    test('validate defineActions arguments, rejections and result guards', async () => {
      const useActions = defineActions('order/card', actionSchema)
      const actions = useActions()

      expect((actions as Record<string, unknown>).missing).toBeUndefined()

      await expect((actions as { save (value: string): Promise<string> }).save('x')).rejects.toThrow('Invalid arguments')

      endpoint.call.invoke = vi.fn(async () => ({
        payload: null,
        rejection: { message: 'failed' },
      }))
      await expect(actions.save(1)).rejects.toThrow('failed')

      endpoint.call.invoke = vi.fn(async () => ({
        payload: 123,
        rejection: null,
      }))
      await expect(actions.save(1)).rejects.toThrow('Invalid result')

      endpoint.call.invoke = vi.fn(async () => ({
        payload: 'ok',
        rejection: null,
      }))
      await expect(actions.save(1)).resolves.toBe('ok')
    })
  })

  describe('remote custom fields', () => {
    const endpoint = {
      call: {
        getCustomSchema: vi.fn(),
        onCustomFieldChange: vi.fn(),
        setCustomField: vi.fn(),
        getCustomDictionary: vi.fn(),
      },
    } as unknown as Endpoint<CustomContextAccessor>

    beforeEach(() => {
      const pinia = createPinia()
      pinia.use(injectAccessor(endpoint))
      createApp({ template: '<div />' }).use(pinia)
      setActivePinia(pinia)

      endpoint.call.getCustomSchema = vi.fn(async () => customSchema)
      endpoint.call.onCustomFieldChange = vi.fn()
      endpoint.call.setCustomField = vi.fn()
      endpoint.call.getCustomDictionary = vi.fn(async () => [])
    })

    test('validate initialization, readonly and kind-specific value guards in useContext', async () => {
      const order = useContext('order')

      expect(() => order.set('string', 'x')).toThrow('not initialized')

      await order.initialize()

      order.set('flag', true)
      order.set('date', '2025-01-01')
      order.set('datetime', '2025-01-01T00:00:00Z')
      order.set('dictionary', 'A')
      order.set('multi', ['A', 'B'])
      order.set('email', 'a@b.c')
      order.set('integer', 10)
      order.set('numeric', 10.5)
      order.set('string', 'value')
      order.set('text', 'text value')

      expect(endpoint.call.setCustomField).toHaveBeenCalled()

      expect(() => order.set('readonly', 'x')).toThrow('not writable')
      expect(() => order.set('missing', 'x')).toThrow('does not contain field')

      expect(() => order.set('flag', null as never)).toThrow('Invalid value')
      expect(() => order.set('date', 1 as never)).toThrow('Invalid value')
      expect(() => order.set('datetime', 1 as never)).toThrow('Invalid value')
      expect(() => order.set('dictionary', 1 as never)).toThrow('Invalid value')
      expect(() => order.set('multi', ['A', 1] as never)).toThrow('Invalid value')
      expect(() => order.set('email', 1 as never)).toThrow('Invalid value')
      expect(() => order.set('integer', 10.5 as never)).toThrow('Invalid value')
      expect(() => order.set('numeric', 'x' as never)).toThrow('Invalid value')
      expect(() => order.set('string', 1 as never)).toThrow('Invalid value')
      expect(() => order.set('text', 1 as never)).toThrow('Invalid value')
    })

    test('resolve and reject useDictionary queries through host response', async () => {
      const dictionary = useDictionary()

      endpoint.call.getCustomDictionary = vi.fn(async (_code, _params, onReject?: (r: Rejection) => void) => {
        onReject?.({ message: 'failed' })
        return []
      })

      await expect(dictionary.query('dict')).rejects.toEqual({ message: 'failed' })

      endpoint.call.getCustomDictionary = vi.fn(async () => [{ code: 'A', text: 'A', cursor: '' }])
      await expect(dictionary.query('dict')).resolves.toEqual([{ code: 'A', text: 'A', cursor: '' }])
    })
  })
})
