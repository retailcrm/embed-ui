# AI Context For `@retailcrm/embed-ui-v1-components`

Этот файл предназначен для ИИ-ассистентов и автоматизаций, которые используют установленный пакет
`@retailcrm/embed-ui-v1-components` в другом проекте.

Ниже описан только публичный контракт пакета, без привязки к внутренней структуре репозитория.

## Package Identity

- Package name: `@retailcrm/embed-ui-v1-components`
- Purpose: UI components and UI helpers for RetailCRM JS extensions
- Framework: Vue 3
- Primary public entrypoints:
  - `@retailcrm/embed-ui-v1-components/remote`
  - `@retailcrm/embed-ui-v1-components/host`
  - `@retailcrm/embed-ui-v1-components/assets/...`

## How To Choose An Entrypoint

- Use `@retailcrm/embed-ui-v1-components/remote` for extension UI code.
- Use `@retailcrm/embed-ui-v1-components/host` only if your application is the runtime side that renders or integrates the component layer.
- Use `@retailcrm/embed-ui-v1-components/assets/...` for icons and static assets shipped with the package.

If you are not sure which entrypoint to use, default to `remote`.

## Safe Usage Rules

- Import only from documented public entrypoints.
- Do not import from `src/*` or any repository-internal paths.
- Do not rely on repository layout, Storybook internals or implementation details.
- Treat `remote` as the default public surface for extension authors.
- Treat `host` as a specialized public surface for runtime-side integrations.

## Public API Areas

The package publicly exposes:

- form and selection components:
  `UiTextbox`, `UiCheckbox`, `UiRadio`, `UiSwitch`, `UiSlider`, `UiNumberStepper`,
  `UiSelect`, `UiSelectOption`, `UiSelectOptionGroup`, `UiDatePicker`, `UiTimePicker`, `UiCalendar`
- structure and layout:
  `UiField`, `UiPageHeader`, `UiCollapse`, `UiCollapseBox`, `UiScrollBox`
- actions and navigation:
  `UiButton`, `UiAddButton`, `UiCopyButton`, `UiToolbarButton`, `UiToolbarLink`, `UiLink`,
  `UiMenuItem`, `UiMenuItemGroup`
- feedback and overlays:
  `UiAlert`, `UiError`, `UiInfobox`, `UiLoader`, `UiTooltip`, `UiPopper`,
  `UiModalWindow`, `UiModalWindowSurface`, `UiModalSidebar`
- content and data display:
  `UiAvatar`, `UiAvatarList`, `UiDate`, `UiImage`, `UiTable`, `UiTableColumn`,
  `UiTag`, `UiYandexMap`, `UiTransition`
- helpers:
  `usePreview`, `ImageWorkersKey`, `formatDate`, `formatDateTime`, `formatTime`

## Default Recommendation For AI

When generating extension code, prefer imports like:

```ts
import {
  UiButton,
  UiField,
  UiPageHeader,
  UiSelect,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'
```

If a requested capability is not available through public package exports, state that directly instead of suggesting internal imports.

## Related Public Docs

- [`README.md`](../README.md)
- [`COMPONENTS.md`](./COMPONENTS.md)
- [`../AGENTS.md`](../AGENTS.md)
