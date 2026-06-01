# AI Context For `@retailcrm/embed-ui-v1-components`

This file is intended for AI assistants and automations that use the installed
`@retailcrm/embed-ui-v1-components` package inside another project.

Only the public package contract is described below, without depending on the repository's internal structure.

## Package Identity

- Package name: `@retailcrm/embed-ui-v1-components`
- Purpose: UI components and UI helpers for RetailCRM JS extensions
- Framework: Vue 3
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

1. read [`../README.md`](../README.md) and [`../AGENTS.md`](../AGENTS.md) for package-level usage rules;
2. read [`COMPONENTS.md`](./COMPONENTS.md) to identify candidate components;
3. open a detailed profile from [`PROFILES.md`](./PROFILES.md) if one exists;
4. read the relevant page profile from [`PROFILES.md`](./PROFILES.md) when the task is about complete
   pages, modals, sidebars, filters, tables, or settings layouts;
5. read [`WidgetComposition.yml`](./profiles/widgets/WidgetComposition.yml) when the task is about UI
   mounted through `defineWidgetRunner`;
6. use [`FORMAT.md`](./FORMAT.md) as the schema for what information is considered reliable;
7. read [`STYLING.md`](./STYLING.md) when the task is about classes, variables, typography, or visual zones;
8. if no profile exists yet, fall back to public type declarations and state any inference explicitly.

## Runtime Embedding References

When generating code for a CRM extension, separate UI component choice from runtime placement:

- In `@retailcrm/embed-ui-v1-endpoint`, `docs/targets.md` explains that `target` is the CRM
  embedding point, while `context` is the reactive CRM data available at that point.
- In `@retailcrm/embed-ui-v1-endpoint`, `docs/menu-placements.md` explains how host/manifest menu
  items map to remote page codes.
- In `@retailcrm/embed-ui-v1-endpoint`, `docs/page-routes.md` explains how page `code`, CRM route
  names, and `definePageRunner` are connected.
- In `@retailcrm/embed-ui-v1-endpoint`, `docs/define-widget-runner.md` shows how a widget receives
  the current `target` prop.
- In `@retailcrm/embed-ui-v1-endpoint`, `docs/define-page-runner.md` shows how a page receives the
  current `code` prop.
- In `@retailcrm/embed-ui-v1-contexts`, `docs/ru/CONCEPT.md` explains predefined CRM contexts such
  as `order/card`, `customer/card`, `user/current`, and `settings`.
- In `@retailcrm/embed-ui-v1-contexts`, `docs/ru/CUSTOM.md` explains custom-field contexts.

## Default Recommendation For Common Forms

When building a basic form or settings screen, start from patterns like:

```ts
import {
  UiButton,
  UiCheckbox,
  UiField,
  UiNumberStepper,
  UiPageFooter,
  UiPageHeader,
  UiSelect,
  UiSwitch,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'
```

Typical compositions:

- `UiField` + `UiTextbox`
- `UiField` + `UiSelect`
- `UiField` + `UiNumberStepper`
- `UiSwitch` + visible label + hint row
- `UiCheckbox` + visible label row or checkbox group
- `UiPageHeader` + `UiButton`
- `UiSelect` + `UiSelectOption`

## Default Recommendation For Full Screens

When building a complete extension screen, prioritize a working operational interface over a
decorative landing page.

Default screen rules:

- use [`PageComposition.yml`](./profiles/pages/PageComposition.yml) to choose between an entity list,
  card/settings page, multi-column page, collapse-block page, modal sidebar, or modal window;
- use `UiPageHeader` for page identity and top-level actions;
- use `UiPageFooter` for page-level save/cancel/delete actions instead of recreating a local footer;
- use one `Success Primary` button for the strongest save/apply/create action that commits a result; use `Default Primary`
  only for another important action with a different meaning;
- use `Secondary` buttons for real neighboring commands that should still look like buttons;
- use `Tertiary` buttons for lower-emphasis edit, open, configure, cancel, close, and optional commands near headers,
  cards, tables, and inline content;
- apply the 24px top and 32px side/bottom padding rule to white content surfaces, not to the page root wrapper;
- keep filters and controls near the content they affect;
- use `UiField` around labeled textbox, select, number, date, and time controls;
- use `UiTable` for structured result lists;
- use `UiLink` for navigation and inline links, `UiButton` for commands;
- use `UiLoader` with `overlay: true` when loading should dim the covered page or module content;
- keep public imports on `@retailcrm/embed-ui-v1-components/remote`;
- when a component uses only the default slot, prefer `v-slot` on the component instead of `<template #default>`;
- avoid custom markup that recreates textbox, select, button, link, or table chrome.
- before passing enum-like prop values, check the component profile or public type; omit optional props instead of
  inventing neutral values such as `"none"` when they are not listed.

## Default Recommendation For Table Screens

When building a registry, catalog, journal, search result, order list, customer list, or any
screen where users scan and refine datasets:

- put search and filters directly above `UiTable`;
- do not wrap `UiTable` in an extra white card or padded content surface;
- use a plain layout or scroll wrapper around `UiTable` only when width or overflow control is needed;
- use `UiTextbox` for free-text search and `UiSelect` or compact toggle controls for finite filters;
- keep filters, sorting, page, and page size in GET query parameters when the host app has routing;
- hydrate initial filter and pagination state from the current query;
- reset `page` to `1` when filters or sorting change;
- debounce free-text search before writing query or fetching data;
- use `UiTableSorter` for sortable headers;
- for ordinary `UiTableColumn` cell customization, set header metadata through props such as `label`, `width`,
  and `trim`, then use `v-slot` on `UiTableColumn` instead of `<template #cell>`;
- use the `#cell` slot only when the column also needs another named slot such as `#label`, or when explicit
  slot naming makes a complex column easier to read;
- use `UiTable` footer slots for summary, page-size controls, export, and pagination;
- compose table footer controls with `UiTableFooterSection` and `UiTableFooterButton`, not regular `UiButton`;
- use chevron icon assets for table footer previous/next controls instead of text glyphs;
- add local CSS for table footer layout and states; use [`UiTable.yml`](./profiles/components/UiTable.yml)
  for the reference table footer example;
- set `size="small"` on `UiLink` inside table cells so links match table body typography;
- prefer icon-only row action buttons inside dense table rows; keep the same action text in
  `aria-label` and `UiTooltip`.

Suggested query names:

- `q` for text search;
- `status`, `managerId`, `dateFrom`, `dateTo` for filters;
- `sort` and `direction` for sorting;
- `page` and `pageSize` for pagination.

## Default Recommendation For Forms

When building forms with remote controls:

- use `v-model:value` for value-bearing controls such as `UiTextbox`, `UiSelect`, `UiNumberStepper`,
  and `UiSwitch`;
- if a field looks filled but backend validation receives an empty value, check the Network payload
  before changing the component binding;
- use `UiField` for labeled text, select, date, and number controls;
- forward `UiField` slot props into the actual child control when it accepts `id`, especially
  `UiTextbox`, `UiSelect`, and `UiNumberStepper`;
- put validation errors inside the relevant field composition, not as unrelated sibling blocks;
- when a component uses only the default slot, prefer `v-slot` on the component instead of
  `<template #default>`;
- do not wrap `UiSwitch` in `UiField`; place the switch next to a visible label and optional hint,
  and connect `UiSwitch :id` with `label :for`.
- do not wrap simple `UiCheckbox` rows in `UiField`; place the checkbox next to a visible label and optional hint.
- use `UiSwitch` for compact immediate boolean settings, feature toggles, and enable/disable flags.
- use `UiCheckbox` for checkbox groups, table row selection, "select all", acknowledgements, and checkbox-shaped choices.
- use `UiNumberStepper` for bounded numeric settings, quantities, durations, limits, and values with meaningful increments.
- use `UiTextbox` for numeric-looking text such as phone numbers, codes, identifiers, and free-form numeric strings.

## Default Recommendation For Widgets

When building a widget mounted into a CRM target, keep the inline target UI compact and predictable:

- read [`WidgetComposition.yml`](./profiles/widgets/WidgetComposition.yml) before composing widget UI;
- render only simple inline UI in the target: `UiToolbarButton`, `UiToolbarLink`, short text, and icons;
- move forms, tables, maps, filters, summaries, and multi-step flows into `UiModalSidebar` or `UiModalWindow`;
- avoid custom panels, page headers, page footers, wide fixed layouts, or standalone screens inside the target slot;
- read the endpoint target profile before choosing labels, modal type, or data access.

## External Documentation Patterns

These references are useful when extending the profiles and examples in this package:

- [shadcn/ui Data Table source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/components/radix/data-table.mdx)
  documents a scenario-first table build: base table, row actions, pagination, sorting,
  filtering, visibility, row selection, and reusable table pieces.
- [Nuxt UI v4 Table source](https://github.com/nuxt/ui/blob/v4/docs/content/docs/2.components/table.md)
  documents table state, sorting, pagination, loading, empty state, slots, and advanced flows.
- [Nuxt UI v2 Table source](https://github.com/nuxt/ui/blob/v2/docs/content/2.components/table.md)
  is useful for explicit searchable, paginable, manual sorting, and reactive query examples.
- [PrimeVue DataTable docs](https://primevue.org/datatable/)
  are useful for Vue table patterns around filtering, pagination, selection, lazy loading, empty,
  loading, and accessibility.

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

- [`UiField`](./profiles/components/UiField.yml)
- [`UiTextbox`](./profiles/components/UiTextbox.yml)
- [`UiButton`](./profiles/components/UiButton.yml)
- [`UiPageHeader`](./profiles/components/UiPageHeader.yml)
- [`UiPageFooter`](./profiles/components/UiPageFooter.yml)
- [`UiSelect`](./profiles/components/UiSelect.yml)
- [`UiRadioSwitch`](./profiles/components/UiRadioSwitch.yml)
- [`UiTabGroup`](./profiles/components/UiTabGroup.yml)
- [`UiTab`](./profiles/components/UiTab.yml)
- [`UiPopper`](./profiles/components/UiPopper.yml)
- [`UiPopperConnector`](./profiles/components/UiPopperConnector.yml)
- [`UiPopperTarget`](./profiles/components/UiPopperTarget.yml)

## Related Public Docs

- [`README.md`](./README.md)
- [`../README.md`](../README.md)
- [`../AGENTS.md`](../AGENTS.md)
- [`COMPONENTS.md`](./COMPONENTS.md)
- [`FORMAT.md`](./FORMAT.md)
- [`STYLING.md`](./STYLING.md)
- [`PROFILES.md`](./PROFILES.md)
- [`../AGENTS.md`](../AGENTS.md)
