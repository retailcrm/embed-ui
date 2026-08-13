# Examples

This page shows common `v1-sandbox` usage patterns. Use the public package
subpaths from [api.md](./api.md) in extension projects.

## Manual Preview

Start the sandbox app:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

Open the printed URL and paste a full extension endpoint:

```text
%extension-url%/extension/%extension-id%
```

Page runner direct URL:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=returns&fixture=order-basic
```

Widget runner direct URL:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.after&fixture=order-basic
```

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

In an extension project, use the browser automation helpers when you want to
mount the sandbox app:

```ts
import { afterEach, expect, test } from 'vitest'
import { screen } from '@testing-library/dom'

import {
  launchSandboxExtension,
  type MountedSandbox,
} from '@retailcrm/embed-ui-v1-sandbox/automation/browser'

let sandbox: MountedSandbox | null = null

afterEach(() => {
  sandbox?.unmount()
  sandbox = null
  document.body.innerHTML = ''
})

test('mounts page extension in browser mode', async () => {
  sandbox = await launchSandboxExtension({
    fixture: 'order-basic',
    manifestUrl: '/tests/fixtures/extensions/returnsModule/index.ts',
    mode: 'page',
    pageCode: 'returns',
  })

  expect(await screen.findByRole('heading', { name: 'Returns' })).toBeInstanceOf(HTMLElement)
})
```

When the extension calls `host.httpCall`, prefer a deterministic browser test
runtime that injects a sandbox HostAPI middleware. The `v1-sandbox` repository
contains examples of that pattern:

```text
tests/sdk/automation/returnsModule.test.browser.ts
tests/sdk/automation/promoModule.test.browser.ts
```

Those examples run real worker extension entrypoints in Chromium, mock HostAPI
responses, interact with the extension UI, and assert the HostAPI snapshot.

## Playwright E2E Test

Use e2e tests for the full sandbox app and real extension delivery path.

```ts
import { expect, test } from '@playwright/test'

test('loads returns page extension', async ({ page }) => {
  await page.goto(
    '/?manifestUrl='
    + encodeURIComponent('%extension-url%/extension/%extension-id%')
    + '&mode=page'
    + '&pageCode=returns'
    + '&fixture=order-basic'
  )

  await expect(page.getByRole('heading', { name: 'Returns' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Create return' })).toBeVisible()
})
```

You can also use the Playwright automation helper after opening the sandbox:

```ts
import {
  launchSandboxExtension,
  readSandboxSnapshot,
} from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'

await page.goto('/')

await launchSandboxExtension(page, {
  fixture: 'order-basic',
  manifestUrl: '%extension-url%/extension/%extension-id%',
  mode: 'widget',
  targets: ['order/card:common.after'],
})
```

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
