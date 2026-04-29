# Документация `@retailcrm/embed-ui-v1-endpoint`

В этом каталоге собраны продвинутые гайды по публичному API `v1-endpoint`.

## По методам

- [`defineRunner`](./define-runner.md) — объединение page/widget runners в один endpoint runner.
- [`definePageRunner`](./define-page-runner.md) — запуск remote-страниц по `code`.
- [`defineWidgetRunner`](./define-widget-runner.md) — запуск remote-виджетов по `target`.
- [`createEndpoint`](./create-endpoint.md) — ручное создание endpoint с transport/messenger.
- [`runEndpoint`](./run-endpoint.md) — запуск endpoint в worker одной строкой.

## Дополнительно

- [`targets` и `defineTarget`](./targets.md) — типизированные цели для виджетов.
- [`menu-placements`](./menu-placements.md) — как описывать меню и пункты навигации, из которых открываются remote-страницы.
- [`page-routes`](./page-routes.md) — как связывать page `code`, CRM route и `definePageRunner`.
- [`layout`](./layout.md) — практический гайд по layout-паттернам страниц, шторок и модалок.
