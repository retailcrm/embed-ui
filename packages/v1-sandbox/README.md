# `@retailcrm/embed-ui-v1-sandbox`

`@retailcrm/embed-ui-v1-sandbox` поднимает in-memory песочницу для превью,
standalone-тестирования и автоматизации JS-расширений без живой CRM.

Стартовый пакет покрывает базовый фундамент:

- реактивное состояние sandbox;
- host API emulator (`goTo`, `httpCall`, `replaceQuery`, `pushQuery`);
- типизированные context/custom accessors поверх `v1-types` и `v1-contexts`;
- global bridge для automation/AI через `globalThis`;
- RPC helper для подключения remote runtime в тестах и превью.

## Programmatic API

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

### Controller modes

- `preview` — ручное превью и локальная отладка;
- `automation` — управление песочницей через bridge/API;
- `standalone-test` — сценарии для unit/integration/e2e без CRM.

## Dev sandbox

Workspace содержит dev sandbox для запуска widget/page extensions в
CRM-подобной оболочке. Сейчас поддерживаются `order/card` targets, запуск
нескольких widget instances из одного worker, page runner по `code` и
Playwright feedback loop.

Подробная пользовательская инструкция, как пользоваться песочницей: [docs/usage-guide.md](./docs/usage-guide.md).

### URL contract

- `manifestUrl` — URL внешнего расширения. Поддерживает JSON manifest,
  HTML entrypoint (`/extension/%extension-id%`) и прямой JS script;
- `extensionUrl` — низкоуровневый fallback URL module worker entrypoint
  расширения, если `manifestUrl` пустой. В UI dev-панели используется один
  основной путь подключения — `manifestUrl`;
- `mode` — `widget` или `page`, по умолчанию `widget`;
- `target` — один поддержанный `order/card:*` target для одиночного запуска;
- `targets` — список `order/card:*` targets через запятую для запуска
  нескольких widget instances;
- `widgetId` — базовый идентификатор widget instance, по умолчанию
  `sandbox-widget`;
- `pageCode` — page code для `mode=page`, по умолчанию `orders-dashboard`;
- `fixture` — код фикстуры, по умолчанию `order-basic`.

Где:

- `%sandbox-url%` — адрес sandbox-оболочки из локальной container/DNS-настройки окружения.
  Для Linux Docker используется Traefik и домен верхнего уровня `.test`;
  для OrbStack на macOS используется `.local` из доменного пространства имён.
- `%extension-url%` — origin внешнего extension server без `/extension/%extension-id%`.
  Это может быть `http://web-extensions-server.simla.local`,
  `http://web-extensions-server.simla.test`, `https://ycp-retail.ru` или другой адрес;
- `%extension-id%` — идентификатор записи JS-модуля/расширения на extension server.
  Это не `pageCode` и не target; один такой модуль может содержать страницы и виджеты;
- `%page-code%` — page code, который расширение регистрирует в runner.

Пример запуска widget:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.after&fixture=order-basic
```

Пример запуска page runner:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%
```

Пример запуска нескольких widget targets:

```text
%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

`manifestUrl` — основной dev contract. Sandbox загружает внешний URL по сети:
если это JSON manifest, получает descriptor (`uuid`, `runner`, `entrypoint`,
`targets`, `pages`); если это HTML entrypoint, достаёт первый `<script src>`
из `<head>`; если это JS, запускает его напрямую через локальный bootstrap
worker. Если нужно отладить прямой worker entrypoint без manifest endpoint,
можно передать пустой `manifestUrl` и внешний `extensionUrl`:

```text
%sandbox-url%/?manifestUrl=&extensionUrl=%extension-url%/entrypoint.js
```

Внешний extension server должен отдавать entrypoint по сети. Core-style
доставка обычно выглядит так:

```text
%extension-url%/extension/%extension-id%/script
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

- менять `manifestUrl`, `mode`, `fixture`, `pageCode` и список `targets`;
- применить выбранные значения через URL contract;
- редактировать fixture-backed Context JSON для текущего запуска;
- перезапустить extension worker без перезагрузки страницы;
- сбросить sandbox state к текущей fixture.

Host API симулируется внутри sandbox. Вызовы расширения к `httpCall`
проходят через middleware-цепочку, где order-specific endpoints вроде
`/returns`, `/returns-count`, `/receipts` отвечают из fixture-backed данных.
Навигационные методы `goTo`, `pushQuery`, `replaceQuery` меняют in-memory
`host.location/navigation`; для автотестов текущее состояние доступно через
global bridge `window.__CRM_EMBED_SANDBOX__.snapshot()`.

## Playwright и стенд

Основной Docker-first способ поднять стенд:

```bash
docker compose up v1-sandbox
```

Эта команда поднимает только sandbox host. Расширение запускается отдельно,
из любого проекта, который отдаёт extension descriptor/entrypoint/script по
HTTP:

```text
%extension-url%/extension/%extension-id%
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

Real-extension e2e запускается только с внешним URL расширения:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox cli='e2e/sandbox-extension.e2e.ts'
```

Локально без Makefile это тот же env contract:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
yarn workspace @retailcrm/embed-ui-v1-sandbox e2e
```

Без `SANDBOX_EXTENSION_URL` этот сценарий пропускается, чтобы локальный и CI
запуск не зависели от конкретного extension server. Поэтому обычный запуск
может показывать `1 skipped`; если `SANDBOX_EXTENSION_URL` задан и внешний
extension server доступен, запускается полный набор e2e.

Полезные параметры:

- `workspace=...` — выбрать workspace, в котором лежит `vitest.config.playwright.ts`;
- `cli='--project chromium'` — передать флаги напрямую в `playwright test`;
- `cli='e2e/sandbox-extension.e2e.ts'` — запустить только один e2e-файл.

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
