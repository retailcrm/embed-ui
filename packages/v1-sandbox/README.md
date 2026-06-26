# `@retailcrm/embed-ui-v1-sandbox`

`@retailcrm/embed-ui-v1-sandbox` provides an in-memory sandbox for previewing,
standalone testing, and automating JS extensions without a live CRM instance.

The package contains the runtime foundation for:

- reactive sandbox state;
- a HostAPI emulator (`goTo`, `httpCall`, `replaceQuery`, `pushQuery`);
- typed context and custom-field accessors based on `v1-types` and
  `v1-contexts`;
- a global bridge for automation through `globalThis`;
- an RPC helper for connecting remote runtimes in tests and previews.

## Programmatic API

```ts
import { createSandboxController, createSandboxRpc } from '@retailcrm/embed-ui-v1-sandbox'

const sandbox = createSandboxController({
  mode: 'preview',
  schemas: {
    article: {
      title: {
        accepts: (value: unknown): value is string => typeof value === 'string',
        defaults: () => 'Draft',
        readonly: false,
      },
    },
  },
})

const { remote } = createSandboxRpc(sandbox)

await remote.call.set('article', 'title', 'Preview title')
```

### Controller Modes

- `preview`: manual preview and local debugging;
- `automation`: sandbox control through the bridge/API;
- `standalone-test`: unit, integration, and e2e scenarios without CRM.

## Dev Sandbox

The workspace includes a dev sandbox for running widget and page extensions in a
CRM-like shell. The current focus is `order/card` targets, multiple widget
instances from one extension, page runners by `code`, and a Playwright feedback
loop.

Full user guide: [docs/usage-guide.md](./docs/usage-guide.md).

### URL Contract

- `manifestUrl`: URL of an external extension. It may point to an HTML
  entrypoint (`/extension/%extension-id%`) or a direct JS script;
- `extensionUrl`: low-level fallback URL for a module worker entrypoint when
  `manifestUrl` is empty. The dev panel uses `manifestUrl` as the primary path;
- `mode`: `widget` or `page`, default is `widget`;
- `target`: one supported `order/card:*` target for a single widget run;
- `targets`: comma-separated list of `order/card:*` targets for multiple widget
  instances;
- `widgetId`: base widget instance id, default is `sandbox-widget`;
- `pageCode`: page code for `mode=page`, default is `orders-dashboard`;
- `fixture`: fixture code, default is `order-basic`.

Placeholders used in examples:

- `%sandbox-url%`: URL of the sandbox shell in the current local
  container/DNS environment. Linux Docker usually uses Traefik and the `.test`
  top-level domain; OrbStack on macOS uses `.local` from its domain namespace.
- `%extension-url%`: origin of an external extension server without
  `/extension/%extension-id%`. It can be `http://web-extensions-server.simla.local`,
  `http://web-extensions-server.simla.test`, `https://test-retail.ru`, or any
  other delivery server.
- `%extension-id%`: id/UUID of the JS module or extension record on the
  extension server. It is not a `pageCode` and not a target; one extension can
  provide both pages and widgets.
- `%page-code%`: page code registered by the extension runner.

Widget example:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.after&fixture=order-basic
```

Page runner example:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%
```

Multiple widget targets:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

`manifestUrl` is the primary dev contract. The sandbox fetches the external URL:
if it is an HTML entrypoint, the first `<script src>` from `<head>` is used; if
it is JS, the script is bootstrapped directly. If you need to debug a direct
worker entrypoint without an extension endpoint, pass an empty `manifestUrl` and
an external `extensionUrl`:

```text
%sandbox-url%/?manifestUrl=&extensionUrl=%extension-url%/entrypoint.js
```

The external extension server must be reachable from the browser. Core-style
delivery usually exposes the script at:

```text
%extension-url%/extension/%extension-id%/script
```

The extension entrypoint must be worker-compatible and call
`runEndpoint(defineRunner(...))`:

```ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

runEndpoint(defineRunner({
  pages: [{
    'orders-dashboard': ordersDashboardPageRunner,
  }],
  widgets: [{
    'order/card:common.before': commonBeforeWidgetRunner,
    'order/card:common.after': commonAfterWidgetRunner,
  }],
}))
```

The dev panel is opened from the `</>` icon in the lower part of the left rail.
It lets you:

- change `manifestUrl`, `mode`, `fixture`, `pageCode`, and widget `targets`;
- apply selected values through the public URL contract;
- edit fixture-backed Context JSON for the current run;
- apply context overrides and reload the extension.

The panel validates values on `Apply` / `Apply context`. A filled
`manifestUrl` must be an absolute `http` or `https` URL and, for the standard
extension server, use `%extension-url%/extension/%extension-id%`. `Page code` is
required only in page mode, at least one target is required in widget mode, and
`Context JSON` accepts only known context keys with object values.

## HostAPI Simulation

The sandbox provides HostAPI to the extension. Calls to `host.httpCall(action,
payload)` are intercepted by the sandbox host.

For an external extension URL like:

```text
%extension-url%/extension/%extension-id%
```

an extension call such as:

```ts
await host.httpCall('/returns', payload)
```

is proxied to the extension backend:

```text
POST %extension-url%/returns
```

The payload is sent as the request body, and the sandbox returns the backend
response to the extension as `{ status, body }`. Navigation methods
`goTo`, `pushQuery`, and `replaceQuery` update in-memory
`host.location/navigation`. Tests can inspect the current state through:

```ts
window.__CRM_EMBED_SANDBOX__.snapshot()
```

If the sandbox cannot infer an extension backend URL, `httpCall` returns a
controlled fallback response instead of crashing the page.

## Playwright

Start the dev sandbox:

```bash
docker compose up v1-sandbox
```

Makefile shortcut:

```bash
make sandbox.serve
```

Run Playwright:

```bash
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Makefile path:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

Real-extension e2e scenarios run only when an external extension URL is provided:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

Local workspace script:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Without `SANDBOX_EXTENSION_URL`, real-extension scenarios are skipped so local
and CI runs do not depend on a specific external server. A normal run may show
`1 skipped`; with `SANDBOX_EXTENSION_URL` set and the extension server
available, the full e2e set should run.

Useful parameters:

- `workspace=...`: select the workspace that contains
  `vitest.config.playwright.ts`;
- `cli='--project chromium'`: pass flags directly to `playwright test`;
- `cli='e2e/sandbox-extension.e2e.ts'`: run one e2e file.

Open the Playwright report:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox cli='--port 9324'
```
