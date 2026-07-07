# Testing Strategy

`v1-sandbox` tests should prove extension behavior without depending on a real
CRM. Pick the smallest test layer that still covers the behavior you need.

## Test Layers

### Unit

Use unit tests for pure logic and isolated UI:

- validation and formatting;
- launch URL helpers;
- fixture/context transformations;
- shell components;
- controller and HostAPI state behavior.

Unit tests should not start a real browser or external extension server.

### Browser Mode

Use browser tests when the extension must run as a real worker in Chromium, but
the backend can be mocked.

This layer is best for:

- real worker entrypoints;
- page and widget runner mounting;
- fixture-backed context reads;
- mocked `host.httpCall` responses;
- primary interactions inside the extension UI.

Browser tests should verify the extension's user path, not only that it mounted.
For example: filter records, open a drawer, save a form, send a note, or switch
a settings preview.

### E2E

Use e2e tests for the full delivery flow:

- sandbox app is opened by URL;
- external extension URL is loaded;
- stylesheet is loaded;
- `host.httpCall` is proxied to the extension backend;
- the user scenario works through the real sandbox shell.

E2E tests should cover fewer scenarios than browser tests. They are slower and
should focus on integration risk.

## Recommended Split

- Unit: many small tests for deterministic logic.
- Browser: main extension behavior with mocked HostAPI.
- E2E: one or two critical user paths through real delivery/proxy.

Avoid testing the same assertion at every layer. If a browser test already
proves an extension form works with mocked HostAPI, the e2e test can focus on
real delivery and one successful interaction.

## Semantic Testing Principles

Test what a user can observe:

- visible text;
- headings;
- labels;
- buttons;
- form values;
- dialogs;
- loading and error states.

Do not assert private implementation details such as CSS module class names or
component internals.

Prefer queries by role, accessible name, label, and visible text:

```ts
await screen.findByRole('heading', { name: 'Returns' })
screen.getByRole('button', { name: 'Apply' })
screen.getByLabelText('Page code')
```

Use technical selectors only as a fallback when there is no meaningful semantic
surface to query.

## HTML First, ARIA Second

Start with native HTML semantics:

- `button` for actions;
- `a` for navigation;
- `label` with `input`, `select`, or `textarea`;
- `fieldset` and `legend` for grouped form controls;
- headings for sections;
- `table` for tabular data;
- `nav`, `main`, `aside`, `section` for page structure.

Add ARIA only when native semantics cannot express the behavior.

Good uses of ARIA:

- icon buttons without visible text need `aria-label`;
- dialogs should have a clear accessible name;
- custom selects/popovers need correct roles and state;
- errors can be connected through `aria-describedby`;
- loading containers can expose `aria-busy`.

Avoid ARIA that duplicates or conflicts with native semantics.

## Visibility and Interaction

Only interact with UI that is ready:

- visible;
- enabled;
- not covered by another layer;
- loaded after async work has finished.

Use user-facing results as assertions. After clicking `Save`, assert that the
dialog closed, a success state appeared, or the HostAPI call was recorded.

## HostAPI Assertions

Use HostAPI snapshots to verify integration effects:

```ts
const calls = runtime.snapshot().host.http

expect(calls.some(call => call.action === '/returns/save')).toBe(true)
```

In browser tests, assert the action and payload passed to mocked HostAPI. In e2e
tests, also verify that the UI works with the real backend/proxy response.

## What Not to Test

- Do not add `data-testid` for new sandbox UI.
- Do not test hidden or inactive DOM.
- Do not assert generated CSS class names.
- Do not use long DOM-path selectors when a role/name/label exists.
- Do not make browser tests depend on the external extension backend unless the
  scenario is intentionally e2e.
