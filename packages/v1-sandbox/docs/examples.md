# Examples

This page shows common `v1-sandbox` usage patterns. Use the public package
subpaths from [api.md](./api.md) in extension projects.

## Manual Preview

Start the sandbox app:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

Open the printed URL and paste a runtime descriptor:

```json
{
  "entrypoint": "http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/script",
  "stylesheet": "http://web-extensions-server.simla.local/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/stylesheet",
  "targets": [],
  "pages": [
    "settings"
  ],
  "runner": "worker"
}
```

Click **Apply** to validate and save the launch configuration in `localStorage`.
The sandbox reloads with a clean URL and restores that configuration on subsequent
visits. Storage is scoped to this browser and sandbox origin; sharing the clean
URL does not share the configuration. Without valid saved settings, the sandbox
shows onboarding. Unsaved edits and manually changed Context JSON are not persisted.

Use the DevPanel to switch fixtures, edit Context JSON, or change page/widget
configuration without changing extension code.

## Unit Test

Use unit tests for pure sandbox primitives or extension logic that does not need
a real browser.

```ts
import { describe, expect, test } from 'vitest'

import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox/core'

describe('extension host behavior', () => {
  test('records http calls', async () => {
    const sandbox = createSandboxController({
      contexts: {},
      custom: {},
      mode: 'standalone-test',
      schemas: {},
    })

    await sandbox.endpointApi.httpCall('/ping', { ok: true })

    expect(sandbox.snapshot().host.http[0]).toMatchObject({
      action: '/ping',
    })
  })
})
```

## Browser Test

Browser tests run in a real Chromium browser through Vitest Browser. Use them
when a real worker extension must render UI, but backend responses can be
mocked.

Use `createExtensionSourceWorker()` and `createSandboxWorkerRuntime()` to run
the extension with fixture-backed HostAPI. Always tear down the runtime after
each test.

```ts
import type { SandboxWorkerRuntime } from '@retailcrm/embed-ui-v1-sandbox/automation/browser'

import { afterEach, expect, test } from 'vitest'
import { screen } from '@testing-library/dom'

import {
  createExtensionSourceWorker,
  createSandboxWorkerRuntime,
} from '@retailcrm/embed-ui-v1-sandbox/automation/browser'

let runtime: SandboxWorkerRuntime | null = null

afterEach(async () => {
  await runtime?.teardown()
  runtime = null
  document.body.innerHTML = ''
})

test('opens the extension settings page', async () => {
  const source = createExtensionSourceWorker(
    new URL('/web/endpoint/endpoint.worker.ts', window.location.href)
  )

  runtime = await createSandboxWorkerRuntime({
    fixture: 'order-basic',
    ready: source.ready,
    worker: source.worker,
  })

  await runtime.runPage('settings')

  expect(await screen.findByRole('heading', {
    name: 'Настройки расширения',
  })).toBeInstanceOf(HTMLElement)
  expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInstanceOf(HTMLButtonElement)
})
```

Adjust the entrypoint, page code, and visible text to match your extension.
Use `runtime.runWidget(target)` for widget scenarios. Pass `httpMiddleware` to
`createSandboxWorkerRuntime()` when the extension needs deterministic backend
responses. Use `runtime.snapshot()` to inspect HostAPI activity.

Full sandbox app and external delivery checks belong in Playwright E2E tests.

## Playwright E2E Test

```ts
import { expect, test } from '@playwright/test'
import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'

test('loads returns page extension', async ({ page }) => {
  await page.goto('/')
  await launchSandboxExtension(page, {
    descriptor: {
      runner: 'worker',
      entrypoint: 'https://extension.test/build/worker.js',
      pages: ['returns'],
      stylesheet: 'https://extension.test/build/extension.css',
      targets: [],
    },
    mode: 'page',
    pageCode: 'returns',
    fixture: 'order-basic',
  })

  await expect(page).toHaveURL(url => url.search === '')
  await expect(page.getByRole('heading', { name: 'Returns' })).toBeVisible()
})
```

The helper passes configuration directly to the running Host and waits for the
extension to mount. It does not write to `localStorage` or reload the page.
Launch parameters are never placed in the URL.

## Snapshot Assertions

The sandbox exposes current HostAPI activity through a browser global:

```ts
const snapshot = await readSandboxSnapshot(page)

expect(snapshot.host.http.some(call => call.action === '/returns/save')).toBe(true)
```

Use snapshot assertions to verify that the extension called the expected
HostAPI action with the expected payload. Keep UI assertions focused on visible
user-facing behavior.

## Fixture Extension Shape

A fixture extension should look like a real extension project:

```text
tests/__fixtures__/extensions/%extension-name%/
  index.ts
  package.json
  extensionrc.json
  ...
```

`index.ts` should be the real worker entrypoint:

```ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

runEndpoint(defineRunner({
  pages: [{
    returns: returnsPageRunner,
  }],
  widgets: [{
    'order/card:common.after': promoWidgetRunner,
  }],
}))
```

Use `extensionrc.json` when the fixture owns its metadata:

```json
{
  "uuid": "79aa7a7a-3b66-4e85-b623-f7c1fef97bc7",
  "name": "returnsModule",
  "pages": [
    {
      "code": "returns"
    }
  ],
  "targets": [
    "order/card:common.after"
  ]
}
```

Use inline metadata in a test when the fixture mirrors an external extension
and should stay config-free.

## Ticket Viewer Widgets

Ticket widgets can be developed with local workspace packages before publishing
an SDK version. In an extension project, use a sandbox build containing the ticket
contexts and targets.

```ts
import type { SandboxWorkerRuntime } from '@retailcrm/embed-ui-v1-sandbox/automation/browser'
import type { TicketSandboxSchemas } from '@retailcrm/embed-ui-v1-sandbox/scenario'

import {
  createExtensionSourceWorker,
  createSandboxWorkerRuntime,
} from '@retailcrm/embed-ui-v1-sandbox/automation/browser'

const source = createExtensionSourceWorker('%extension-url%/ticket.worker.js')
const runtime: SandboxWorkerRuntime<TicketSandboxSchemas> = await createSandboxWorkerRuntime({
  fixture: 'ticket-basic',
  ready: source.ready,
  worker: source.worker,
})

try {
  await runtime.runWidget('ticket/view:header.after')
  runtime.patchContext('ticket/view:settings', { editable: false })
  // Interact with the extension UI, then inspect host effects.
  const actions = runtime.snapshot().host.actions
  console.log(actions)
} finally {
  await runtime.teardown()
}
```

For manual preview, paste a descriptor with ticket targets in the DevPanel. The
sandbox selects the matching ticket fixture; the target picker shows placements
compatible with that fixture. `ticket-basic` has two questions, and
`ticket-readonly` has no mutation or creation permissions. A ticket fixture exposes
`ticket/view`, `ticket/view:settings`, `user/current` and `settings`, with no order
context or custom ticket entities.

All four placements are supported: `ticket/view:header.after`,
`ticket/view:common.before`, `ticket/view:customer.after` and
`ticket/view:issues.after`. The questions placement is mounted once per ticket.
Use one fixture family per launch; a descriptor may advertise both order and ticket
targets, but each launch uses only the selected family's placements.

The ticket scenario implements comment IDs, question assignment and status
changes, and publishes updated context values to the worker. The fixture status
`resolved` closes a question; SLA is a deterministic fixture snapshot, not the
CRM backend's SLA calculation. `refresh()` clears loading/error flags while
preserving the current simulated data.

`openTicketEditor`, `openTicketHistory`, `openEmailEditor` and `openOrderForm`
check permissions and record successful requests in `snapshot().host.actions`.
They do not open real CRM forms, send email or create orders. Invalid or denied
calls return a rejection, so public `useActions()` promises reject. Use Context
JSON or `patchContext()` to exercise loading, failure and permission changes.
`reset()` restores fixture data and clears the action log.
