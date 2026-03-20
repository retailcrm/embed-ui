# AGENTS.md

## Purpose

This file adds package-level guidance for work inside `packages/v1-components`.
Use it together with the repository root `AGENTS.md`.

## Package Role

- Workspace folder: `v1-components`
- Package name: `@retailcrm/embed-ui-v1-components`
- Mission: provide UI components and UI helpers for RetailCRM JS extensions
- Primary split:
  - `remote` for extension authors
  - `host` for CRM-side rendering and behavior

## Source Of Truth

- Public remote entrypoint:
  `src/remote.ts`
- Public host entrypoint:
  `src/host.ts`
- Host component registry:
  `src/host/components/index.ts`
- Standard remote endpoint registry:
  `src/remote/endpoint.ts`
- Storybook docs and examples:
  `storybook/`
- Package overview docs:
  `docs/`

## Mandatory Rules

- Never suggest importing `@retailcrm/embed-ui-v1-components/host` in extension code unless the task is explicitly about host internals.
- When a new public component is added, keep host and remote layers synchronized.
- If a component must work in the standard endpoint runtime, add its schema name to `src/remote/endpoint.ts`.
- Follow the existing public naming convention with `Ui` prefix.
- Keep documentation close to the public API: update `docs/` and `README.md` when discoverability changes.

## Change Checklist For Public Components

When adding or materially changing a user-facing component, check all applicable points:

1. Host implementation exists in `src/host/components/<name>/`.
2. Host export is added to `src/host/components/index.ts`.
3. Public host surface is updated in `src/host.ts` if needed.
4. Remote wrapper or declaration exists in `src/remote/components/`.
5. Public remote surface is updated in `src/remote.ts`.
6. Standard endpoint registry is updated in `src/remote/endpoint.ts` if needed.
7. Storybook examples or docs are present for discoverability.
8. Package docs mention the new API if it changes how users navigate the library.

## Verification

Prefer targeted checks first:

```bash
yarn workspace @retailcrm/embed-ui-v1-components run build
yarn workspace @retailcrm/embed-ui-v1-components run storybook:build
```

If the change affects the whole monorepo, use the root commands from
[`/AGENTS.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/AGENTS.md).

## Documentation Files

- `docs/README.md`: human-readable overview
- `docs/COMPONENTS.md`: component map by responsibility
- `docs/AI.md`: machine-oriented context for assistants and automation
