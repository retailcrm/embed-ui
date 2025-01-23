import type {
  ContextSchemaDescription,
  ContextSchemaUsage,
} from '@retailcrm/embed-ui-v1-types/context-doc'

import type { Schema } from '~types/user/current'

import {
  arrayOf,
  isBoolean,
  isNull,
  isNumber,
  isString,
  oneOf,
} from '@/predicates'

export const id = 'user/current'

export const schema: Schema = {
  'id': {
    accepts: oneOf(isNumber, isNull),
    defaults: () => null,
    readonly: true,
  },
  'email': {
    accepts: isString,
    defaults: () => '',
    readonly: true,
  },
  'firstName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'lastName': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'patronymic': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'photo': {
    accepts: oneOf(isString, isNull),
    defaults: () => null,
    readonly: true,
  },
  'groups': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
  'permissions': {
    accepts: arrayOf(isString),
    defaults: (): string[] => [],
    readonly: true,
  },
  'isAdmin': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
  'isManager': {
    accepts: isBoolean,
    defaults: () => false,
    readonly: true,
  },
}

export const description: ContextSchemaDescription<Schema> = {
  'id': {
    description: {
      'en-GB': 'User ID',
      'es-ES': 'ID del usuario',
      'ru-RU': 'ID пользователя',
    },
  },
  'email': {
    description: {
      'en-GB': 'User email',
      'es-ES': 'Correo electrónico del usuario',
      'ru-RU': 'Email пользователя',
    },
  },
  'firstName': {
    description: {
      'en-GB': 'User name',
      'es-ES': 'Nombre del usuario',
      'ru-RU': 'Имя пользователя',
    },
  },
  'lastName': {
    description: {
      'en-GB': 'User last name',
      'es-ES': 'Apellido del usuario',
      'ru-RU': 'Фамилия пользователя',
    },
  },
  'patronymic': {
    description: {
      'en-GB': 'Patronymic of the user',
      'es-ES': 'Patronímico del usuario',
      'ru-RU': 'Отчество пользователя',
    },
  },
  'photo': {
    description: {
      'en-GB': 'User photo',
      'es-ES': 'Foto del usuario',
      'ru-RU': 'Фото пользователя',
    },
  },
  'groups': {
    description: {
      'en-GB': 'Symbolic codes of the groups the user belongs to',
      'es-ES': 'Códigos simbólicos de los grupos a los que pertenece el usuario',
      'ru-RU': 'Символьные коды групп, в которых состоит пользователь',
    },
  },
  'permissions': {
    description: {
      'en-GB': 'Character codes of available user permissions',
      'es-ES': 'Códigos de caracteres de los permisos disponibles para el usuario',
      'ru-RU': 'Символьные коды доступных пользователю разрешений',
    },
  },
  'isAdmin': {
    description: {
      'en-GB': 'Indicates whether the user has administrator privileges',
      'es-ES': 'Indica si el usuario tiene privilegios de administrador',
      'ru-RU': 'Указывает, имеет ли пользователь права администратора',
    },
  },
  'isManager': {
    description: {
      'en-GB': 'Indicates whether the user has manager privileges',
      'es-ES': 'Indica si el usuario tiene privilegios de gerente',
      'ru-RU': 'Указывает, имеет ли пользователь права менеджера',
    },
  },
}

export const usage: ContextSchemaUsage = {
  import: 'import { useContext } from \'@retailcrm/embed-ui-v1-contexts/remote/user/current\'',
  call: 'const user = useContext()',
}
