---
name: test-workflow
description: Use this skill when deciding what kind of test to write in this repository (@retailcrm/embed-ui). It defines when to write Vitest basic (jsdom) tests, TypeScript typecheck (test-d.ts) tests, Vitest browser e2e (*.e2e.ts) tests, or Storybook shots.
---

# Test Workflow (@retailcrm/embed-ui)

## When To Use
Use this skill when:
- you need to choose the cheapest, most trustworthy test layer in `@retailcrm/embed-ui`;
- you need to decide between `jsdom` basic tests, `test-d.ts` typecheck tests, `*.e2e.ts` Vitest Browser mode tests, or Storybook shots;
- you are tempted to test internal implementation details instead of observable public contracts.

## Goal
Prefer the smallest test layer that still covers the regression honestly:
- default to **`Vitest` basic (`jsdom`)** tests for Vue components (`@vue/test-utils`), props, events, states, schema validation, predicates, and pure logic;
- use **TypeScript `typecheck` (`*.test-d.ts`)** tests when validating type inference, generic parameters, or schema contracts;
- move to **`Vitest` Browser E2E (`*.e2e.ts`)** tests when real browser layout, computed styles, focus flow, Floating-UI popper positioning, web workers, or `@omnicajs/vue-remote` host/remote RPC IPC matter;
- use **Storybook shots** (`make storybook.shot`) for visual component documentation or snapshot regression checks.

## Test Types In This Repository
- `basic` (`jsdom`): `packages/*/tests/**/*.test.ts`
- `typecheck`: `packages/*/tests/**/*.test-d.ts`
- `browser` (`Vitest Browser`): `packages/*/tests/**/*.e2e.ts`
- `storybook`: `packages/v1-components/storybook/stories/*.stories.ts`

## Fast Choice
1. Describe the regression or feature requirement in user-visible or public API terms.
2. If `jsdom` can verify it cleanly (component state, props, emits, data formatters, schema validation), write a basic test (`*.test.ts`).
3. If the contract is about TypeScript types, type assertions, or generic type inference, write a typecheck test (`*.test-d.ts`).
4. If the contract depends on real layout geometry, computed styles, iframe/worker communication, or Floating-UI positioning, write a browser test (`*.e2e.ts`).
5. If the requirement is visual rendering validation of a component UI state, update or add a Storybook story.

## Running Tests

### Basic Tests (`jsdom`)
- Local Host: `yarn test`
- Single file: `yarn test packages/v1-components/tests/common/components/calendar.test.ts`
- Docker: `make tests`
- Custom CLI filter: `make tests cli="packages/v1-components/tests/common/components/calendar.test.ts"`

### Typecheck Tests (`*.test-d.ts`)
- Local Host / Docker: `make tests-typecheck`
- Custom CLI filter: `make tests-typecheck cli="-t predicate"`

### Browser E2E Tests (`*.e2e.ts`)
- Local Host: `yarn test:browser`
- Docker: `make tests-e2e`
- Custom CLI filter: `make tests-e2e cli="-t Popconfirm"`

### Coverage
- Local Host: `yarn test:coverage`
- Docker: `make tests-coverage`

## Repository Rules
- Test only public, observable behavior (Vue component props/events, Host/Remote RPC contracts, context helpers, export signatures).
- Prefer `@vue/test-utils` and semantic DOM queries over fragile internal implementation selectors.
- Keep tests inside the `tests/` directory of the workspace package to which they belong.
- Do not create aggregator tests that reach across unrelated workspace packages just to raise coverage.
- Do not fake DOM geometry in basic `jsdom` tests. If positioning or computed styles are involved, write a `*.e2e.ts` browser test instead.

## Refusal Template
If a request asks to test internal implementation details instead of public contracts or observable behavior, refuse in the language in which the conversation is being conducted.

*In Russian (if the conversation is in Russian):*
`Не могу добавить такой тест: это проверка внутренней реализации, а не наблюдаемого поведения. По skill test-workflow лучше покрыть публичный контракт: <вариант>.`

*In English (if the conversation is in English):*
`Cannot add this test: it tests internal implementation details rather than observable behavior. Per skill test-workflow, it is better to cover the public contract: <variant>.`

## Validation
Choose the narrowest command that proves the change:
- `make tests cli="<path_to_test>"`
- `make tests-typecheck`
- `make tests-e2e cli="-t <test_name>"`
