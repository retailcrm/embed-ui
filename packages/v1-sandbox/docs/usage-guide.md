# v1-sandbox Usage Guide

`v1-sandbox` is a local CRM-like environment for running JS extensions before
installing them into a real CRM. The sandbox loads an external extension by URL,
mounts it into a selected widget target or page area, provides fixture-backed
context, and simulates HostAPI.

## Quick Start

1. Start the sandbox:

```bash
docker compose up v1-sandbox
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
- `Fixture`: CRM mock state: order context, custom fields, dictionaries,
  location, and initial HostAPI state.
- `Page code`: `code` from the extension `pages` registration. For example,
  `board`, `summary`, or `returns`. It is not the extension UUID.
- `Widget targets`: targets/CRM slots for widget runners, for example
  `order/card:common.after`. They are used only in `Widgets` mode.
- `Context JSON`: the current fixture-backed context. You can temporarily edit
  it without changing extension code.

## Control Panel Validation

The control panel validates values only when you click `Apply` or
`Apply context`. It does not check network availability.

- `Manifest / extension URL` may be empty. If it is filled, it must be an
  absolute `http` or `https` URL and, for the standard extension server, include
  `/extension/%extension-id%`.
- `Mode` must be `Widgets` or `Page`.
- `Fixture` must be one of the sandbox fixtures.
- `Page code` is required only in `Page` mode.
- `Widget targets` require at least one valid target only in `Widgets` mode.
- `Context JSON` must be a JSON object. Top-level keys must be known context
  keys, and each context value must be an object.

## Running a Widget

Use `Widgets` mode when an extension registers `widgets` with `defineRunner`.

Control panel flow:

1. Paste `Manifest / extension URL`.
2. Select `Mode: Widgets`.
3. Select a `Fixture`.
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
4. Select a `Fixture`.
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

`Context JSON` lets you temporarily override context for the current run.

Example override:

```json
{
  "order/card": {
    "number": "999C"
  }
}
```

Usually it is easier to edit the already displayed JSON and change only the
needed field.

After editing, click `Apply context`. The sandbox patches the current context
and restarts the extension so it reads the updated data.

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
- if the extension is a legacy iframe extension, run it only in `Widgets` mode;
- if Network shows a CORS error, the extension server must allow the
  `%sandbox-url%` origin.

## Playwright

Run e2e through Docker:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

Run one file:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox cli='e2e/sandbox-extension.e2e.ts'
```

`sandbox-extension.e2e.ts` checks a real extension only when an external URL is
provided:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox cli='e2e/sandbox-extension.e2e.ts'
```

Local workspace script:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Example for OrbStack/macOS:

```bash
SANDBOX_EXTENSION_URL="http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7" \
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Example for Linux/Traefik:

```bash
SANDBOX_EXTENSION_URL="http://web-extensions-server.simla.test/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7" \
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Additional environment variables:

- `SANDBOX_EXTENSION_PAGE_CODE`: extension page code, default is `returns`;
- `SANDBOX_EXTENSION_TARGET`: widget target, default is
  `order/card:common.after`.

If `SANDBOX_EXTENSION_URL` is not set, the real-extension scenario is skipped.
Seeing `1 skipped` is expected in that case. With the variable set and the
extension server available, the full e2e set should pass.

Open the HTML report:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox
```

Playwright covers:

- shell loading;
- control panel opening;
- public URL contract updates from the control panel;
- external extension startup when `SANDBOX_EXTENSION_URL` is set;
- user interaction inside the extension;
- `host.httpCall` through sandbox proxy middleware;
- context changes through the JSON editor.

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
