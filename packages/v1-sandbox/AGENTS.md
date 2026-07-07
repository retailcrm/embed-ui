# AGENTS.md

## Purpose

This file is for AI assistants and automation that use the built package
`@retailcrm/embed-ui-v1-sandbox` in extension projects or test suites.

It is not a contributor guide for editing the internal source of this workspace.
Treat this file as usage guidance for the published API and package docs.

## What This Package Is

- Package: `@retailcrm/embed-ui-v1-sandbox`
- Role: CRM-like sandbox for Embed UI v1 extensions
- Framework: Vue 3
- Main user workflows: manual extension preview and automated extension tests

This package runs page and widget extensions without a real CRM instance. It
provides fixture-backed context, HostAPI simulation, a browser sandbox app, and
automation helpers for unit, browser, and e2e testing.

## How To Import

- For public runtime primitives, import from `@retailcrm/embed-ui-v1-sandbox/core`.
- For order fixtures, targets, launch helpers, validation, and HostAPI HTTP
  middleware, import from `@retailcrm/embed-ui-v1-sandbox/scenario`.
- For Vitest Browser sandbox automation, import from
  `@retailcrm/embed-ui-v1-sandbox/automation/browser`.
- For Playwright e2e automation, import from
  `@retailcrm/embed-ui-v1-sandbox/automation/playwright`.
- For Node-only static server helpers, import from
  `@retailcrm/embed-ui-v1-sandbox/node`.
- Do not import from package-internal files such as `src/*`.

## Mental Model

- The browser sandbox app is for manual preview and full extension loading by
  URL.
- Browser tests run real worker extensions in Chromium and usually mock
  `host.httpCall`.
- E2E tests run the full sandbox app, extension delivery URL, styles, and real
  `host.httpCall` proxy flow.
- Unit tests cover pure logic, shell components, validation, fixtures, and
  controller behavior without a real browser.
- Manual sandbox usage and automated extension testing are related workflows,
  but they should be documented and tested separately.

## Safe Default Recommendation

When writing tests around this package, start with public imports like:

```ts
import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox/core'
import { createSandboxHttpMiddleware } from '@retailcrm/embed-ui-v1-sandbox/scenario'
import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
```

When manually checking an extension, start the package CLI and use the DevPanel
or public URL contract:

```bash
embed-ui-v1-sandbox serve
```

## Public API Areas

Common public API areas include:

- CLI:
  `embed-ui-v1-sandbox serve`
- core primitives:
  `createSandboxController`, `createSandboxState`, `createSandboxHostApi`,
  `createSandboxRpc`
- scenario helpers:
  `createOrderSandboxController`, `createSandboxHttpMiddleware`,
  `updateSandboxLaunchQuery`, order fixtures, targets, and validation helpers
- browser automation:
  `mountSandbox`, `launchSandboxExtension`, `waitForSandboxLaunchBridge`
- Playwright automation:
  `createSandboxPagePath`, `createSandboxWidgetPath`, `launchSandboxExtension`,
  `readSandboxSnapshot`, `waitForSandboxLaunchBridge`
- Node helpers:
  `serveSandbox`

Use [docs/api.md](./docs/api.md) as the source of truth for package subpaths and
API stability boundaries.

## Usage Rules

- Keep package documentation in English.
- Prefer public package subpaths over internal files.
- Keep manual sandbox usage and automated testing guidance separate.
- Use browser tests for real worker extension behavior with mocked HostAPI.
- Use e2e tests for full delivery, stylesheet loading, and real HostAPI proxy.
- Prefer semantic HTML and accessible names in examples.
- Add ARIA only when native HTML semantics are not enough.
- Do not add `data-testid` to sandbox UI or examples; use roles, labels, text,
  and visible behavior.
- Repository-only Docker and Makefile commands belong in the monorepo root
  documentation, not package usage docs.

## What To Avoid

- Do not import from `@retailcrm/embed-ui-v1-sandbox/src/*`.
- Do not rely on internal test helpers as published API.
- Do not mix browser-mode tests and e2e responsibilities in one example.
- Do not test hidden DOM or generated CSS module class names.
- Do not use ARIA as a replacement for correct native HTML semantics.
- Do not hardcode local DNS domains in package docs; use placeholders such as
  `%sandbox-url%`, `%extension-url%`, and `%extension-id%`.

## Example

```ts
import { expect, test } from '@playwright/test'

import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'

test('loads extension page in sandbox', async ({ page }) => {
  await page.goto('/')

  await launchSandboxExtension(page, {
    fixture: 'order-basic',
    manifestUrl: '%extension-url%/extension/%extension-id%',
    mode: 'page',
    pageCode: 'returns',
  })

  await expect(page.getByRole('heading', { name: 'Returns' })).toBeVisible()
})
```

## If You Need More Context

- Package README:
  [`./README.md`](./README.md)
- Documentation index:
  [`./docs/index.md`](./docs/index.md)
- Manual usage guide:
  [`./docs/usage-guide.md`](./docs/usage-guide.md)
- Testing strategy:
  [`./docs/strategy.md`](./docs/strategy.md)
- Practical examples:
  [`./docs/examples.md`](./docs/examples.md)
- API reference:
  [`./docs/api.md`](./docs/api.md)
