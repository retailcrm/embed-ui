# v1-sandbox Usage Guide

`v1-sandbox` is a local CRM-like environment for running JS extensions before
installing them into a real CRM. The sandbox loads an external extension by URL,
mounts it into a selected widget target or page area, provides fixture-backed
context, and simulates HostAPI.

Related docs:

- [Documentation index](./index.md)
- [Testing strategy](./strategy.md)
- [Examples](./examples.md)
- [API reference](./api.md)

## Quick Start

1. Start the sandbox from an installed package:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

or, after installation:

```bash
yarn embed-ui-v1-sandbox serve
```

2. Open the sandbox page:

```text
%sandbox-url%
```

`%sandbox-url%` depends on the local container/DNS setup. Linux Docker usually
uses Traefik and the `.test` top-level domain; OrbStack on macOS uses `.local`
from its domain namespace.

3. Start your extension project separately. It must expose the extension module
over HTTP. The standard URL shape is:

```text
%extension-url%/extension/%extension-id%
```

`%extension-url%` is the delivery server origin without
`/extension/%extension-id%`. It can be `http://web-extensions-server.simla.local`,
`http://web-extensions-server.simla.test`, `https://ycp-retail.ru`, or any other
available extension server. `manifestUrl` must include the `/extension/` path
and `%extension-id%`.

4. In the sandbox, click the `</>` icon in the lower part of the dark rail. The
   sandbox control panel opens.

5. Paste the extension URL into `Manifest / extension URL`.

- `%extension-url%`: delivery server origin without `/extension/%extension-id%`;
- `/extension/`: the default extension server API path. If your server uses a
  different descriptor path, paste the full endpoint URL;
- `%extension-id%`: id/UUID of the JS module or extension record on the
  extension server. It is not a `pageCode` and not a target; one extension can
  contain pages and widgets.

6. Select a mode:

- `Widgets`: mount widget runners into one or more `order/card:*` targets.
- `Page`: mount a page runner by `pageCode`.

7. Click `Apply`. The sandbox updates the URL contract and starts the extension.

## Running The Built Package App

The published package contains a static sandbox app in `dist/app`. It is built
separately from the programmatic runtime API.

After installing the package in your extension project:

```bash
npm i --save-dev @retailcrm/embed-ui-v1-sandbox
```

or:

```bash
yarn add -D @retailcrm/embed-ui-v1-sandbox
```

run:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

If your project runs the sandbox inside Docker, bind the server to all
interfaces and publish the port from the container:

```bash
embed-ui-v1-sandbox serve --host 0.0.0.0 --port 4173
```

The CLI prints the URL it serves. Use that URL as `%sandbox-url%` in the
examples below.

The built app does not contain extension code. Your extension server still runs
separately, and the sandbox receives it through `Manifest / extension URL`.

## What to Paste into Manifest / Extension URL

The primary value is the descriptor or entrypoint URL:

```text
%extension-url%/extension/%extension-id%
```

The sandbox can load:

- an HTML entrypoint, using the first `<script src>` from `<head>`;
- a direct JS script.

Core-style delivery usually exposes the script here:

```text
%extension-url%/extension/%extension-id%/script
```

In the control panel, normally paste the full extension endpoint URL:

```text
%extension-url%/extension/%extension-id%
```

## Control Panel Fields

- `Manifest / extension URL`: full descriptor/entrypoint/script URL fetched by
  the sandbox. For the standard extension server, use
  `%extension-url%/extension/%extension-id%`.
- `Mode`: selects the runner type. `Widgets` mounts widgets into CRM slots;
  `Page` mounts a page runner by `Page code`.
- `Selected fixture`: CRM mock state for the next launch: order context, custom
  fields, dictionaries, location, and initial HostAPI state. The panel also
  shows the fixture used by the current connected run.
- `Page code`: `code` from the extension `pages` registration. For example,
  `board`, `summary`, or `returns`. It is not the extension UUID.
- `Widget targets`: targets/CRM slots for widget runners, for example
  `order/card:common.after`. They are used only in `Widgets` mode.
- `Current run Context JSON`: the context exposed to the currently connected
  extension. Selecting another fixture does not replace this JSON until the
  main `Apply` action starts a new run.

## Control Panel Validation

The control panel validates launch values when you click `Apply` and validates
the context editor when you click `Apply context`. It does not check network
availability.

- `Manifest / extension URL` is required before applying the launch settings.
  It must be an absolute `http` or `https` URL and, for the standard extension
  server, include `/extension/%extension-id%`.
- `Mode` must be `Widgets` or `Page`.
- `Selected fixture` must be one of the sandbox fixtures.
- `Page code` is required only in `Page` mode.
- `Widget targets` require at least one valid target only in `Widgets` mode.
- `Current run Context JSON` must be a JSON object. Top-level keys must be
  known context keys, and each context value must be an object.

The `Apply` button is disabled until the required launch fields are filled:
extension URL, mode, fixture, at least one widget target in `Widgets` mode, and
page code in `Page` mode.

`Apply context` is available only while an extension is connected, the JSON
differs semantically from the active context, and the launch fields have no
pending changes. Whitespace, formatting, and object key order do not count as
context changes.

## Running a Widget

Use `Widgets` mode when an extension registers `widgets` with `defineRunner`.

Control panel flow:

1. Paste `Manifest / extension URL`.
2. Select `Mode: Widgets`.
3. Choose the required value in `Selected fixture`.
4. Check the required `Widget targets`.
5. Click `Apply`.

Widget targets are CRM slots. If two targets are selected, the sandbox creates
two widget instances and calls the runner for each selected slot.

Example direct URL:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

## Running a Page

Use `Page` mode when an extension registers `pages` with `defineRunner`.

Control panel flow:

1. Paste `Manifest / extension URL`.
2. Select `Mode: Page`.
3. Enter the page runner code into `Page code`.
4. Choose the required value in `Selected fixture`.
5. Click `Apply`.

Important: `Page code` is not the extension UUID and not a module code. It is
the value from the extension `pages` registration.

Example extension descriptor:

```json
{
  "uuid": "05a9f990-7cfc-46c2-af0f-3abfd3d4c334",
  "pages": [
    { "code": "board" },
    { "code": "summary" }
  ]
}
```

For this extension:

```text
Manifest / extension URL = %extension-url%/extension/05a9f990-7cfc-46c2-af0f-3abfd3d4c334
Page code = board
```

or:

```text
Page code = summary
```

Example direct URL:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%&fixture=order-basic
```

## Fixtures and Context JSON

A fixture defines the CRM state exposed to the extension through the context
API. Current order fixtures:

- `order-basic`: a basic order;
- `order-with-delivery`: an order with delivery data;
- `order-readonly-error`: a readonly/error-like order.

`Current run Context JSON` lets you temporarily replace values in the context
of the connected run. Contexts included in the JSON are replaced as complete
objects, so removing a field from one of them also removes that field from the
context. Contexts omitted from the JSON remain unchanged.

Example override:

```json
{
  "order/card": {
    "number": "999C"
  }
}
```

Usually it is easier to edit the already displayed full JSON and change only
the needed value. `Undo changes` restores the editor from the active context;
it does not load a newly selected, not-yet-applied fixture.

After editing, click `Apply context`. The sandbox restarts the same extension
with the updated context, keeps the control panel open, and confirms that the
context was applied. The widget run summary marks this state as manually
changed.

The main `Apply` action has a different purpose: it starts the selected launch
configuration and loads the original context of the selected fixture. Any
manual context changes from the current run are intentionally discarded.
Manual Context JSON is temporary and is not persisted in browser storage.

## HostAPI Simulation

The sandbox exposes the same HostAPI surface to extensions:

- `httpCall`;
- `getLocation`;
- `goTo`;
- `pushQuery`;
- `replaceQuery`;
- `onBeforeRouteLeave`.

`host.httpCall(action, payload)` is intercepted by the sandbox host. When the
sandbox can infer the external extension backend URL, it proxies the request to
that backend.

Example:

```text
Manifest / extension URL = %extension-url%/extension/%extension-id%
Extension call = host.httpCall('/returns', payload)
Sandbox request = POST %extension-url%/returns
```

The request body contains the serialized payload. The backend response is
returned to the extension as-is:

```ts
{
  status: response.status,
  body: await response.text(),
}
```

This mirrors the important CRM behavior for extension development: the
extension still calls `host.httpCall`, while the sandbox decides where to send
the request.

If the sandbox cannot infer a backend URL, it returns a controlled fallback
response instead of crashing the page.

The current sandbox state is available to e2e tests:

```ts
window.__CRM_EMBED_SANDBOX__.snapshot()
```

The snapshot can be used to inspect:

- executed `httpCall` actions;
- `host.location`;
- navigation actions;
- active context.

## How to Verify That an Extension Is Connected

Check three things:

1. The extension UI appears in the selected widget target or page area.
2. DevTools Network shows requests to the extension server:
   descriptor/entrypoint/script/stylesheet.
3. The console has no runner startup errors.

If the page is blank:

- check that `Manifest / extension URL` is not empty;
- in `Page` mode, verify the `Page code`;
- in `Widgets` mode, verify that the selected target is actually registered by
  the extension;
- verify that the extension is delivered as a worker runner;
- if Network shows a CORS error, the extension server must allow the
  `%sandbox-url%` origin.

## Playwright

In an extension project, start the sandbox from Playwright:

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'http://127.0.0.1:4173',
  },
  webServer: {
    command: 'yarn embed-ui-v1-sandbox serve',
    reuseExistingServer: true,
    url: 'http://127.0.0.1:4173',
  },
})
```

Then open the sandbox with the extension URL in the test:

```ts
import { expect, test } from '@playwright/test'

test('mounts widget extension in sandbox', async ({ page }) => {
  const extensionUrl = '%extension-url%/extension/%extension-id%'

  await page.goto(
    `/?manifestUrl=${encodeURIComponent(extensionUrl)}`
    + '&mode=widget'
    + '&fixture=order-basic'
    + '&targets=order/card:common.after'
  )

  await expect(page.getByText('ORDER/CARD:COMMON.AFTER')).toBeVisible()
})
```

If your extension project also needs an extension dev server, add it as a
second Playwright `webServer`.

## Testing Extension Fixtures

The sandbox repository keeps fixture extensions in
`tests/__fixtures__/extensions/`. Each fixture entrypoint should be real
extension code. For example, a browser test can point `manifestUrl` directly to
`/tests/__fixtures__/extensions/returnsModule/index.ts` and let the sandbox
load it through the normal manifest resolver.

### Fixture Extension Format

Keep fixture extensions close to how they are written in a real extension
project. The minimum folder layout is:

```text
tests/__fixtures__/extensions/%extension-name%/
  index.ts
  package.json
  ...
```

`index.ts` is the local extension entrypoint used by browser tests. It should
register or export the same extension code that would be delivered by the
external extension server.

The test also needs a small descriptor with runtime metadata:

- `fixtureName`: local folder name under `tests/__fixtures__/extensions/`;
- `uuid`: extension id used to build
  `%extension-url%/extension/%extension-id%`;
- `targets`: widget mount slots, required for `mode=widget`;
- `pages[].code`: page codes, required for `mode=page`.

There are two supported ways to provide that descriptor.

Use `extensionrc.json` when the fixture can keep metadata next to its source:

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

Then the test can read it:

```ts
const extension = readExtensionFixture('returnsModule')
const [pageCode] = getExtensionPageCodes(extension)

await page.goto(createSandboxPagePath({
  extensionUrl: createExternalExtensionUrl(extension),
  manifestUrl: createExtensionManifestUrl(extension),
  pageCode,
  targets: getExtensionTargets(extension),
}))
```

Use an inline descriptor when the extension source is copied from an external
project and should not get a local `extensionrc.json`:

```ts
const extension = {
  fixtureName: 'promoModule',
  name: 'Promo module',
  targets: ['order/card:common.after'],
  uuid: '8ebe1617-d609-43e4-b35a-fbfae011eee3',
}

const [target] = getExtensionTargets(extension)

await page.goto(createSandboxWidgetPath({
  extensionUrl: createExternalExtensionUrl(extension),
  manifestUrl: createExtensionManifestUrl(extension),
  targets: [target],
}))
```

Both variants produce the same sandbox launch config. The difference is only
where the descriptor data comes from: a local JSON file or the test itself.

When an extension calls `host.httpCall(action, payload)`, the sandbox uses
`extensionUrl` to find the external backend base and proxies the call to
`%extension-url%/%action%`. That keeps tests close to the real CRM flow without
hardcoding backend response shapes in Playwright.

For static test servers, import the server helper explicitly:

```ts
import { serveSandbox } from '@retailcrm/embed-ui-v1-sandbox/node'
```

### Browser Extension Tests

Browser extension tests are Vitest tests running in a real Chromium browser.
They are intended for fast runtime checks without an external extension server.

Use them when you need to verify that:

- a real worker extension entrypoint starts;
- page or widget runners mount into the sandbox host;
- fixture-backed context is available;
- mocked `host.httpCall` responses are consumed by the extension;
- the primary interaction inside the extension works.

The standard pattern is:

1. Create a worker from `tests/__fixtures__/workers/extension.worker.ts`.
2. Pass the real extension entrypoint URL, for example
   `tests/__fixtures__/extensions/promoModule/index.ts`.
3. Create `createSandboxWorkerRuntime(...)`.
4. Call `runtime.runPage(pageCode)` or `runtime.runWidget(target)`.
5. Use Testing Library queries and events to verify the extension UI.
6. Inspect `runtime.snapshot()` when the test needs HostAPI activity.

Example:

```ts
const sourceWorker = createExtensionSourceWorker(
  new URL('../../__fixtures__/extensions/promoModule/index.ts', import.meta.url)
)

const runtime = await createSandboxWorkerRuntime({
  descriptorUuid: 'promoModule',
  ready: sourceWorker.ready,
  worker: sourceWorker.worker,
})

await runtime.runWidget('order/card:common.after')

fireEvent.click(await screen.findByRole('button', { name: 'Акции' }))
expect(await screen.findByRole('dialog')).toBeInstanceOf(HTMLElement)
```

If the extension calls `host.httpCall`, pass `httpMiddleware` to
`createSandboxWorkerRuntime`. The middleware should return the response shape
expected by the extension for the tested action. This keeps browser tests fast
and deterministic while still using the real worker and Vue rendering.

Run browser tests in this repository:

```bash
yarn workspace @retailcrm/embed-ui-v1-sandbox test:browser
```

Current browser examples live in:

```text
tests/sdk/automation/*.test.browser.ts
```

### Playwright Extension Tests E2E

Playwright extension tests are intended for the real extension path through the
sandbox app:

1. Read the extension fixture descriptor or provide a small descriptor in the
   test when the fixture intentionally has no local config.
2. Build a sandbox URL with local `manifestUrl`, external `extensionUrl`,
   `mode`, `fixture`, and either `pageCode` or `targets`.
3. Open that URL with `page.goto(...)`.
4. Verify that the extension UI is mounted.
5. Exercise the primary user path of the extension, not only the mount smoke.
   For example: fill a filter, apply it, open an item, save the form, or send a
   note.
6. Inspect
   `window.__CRM_EMBED_SANDBOX__.snapshot()`.

The main value of Playwright e2e tests is proving that the extension works as a
user would use it inside the full sandbox page. A test that only checks that the
runner mounted is a smoke check; every extension fixture should also cover its
key business flow when possible.

Run in this repository:

```bash
yarn workspace @retailcrm/embed-ui-v1-sandbox test:e2e
```

The repository examples use fixture extensions that look like real extensions:
`promoModule` for a widget target and `returnsModule` for a page runner. They
are loaded from their fixture `index.ts` files. Backend calls are proxied
through the same sandbox `host.httpCall` middleware that the manual sandbox app
uses.

Repository e2e examples live in:

```text
tests/e2e/*.e2e.ts
```

## E2E Environment Variables

`@retailcrm/embed-ui-v1-sandbox` ships `.env.sandbox.dist` as a template for
Playwright extension runs. Create an environment file used by your project and
adjust values:

```bash
yarn embed-ui-v1-sandbox init-env
```

or:

```bash
npx @retailcrm/embed-ui-v1-sandbox init-env --output .env.sandbox
```

Variables:

- `SANDBOX_BASE_URL`: sandbox shell URL. Empty means the local Playwright config
  can start the sandbox server itself. Set it when the sandbox is already
  running, for example `http://v1.embed-ui-sandbox.local` on OrbStack/macOS or
  `http://v1.embed-ui-sandbox.test` on Linux/Traefik.
- `SANDBOX_EXTENSION_URL`: extension server prefix in the form
  `%extension-url%/extension/`. Tests append the extension UUID from the fixture
  descriptor to get the backend endpoint. For this repository's own E2E suite,
  an empty value makes Playwright build and start the local fixture extension
  server at `http://127.0.0.1:4175/extension/`; set the variable to override it
  with an external server.

Typical local page test values:

```dotenv
SANDBOX_BASE_URL=http://v1.embed-ui-sandbox.local
SANDBOX_EXTENSION_URL=http://web-extensions-server.simla.local/extension/
```

Playwright covers:

- shell loading;
- control panel opening;
- public URL contract updates from the control panel;
- external extension startup when `SANDBOX_EXTENSION_URL` is set;
- user interaction inside the extension;
- `host.httpCall` through sandbox proxy middleware;
- context changes through the JSON editor.

## For AI Agents

- Do not hardcode real company domains in tests or docs. Use `%sandbox-url%`,
  `%extension-url%`, `%extension-id%`, and `%page-code%`.
- Use `tests/__fixtures__/extensions/` for extension code that should look like
  real extension code.
- Use `tests/__bootstrap__/` and `tests/__utils__/` for reusable test
  infrastructure: static servers, URL builders, descriptor readers, and
  snapshot helpers.
- Prefer shared URL helpers from `tests/__utils__/` over hand-written query
  strings.
- Prefer `window.__CRM_EMBED_SANDBOX__.snapshot()` through the shared snapshot
  helper for assertions about HostAPI state.
- Do not test the control panel for its own sake in Playwright tests. Prefer
  direct sandbox URLs built from fixture descriptors and test the path
  "sandbox URL opened -> extension mounted -> user action -> sandbox state
  changed".

## Useful URL Templates

Widget:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.after&fixture=order-basic
```

Multiple widgets:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

Page:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%&fixture=order-basic
```

Placeholders:

- `%sandbox-url%`: sandbox shell URL in the current local container/DNS setup.
  Linux Docker usually uses Traefik and `.test`; OrbStack on macOS uses
  `.local` from its domain namespace.
- `%extension-url%`: external extension server origin without
  `/extension/%extension-id%`. It can be `http://web-extensions-server.simla.local`,
  `http://web-extensions-server.simla.test`, `https://ycp-retail.ru`, or any
  other available address.
- `%extension-id%`: id/UUID of the JS module or extension record on the
  extension server. It is not a `pageCode` and not a target.
- `%page-code%`: page code from the extension manifest/runner.
