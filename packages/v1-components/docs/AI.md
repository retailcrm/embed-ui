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
- Do not import from `src/*`, `dist/*`, or repository-internal files.
- Treat `remote` as the default public surface for extension authors.
- Treat `host` as a specialized public surface for runtime-side integrations.
- If a requested capability is not present in public exports, say that directly instead of suggesting internal imports.

## Reading Strategy For AI

When generating UI code, use this order:

1. read [`COMPONENTS.md`](./COMPONENTS.md) to identify candidate components;
2. open a detailed profile from [`PROFILES.md`](./PROFILES.md) if one exists;
3. use [`FORMAT.md`](./FORMAT.md) as the schema for what information is considered reliable;
4. read [`STYLING.md`](./STYLING.md) when the task is about classes, variables, typography, or visual zones;
5. if no profile exists yet, fall back to Storybook docs and public type declarations, and state any inference explicitly.

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

## What Codex Needs In A Good Component Profile

The most useful format for Codex is a component profile that explicitly answers:

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
- [`UiPopper`](./profiles/UiPopper.yml)
- [`UiPopperConnector`](./profiles/UiPopperConnector.yml)
- [`UiPopperTarget`](./profiles/UiPopperTarget.yml)

## Related Public Docs

- [`README.md`](./README.md)
- [`COMPONENTS.md`](./COMPONENTS.md)
- [`FORMAT.md`](./FORMAT.md)
- [`STYLING.md`](./STYLING.md)
- [`AUTOMATION.md`](./AUTOMATION.md)
- [`../AGENTS.md`](../AGENTS.md)
