# AI-Friendly Component Profile Format

This document defines the YAML component profile format that AI assistants can use
to work with `v1-components` confidently.

The format is optimized for code generation, code review, and safe API selection rather than for marketing copy.

## Design Goals

A good profile should let an agent answer these questions without opening the source code:

- which component to choose for a task;
- how to import it and which neighbors it works with;
- which props, emits, slots, and `v-model` pairs actually affect behavior;
- how the component behaves in important states;
- where the public contract ends and implementation details begin.

## YAML Shape

Recommended filename: `<ComponentName>.yml`

Top-level `usage` should point to the published Storybook docs page for version `0.9.18`.
If the component is a subcomponent without its own Storybook page, point `usage` to the nearest
parent or composition page that demonstrates it, for example table parts point to `UiTable`.

Minimal shape:

```yml
component: UiComponent
summary: >
  A short description of the component.
usage: https://retailcrm.github.io/embed-ui/v1-components/0.9.18/?path=/docs/intro--docs

public_import:
  from: '@retailcrm/embed-ui-v1-components/remote'
  named:
    - UiComponent

use_when:
  - scenario

avoid_when:
  - scenario

api:
  key_props:
    - name: value
      notes: high-signal behavior
  props:
    - name: value
      notes: practical usage note
  slots:
    - name: default
      zone: content
      notes: role of the slot
  emits:
    - name: update:value
      payload: unknown

rendered_structure:
  descriptive_only: true
  root:
    shape: div.ui-v1-component
    tag: div

geometry:
  layout: block-like root
  root_display: block
  width_behavior: stretches to container width by default

styling:
  root_classes:
    - .ui-v1-component
  css_variables:
    public_theme_variables:
      - name: --ui-v1-component-color
        effect: theme or state color
  typography:
    default:
      mixin: text-regular
      size: 16px
      line_height: 24px
      weight: 400

examples:
  - title: Basic example
    goal: What the user or the agent is trying to build.
    code: |
      <UiComponent />

ai_notes:
  do:
    - rule
  avoid:
    - anti-pattern
```

## Required Sections

Each YAML profile should include the following conceptual sections.

## 1. `summary`

A short paragraph, usually 2 to 4 sentences:

- what the component is;
- which role it usually plays in the UI;
- which neighboring components it is commonly used with.

## 2. `use_when`

A list of concrete scenarios:

- when the component is a good default choice;
- which cases it covers better than neighboring components.

Keep the wording practical: "amount input", "page header", "filterable select".

## 3. `avoid_when`

A list of cases where the component should not be chosen:

- wrong semantics;
- composition limits;
- cases where a neighboring component is a better fit.

## 4. `public_import`

Include:

- the public entrypoint;
- the primary import;
- related public components, if they are needed for a complete scenario.

## 5. `api`

List only high-signal API:

- key props;
- key emits;
- important slots;
- exposed methods, if they affect usage patterns.

Do not copy the entire `.d.ts` verbatim if parts of the API do not affect component choice.

Inside `api`, it is useful to distinguish:

- `key_props`
- `props`
- `slots`
- `emits`
- `methods`

## 6. `rendered_structure`

Describe the actual rendered shape:

- the root container;
- the actual root tag or tags when they matter, for example `button`, `a`, `div`, or `span`;
- the main internal zones;
- where label, control, action area, icon area, popper content, and similar parts live;
- current root classes and state classes, if they help reasoning.

Important:

- this section is descriptive, not normative;
- state explicitly that it exists for mental modeling and debugging;
- do not present internal classes as a stable public styling API unless that contract is documented separately.

## 7. `geometry`

Capture:

- whether the component is block-like or inline-like;
- what the root behaves like in layout terms, for example `block`, `inline-block`, `inline-flex`, or `flex`;
- what stretches to `width: 100%` and what stays content-sized;
- how the component behaves in a row, grid, header, or popper;
- which props affect dimensions: `size`, `multiline`, `autofit`, `popperFitTrigger`, and so on.

Useful optional fields:

- `root_display` for the root display mode or the common display modes when the root changes by props;
- `width_behavior` for whether the component stretches, shrinks to content, or switches between those modes;
- `notes` for short practical remarks about how the root behaves in layout and composition.

## 8. `styling`

Capture only the styling data that helps an agent make safe decisions:

- root classes, zone classes, and state classes for reasoning and debugging;
- CSS custom properties that change theme, spacing, size, or popper behavior;
- typography mixins or resulting size, line-height, and weight values;
- whether classes and variables are descriptive implementation details or safe override points.

Inside `styling`, it is useful to distinguish:

- `root_classes`
- `state_classes`
- `zones`
- `css_variables`
- `typography`

Important:

- prefer CSS variables and documented props over selector-based overrides;
- do not present internal `.ui-v1-*` selectors as a stable public contract unless that is documented explicitly;
- say when a variable is a documented theme hook versus an internal implementation token.

## 9. `behavior`

This is one of the most important sections for AI.

Describe:

- `disabled`, `readonly`, `invalid`, `active`, `expanded`, `multiple`, and other state props;
- when and how errors, placeholders, clear buttons, and tooltips appear;
- keyboard behavior when it matters for UX;
- interaction transitions such as click-to-edit or open-close flows.

## 10. `accessibility`

Capture:

- which ARIA relationships the component expects or creates;
- what happens to `aria-invalid`, `aria-labelledby`, `role`, `aria-expanded`, and similar attributes;
- which keys affect behavior, if that behavior is documented.

## 11. `examples` and `composition`

List:

- common combinations;
- required neighboring components;
- safe defaults for typical screens;
- goal-oriented examples such as "build a table", "build an editable header", or "build a field with a select";
- examples of correct and incorrect composition.

## 12. `ai_notes`

A short list of rules specifically for code generation:

- what to do almost every time;
- what not to do;
- where it is better to admit the docs are missing than to guess.

## Writing Rules

- Use short, concrete statements instead of vague praise.
- Use the exact names of props, emits, and slots.
- For slots, describe not only the name, but also what the slot does and which content restrictions exist.
- For styling, distinguish between safe CSS variables and descriptive class names.
- Do not mix "how the component looks right now" with "what is publicly guaranteed".
- If behavior is inferred from implementation rather than public API, say that explicitly.
- If information is missing, state the limitation rather than inventing details.

## What Can Be Automated

The following data can usually be obtained automatically or semi-automatically:

- the list of public exports;
- prop, emit, method, and enum names;
- whether Storybook stories and examples exist;
- the current root classes and layout zones from templates.

These sections almost always need manual writing:

- when to use the component;
- which neighbors it composes with best;
- which anti-patterns are most dangerous for AI;
- which part of the DOM or CSS shape is only a descriptive model.

That split should stay documented in maintainer-only repository notes, not in the published package docs.
