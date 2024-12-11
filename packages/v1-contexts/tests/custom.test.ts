import type {
  CustomContext,
  CustomContextAccessor,
  CustomContextSchema,
  CustomFieldAccessor,
  CustomFieldType,
} from '@retailcrm/embed-ui-v1-types/context'

import { LogicalError } from '@/host'
import { MessageChannel } from '@retailcrm/embed-ui-v1-testing/lib/rpc'

import {
  expect,
  test,
} from 'vitest'

import {
  flushPromises,
  mount,
} from '@vue/test-utils'

import {
  createApp,
  nextTick,
  reactive,
  watch,
} from 'vue'

import { createPinia } from 'pinia'

import {
  createEndpoint,
  fromMessagePort,
  retain,
} from '@remote-ui/rpc'

import { createCustomContextAccessor } from '@/host'

import {
  injectAccessor,
  useContext,
} from '@/remote/custom'

test('serves bidirectional connection', async () => {
  const { port1, port2 } = new MessageChannel()

  port1.start()
  port2.start()

  const orderAccessor = createFieldAccessor({
    entity: 'order',
    fields: [{
      kind: 'string',
      code: 'field1',
      readonly: false,
      initial: '1',
    }, {
      kind: 'string',
      code: 'field2',
      readonly: false,
      initial: '2',
    }],
  } as const)

  const host = createEndpoint(fromMessagePort(port1))

  host.expose(createCustomContextAccessor([orderAccessor]))

  const remote = createEndpoint<CustomContextAccessor>(fromMessagePort(port2))

  const pinia = createPinia()

  pinia.use(injectAccessor(remote))

  createApp({ template: '<div />' }).use(pinia)

  const wrapper = mount({
    setup () {
      const order = useContext('order')

      order.initialize()

      return { order }
    },

    template: `
        <input
            type="text"
            name="field1"
            :value="order.values['field1']"
            @input="order.set('field1', $event.target.value)"
        />

        <textarea
            name="field2"
            :value="order.values['field2']"
            @input="order.set('field2', $event.target.value)"
        />
    `,
  }, {
    plugins: [pinia],
  })

  await flushPromises()

  const field1 = wrapper.find<HTMLInputElement>('[name="field1"]')

  expect(field1.exists()).toBe(true)
  expect(field1.element.value).toBe('1')

  const field2 = wrapper.find<HTMLTextAreaElement>('[name="field2"]')

  expect(field2.exists()).toBe(true)
  expect(field2.element.value).toBe('2')

  field1.element.value = 'Black tea'

  await field1.trigger('input')

  field2.element.value = 'Cocoa'

  await field2.trigger('input')

  expect(orderAccessor.data).toEqual({
    field1: 'Black tea',
    field2: 'Cocoa',
  })

  orderAccessor.data.field1 = 'Juice'
  orderAccessor.data.field2 = 'Walnut'

  await nextTick()

  expect(field1.element.value).toBe('Juice')
  expect(field2.element.value).toBe('Walnut')
})

function createFieldAccessor <S extends CustomContextSchema = CustomContextSchema> (schema: S) {
  const data = reactive(schema.fields.reduce((data, field) => {
    data[field.code] = Array.isArray(field.initial) ? [...field.initial] : field.initial
    return data
  }, {} as CustomContext))

  const guardCode = (code: string) => {
    if (!schema.fields.some((f) => f.code === code)) {
      throw new LogicalError(`Code ${code} is not supported by schema for entity ${schema.entity}`)
    }
  }

  return {
    get data () { return data },
    get schema () { return schema },

    get (code: string): unknown {
      guardCode(code)
      return data[code]
    },

    set (code: string, value: CustomFieldType): void {
      guardCode(code)
      data[code] = value
    },

    onChange (code: string, handler: (value: CustomFieldType) => void) {
      guardCode(code)
      retain(handler)
      return watch(() => data[code], handler)
    },
  } satisfies CustomFieldAccessor & {
    readonly data: CustomContext
  }
}
