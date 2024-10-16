import config from 'eslint-config-love'
import stylistic from '@stylistic/eslint-plugin'

// noinspection JSUnusedGlobalSymbols
export default [
  config,
  stylistic.configs['recommended-flat'],
  {
    rules: {
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      }],
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]
