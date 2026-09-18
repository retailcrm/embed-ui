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
  createSandboxLaunchConfig,
} from '@retailcrm/embed-ui-v1-sandbox/scenario'
```

Use `scenario` for the ready-made order sandbox:

- order fixtures and context schemas;
- supported widget targets;
- launch configuration helpers;
- runtime descriptor parsing and extension source resolution;
- validation helpers;
- default HTTP middleware that proxies extension `host.httpCall` requests.

## `automation/browser`

```ts
import {
  createExtensionSourceWorker,
  createSandboxWorkerRuntime,
  type SandboxWorkerRuntime,
} from '@retailcrm/embed-ui-v1-sandbox/automation/browser'
```

Use `createExtensionSourceWorker(entrypoint)` to load the real extension in a
Worker. Pass its `worker` and `ready` promise to `createSandboxWorkerRuntime()`.
The runtime supplies fixture-backed contexts and HostAPI, and exposes:

- `runPage(code)` and `runWidget(target)` to mount extension UI;
- `httpMiddleware` as a creation option for deterministic backend responses;
- `snapshot()`, `patchContext()`, and `reset()` for HostAPI state;
- `teardown()` to release the runner, Worker, and Host after each test.

This subpath also exports app-level helpers `mountSandbox()`,
`launchSandboxExtension()`, and `waitForSandboxLaunchBridge()`. Extension Browser
Mode tests should use the worker runtime above; full delivery checks belong in
Playwright E2E tests.

## `automation/playwright`

```ts
import {
  launchSandboxExtension,
  readSandboxSnapshot,
  waitForSandboxLaunchBridge,
} from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
```

Use this subpath in Playwright e2e tests after opening the sandbox app. The
helpers interact with the browser-side launch bridge instead of reaching into
`window.__CRM_EMBED_SANDBOX_LAUNCH__` directly.

It also exposes a helper for reading the public
HostAPI snapshot from `window.__CRM_EMBED_SANDBOX__`:

```ts
await page.goto('/')
await launchSandboxExtension(page, {
  mode: 'page',
  descriptor: {
    runner: 'worker',
    entrypoint: 'https://extension.test/build/worker.js',
    pages: ['returns'],
    stylesheet: 'https://extension.test/build/extension.css',
    targets: [],
  },
  pageCode: 'returns',
})

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

## Saved Launch Configuration

DevPanel validates and saves its launch configuration in `localStorage` when
**Apply** is pressed. Reloading restores it; absent or invalid stored settings
show onboarding. Storage is scoped to the sandbox origin in the current browser.
The clean URL does not carry configuration to another browser. Draft fields and
manual context edits are not persisted.

The launch bridge's async `launch()` starts the extension in the current Host.
The Playwright `launchSandboxExtension()` helper awaits that launch without using
`localStorage` or reloading the page. A repeated launch releases the previous
runtime first. Assert the extension's visible UI to verify the tested scenario.

## Launch Configuration

Open the clean sandbox URL, then call `launchSandboxExtension(page, config)`.
Pass the runtime `descriptor`, `mode`, and optionally `fixture`, `pageCode`, and
`targets`. Widget targets default to the descriptor's supported order targets.
Launch configuration is never read from query parameters.

The runtime descriptor has exactly these fields:

```ts
type SandboxExtensionDescriptor = {
  runner: 'worker'
  entrypoint: string
  stylesheet: string | null
  pages: string[]
  targets: TargetName[]
}
```

`entrypoint` and non-null `stylesheet` must be absolute HTTP(S) URLs.
`runner` must be `worker`. Unknown fields, including `uuid`, `code`, and
`baseUrl`, are rejected. The entrypoint URL is used as supplied, including
any extension identifier in its path.

## HostAPI HTTP Contract

Extensions call:

```ts
await host.httpCall('/returns', payload)
```

In descriptor mode the backend base is the origin of `entrypoint`; the call
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
- validated launch configuration stored in `localStorage`;
- sandbox launch bridge helpers;
- `window.__CRM_EMBED_SANDBOX__.snapshot()` for tests.

Internal and not stable:

- `src/*` imports;
- test-only helpers under `tests/*`;
- generated files under `dist/*`, except as an escape hatch for tooling that
  cannot resolve package exports.
