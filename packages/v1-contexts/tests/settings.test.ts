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
        // @ts-expect-error Extra fields are acceptable
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