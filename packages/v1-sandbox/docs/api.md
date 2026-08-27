# v1-sandbox API

This document describes the public API of
`@retailcrm/embed-ui-v1-sandbox`. Prefer these package subpaths over imports
from `src/*` or internal test helpers.

## CLI

The package binary serves the built sandbox app from `dist/app`:

```bash
embed-ui-v1-sandbox serve
```

Options:

- `--host <host>`: listen host, default `0.0.0.0`;
- `--port <port>`: listen port, default `4173`.

Use an explicit host when the sandbox runs inside a container and must be
reachable from the host machine:

```bash
embed-ui-v1-sandbox serve --host 0.0.0.0 --port 4173
```

## Public Imports

Use public subpaths:

```ts
import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox/core'
import { createSandboxHttpMiddleware } from '@retailcrm/embed-ui-v1-sandbox/scenario'
import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
```

Do not import from package internals:

```ts
// Avoid this in extension projects.
import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox/src/core/controller'
```

## Root Export

```ts
import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox'
```

The root export currently re-exports the core runtime API. Prefer explicit
subpaths in new code when the layer matters.

## `core`

```ts
import {
  createSandboxController,
  createSandboxHostApi,
  createSandboxRpc,
  createSandboxState,
} from '@retailcrm/embed-ui-v1-sandbox/core'
```

Use `core` for low-level sandbox state, context, HostAPI, and RPC primitives.
This layer is useful for focused unit/integration tests that do not need order
fixtures or the browser app shell.

## `scenario`

```ts
import {
  createOrderSandboxController,
  createSandboxHttpMiddleware,
  getOrderSandboxFixture,
  updateSandboxLaunchQuery,
} from '@retailcrm/embed-ui-v1-sandbox/scenario'
```

Use `scenario` for the ready-made order sandbox:

- order fixtures and context schemas;
- supported widget targets;
- launch URL helpers;
- manifest resolution helpers;
- validation helpers;
- default HTTP middleware that proxies extension `host.httpCall` requests.

## `automation/browser`

```ts
import {
  launchSandboxExtension,
  mountSandbox,
  waitForSandboxLaunchBridge,
} from '@retailcrm/embed-ui-v1-sandbox/automation/browser'
```

Use this subpath in Vitest Browser tests when you need to mount the browser
sandbox app inside a real browser environment.

This layer is for sandbox app automation. Browser tests for a specific worker
extension may also use a lighter test runtime in the test project, where
`host.httpCall` is mocked directly.

## `automation/playwright`

```ts
import {
  createSandboxPagePath,
  createSandboxWidgetPath,
  launchSandboxExtension,
  readSandboxSnapshot,
  waitForSandboxLaunchBridge,
} from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
```

Use this subpath in Playwright e2e tests after opening the sandbox app. The
helpers interact with the browser-side launch bridge instead of reaching into
`window.__CRM_EMBED_SANDBOX_LAUNCH__` directly.

It also exposes test utilities for building sandbox URLs and reading the public
HostAPI snapshot from `window.__CRM_EMBED_SANDBOX__`:

```ts
await page.goto(createSandboxPagePath({
  descriptor: {
    code: 'returnsModule',
    baseUrl: 'https://extension.test',
    entrypoint: '/build/worker.js',
    pages: ['returns'],
    stylesheet: '/build/extension.css',
    targets: [],
  },
  pageCode: 'returns',
}))

const snapshot = await readSandboxSnapshot(page)
```

## `automation`

```ts
import {
  getSandboxLaunchBridge,
  requireSandboxLaunchBridge,
} from '@retailcrm/embed-ui-v1-sandbox/automation'
```

Use this subpath for launch bridge primitives shared by browser and Playwright
automation.

## `node`

```ts
import { serveSandbox } from '@retailcrm/embed-ui-v1-sandbox/node'
```

Use `node` for Node-only helpers such as serving the built static sandbox app
from package delivery or a test process.

## URL Contract

The sandbox app is controlled by query parameters:

- `descriptor`: URL-encoded JSON runtime descriptor. This is the primary mode.
- `mode`: `widget` or `page`.
- `fixture`: sandbox fixture code, for example `order-basic`.
- `pageCode`: page runner code for `mode=page`.
- `targets`: comma-separated widget targets for `mode=widget`.
- `widgetId`: base widget instance id.

The runtime descriptor has exactly these fields:

```ts
type SandboxExtensionDescriptor = {
  code: string
  baseUrl: string
  entrypoint: string
  stylesheet: string | null
  pages: string[]
  targets: TargetName[]
}
```

`baseUrl` must be an absolute HTTP(S) URL. `entrypoint` and non-null
`stylesheet` may be relative to it or absolute. Unknown fields, including
`runner` and `uuid`, are rejected.

Example page URL:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=page&pageCode=returns&fixture=order-basic
```

Example widget URL:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=widget&targets=order/card:common.after&fixture=order-basic
```

## HostAPI HTTP Contract

Extensions call:

```ts
await host.httpCall('/returns', payload)
```

In descriptor mode the backend base is `baseUrl`; the call
above sends:

```text
POST %extension-url%/returns
```

The backend response is returned to the extension as:

```ts
{
  status: response.status,
  body: await response.text(),
}
```

Browser tests can mock this layer by providing a sandbox host middleware. E2E
tests should use the real proxy flow whenever the extension backend is part of
the scenario.

## Stability Boundaries

Public and supported:

- package CLI;
- package subpaths listed in this document;
- URL query contract;
- sandbox launch bridge helpers;
- `window.__CRM_EMBED_SANDBOX__.snapshot()` for tests.

Internal and not stable:

- `src/*` imports;
- test-only helpers under `tests/*`;
- generated files under `dist/*`, except as an escape hatch for tooling that
  cannot resolve package exports.
