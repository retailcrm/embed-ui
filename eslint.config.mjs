import { FlatCompat } from '@eslint/eslintrc'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
})

// noinspection JSUnusedGlobalSymbols
export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },
  stylistic.configs['recommended-flat'],
  ...compat.extends('standard-with-typescript'),
  {
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      }],
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]
