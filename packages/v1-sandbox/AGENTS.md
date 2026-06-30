# AGENTS.md

## Purpose
This file defines package-level instructions for `packages/v1-sandbox`.

## Documentation
- Keep sandbox-specific user documentation in `packages/v1-sandbox/docs/`.
- Keep `packages/v1-sandbox/README.md` focused on package overview, public API, URL contract, and quick references.
- Update `packages/v1-sandbox/docs/usage-guide.md` when user-facing sandbox behavior changes.

## Development
- Main local URL depends on the local container/DNS setup. Linux Docker usually uses Traefik and the `.test` top-level domain; OrbStack on macOS uses `.local` from its domain namespace. Do not hardcode a concrete top-level domain in package docs or tests.
- The package-level CLI serves the built sandbox app from `dist/app`:
```bash
embed-ui-v1-sandbox serve
```
- If the CLI runs inside a container and must be reachable from the host machine, bind it explicitly:
```bash
embed-ui-v1-sandbox serve --host 0.0.0.0 --port 4173
```
- Repository-only Docker and Makefile commands live in the root `README.md`; do not document them as package usage.

## UI
- Use Vue SFCs for sandbox shell UI.
- Use BEM-style CSS module classes.
- Use semantic HTML for layout containers such as `main`, `aside`, `section`, `nav`, `ul`, and `li`.
- Use host components from `@retailcrm/embed-ui-v1-components/host` for real controls when practical.
- Do not add `data-testid` attributes; prefer stable roles, labels, and ARIA relationships.

## Runtime
- Treat `manifestUrl`, `mode`, `pageCode`, `targets`, `fixture`, and `widgetId` as the public dev URL contract.
- Do not change that contract without updating docs and e2e coverage.
- Keep context and HostAPI simulation fixture-backed and covered by tests.

## If you need more context

- Docs README:
  [`./docs/usage-guide.md`](./docs/usage-guide.md)
