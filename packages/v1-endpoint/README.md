# `@retailcrm/embed-ui-v1-endpoint`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-endpoint.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-endpoint)

`@retailcrm/embed-ui-v1-endpoint` предоставляет endpoint API для встраиваемых
виджетов и страниц в RetailCRM: обработку вызовов host-части, монтирование Vue-приложения
в endpoint root и освобождение ресурсов.

Пакет покрывает два сценария:

- **Pages** — запуск по `code`.
- **Widgets** — запуск по `id + target`.

## Быстрый старт

```ts
// endpoint.worker.ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

import OrdersPage from './pages/OrdersPage.vue'
import OrderCommonWidget from './widgets/OrderCommonWidget.vue'

const runner = defineRunner({
  pages: [OrdersPage],
  widgets: [OrderCommonWidget],
})

runEndpoint(runner)
```

Для продакшен-использования обычно достаточно `runEndpoint(...)` в точке входа веб-воркера.
Если нужен более низкоуровневый контроль транспорта — используйте `createEndpoint(...)`.

## Документация

Подробная документация по методам находится в каталоге [`docs/`](./docs/README.md):

- [`defineRunner`](./docs/define-runner.md) — как объединить page и widget runners в один endpoint runner.
- [`definePageRunner`](./docs/define-page-runner.md) — как запускать встраиваемые страницы по `code`.
- [`defineWidgetRunner`](./docs/define-widget-runner.md) — как запускать встраиваемые виджеты по `target`.
- [`createEndpoint`](./docs/create-endpoint.md) — как вручную создать endpoint с transport и messenger.
- [`runEndpoint`](./docs/run-endpoint.md) — как поднять endpoint в точке входа веб-воркера одной строкой.
- [`targets` и `defineTarget`](./docs/targets.md) — как типизировать цели виджетов и маршрутизировать их по target.
- [`menu-placements`](./docs/menu-placements.md) — как описывать меню и пункты навигации для встраиваемых страниц.
- [`page-routes`](./docs/page-routes.md) — как связывать page `code`, CRM-маршрут и `definePageRunner`.
- [`layout`](./docs/layout.md) — как выбирать паттерны компоновки страниц, `modal sidebar` и `modal window`, и из каких `v1-components` их собирать.

## MCP для AI-ассистентов

Пакет поставляет MCP-сервер с AI-friendly описаниями встроенных widget targets.
Сервер читает сгенерированные YAML-профили из `docs/targets/*.yml` и отдаёт их как MCP resources.

Запуск через опубликованный пакет:

```bash
npx -p @retailcrm/embed-ui-v1-endpoint embed-ui-v1-endpoint-mcp
```

Пример stdio-конфига для MCP-клиента:

```json
{
  "command": "npx",
  "args": ["-y", "-p", "@retailcrm/embed-ui-v1-endpoint", "embed-ui-v1-endpoint-mcp"]
}
```

Базовые resources:

- `embed-ui-v1-endpoint://targets` — JSON-индекс всех target profiles.
- `embed-ui-v1-endpoint://targets/<encoded-target>` — YAML-профиль конкретного target.

## AI и инициализация `AGENTS.md`

Чтобы агент понимал, когда использовать MCP-сервер пакета, можно добавить в
целевой проект секцию с инструкциями:

```bash
npx @retailcrm/embed-ui-v1-endpoint init-agents
```

Если `AGENTS.md` ещё нет, команда создаст файл. Если файл уже есть, команда
допишет в конец английский блок для `@retailcrm/embed-ui-v1-endpoint`, если
такого блока там ещё нет. С `--force` можно обновить уже существующий блок
пакета.
