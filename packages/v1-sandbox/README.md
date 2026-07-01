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

## Browser Sandbox App

The package includes a browser sandbox app for running widget and page
extensions in a CRM-like shell. The current focus is `order/card` targets,
multiple widget instances from one extension, page runners by `code`, and a
Playwright feedback loop.

Full user guide: [docs/usage-guide.md](./docs/usage-guide.md).

### Running From An Installed Package

Install the package in your extension project:

```bash
npm i --save-dev @retailcrm/embed-ui-v1-sandbox
```

or:

```bash
yarn add -D @retailcrm/embed-ui-v1-sandbox
```

The package build contains both the runtime library artifacts and the browser
sandbox app:

- `dist/*.js`, `dist/*.cjs`, `dist/*.d.ts`: programmatic runtime API;
- `dist/app`: static browser sandbox app.

Serve the built app from the installed package:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

or, after installation, through the package binary:

```bash
yarn embed-ui-v1-sandbox serve
```

If the command runs inside a Docker container and must be reachable from the
host machine, bind it explicitly:

```bash
embed-ui-v1-sandbox serve --host 0.0.0.0 --port 4173
```

The CLI serves `dist/app` and falls back to `index.html` for sandbox routes.

### E2E Environment Template

The package also ships `.env.dist` as a template for extension projects that
want to run Playwright against the sandbox.

After installing the package, create a project-specific env file and adjust
values:

```bash
yarn embed-ui-v1-sandbox init-env
```

or:

```bash
npx @retailcrm/embed-ui-v1-sandbox init-env --output .env.sandbox
```

Important variables:

- `SANDBOX_BASE_URL`: already running sandbox URL. Leave it empty when your
  Playwright config starts the sandbox through its own `webServer`.
- `SANDBOX_EXTENSION_URL`: common extension URL used by page and widget tests,
  expected as `%extension-url%/extension/%extension-id%`.
- `SANDBOX_EXTENSION_PAGE_CODE`: page runner code, for example `returns`.
- `SANDBOX_EXTENSION_TARGET`: widget target, for example
  `order/card:common.after`.
- `SANDBOX_EXTENSION_FIXTURE`: fixture code, for example `order-basic`.
- `SANDBOX_PAGE_EXTENSION_URL` / `SANDBOX_WIDGET_EXTENSION_URL`: optional split
  URLs when page and widget scenarios use different extensions.

If `SANDBOX_BASE_URL` is set, Playwright should use that running sandbox and
must not start another one. If it is empty, the test config can start the
sandbox through its own `webServer`.

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

## Browser Automation API

The sandbox exposes a browser-side launch bridge for e2e and browser-mode tests:

```ts
import { requireSandboxAppBridge } from '@retailcrm/embed-ui-v1-sandbox'

requireSandboxAppBridge().launch({
  manifestUrl: '%extension-url%/extension/%extension-id%',
  mode: 'widget',
  targets: ['order/card:common.after'],
  fixture: 'order-basic',
})
```

`launch(...)` uses the same public URL contract as the dev panel: it writes the
launch config into the query string and reloads the sandbox. Tests can also call
`createLaunchUrl(...)` to build the URL without navigating, and
`getLaunchConfig()` to inspect the current launch config. The bridge is installed
on `window.__CRM_EMBED_SANDBOX_APP__`; use `getSandboxAppBridge()` or
`requireSandboxAppBridge()` instead of reaching into `window` directly when your
test runner can import package helpers.

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

In an extension project, run the sandbox as a Playwright `webServer`:

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

Then pass the extension URL through the sandbox query contract:

```ts
await page.goto(
  `/?manifestUrl=${encodeURIComponent('%extension-url%/extension/%extension-id%')}`
  + '&mode=widget'
  + '&fixture=order-basic'
  + '&targets=order/card:common.after'
)
```
