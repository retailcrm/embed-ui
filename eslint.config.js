import { defineConfig } from 'eslint/config'

import globals from 'globals'

import pluginDependencies from '@omnicajs/eslint-plugin-dependencies'
import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    plugins: {
      dependencies: pluginDependencies,
    },
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

      'dependencies/import-style': ['error', {
        maxSingleLineLength: 90,
        maxSingleLineSpecifiers: 3,
      }],
      'dependencies/separate-type-imports': 'error',
      'dependencies/separate-type-partitions': 'error',
      'dependencies/sort-named-imports': ['error', {
        type: 'alphabetical',
        ignoreAlias: true,
      }],
      'dependencies/sort-imports': ['error', {
        type: 'alphabetical',
        imports: {
          orderBy: 'alias',
          splitDeclarations: true,
        },
        groups: [
          'side-effect-style',
          'side-effect',
          [
            'type-import',
            'type-external',
            'type-vue-components',
            'type-internal',
            'type-parent',
            'type-sibling',
            'type-index',
          ],
          'builtin',
          'value-external',
          'value-vue-components',
          'value-internal',
          ['value-parent', 'value-sibling'],
          'index',
          'ts-equals-import',
          'unknown',
        ],
        customGroups: [{
          groupName: 'type-vue-components',
          selector: 'type',
          elementNamePattern: ['\\.(svg|vue)$'],
        }, {
          groupName: 'value-vue-components',
          elementNamePattern: ['\\.(svg|vue)$'],
        }],
        newlinesInside: 1,
        partitions: {
          orderBy: 'type-first',
          splitBy: {
            comments: false,
            newlines: true,
          },
        },
      }],
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
])
