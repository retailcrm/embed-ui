# AI Profiles

`PROFILES.md` is the entry point for machine-readable AI-friendly profiles.

The current profile layer is structured like this:

- the index stays in markdown so both humans and agents can navigate it easily;
- component profiles live in `docs/profiles/components/*.yml`;
- page-composition profiles live in `docs/profiles/pages/*.yml`;
- YAML is the source of truth for structure, props, slots, emits, composition, page patterns, and AI rules.

## Table Of Contents

- [Reading Order](#reading-order)
- [Current Coverage](#current-coverage)
- [What To Read First](#what-to-read-first)
- [Styling Reads](#styling-reads)
- [Notes](#notes)

## Reading Order

1. [`../README.md`](../README.md)
2. [`../AGENTS.md`](../AGENTS.md)
3. [`AI.md`](./AI.md)
4. this index
5. the relevant `.yml` profile

## Current Coverage

Coverage is now expanding across the public component catalog.

Use these entrypoints:

- [`COMPONENTS.md`](./COMPONENTS.md) for the full linked component index
- `docs/profiles/components/*.yml` for per-component machine-readable profiles
- `docs/profiles/pages/*.yml` for page, modal, sidebar, filter, table, and settings-layout profiles

Current high-signal core profiles:

- [`UiField`](./profiles/components/UiField.yml)
- [`UiTextbox`](./profiles/components/UiTextbox.yml)
- [`UiButton`](./profiles/components/UiButton.yml)
- [`UiToggleButton`](./profiles/components/UiToggleButton.yml)
- [`UiToggleGroup`](./profiles/components/UiToggleGroup.yml)
- [`UiPageHeader`](./profiles/components/UiPageHeader.yml)
- [`UiSelect`](./profiles/components/UiSelect.yml)
- [`UiRadioSwitch`](./profiles/components/UiRadioSwitch.yml)
- [`UiTabGroup`](./profiles/components/UiTabGroup.yml)
- [`UiTab`](./profiles/components/UiTab.yml)
- [`UiPopper`](./profiles/components/UiPopper.yml)
- [`UiPopperConnector`](./profiles/components/UiPopperConnector.yml)
- [`UiPopperTarget`](./profiles/components/UiPopperTarget.yml)

Current page profiles:

- [`PageComposition`](./profiles/pages/PageComposition.yml)
- [`EntityListPage`](./profiles/pages/EntityListPage.yml)
- [`CardSettingsPage`](./profiles/pages/CardSettingsPage.yml)
- [`MultiColumnPage`](./profiles/pages/MultiColumnPage.yml)
- [`CollapseBlockPage`](./profiles/pages/CollapseBlockPage.yml)
- [`ModalSidebar`](./profiles/pages/ModalSidebar.yml)
- [`ModalWindow`](./profiles/pages/ModalWindow.yml)

## What To Read First

- `key_props` if you need to choose a component quickly.
- `props` if you need a broader practical API view.
- `slots` if the task is about markup, zones, and allowed content.
- `emits` if the component must be wired into screen logic.
- `examples` if you need copyable usage snippets.
- `ai_notes` if the agent needs safe defaults and anti-patterns.
- `profiles/pages/*.yml` if the task is about a full page, modal, sidebar, filter, table, or settings layout.

## Styling Reads

- Read `styling` for root classes, state classes, CSS variables, and typography.
- Read [`STYLING.md`](./STYLING.md) when the task is specifically about classes, visual zones, theming, or type scale.

## Notes

- All new updates should be made in YAML profiles.
- Keep component-level details in `profiles/components`.
- Keep page-composition details in `profiles/pages`.
