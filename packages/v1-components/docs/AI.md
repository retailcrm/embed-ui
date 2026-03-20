# AI Context For `v1-components`

Этот файл предназначен для ИИ-ассистентов, автоматизаций и генераторов документации.
Он описывает пакет в компактной форме и фиксирует инварианты, которые важно не нарушать.

## Identity

- Package name: `@retailcrm/embed-ui-v1-components`
- Workspace folder: `packages/v1-components`
- Purpose: UI primitives for RetailCRM JS extensions with split remote declarations and host rendering.
- Framework: Vue 3
- Build outputs: `index.js`, `index.cjs`, `dist/*`
- Public entrypoints: `.`, `./remote`, `./host`, `./assets/*`, `./dist/*`

## Architecture

- `src/remote.ts`:
  public API for extension authors.
- `src/host.ts`:
  host-side export surface used by CRM runtime.
- `src/remote/components/*`:
  remote declarations and composite Vue wrappers exposed to extensions.
- `src/host/components/*`:
  concrete visual implementation and behavior used by the host.
- `src/remote/endpoint.ts`:
  default component registry for standard endpoint root creation.
- `storybook/*`:
  interactive showcase and docs infrastructure.

## Hard Rules

- Extension code must import UI components from `@retailcrm/embed-ui-v1-components/remote`.
- Do not recommend importing `@retailcrm/embed-ui-v1-components/host` in extension code.
- A user-facing component is complete only when remote and host parts stay in sync.
- If a component should work in the standard endpoint flow, add it to `createEndpointRoot` component registry.
- Keep public naming consistent with existing convention: `Ui*`.

## Public Remote Surface

Current remote exports include:

- action and form primitives:
  `UiAddButton`, `UiButton`, `UiCheckbox`, `UiNumberStepper`, `UiRadio`, `UiSelect`, `UiSlider`, `UiSwitch`,
  `UiTextbox`, `UiDatePicker`, `UiTimePicker`, `UiCalendar`
- structure and navigation:
  `UiField`, `UiCollapse`, `UiCollapseBox`, `UiPageHeader`, `UiScrollBox`, `UiLink`, `UiMenuItem`, `UiMenuItemGroup`
- feedback and overlays:
  `UiAlert`, `UiError`, `UiInfobox`, `UiLoader`, `UiTooltip`, `UiPopper`, `UiModalWindow`,
  `UiModalWindowSurface`, `UiModalSidebar`
- data and content:
  `UiAvatar`, `UiAvatarList`, `UiDate`, `UiImage`, `UiTable`, `UiTableColumn`, `UiTag`, `UiYandexMap`
- toolbar and helpers:
  `UiToolbarButton`, `UiToolbarLink`, `UiTransition`, `usePreview`, `ImageWorkersKey`,
  `formatDate`, `formatDateTime`, `formatTime`

## When Adding A New Component

Update all relevant layers:

1. Create host implementation under `src/host/components/<component-name>/`.
2. Export host component from `src/host/components/index.ts`.
3. Re-export it from `src/host.ts` if it belongs to the public host surface.
4. Create remote declaration or wrapper under `src/remote/components/`.
5. Export it from `src/remote.ts`.
6. Register schema name in `src/remote/endpoint.ts` if it should mount in the standard endpoint runtime.
7. Add or update Storybook stories or docs if the component is public and user-facing.
8. Ensure README or docs mention the component when it changes package discoverability.

## When Changing Existing API

- Preserve compatibility unless the task explicitly allows breaking changes.
- Keep prop names and emitted events aligned between host and remote surfaces.
- Avoid leaking host-only implementation details into public remote docs.
- Prefer documenting import path, intent and usage pattern instead of low-level internal files.

## Verification Guidance

For package-level verification, prefer:

```bash
yarn workspace @retailcrm/embed-ui-v1-components run build
yarn workspace @retailcrm/embed-ui-v1-components run storybook:build
```

For repository-wide verification, see the root
[`AGENTS.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/AGENTS.md).
