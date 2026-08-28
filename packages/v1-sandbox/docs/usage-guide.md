# v1-sandbox Usage Guide

`v1-sandbox` is a local CRM-like environment for running JS extensions before
installing them into a real CRM. The sandbox loads an external extension from a
runtime descriptor, mounts it into a selected widget target or page area,
provides fixture-backed context, and simulates HostAPI.

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

3. Start your extension project separately. It must expose the worker module
and optional stylesheet over HTTP(S). Prepare a runtime descriptor:

```json
{
  "baseUrl": "https://extension.test/build/",
  "code": "returnsModule",
  "entrypoint": "worker.js",
  "pages": ["returns"],
  "stylesheet": "extension.css",
  "targets": []
}
```

This descriptor is the runtime contract, not the raw `extensionrc.json` from an
extension project. `baseUrl` is absolute, while `entrypoint` and `stylesheet`
may be relative to it. `pages` contains page-code strings, and the descriptor
has no `runner` or `uuid` field. The sandbox supports worker extensions only.

4. In the sandbox, click the `</>` icon in the lower part of the dark rail. The
   sandbox control panel opens.

5. Paste the JSON into `Descriptor JSON`, or fill in `Code`, `Base URL`,
   `Entrypoint`, and `Stylesheet` separately.

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
separately, and the sandbox receives its runtime descriptor through
`Descriptor JSON`.

## What to Paste into Descriptor JSON

The value is a JSON object with exactly six fields:

```json
{
  "baseUrl": "https://extension.test/assets/",
  "code": "returnsModule",
  "entrypoint": "worker.js",
  "pages": ["returns"],
  "stylesheet": "styles.css",
  "targets": ["order/card:common.after"]
}
```

The sandbox passes `entrypoint` to the worker and connects `stylesheet`
directly, without fetching or analyzing HTML first. Relative resource paths
are resolved against `baseUrl`; absolute HTTP(S) resource URLs are also
accepted. `host.httpCall` uses `baseUrl` as its backend base. `code` and every
array item must be non-empty strings, while `stylesheet` may be `null`. Extra
fields, including `runner` and `uuid`, are rejected.

## Control Panel Fields

- `Descriptor JSON`: the complete runtime descriptor. It is synchronized with
  the individual descriptor fields below it.
- `Code`: stable module code used as the worker and Host API identity.
- `Base URL`: absolute HTTP(S) base address of the extension server.
- `Entrypoint`: worker script URL, relative to `Base URL` or absolute.
- `Stylesheet`: optional stylesheet URL, relative to `Base URL` or absolute.
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

- `Descriptor JSON` is required and validated strictly. `Base URL` must be an
  absolute HTTP(S) URL; `Entrypoint` and non-null `Stylesheet` must resolve to
  HTTP(S) URLs.
- `Mode` must be `Widgets` or `Page`.
- `Selected fixture` must be one of the sandbox fixtures.
- `Page code` is required only in `Page` mode.
- `Widget targets` require at least one valid target only in `Widgets` mode.
- `Current run Context JSON` must be a JSON object. Top-level keys must be
  known context keys, and each context value must be an object.

The `Apply` button is disabled until the required launch fields are filled:
extension descriptor, mode, fixture, at least one widget target in `Widgets` mode, and
page code in `Page` mode.

`Apply context` is available only while an extension is connected, the JSON
differs semantically from the active context, and the launch fields have no
pending changes. Whitespace, formatting, and object key order do not count as
context changes.

## Running a Widget

Use `Widgets` mode when an extension registers `widgets` with `defineRunner`.

Control panel flow:

1. Paste `Descriptor JSON` or fill its individual fields.
2. Select `Mode: Widgets`.
3. Choose the required value in `Selected fixture`.
4. Check the required `Widget targets`.
5. Click `Apply`.

Widget targets are CRM slots. If two targets are selected, the sandbox creates
two widget instances and calls the runner for each selected slot.

Example direct URL:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

## Running a Page

Use `Page` mode when an extension registers `pages` with `defineRunner`.

Control panel flow:

1. Paste `Descriptor JSON` or fill its individual fields.
2. Select `Mode: Page`.
3. Enter the page runner code into `Page code`.
4. Choose the required value in `Selected fixture`.
5. Click `Apply`.

Important: `Page code` is not the extension UUID and not a module code. It is
the value from the extension `pages` registration.

Example runtime descriptor:

```json
{
  "baseUrl": "https://extension.test/build/",
  "code": "returnsModule",
  "entrypoint": "worker.js",
  "pages": ["board", "summary"],
  "stylesheet": null,
  "targets": []
}
```

For this extension:

```text
Descriptor JSON = {runtime descriptor JSON above}
Page code = board
```

or:

```text
Page code = summary
```

Example direct URL:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=page&pageCode=%page-code%&fixture=order-basic
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
Descriptor entrypoint = %extension-url%/build/worker.js
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
2. DevTools Network shows requests to the descriptor's entrypoint and optional
   stylesheet URLs.
3. The console has no runner startup errors.

If the page is blank:

- check that `Descriptor JSON` is not empty;
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

Then open the sandbox with the extension descriptor in the test:

```ts
import { expect, test } from '@playwright/test'

test('mounts widget extension in sandbox', async ({ page }) => {
  const descriptor = {
    baseUrl: '%extension-url%/',
    code: 'returnsModule',
    entrypoint: 'build/worker.js',
    pages: [],
    stylesheet: 'build/extension.css',
    targets: ['order/card:common.after'],
  }

  await page.goto(
    `/?descriptor=${encodeURIComponent(JSON.stringify(descriptor))}`
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
extension code. Browser tests can pass the fixture entrypoint to the worker
runtime directly; full sandbox-app tests use a runtime descriptor.

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

The test also needs fixture metadata that can be converted to the strict
runtime descriptor:

- `fixtureName`: local folder name under `tests/__fixtures__/extensions/`;
- `uuid`: extension id kept in the source fixture metadata when the real module
  has one; it is not copied to the runtime descriptor;
- `targets`: widget mount slots, required for `mode=widget`;
- `pages[].code`: page codes, required for `mode=page`.

There are two supported ways to provide this fixture metadata.

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
const descriptor = createRuntimeExtensionDescriptor(extension)

await page.goto(createSandboxPagePath({
  descriptor,
  pageCode,
}))
```

Raw `extensionrc.json` is not passed to the sandbox. The helper converts page
objects to code strings, creates a runtime `baseUrl` with relative
entrypoint/stylesheet paths, uses the fixture name as `code`, and drops
project-only fields such as `runner` and `uuid`.

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
  descriptor: createRuntimeExtensionDescriptor(extension),
  targets: [target],
}))
```

Both variants produce the same strict runtime descriptor. The difference is
only where the source fixture metadata comes from.

When an extension calls `host.httpCall(action, payload)`, the sandbox uses the
runtime descriptor's `baseUrl` and proxies the call to
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
2. Convert it to a strict runtime descriptor and build a sandbox URL with
   `descriptor`, `mode`, `fixture`, and either `pageCode` or `targets`.
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

The repository examples use fixture extensions that look like real extensions.
They are loaded from their fixture `index.ts` files through runtime descriptors. Backend calls are proxied
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
- `SANDBOX_EXTENSION_DESCRIPTOR`: one-line runtime descriptor JSON. When its
  `code` matches an E2E fixture, Playwright launches that external extension
  instead. Before running browser scenarios, Playwright checks that its
  `entrypoint` and non-null `stylesheet` are available. An empty value keeps
  the repository fixture extension.

Typical local page test values:

```dotenv
SANDBOX_BASE_URL=http://v1.embed-ui-sandbox.local
SANDBOX_EXTENSION_DESCRIPTOR={"code":"promoModule","baseUrl":"http://web-extensions-server.simla.local","entrypoint":"/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/script","stylesheet":"/extension/8ebe1617-d609-43e4-b35a-fbfae011eee3/stylesheet","targets":[],"pages":["settings"]}
```

Playwright covers:

- shell loading;
- control panel opening;
- public URL contract updates from the control panel;
- external extension startup when `SANDBOX_EXTENSION_DESCRIPTOR` is set;
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
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=widget&targets=order/card:common.after&fixture=order-basic
```

Multiple widgets:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

Page:

```text
%sandbox-url%/?descriptor=%url-encoded-descriptor-json%&mode=page&pageCode=%page-code%&fixture=order-basic
```

Placeholders:

- `%sandbox-url%`: sandbox shell URL in the current local container/DNS setup.
  Linux Docker usually uses Traefik and `.test`; OrbStack on macOS uses
  `.local` from its domain namespace.
- `%extension-url%`: external extension server base URL.
- `%url-encoded-descriptor-json%`: the complete runtime descriptor serialized
  as JSON and encoded for a query parameter.
- `%page-code%`: page code from the extension manifest/runner.
