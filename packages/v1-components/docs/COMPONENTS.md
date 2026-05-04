# Public Components Catalog

This catalog describes the public components and helpers available to consumers of
`@retailcrm/embed-ui-v1-components`.

Unless stated otherwise, extension UI code should import these entities from
`@retailcrm/embed-ui-v1-components/remote`.

Detailed AI-friendly profiles are collected in [`PROFILES.md`](./PROFILES.md).

## Form And Input

- [`UiField`](./profiles/components/UiField.yml): field wrapper with label, hint, validation state, and slot props for ARIA wiring
- [`UiTextbox`](./profiles/components/UiTextbox.yml): text or numeric input with prefix, suffix, clear action, and multiline mode
- [`UiCheckbox`](./profiles/components/UiCheckbox.yml): boolean choice
- [`UiRadio`](./profiles/components/UiRadio.yml): single choice
- [`UiRadioSwitch`](./profiles/components/UiRadioSwitch.yml): segmented single-choice switch with inline or section-card appearance
- [`UiRadioSwitchOption`](./profiles/components/UiRadioSwitchOption.yml): rich option child for UiRadioSwitch
- [`UiToggleGroup`](./profiles/components/UiToggleGroup.yml): segmented multi-select group built from toggle buttons
- [`UiToggleGroupOption`](./profiles/components/UiToggleGroupOption.yml): rich option child for UiToggleGroup
- [`UiSwitch`](./profiles/components/UiSwitch.yml): state toggle
- [`UiSlider`](./profiles/components/UiSlider.yml): ranged value selection
- [`UiSelect`](./profiles/components/UiSelect.yml): select container for single or multiple choice
- [`UiSelectOption`](./profiles/components/UiSelectOption.yml): select option
- [`UiSelectOptionGroup`](./profiles/components/UiSelectOptionGroup.yml): grouped options
- [`UiDatePicker`](./profiles/components/UiDatePicker.yml): date or date-range selection
- [`UiTimePicker`](./profiles/components/UiTimePicker.yml): time selection
- [`UiCalendar`](./profiles/components/UiCalendar.yml): calendar primitive
- [`UiNumberStepper`](./profiles/components/UiNumberStepper.yml): numeric input with increment and decrement controls

## Actions And Navigation

- [`UiButton`](./profiles/components/UiButton.yml): main action button that can render as a button or anchor
- [`UiToggleButton`](./profiles/components/UiToggleButton.yml): stateful toggle button primitive for standalone or grouped use
- [`UiAddButton`](./profiles/components/UiAddButton.yml): add action button
- [`UiCopyButton`](./profiles/components/UiCopyButton.yml): copy value action
- [`UiToolbarButton`](./profiles/components/UiToolbarButton.yml): toolbar button
- [`UiToolbarLink`](./profiles/components/UiToolbarLink.yml): toolbar link
- [`UiLink`](./profiles/components/UiLink.yml): text link
- [`UiMenuItem`](./profiles/components/UiMenuItem.yml): menu item
- [`UiMenuItemGroup`](./profiles/components/UiMenuItemGroup.yml): menu item group
- [`UiTabGroup`](./profiles/components/UiTabGroup.yml): tab navigation group with overflow handling and optional active panel
- [`UiTab`](./profiles/components/UiTab.yml): declarative tab child for UiTabGroup

## Layout And Structure

- [`UiPageHeader`](./profiles/components/UiPageHeader.yml): page or section header with an editable title and action zone
- [`UiCollapse`](./profiles/components/UiCollapse.yml): collapsible section
- [`UiCollapseBox`](./profiles/components/UiCollapseBox.yml): collapsible container
- [`UiCollapseGroup`](./profiles/components/UiCollapseGroup.yml): multiple collapse coordination
- [`UiScrollBox`](./profiles/components/UiScrollBox.yml): scrollable container
- [`UiTransition`](./profiles/components/UiTransition.yml): transition wrapper

## Feedback And Status

- [`UiAlert`](./profiles/components/UiAlert.yml): contextual alert or notification
- [`UiInfobox`](./profiles/components/UiInfobox.yml): highlighted explanatory block
- [`UiError`](./profiles/components/UiError.yml): compact error state
- [`UiLoader`](./profiles/components/UiLoader.yml): loading indicator
- [`UiSkeleton`](./profiles/components/UiSkeleton.yml): content placeholder for loading state
- [`UiTag`](./profiles/components/UiTag.yml): labels and statuses

## Overlays And Modal Patterns

- [`UiModalWindow`](./profiles/components/UiModalWindow.yml): modal window
- [`UiModalWindowSurface`](./profiles/components/UiModalWindowSurface.yml): modal surface
- [`UiModalSidebar`](./profiles/components/UiModalSidebar.yml): sidebar modal
- [`UiTooltip`](./profiles/components/UiTooltip.yml): tooltip
- [`UiPopper`](./profiles/components/UiPopper.yml): floating layer
- [`UiPopperTarget`](./profiles/components/UiPopperTarget.yml): popper target
- [`UiPopperConnector`](./profiles/components/UiPopperConnector.yml): target-to-floating connector

## Content And Data Display

- [`UiAvatar`](./profiles/components/UiAvatar.yml): avatar
- [`UiAvatarList`](./profiles/components/UiAvatarList.yml): avatar list
- [`UiDate`](./profiles/components/UiDate.yml): formatted date display
- [`UiTable`](./profiles/components/UiTable.yml): table root
- [`UiTableColumn`](./profiles/components/UiTableColumn.yml): table column declaration
- [`UiTableHeadCell`](./profiles/components/UiTableHeadCell.yml): table head cell primitive
- [`UiTableBodyCell`](./profiles/components/UiTableBodyCell.yml): table body cell primitive
- [`UiTableFooterSection`](./profiles/components/UiTableFooterSection.yml): table footer section container
- [`UiTableFooterButton`](./profiles/components/UiTableFooterButton.yml): table footer action button
- [`UiTableSorter`](./profiles/components/UiTableSorter.yml): table sort control primitive
- [`UiYandexMap`](./profiles/components/UiYandexMap.yml): Yandex map component

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
