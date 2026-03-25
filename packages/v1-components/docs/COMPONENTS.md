# Public Components Catalog

This catalog describes the public components and helpers available to consumers of
`@retailcrm/embed-ui-v1-components`.

Unless stated otherwise, extension UI code should import these entities from
`@retailcrm/embed-ui-v1-components/remote`.

Detailed AI-friendly profiles are collected in [`PROFILES.md`](./PROFILES.md).

## Form And Input

- [`UiField`](./profiles/UiField.yml): field wrapper with label, hint, validation state, and slot props for ARIA wiring
- [`UiTextbox`](./profiles/UiTextbox.yml): text or numeric input with prefix, suffix, clear action, and multiline mode
- [`UiCheckbox`](./profiles/UiCheckbox.yml): boolean choice
- [`UiRadio`](./profiles/UiRadio.yml): single choice
- [`UiSwitch`](./profiles/UiSwitch.yml): state toggle
- [`UiSlider`](./profiles/UiSlider.yml): ranged value selection
- [`UiSelect`](./profiles/UiSelect.yml): select container for single or multiple choice
- [`UiSelectOption`](./profiles/UiSelectOption.yml): select option
- [`UiSelectOptionGroup`](./profiles/UiSelectOptionGroup.yml): grouped options
- [`UiSelectOptionGroupHeader`](./profiles/UiSelectOptionGroupHeader.yml): option group header
- [`UiDatePicker`](./profiles/UiDatePicker.yml): date or date-range selection
- [`UiTimePicker`](./profiles/UiTimePicker.yml): time selection
- [`UiCalendar`](./profiles/UiCalendar.yml): calendar primitive
- [`UiNumberStepper`](./profiles/UiNumberStepper.yml): numeric input with increment and decrement controls

## Actions And Navigation

- [`UiButton`](./profiles/UiButton.yml): main action button that can render as a button or anchor
- [`UiAddButton`](./profiles/UiAddButton.yml): add action button
- [`UiCopyButton`](./profiles/UiCopyButton.yml): copy value action
- [`UiToolbarButton`](./profiles/UiToolbarButton.yml): toolbar button
- [`UiToolbarLink`](./profiles/UiToolbarLink.yml): toolbar link
- [`UiLink`](./profiles/UiLink.yml): text link
- [`UiMenuItem`](./profiles/UiMenuItem.yml): menu item
- [`UiMenuItemGroup`](./profiles/UiMenuItemGroup.yml): menu item group

## Layout And Structure

- [`UiPageHeader`](./profiles/UiPageHeader.yml): page or section header with an editable title and action zone
- [`UiCollapse`](./profiles/UiCollapse.yml): collapsible section
- [`UiCollapseBox`](./profiles/UiCollapseBox.yml): collapsible container
- [`UiCollapseGroup`](./profiles/UiCollapseGroup.yml): multiple collapse coordination
- [`UiScrollBox`](./profiles/UiScrollBox.yml): scrollable container
- [`UiTransition`](./profiles/UiTransition.yml): transition wrapper

## Feedback And Status

- [`UiAlert`](./profiles/UiAlert.yml): contextual alert or notification
- [`UiInfobox`](./profiles/UiInfobox.yml): highlighted explanatory block
- [`UiError`](./profiles/UiError.yml): compact error state
- [`UiLoader`](./profiles/UiLoader.yml): loading indicator
- [`UiTag`](./profiles/UiTag.yml): labels and statuses

## Overlays And Modal Patterns

- [`UiModalWindow`](./profiles/UiModalWindow.yml): modal window
- [`UiModalWindowSurface`](./profiles/UiModalWindowSurface.yml): modal surface
- [`UiModalSidebar`](./profiles/UiModalSidebar.yml): sidebar modal
- [`UiTooltip`](./profiles/UiTooltip.yml): tooltip
- [`UiPopper`](./profiles/UiPopper.yml): floating layer
- [`UiPopperTarget`](./profiles/UiPopperTarget.yml): popper target
- [`UiPopperConnector`](./profiles/UiPopperConnector.yml): target-to-floating connector

## Content And Data Display

- [`UiAvatar`](./profiles/UiAvatar.yml): avatar
- [`UiAvatarList`](./profiles/UiAvatarList.yml): avatar list
- [`UiDate`](./profiles/UiDate.yml): formatted date display
- [`UiImage`](./profiles/UiImage.yml): image display
- [`UiTable`](./profiles/UiTable.yml): table root
- [`UiTableColumn`](./profiles/UiTableColumn.yml): table column declaration
- [`UiYandexMap`](./profiles/UiYandexMap.yml): Yandex map component

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
