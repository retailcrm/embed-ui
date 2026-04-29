# Component Profiles

`PROFILES.md` is the entry point for machine-readable AI-friendly component profiles.

The current profile layer is structured like this:

- the index stays in markdown so both humans and agents can navigate it easily;
- the actual profiles live in `docs/profiles/*.yml`;
- YAML is the source of truth for structure, props, slots, emits, composition, and AI rules.

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
- `docs/profiles/*.yml` for per-component machine-readable profiles
- each profile `usage` field for published Storybook 0.9.18 examples and visual behavior

Current high-signal core profiles:

- [`UiField`](./profiles/UiField.yml)
- [`UiTextbox`](./profiles/UiTextbox.yml)
- [`UiButton`](./profiles/UiButton.yml)
- [`UiToggleButton`](./profiles/UiToggleButton.yml)
- [`UiToggleGroup`](./profiles/UiToggleGroup.yml)
- [`UiPageHeader`](./profiles/UiPageHeader.yml)
- [`UiSelect`](./profiles/UiSelect.yml)
- [`UiRadioSwitch`](./profiles/UiRadioSwitch.yml)
- [`UiTabGroup`](./profiles/UiTabGroup.yml)
- [`UiTab`](./profiles/UiTab.yml)
- [`UiPopper`](./profiles/UiPopper.yml)
- [`UiPopperConnector`](./profiles/UiPopperConnector.yml)
- [`UiPopperTarget`](./profiles/UiPopperTarget.yml)

## What To Read First

- `key_props` if you need to choose a component quickly.
- `props` if you need a broader practical API view.
- `slots` if the task is about markup, zones, and allowed content.
- `emits` if the component must be wired into screen logic.
- `usage` if you need Storybook examples or visual behavior.
- `ai_notes` if the agent needs safe defaults and anti-patterns.

## Styling Reads

- Read `styling` for root classes, state classes, CSS variables, and typography.
- Read [`STYLING.md`](./STYLING.md) when the task is specifically about classes, visual zones, theming, or type scale.

## Notes

- All new updates should be made in YAML profiles.
- Keep profile `usage` links on the Storybook 0.9.18 URL unless another version is required explicitly.
