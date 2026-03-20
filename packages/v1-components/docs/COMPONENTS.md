# Public Components Catalog

Этот каталог описывает публичные компоненты и helpers, доступные потребителю пакета
`@retailcrm/embed-ui-v1-components`.

Если не указано иное, для extension UI код нужно импортировать сущности из
`@retailcrm/embed-ui-v1-components/remote`.

## Form And Input

- `UiTextbox`: text input
- `UiNumberStepper`: numeric input with increment and decrement controls
- `UiCheckbox`: boolean choice
- `UiRadio`: single choice
- `UiSwitch`: state toggle
- `UiSlider`: ranged value selection
- `UiSelect`: select container
- `UiSelectOption`: select option
- `UiSelectOptionGroup`: grouped options
- `UiSelectOptionGroupHeader`: option group header
- `UiDatePicker`: date or date-range selection
- `UiTimePicker`: time selection
- `UiCalendar`: calendar primitive

## Form Structure

- `UiField`: field wrapper with label, hint and validation state

## Actions

- `UiButton`: primary action button
- `UiAddButton`: add action button
- `UiCopyButton`: copy value action
- `UiToolbarButton`: toolbar button
- `UiToolbarLink`: toolbar link

## Navigation And Interaction

- `UiLink`: text link
- `UiMenuItem`: menu item
- `UiMenuItemGroup`: menu item group
- `UiCollapse`: collapsible section
- `UiCollapseBox`: collapsible container
- `UiCollapseGroup`: multiple collapse coordination

## Feedback And Status

- `UiAlert`: contextual alert or notification
- `UiInfobox`: highlighted explanatory block
- `UiError`: compact error state
- `UiLoader`: loading indicator
- `UiTag`: labels and statuses

## People, Media And Maps

- `UiAvatar`: avatar
- `UiAvatarList`: avatar list
- `UiImage`: image display
- `UiYandexMap`: Yandex map component

## Overlays And Modal Patterns

- `UiModalWindow`: modal window
- `UiModalWindowSurface`: modal surface
- `UiModalSidebar`: sidebar modal
- `UiTooltip`: tooltip
- `UiPopper`: floating layer
- `UiPopperTarget`: popper target
- `UiPopperConnector`: target-to-floating connector

## Layout And Presentation

- `UiPageHeader`: page or section header
- `UiScrollBox`: scrollable container
- `UiTransition`: transition wrapper
- `UiDate`: formatted date display

## Tables

- `UiTable`: table root
- `UiTableColumn`: table column declaration

## Helpers

- `usePreview`: image preview helper
- `ImageWorkersKey`: injection key for image workers
- `formatDate`: date formatter
- `formatDateTime`: date-time formatter
- `formatTime`: time formatter

## Public Entrypoint Rule

- For extension UI code, use `@retailcrm/embed-ui-v1-components/remote`.
- For assets, use `@retailcrm/embed-ui-v1-components/assets/...`.
- Use `@retailcrm/embed-ui-v1-components/host` only if your application is the runtime-side integration.
