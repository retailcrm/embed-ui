# Документация `@retailcrm/embed-ui-v1-endpoint`

В этом каталоге собраны практические гайды по публичному API `v1-endpoint`.

## По методам

- [`defineRunner`](./define-runner.md) — объединение page/widget runners в один endpoint runner.
- [`definePageRunner`](./define-page-runner.md) — запуск встраиваемых страниц по `code`.
- [`defineWidgetRunner`](./define-widget-runner.md) — запуск встраиваемых виджетов по `target`.
- [`createEndpoint`](./create-endpoint.md) — ручное создание endpoint с transport/messenger.
- [`runEndpoint`](./run-endpoint.md) — запуск endpoint в worker одной строкой.

## Дополнительно

- [`targets` и `defineTarget`](./targets.md) — типизированные цели для виджетов.
- [`targets/*.yml`](./targets/) — сгенерированные AI-friendly описания встроенных widget targets на английском.
- MCP-сервер `embed-ui-v1-endpoint-mcp` — поставляемый stdio server, который отдаёт `targets/*.yml` как MCP resources.
- [`menu-placements`](./menu-placements.md) — как описывать меню и пункты навигации, из которых открываются встраиваемые страницы.
- [`page-routes`](./page-routes.md) — как связывать page `code`, CRM-маршрут и `definePageRunner`.
- [`layout`](./layout.md) — практический гайд по паттернам компоновки страниц, шторок и модалок.
