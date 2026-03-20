# Каталог компонентов `v1-components`

Ниже перечислены публичные сущности, которые расширение может импортировать из
`@retailcrm/embed-ui-v1-components/remote`.

Каталог сгруппирован по смыслу, чтобы быстрее понимать, что уже есть в пакете и где искать подходящий примитив.

## Ввод и редактирование данных

- `UiTextbox`: текстовый ввод.
- `UiNumberStepper`: числовое поле со stepper-контролами.
- `UiCheckbox`: бинарный выбор.
- `UiRadio`: выбор одного значения.
- `UiSwitch`: переключатель состояния.
- `UiSlider`: выбор значения на шкале.
- `UiSelect`: select-контейнер.
- `UiSelectOption`: отдельная опция select.
- `UiSelectOptionGroup`: группа опций.
- `UiSelectOptionGroupHeader`: заголовок группы опций.
- `UiDatePicker`: выбор даты или диапазона дат.
- `UiTimePicker`: выбор времени.
- `UiCalendar`: календарный примитив.

## Структура формы

- `UiField`: обёртка над полем с `label`, `hint`, `required`, `invalid`, `readonly`.

## Кнопки и действия

- `UiButton`: основная кнопка.
- `UiAddButton`: кнопка добавления.
- `UiCopyButton`: копирование значения.
- `UiToolbarButton`: кнопка для toolbar-контекста.
- `UiToolbarLink`: ссылка для toolbar-контекста.

## Навигация и базовые интеракции

- `UiLink`: текстовая ссылка.
- `UiMenuItem`: пункт меню.
- `UiMenuItemGroup`: группа пунктов меню.
- `UiCollapse`: простое сворачивание секции.
- `UiCollapseBox`: контейнер раскрывающегося блока.
- `UiCollapseGroup`: координация нескольких collapse-блоков.

## Информационные и статусные блоки

- `UiAlert`: сообщения об успехе, предупреждении, ошибке и информационные уведомления.
- `UiInfobox`: информационный контейнер для акцентных пояснений.
- `UiError`: компактное отображение ошибки.
- `UiLoader`: индикатор загрузки.
- `UiTag`: лейблы и статусы.

## Персоны и медиа

- `UiAvatar`: аватар пользователя или сущности.
- `UiAvatarList`: список аватаров.
- `UiImage`: изображение.
- `UiYandexMap`: карта на основе Yandex Maps.

## Модальные и всплывающие паттерны

- `UiModalWindow`: модальное окно.
- `UiModalWindowSurface`: поверхность модального окна.
- `UiModalSidebar`: боковая модальная панель.
- `UiTooltip`: текстовая подсказка.
- `UiPopper`: плавающий контейнер.
- `UiPopperTarget`: целевой элемент для popper.
- `UiPopperConnector`: связка target и floating-элемента.

## Макет и прокрутка

- `UiPageHeader`: заголовок страницы или секции.
- `UiScrollBox`: контейнер со скроллом.
- `UiTransition`: декларативный переход.

## Таблицы

- `UiTable`: корневой декларативный компонент таблицы.
- `UiTableColumn`: декларация колонки.

Кроме них из пакета экспортируются общие table helpers, которые переиспользуются в host и remote части.

## Утилиты и дополнительные экспорты

- `usePreview`: preview URL для изображений через image workers.
- `ImageWorkersKey`: injection key для списка image workers.
- `formatDate`, `formatDateTime`, `formatTime`: форматирование даты и времени.

## Практическое правило выбора entrypoint

- Если код живёт внутри расширения, импорт должен идти из `@retailcrm/embed-ui-v1-components/remote`.
- Если код относится к интерпретации remote schema внутри CRM, используются host-экспорты.
- Если компонент существует только в host-части, это ещё не означает, что он автоматически является частью публичного API расширений.
