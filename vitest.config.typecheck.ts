import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
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
