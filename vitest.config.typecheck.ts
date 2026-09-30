import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        root: './tests/public',
        test: {
          name: '@retailcrm/embed-ui:public-types',
          typecheck: {
            enabled: true,
            only: true,
            checker: 'tsc',
            include: ['**/*.test-d.ts'],
            tsconfig: 'tsconfig.json',
          },
        },
      },
      {
        extends: './packages/v1-components/vitest.config.ts',
        root: './packages/v1-components',
        test: {
          name: '@retailcrm/embed-ui-v1-components:public-types',
          typecheck: {
            enabled: true,
            only: true,
            checker: 'tsc',
            include: ['tests/**/*.public.test-d.ts'],
            tsconfig: 'tsconfig.public.json',
          },
        },
      },
      {
        extends: './packages/v1-contexts/vitest.config.ts',
        root: './packages/v1-contexts',
        test: {
          name: '@retailcrm/embed-ui-v1-contexts:typecheck',
          typecheck: {
            enabled: true,
            only: true,
            checker: 'tsc',
            include: ['tests/**/*.test-d.ts'],
            tsconfig: 'tsconfig.json',
          },
        },
      },
    ],
  },
})
