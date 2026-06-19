# AGENTS.md

## Purpose
This file defines package-level instructions for `packages/v1-sandbox`.

## Documentation
- Keep sandbox-specific user documentation in `packages/v1-sandbox/docs/`.
- Keep `packages/v1-sandbox/README.md` focused on package overview, public API, URL contract, and quick references.
- Update `packages/v1-sandbox/docs/usage-guide.md` when user-facing sandbox behavior changes.

## Development
- Main local URL depends on the local container/DNS setup. Linux Docker uses Traefik and the `.test` top-level domain; OrbStack on macOS uses `.local` from its domain namespace. Do not hardcode a concrete top-level domain in docs or tests.
- Docker-first dev server:
```bash
docker compose up v1-sandbox
```
- Prefer Docker/Makefile commands for sandbox verification when Rollup or browser dependencies are involved.
- Run Playwright through the workspace Makefile path when possible:
```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

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
