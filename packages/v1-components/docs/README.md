# Public API Docs For `@retailcrm/embed-ui-v1-components`

This directory contains consumer-facing and AI-friendly documentation for the public API of
`@retailcrm/embed-ui-v1-components`.

These docs are optimized for two main scenarios:

- a developer or AI assistant is writing extension UI code and wants to use public components safely;
- a library maintainer is extending the docs and wants to know which description format is the most useful for agents.

## Documentation Map

- [`../AGENTS.md`](../AGENTS.md)
  package-level instructions for AI assistants using the installed package.
- [`AI.md`](./AI.md)
  a compact quickstart for AI agents: which entrypoint to prefer, which reading order to use,
  and which boundaries are safe by default.
- [`COMPONENTS.md`](./COMPONENTS.md)
  a catalog of public components and helpers with links to detailed component profiles.
- [`FORMAT.md`](./FORMAT.md)
  the target component profile format for AI assistants.
- [`STYLING.md`](./STYLING.md)
  shared guidance for reading classes, CSS variables, and typography in profiles.
- [`AGENT-DESIGN-GUIDELINES.md`](./AGENT-DESIGN-GUIDELINES.md)
  page composition rules for agents generating full RetailCRM extension screens.
- [`PROFILES.md`](./PROFILES.md)
  the index of YAML component profiles.

## Public Entrypoints

- `@retailcrm/embed-ui-v1-components/remote`
  the primary entrypoint for extension UI code
- `@retailcrm/embed-ui-v1-components/host`
  the entrypoint for runtime-side integrations
- `@retailcrm/embed-ui-v1-components/assets/...`
  icons and other static package assets

If you are writing regular extension code, you almost always want `remote`.

## What These Docs Optimize For

- help choose the right component for a task, not just list exports;
- describe actual behavior, states, and composition patterns;
- separate the public contract from descriptive implementation notes;
- give AI agents enough context to avoid relying on internal package paths.

## Important Boundary

Component profiles may describe the current DOM shape, root classes, and host-side layout,
but that information is meant as a mental model and a debugging aid.

It should not be treated as a public styling API for extension code unless that contract is documented explicitly.

The same rule applies to `.ui-v1-*` selectors in profile `styling` sections.

## Suggested Reading Order

If you need to generate UI quickly:

1. [`../README.md`](../README.md)
2. [`../AGENTS.md`](../AGENTS.md)
3. [`AI.md`](./AI.md)
4. [`COMPONENTS.md`](./COMPONENTS.md)
5. the relevant profile from [`PROFILES.md`](./PROFILES.md)
6. [`AGENT-DESIGN-GUIDELINES.md`](./AGENT-DESIGN-GUIDELINES.md) if the task is about complete pages,
   modals, sidebars, filters, tables, or settings layouts
7. [`STYLING.md`](./STYLING.md) if the task is about classes, variables, typography, or layout tuning

If you are extending the docs:

1. [`FORMAT.md`](./FORMAT.md)
2. [`STYLING.md`](./STYLING.md)
3. [`AGENT-DESIGN-GUIDELINES.md`](./AGENT-DESIGN-GUIDELINES.md)
4. the existing profiles in [`PROFILES.md`](./PROFILES.md)
