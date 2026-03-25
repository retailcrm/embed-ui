# Styling Notes For AI

This document explains how to read styling information in `v1-components` profiles.

It exists to help AI agents reason about geometry, theming, and typography without treating
internal selectors as a guaranteed public styling API.

## Boundary

- `.ui-v1-*` classes in profiles are primarily descriptive.
- Use them for mental modeling, debugging, and understanding layout zones.
- Prefer props and documented CSS custom properties over selector-based overrides.
- If a profile marks a variable as internal, do not treat it as a stable extension theming hook.

## Shared Stylesheet Map

Most host component styles are built from the shared LESS files in
[`assets/stylesheets`](../assets/stylesheets/).

Use this map when a profile references shared tokens or mixins:

- [`typography.less`](../assets/stylesheets/typography.less)
  primary source for font family, type scale, and typography mixins such as `h2-accent`,
  `text-regular`, `text-small-accent`, and `text-tiny`.
- [`palette.less`](../assets/stylesheets/palette.less)
  primary source for semantic color families such as `@blue-500`, `@grey-700`,
  `@red-transparent`, and similar tokens.
- [`geometry.less`](../assets/stylesheets/geometry.less)
  primary source for radius tokens and reusable geometry mixins such as
  `reset-box-sizing`, `square`, `circle`, `border-radius-start`, and `border-radius-end`.
- [`variables.less`](../assets/stylesheets/variables.less)
  primary source for shared spacing, drop shadows, and the common transition token used by
  many components.
- [`motion.less`](../assets/stylesheets/motion.less)
  narrow motion helper that currently repeats the shared transition token shape.
- [`layout.less`](../assets/stylesheets/layout.less)
  legacy or narrow layout spacing aliases. Use with care and prefer `variables.less` when a
  component already imports that file.

## Component-Local Stylesheets

Some components also have local `variables.less` files next to the component styles, for example:

- [`button/variables.less`](../src/host/components/button/variables.less)
- [`link/variables.less`](../src/host/components/link/variables.less)
- [`modal/variables.less`](../src/host/components/modal/variables.less)

These files usually define component-scale dimensions, icon sizes, or z-index-like local tokens.

Guideline:

- treat shared stylesheets as the primary design token layer;
- treat component-local `variables.less` as component-specific implementation tokens;
- mention local variables in a profile when they materially affect layout or generated markup decisions.

## What To Read In A Profile

When a task is about styling or layout, read the `styling` section of the component profile:

- `root_classes`
- `state_classes`
- `zones`
- `css_variables`
- `typography`

This is the fastest path for questions like:

- which element actually owns the underline or border;
- which CSS variable changes popper padding or textbox active color;
- which typography scale is used by a given size variant;
- whether a slot creates a separate visual segment or just inline content.

## Typography Scale

The shared type scale comes from [`../assets/stylesheets/typography.less`](../assets/stylesheets/typography.less).

Base font family:

- `-apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Roboto", sans-serif`

Main sizes:

- `h1`: `40px / 44px`
- `h2`: `24px / 32px`
- `h3`: `20px / 32px`
- `h4`: `18px / 28px`
- `text-regular`: `16px / 24px`
- `text-small`: `14px / 20px`
- `text-tiny`: `12px / 14px`

Common weights:

- normal: `400`
- accent: `500`

Notes:

- some accent heading mixins use stronger weights than the shared `@font-weight-accent` token;
- profiles should prefer recording the actual applied weight when it matters;
- size props often switch both geometry and typography together.

## Spacing, Radius, And Motion Tokens

High-signal shared tokens:

- spacing from [`variables.less`](../assets/stylesheets/variables.less):
  `@spacing-xxs`, `@spacing-xs`, `@spacing-s`, `@spacing-m`, `@spacing-l`, `@spacing-xl`, `@spacing-xxl`
- radius from [`geometry.less`](../assets/stylesheets/geometry.less):
  `@border-radius-sm`, `@border-radius-md`, `@border-radius-lg`
- transition from [`variables.less`](../assets/stylesheets/variables.less) and [`motion.less`](../assets/stylesheets/motion.less):
  `@transition`

When documenting a component profile:

- mention these tokens when they directly shape slot zones, paddings, or component sizes;
- avoid dumping every imported token if it does not affect component choice or layout reasoning.

## CSS Variable Guidance

Profiles split CSS variables into practical groups:

- `public_theme_variables`
  use these first when you need color, spacing, or popper-level theming.
- `inherited_component_variables`
  variables reused from neighboring components, such as `UiSelect` reusing textbox color variables.
- `internal_layout_variables`
  useful for reasoning and debugging, but not recommended as external override points.

## Typical Safe Strategy

For style-sensitive generation:

1. choose the correct component and size prop first;
2. use documented slots to create the right visual zones;
3. use documented CSS variables if a theme override is needed;
4. avoid relying on internal descendant selectors unless the profile says that is safe.

## How To Mention Styles In Profiles

A good `styling` section should answer:

- which shared stylesheet family the component mostly depends on;
- which root and state classes are useful for debugging;
- which CSS variables are realistic override points;
- which typography mixin or resulting type scale is active;
- whether local component variables materially affect size or geometry.

Do not try to mirror every imported token from LESS files. Keep only decision-making signal.

## Provenance

- `assets/stylesheets/typography.less`
- `assets/stylesheets/palette.less`
- `assets/stylesheets/geometry.less`
- `assets/stylesheets/variables.less`
- `assets/stylesheets/layout.less`
- `assets/stylesheets/motion.less`
- host-side component `.less` files referenced from each profile
