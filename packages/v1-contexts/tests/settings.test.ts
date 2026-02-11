import { schema, routingDataDefaults } from '@/common/settings'
import { expect, test } from 'vitest'

test('accepts default routing data', () => {
  expect(schema['system.routing'].accepts(routingDataDefaults)).toBe(true)
})

test('accepts valid routing data', () => {
  expect(schema['system.routing'].accepts({
    base_url: '',
    routes: {
      'crm_manager_show': {
        'tokens': [
          [
            'variable',
            '/',
            '\\d+',
            'id',
            true,
          ],
          [
            'text',
            '/managers',
          ],
        ],
        'defaults': [],
        'requirements': {
          'id': '\\d+',
          '_locale': 'en|es|ru',
        },
        'hosttokens': [],
        'methods': [],
        'schemes': [],
        'embed': true,
      },
    },
    prefix: '',
    host: '',
    port: '',
    scheme: 'http',
    locale: '',
  })).toBe(true)
})

test('executes defaults in settings schema', () => {
  expect(schema['image.workers'].defaults()).toEqual([])
  expect(schema['system.locale'].defaults()).toBe('en-GB')
  expect(schema['system.routing'].defaults()).toEqual({
    ...routingDataDefaults,
    routes: {},
  })
})
