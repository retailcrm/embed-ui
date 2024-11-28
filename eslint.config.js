import globals from 'globals'

import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    languageOptions: {
      globals: {
        ymaps3: true,
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: pluginTs.parser },
    },
  },
  {
    rules: {
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      }],
      'indent': ['error', 2, {
        'ignoreComments': true,
        'SwitchCase': 1,
      }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],

      '@typescript-eslint/naming-convention': 'off',
    },
  },
  { ignores: ['dist/*'] },
  { ignores: ['**/dist/*'] },
]