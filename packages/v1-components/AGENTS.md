# AGENTS.md

## Purpose

This file is for AI assistants and automation that use the built package
`@retailcrm/embed-ui-v1-components` in application code.

It is not a contributor guide for editing the internal source of this workspace.
Treat this file as usage guidance for the published API.

## What This Package Is

- Package: `@retailcrm/embed-ui-v1-components`
- Role: UI component library for RetailCRM JS extensions
- Framework: Vue 3
- Main consumer entrypoint: `@retailcrm/embed-ui-v1-components/remote`

This package exposes declarative UI primitives that are rendered by RetailCRM host runtime.

## How To Import

- For extension UI code, import from `@retailcrm/embed-ui-v1-components/remote`.
- For icons and static assets, import from `@retailcrm/embed-ui-v1-components/assets/...`.
- Do not import from `src/*`, `dist/*`, or internal workspace files when writing extension code.
- Do not recommend `@retailcrm/embed-ui-v1-components/host` unless the task is explicitly about CRM host internals.

## Mental Model

- `remote` is the public API for extension authors.
- Components from `remote` do not represent a standalone design system outside RetailCRM.
- Extension code describes UI declaratively, and the CRM host side interprets and renders it.
- Because of this architecture, prefer documented public props and slots over assumptions based on internal implementation.

## Safe Default Recommendation

When building UI in an extension, start with imports like:

```ts
import {
  UiButton,
  UiField,
  UiPageHeader,
  UiSelect,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'
```

## Public API Areas

Commonly used exports from `remote` include:

- form controls:
  `UiTextbox`, `UiCheckbox`, `UiRadio`, `UiSwitch`, `UiSlider`, `UiNumberStepper`
- selection and date controls:
  `UiSelect`, `UiSelectOption`, `UiSelectOptionGroup`, `UiDatePicker`, `UiTimePicker`, `UiCalendar`
- layout and structure:
  `UiField`, `UiPageHeader`, `UiCollapse`, `UiCollapseBox`, `UiScrollBox`
- actions and links:
  `UiButton`, `UiAddButton`, `UiCopyButton`, `UiToolbarButton`, `UiToolbarLink`, `UiLink`
- feedback and overlays:
  `UiAlert`, `UiInfobox`, `UiError`, `UiLoader`, `UiTooltip`, `UiModalWindow`, `UiModalSidebar`
- content and data display:
  `UiAvatar`, `UiAvatarList`, `UiDate`, `UiImage`, `UiTag`, `UiTable`, `UiTableColumn`, `UiYandexMap`
- helpers:
  `usePreview`, `ImageWorkersKey`, `formatDate`, `formatDateTime`, `formatTime`

## Usage Rules

- Prefer package public exports over reimplementing CRM-styled controls manually.
- Match component choice to semantics:
  use `UiField` for labeled form controls, `UiAlert` for state messages, `UiPageHeader` for page-level headings.
- Keep imports on the public package boundary.
- If you are unsure whether something is public, assume only exports from `remote` and `assets/*` are safe for consumer code.
- If a needed capability is missing from the public API, say that clearly instead of suggesting internal imports.

## What To Avoid

- Do not import from `@retailcrm/embed-ui-v1-components/host` in normal extension code.
- Do not rely on internal file paths from this repository.
- Do not treat Storybook examples or internal source layout as stable runtime API.
- Do not assume every host-side component is available to extension authors.

## Example

```vue
<template>
  <UiPageHeader
    title="История заказа"
    description="Последние изменения и служебные действия"
  />

  <UiField id="comment" label="Комментарий">
    <UiTextbox v-model="comment" placeholder="Введите текст" />
  </UiField>

  <UiButton @click="save">
    Сохранить
  </UiButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import {
  UiButton,
  UiField,
  UiPageHeader,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'

const comment = ref('')

const save = () => {}
</script>
```

## If You Need More Context

- Package README:
  [`/packages/v1-components/README.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-components/README.md)
- Human-oriented package docs:
  [`/packages/v1-components/docs/README.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-components/docs/README.md)
- Machine-oriented package summary:
  [`/packages/v1-components/docs/AI.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-components/docs/AI.md)
- Component profiles:
  [`/packages/v1-components/docs/PROFILES.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-components/docs/PROFILES.md)
