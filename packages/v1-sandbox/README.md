# `@retailcrm/embed-ui-v1-sandbox`

`@retailcrm/embed-ui-v1-sandbox` поднимает in-memory песочницу для превью,
standalone-тестирования и автоматизации JS-расширений без живой CRM.

Стартовый пакет покрывает базовый фундамент:

- реактивное состояние sandbox;
- host API emulator (`goTo`, `httpCall`, `replaceQuery`, `pushQuery`);
- типизированные context/custom accessors поверх `v1-types` и `v1-contexts`;
- global bridge для automation/AI через `globalThis`;
- RPC helper для подключения remote runtime в тестах и превью.

## Быстрый старт

```ts
import { createSandboxController, createSandboxRpc } from '@retailcrm/embed-ui-v1-sandbox'

const sandbox = createSandboxController({
  mode: 'preview',
  schemas: {
    article: {
      title: {
        accepts: (value: unknown): value is string => typeof value === 'string',
        defaults: () => 'Draft',
        readonly: false,
      },
    },
  },
})

const { remote } = createSandboxRpc(sandbox)

await remote.call.set('article', 'title', 'Preview title')
```

## Режимы

- `preview` — ручное превью и локальная отладка;
- `automation` — управление песочницей через bridge/API;
- `standalone-test` — сценарии для unit/integration/e2e без CRM.

## Dev sandbox

Workspace содержит dev sandbox для запуска widget/page extensions в
CRM-подобной оболочке. Сейчас поддерживаются `order/card` targets, запуск
нескольких widget instances из одного worker, page runner по `code` и
Playwright feedback loop.

Публичный URL contract:

- `manifestUrl` — URL внешнего расширения. Поддерживает JSON manifest,
  HTML entrypoint (`/extension/<uuid>`) и прямой JS script;
- `extensionUrl` — fallback URL module worker entrypoint расширения, если
  `manifestUrl` пустой;
- `mode` — `widget` или `page`, по умолчанию `widget`;
- `target` — один поддержанный `order/card:*` target для одиночного запуска;
- `targets` — список `order/card:*` targets через запятую для запуска
  нескольких widget instances;
- `widgetId` — базовый идентификатор widget instance, по умолчанию
  `sandbox-widget`;
- `pageCode` — page code для `mode=page`, по умолчанию `orders-dashboard`;
- `fixture` — код фикстуры, по умолчанию `order-basic`.

Пример:

```text
http://v1.embed-ui-sandbox.local/?manifestUrl=http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7&targets=order/card:common.after&fixture=order-basic
```

Пример запуска page runner:

```text
http://v1.embed-ui-sandbox.local/?mode=page&pageCode=returns&manifestUrl=http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7
```

Для `core-ui-extensions-examples` page code берётся из
`cases/returnsModule/extensionrc.json`: `returns`. Быстрый пример внешней
страницы:

```text
http://v1.embed-ui-sandbox.local/?manifestUrl=http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7&mode=page&pageCode=returns&targets=order/card:common.after&target=order/card:common.after
```

`manifestUrl` — основной dev contract. Sandbox загружает внешний URL по сети:
если это JSON manifest, получает descriptor (`uuid`, `runner`, `entrypoint`,
`targets`, `pages`); если это HTML entrypoint, достаёт первый `<script src>`
из `<head>`; если это JS, запускает его напрямую через локальный bootstrap
worker. Если нужно отладить прямой worker entrypoint без manifest endpoint,
можно передать пустой `manifestUrl` и внешний `extensionUrl`:

```text
http://v1.embed-ui-sandbox.local/?manifestUrl=&extensionUrl=http://your-extension-host.local/entrypoint.js
```

Внешний extension server должен отдавать entrypoint по сети. Для
`core-ui-extensions-examples` это core-похожий URL:

```text
http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7/script
```

Extension entrypoint должен быть worker-compatible и вызвать
`runEndpoint(defineRunner(...))`:

```ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

runEndpoint(defineRunner({
  pages: [{
    'orders-dashboard': ordersDashboardPageRunner,
  }],
  widgets: [{
    'order/card:common.before': commonBeforeWidgetRunner,
    'order/card:common.after': commonAfterWidgetRunner,
  }],
}))
```

Dev-панель справа от рабочей области позволяет:

- менять `manifestUrl`, `extensionUrl`, `mode`, `fixture`, `pageCode` и список
  `targets`;
- применить выбранные значения через URL contract;
- перезапустить extension worker без перезагрузки страницы;
- сбросить sandbox state к текущей fixture;
- вызвать host API actions: `httpCall`, `goTo`, `pushQuery`, `replaceQuery`;
- посмотреть host activity log и JSON snapshot текущего sandbox state.

## Playwright и стенд

Основной Docker-first способ поднять стенд:

```bash
docker compose up v1-sandbox
```

Эта команда поднимает только sandbox host. Расширение запускается отдельно,
например из соседнего проекта `core-ui-extensions-examples`, который отдаёт
HTML entrypoint и script:

```text
http://web-extensions-server.simla.local/extension/79aa7a7a-3b66-4e85-b623-f7c1fef97bc7
```

То же самое через Docker/Makefile:

```bash
make sandbox.serve
```

```bash
make workspace.run workspace=@retailcrm/embed-ui-v1-sandbox script=dev:e2e
```

Она тоже поддерживает `cli`, например:

```bash
make workspace.run workspace=@retailcrm/embed-ui-v1-sandbox script=dev:e2e cli='--host 0.0.0.0 --port 4173'
```

Playwright использует этот же стенд через `webServer` в
`vitest.config.playwright.ts`, поэтому отдельный сервер перед запуском тестов
поднимать не нужно:

```bash
yarn workspace @retailcrm/embed-ui-v1-sandbox exec playwright test -c vitest.config.playwright.ts
```

Запуск через Docker/Makefile:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

Playwright сохраняет HTML report, failure screenshots, trace on retry и
happy-path screenshot/state attachments. Результаты лежат в
`packages/v1-sandbox/artifacts/playwright/results`, HTML report открывается
командой:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox
```

Полезные параметры:

- `workspace=...` — выбрать workspace, в котором лежит `vitest.config.playwright.ts`;
- `cli='--project chromium'` — передать флаги напрямую в `playwright test`;
- `cli='e2e/sandbox.spec.ts'` — запустить только один spec-файл.

Дополнительные флаги для отчёта тоже передаются через `cli`, например:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox cli='--port 9324'
```

Доступные фикстуры:

- `order-basic`;
- `order-with-delivery`;
- `order-readonly-error`.

Поддержанные слоты первого этапа:

- `order/card:common.before`;
- `order/card:common.after`;
- `order/card:delivery.before`;
- `order/card:payment.before`.
