import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Predicate } from '@/predicates'

import type {
  Locale,
  Schema,
} from '~types/settings'

import {
  Route,
  RoutesMap,
  RoutingData,
} from '@omnicajs/symfony-router'

import {
  arrayOf,
  isArray,
  isBoolean,
  isExactly,
  isObject,
  isString,
  oneOf,
  withMeta,
} from '@/predicates'

import { keysOf } from '@/utilities'

export const id = 'settings'

export const locales = ['en-GB', 'es-ES', 'ru-RU'] as Locale[]

const routeSchema = {
  tokens: arrayOf(arrayOf(oneOf(isString, isBoolean))),
  defaults: oneOf(isArray, isObject),
  requirements: oneOf(isArray, isObject),
  hosttokens: arrayOf(arrayOf(isString)),
  schemes: arrayOf(isString),
  methods: arrayOf(isString),
} satisfies {
  [p in keyof Route]: (value: unknown) => boolean;
}

const isRoute = (value: unknown): value is Route => {
  return typeof value === 'object'
    && value !== null
    && keysOf(routeSchema).every(key => {
      return key in value && routeSchema[key](value[key as keyof typeof value])
    })
}

const isRoutesMap = (value: unknown): value is RoutesMap => {
  return isObject(value) && keysOf(value).every(key => isRoute(value[key]))
}

const routingDataSchema = {
  base_url: [true, isString],
  routes: [true, isRoutesMap],
  prefix: [false, isString],
  host: [true, isString],
  port: [false, isString],
  scheme: [false, isString],
  locale: [false, isString],
} satisfies {
  [p in keyof RoutingData]: [
    required: boolean,
    predicate: Predicate<RoutingData[p]>
  ];
}

export const routingDataDefaults = {
  base_url: '',
  routes: {},
  prefix: '',
  host: '',
  port: '',
  scheme: 'http',
  locale: '',
} satisfies RoutingData

export const schema: Schema = {
  'image.workers': {
    accepts: arrayOf(isString),
    defaults: () => [],
    readonly: true,
  },
  'system.locale': {
    accepts: oneOf(...locales.map(isExactly)),
    defaults: () => 'en-GB',
    readonly: true,
  },
  'system.routing': {
    accepts: withMeta((value): value is RoutingData => {
      return isObject(value) && keysOf(routingDataSchema).every(key => {
        const [required, predicate] = routingDataSchema[key]
        if (!(key in value)) {
          return !required
        }

        return predicate(value[key as keyof typeof value])
      })
    }, 'RoutingData'),
    defaults: () => ({ ...routingDataDefaults, routes: {} }),
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'image.workers': {
    description: {
      'en-GB': 'A list of servers that process images.',
      'es-ES': 'Una lista de servidores que procesan imágenes.',
      'ru-RU': 'Список серверов, обрабатывающих изображения.',
    },
  },
  'system.locale': {
    description: {
      'en-GB': 'Current system\'s locale',
      'es-ES': 'Configuración regional actual del sistema',
      'ru-RU': 'Текущая локаль системы',
    },
  },
  'system.routing': {
    description: {
      'en-GB': 'Data for Symfony\'s JS router',
      'es-ES': 'Datos para el enrutador JS de Symfony',
      'ru-RU': 'Данные для js-маршрутизатора symfony',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/settings\'',
  call: 'const settings = useContext()',
}
