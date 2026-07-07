# v1-sandbox Documentation

`@retailcrm/embed-ui-v1-sandbox` is a local CRM-like environment for Embed UI v1
extensions. It is designed for two workflows:

- manually previewing page and widget extensions without a CRM instance;
- writing automated tests for extensions without a CRM instance.

## Where to Start

- [Usage guide](./usage-guide.md): run the sandbox app, connect an extension,
  use the DevPanel, edit context, and inspect HostAPI calls.
- [Testing strategy](./strategy.md): choose between unit, browser, and e2e tests
  and write tests around visible behavior and accessibility.
- [Examples](./examples.md): copyable examples for manual preview, unit tests,
  browser tests, and e2e tests.
- [API reference](./api.md): package subpaths, public imports, CLI, URL
  contract, and stability boundaries.

## What the Sandbox Provides

- A static browser app served from the installed package.
- Fixture-backed CRM context such as `order/card` and `user/current`.
- HostAPI simulation for `httpCall`, navigation, location, and route guards.
- Page and widget runners for worker-based extensions.
- Browser and Playwright automation helpers for tests.

## Recommended Test Layers

- Use unit tests for pure logic, validation, component rendering, and controller
  behavior.
- Use browser tests for real worker extensions with mocked HostAPI responses.
- Use e2e tests for the full sandbox app, external delivery URL, stylesheet
  loading, and real `host.httpCall` proxy behavior.

See [strategy.md](./strategy.md) for the full testing model.
