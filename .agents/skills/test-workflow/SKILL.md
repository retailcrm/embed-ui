---
name: test-workflow
description: Use when selecting, writing, reviewing, or debugging tests in @retailcrm/embed-ui. Covers jsdom, typecheck, Vitest Browser, Playwright delivery e2e, Storybook shots, Testing Library semantics, test doubles, cleanup, and coverage doctrine.
---

# Test Workflow (@retailcrm/embed-ui)

## Source Of Truth

Read these sources before choosing a test layer:

1. Project `AGENTS.md`.
2. The relevant workspace `package.json` and Vitest or Playwright config.
3. `packages/v1-sandbox/docs/strategy.md` for extension unit, browser, and delivery e2e boundaries.
4. `packages/v1-sandbox/docs/examples.md` for public automation APIs.
5. Existing tests next to the affected workspace.

## Core Doctrine

- Tests verify public observable behavior, not implementation details.
- Coverage is a quality signal, not the goal of a test.
- Prefer the smallest layer that can reproduce the risk honestly.
- Start with real user and integration scenarios, then add controlled failure or defensive scenarios.
- Remove or simplify dead and redundant code instead of creating synthetic coverage tests.
- Do not hide architectural problems behind brittle mocks or complicated test harnesses.
- Keep tests readable even when this leaves small local duplication. Avoid branching and loops when separate cases explain variants more clearly.

Observable contracts include:

- visible text, DOM state, form values, loading and error states;
- accessible roles, names, labels, descriptions, and states;
- Vue props, slots, events, callbacks, and emitted payloads;
- Host API calls, Remote RPC results, URLs, browser storage, and network boundary effects;
- documented exports and TypeScript contracts.

Do not assert:

- private component state, `vm`, refs, or private helpers;
- incidental DOM nesting;
- generated CSS module names or internal `.ui-v1-*` selectors;
- calls between internal functions when an observable result expresses the same behavior.

## Test Layers

### Vitest jsdom

Default to `*.test.ts` for:

- pure functions, schemas, predicates, formatters, and state transitions;
- Vue props, slots, events, form behavior, and observable DOM state;
- controllers and Host API state that do not require real browser behavior.

Coverage is enabled by default. Do not fake layout geometry, computed styles, focus quirks, or browser rendering in jsdom.

### Typecheck

Use `*.test-d.ts` for:

- type inference and narrowing;
- generic parameters;
- public declaration and schema type contracts.

Do not replace runtime behavior tests with type assertions.

### Vitest Browser

Use `packages/*/tests/**/*.test.browser.ts` in a real Chromium environment when behavior depends on:

- layout, geometry, computed styles, selection, scrolling, or focus;
- Floating UI and popper positioning;
- Web Workers;
- `@omnicajs/vue-remote` and Host/Remote RPC.

Sandbox browser tests exercise workers, components, fixtures, and mocked Host API without requiring an external extension server.

### Playwright delivery e2e

Use `packages/v1-sandbox/tests/e2e/*.e2e.ts` only for critical full-delivery risks:

- opening the sandbox through a launch URL;
- loading an external descriptor, entrypoint, and stylesheet;
- proxying Host API requests to the extension server;
- completing a critical user scenario through the real sandbox shell.

Keep this layer smaller than browser tests and do not repeat every browser assertion in Playwright.

### Storybook shots

Use Storybook stories and `make storybook.shot` for visual documentation and explicit visual regression evidence. A shot does not replace behavioral assertions.

## Testing Library First

For frontend DOM tests, use Testing Library as the primary query and interaction surface. Vue Test Utils may mount a component, but assertions should describe the DOM exposed to a user.

Query in this order:

1. `getByRole` or `findByRole`, with `name` when the element has an accessible name.
2. `getByLabelText` for form controls.
3. `getByText`, `getByPlaceholderText`, or scoped visible text.
4. A technical selector only when no stable user-facing or accessibility signal exists.

Use `within(...)` to scope a query to a meaningful dialog, form, region, list, row, or component root.

Do not add `aria-label` only to make a test easier when visible text or native HTML already names the element. Do not use CSS classes, deep selectors, `nth-child`, or arbitrary wrapper traversal as the primary selector.

## HTML First, ARIA Second

- Start with native `button`, `a`, `label` plus form control, `fieldset` plus `legend`, headings, lists, tables, and semantic regions.
- Add ARIA only when native HTML cannot express the component behavior.
- Custom interactive roles must provide the matching keyboard behavior and state.
- Keep `aria-expanded`, `aria-current`, `aria-busy`, `aria-invalid`, `aria-checked`, and related state synchronized with actual behavior.
- Do not duplicate or conflict with native semantics.

If a semantic query is impossible because production markup is inaccessible, improve the public accessibility contract instead of reaching directly into component internals.

## Async Behavior And Interaction

- Interact only with elements that are visible, enabled, and ready.
- Use `findBy...` when waiting for an element to appear.
- Use `waitFor(...)` when waiting for an emitted event, callback, store update, Host API record, or another side effect.
- Wait for a user-visible readiness marker or business effect, not an arbitrary timeout.
- Use `attachTo: document.body` when portals, poppers, focus, or document-level events require a real DOM tree.

## Fixtures, Doubles, And Cleanup

- Use the smallest fixture that expresses the scenario.
- Prefer real deterministic dependencies and domain objects where practical.
- Prefer doubles in this order: fake, stub, then mock.
- Use a mock for interaction verification only when no observable result can express the contract.
- Keep one-off setup in the test. Extract shared setup only when it improves intent and diagnostics.
- Tear down sandbox runtimes and workers after every test.
- Clean `document.body`, manually inserted head nodes, history, storage, timers, spies, and mocks that the test changes.

## Coverage Workflow

When coverage exposes an uncovered branch:

1. Cover a real observable scenario.
2. Add a controlled failure scenario if the branch represents a real defensive path.
3. Remove or simplify unreachable or redundant code.
4. Propose a refactor when the design prevents a stable public-behavior test.

Do not create cross-workspace aggregator tests or implementation-detail assertions only to increase a percentage.

## Running Tests

Choose the narrowest command that proves the change:

- jsdom: `yarn test <path>` or `make tests cli="<path>"`;
- typecheck: `yarn test:typecheck` or `make tests-typecheck`;
- Vitest Browser: `yarn test:browser` or `make tests-browser cli="-t <name>"`;
- Playwright delivery e2e: `yarn test:e2e` or `make tests-e2e cli="-g <name>"`;
- Storybook shot: `make storybook.shot`.

## Refusal Template

If a request asks for an implementation-detail test, refuse in the conversation language and offer an observable alternative.

Russian:

`Не могу добавить такой тест: это проверка внутренней реализации, а не публичного поведения. Могу покрыть наблюдаемый сценарий: <вариант>.`

English:

`Cannot add this test: it checks internal implementation rather than public behavior. I can cover the observable scenario instead: <variant>.`
