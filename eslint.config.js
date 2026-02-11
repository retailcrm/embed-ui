import globals from 'globals'

import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: {
        ymaps3: true,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      }],
      'eqeqeq': ['error', 'always'],
      'indent': ['error', 2, {
        ignoreComments: true,
        SwitchCase: 1,
      }],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
        overrides: {
          catch: { before: true, after: true },
        },
      }],
      'linebreak-style': [2, 'unix'],
      'no-debugger': 'error',
      'no-empty': 'off',
      'no-multiple-empty-lines': ['error', {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      }],
      'no-new-wrappers': 'error',
      'no-prototype-builtins': 'error',
      'no-shadow-restricted-names': 'error',
      'no-throw-literal': 'error',
      'no-trailing-spaces': ['error'],
      'no-unsafe-optional-chaining': 'off',
      'no-useless-escape': 'off',
      'object-curly-spacing': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'space-infix-ops': ['error', { 'int32Hint': false }],

      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      }],
      '@typescript-eslint/naming-convention': 'off',
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
    rules: {
      'vue/attributes-order': 'error',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/first-attribute-linebreak': 'error',
      'vue/html-closing-bracket-newline': ['error', {
        multiline: 'always',
        singleline: 'never',
      }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/html-indent': ['error', 4, {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      'vue/html-self-closing': ['error', {
        html: {
          component: 'always',
          normal: 'always',
          void: 'always',
        },
        math: 'always',
        svg: 'always',
      }],
      'vue/no-required-prop-with-default': 'error',
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: {
          max: 1,
        },
      }],
      'vue/one-component-per-file': 'off',
      'indent': ['error', 2, { ignoreComments: true, SwitchCase: 1 }],
    },
  },
  { ignores: ['dist/*'] },
  { ignores: ['**/dist/*'] },
]
