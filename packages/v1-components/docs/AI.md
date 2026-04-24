# AI Context For `@retailcrm/embed-ui-v1-components`

This file is intended for AI assistants and automations that use the installed
`@retailcrm/embed-ui-v1-components` package inside another project.

Only the public package contract is described below, without depending on the repository's internal structure.

## Package Identity

- Package name: `@retailcrm/embed-ui-v1-components`
- Purpose: UI components and UI helpers for RetailCRM JS extensions
- Framework: Vue 3
- Published Storybook: `https://retailcrm.github.io/embed-ui/v1-components/0.9.18/`
- Primary public entrypoints:
  - `@retailcrm/embed-ui-v1-components/remote`
  - `@retailcrm/embed-ui-v1-components/host`
  - `@retailcrm/embed-ui-v1-components/assets/...`

## Safe Usage Rules

- Import only from documented public entrypoints.
- Do not import from package-internal files such as `dist/*` or repository-only paths.
- Treat `remote` as the default public surface for extension authors.
- Treat `host` as a specialized public surface for runtime-side integrations.
- If a requested capability is not present in public exports, say that directly instead of suggesting internal imports.

## Reading Strategy For AI

When generating UI code, use this order:

1. read [`COMPONENTS.md`](./COMPONENTS.md) to identify candidate components;
2. open a detailed profile from [`PROFILES.md`](./PROFILES.md) if one exists;
3. use the profile `usage` link for published Storybook examples and visual behavior;
4. use [`FORMAT.md`](./FORMAT.md) as the schema for what information is considered reliable;
5. read [`STYLING.md`](./STYLING.md) when the task is about classes, variables, typography, or visual zones;
6. if no profile exists yet, fall back to [Storybook](https://retailcrm.github.io/embed-ui/v1-components/0.9.18/) docs and public type declarations, and state any inference explicitly.

## Default Recommendation For Common Forms

When building a basic form or settings screen, start from patterns like:

```ts
import {
  UiButton,
  UiField,
  UiPageHeader,
  UiSelect,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'
```

Typical compositions:

- `UiField` + `UiTextbox`
- `UiField` + `UiSelect`
- `UiPageHeader` + `UiButton`
- `UiSelect` + `UiSelectOption`

## Default Recommendation For Full Screens

When building a complete extension screen, prioritize a working operational interface over a
decorative landing page.

Default screen rules:

- use `UiPageHeader` for page identity and top-level actions;
- keep filters and controls near the content they affect;
- use `UiField` around labeled form controls;
- use `UiTable` for structured result lists;
- use `UiLink` for navigation and inline links, `UiButton` for commands;
- use `UiLoader` with `overlay: true` when loading should dim the covered page or module content;
- keep public imports on `@retailcrm/embed-ui-v1-components/remote`;
- avoid custom markup that recreates textbox, select, button, link, or table chrome.

## Default Recommendation For Table Screens

When building a registry, catalog, journal, search result, order list, customer list, or any
screen where users scan and refine datasets:

- put search and filters directly above `UiTable`;
- use `UiTextbox` for free-text search and `UiSelect` or compact toggle controls for finite filters;
- keep filters, sorting, page, and page size in GET query parameters when the host app has routing;
- hydrate initial filter and pagination state from the current query;
- reset `page` to `1` when filters or sorting change;
- debounce free-text search before writing query or fetching data;
- use `UiTableSorter` for sortable headers;
- use `UiTable` footer slots for summary, page-size controls, export, and pagination;
- set `size="small"` on `UiLink` inside table cells so links match table body typography.

Suggested query names:

- `q` for text search;
- `status`, `managerId`, `dateFrom`, `dateTo` for filters;
- `sort` and `direction` for sorting;
- `page` and `pageSize` for pagination.

## External Documentation Patterns

These references are useful when extending the profiles and examples in this package:

- [shadcn/ui Data Table source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/components/radix/data-table.mdx)
  documents a scenario-first table build: base table, row actions, pagination, sorting,
  filtering, visibility, row selection, and reusable table pieces.
- [shadcn/ui LLMs.txt source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/public/llms.txt)
  is a compact AI entry point with library overview and links to component docs.
- [shadcn/ui Registry MCP source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/registry/mcp.mdx)
  describes how component registries expose descriptions and dependencies to AI tools.
- [Nuxt UI v4 Table source](https://github.com/nuxt/ui/blob/v4/docs/content/docs/2.components/table.md)
  documents table state, sorting, pagination, loading, empty state, slots, and advanced flows.
- [Nuxt UI v4 AI docs](https://github.com/nuxt/ui/tree/v4/docs/content/docs/1.getting-started/7.ai)
  shows MCP, LLMs.txt, and AI skills documentation in a Vue UI library.
- [Nuxt UI v2 Table source](https://github.com/nuxt/ui/blob/v2/docs/content/2.components/table.md)
  is useful for explicit searchable, paginable, manual sorting, and reactive query examples.
- [PrimeVue DataTable docs](https://primevue.org/datatable/)
  are useful for Vue table patterns around filtering, pagination, selection, lazy loading, empty,
  loading, and accessibility.
- [PrimeVue LLMs docs](https://primevue.org/llms)
  show an AI-oriented documentation endpoint for a Vue component library.

## What AI Needs In A Good Component Profile

The most useful format for AI is a component profile that explicitly answers:

- when to use the component and when not to use it;
- which imports are public and safe;
- which props, emits, slots, and `v-model` pairs actually matter in practice;
- what the rendered shape looks like conceptually;
- how the component behaves in disabled, readonly, invalid, empty, opened, and focused states;
- how it composes with neighboring components;
- which assumptions are safe, and which are merely current implementation details.

That schema is documented in [`FORMAT.md`](./FORMAT.md).

## Important Boundary About DOM And CSS

Profiles may describe current host DOM shape and root classes so that AI can reason about geometry,
states, and composition more accurately.

However, extension code should not rely on `.ui-v1-*` classes as a stable public styling contract unless
the package explicitly documents that contract.

The preferred styling signal is:

1. props such as `size`, `appearance`, `outlined`, or `variant`;
2. documented CSS variables from profile `styling.css_variables`;
3. descriptive classes only for debugging or narrow local integrations.

## Current High-Signal Profiles

- [`UiField`](./profiles/UiField.yml)
- [`UiTextbox`](./profiles/UiTextbox.yml)
- [`UiButton`](./profiles/UiButton.yml)
- [`UiPageHeader`](./profiles/UiPageHeader.yml)
- [`UiSelect`](./profiles/UiSelect.yml)
- [`UiRadioSwitch`](./profiles/UiRadioSwitch.yml)
- [`UiTabGroup`](./profiles/UiTabGroup.yml)
- [`UiTab`](./profiles/UiTab.yml)
- [`UiPopper`](./profiles/UiPopper.yml)
- [`UiPopperConnector`](./profiles/UiPopperConnector.yml)
- [`UiPopperTarget`](./profiles/UiPopperTarget.yml)

## Related Public Docs

- [`README.md`](./README.md)
- [`COMPONENTS.md`](./COMPONENTS.md)
- [`FORMAT.md`](./FORMAT.md)
- [`STYLING.md`](./STYLING.md)
- [`../AGENTS.md`](../AGENTS.md)
