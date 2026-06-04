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

Workspace содержит dev sandbox для запуска widget extensions в CRM-подобной
оболочке. Сейчас поддерживается первый сценарий: `order/card` targets, запуск
одного widget worker и Playwright feedback loop.

Публичный URL contract:

- `extensionUrl` — URL module worker entrypoint расширения;
- `target` — один из поддержанных `order/card:*` targets;
- `widgetId` — идентификатор widget instance, по умолчанию `sandbox-widget`;
- `fixture` — код фикстуры, по умолчанию `order-basic`.

Пример:

```text
http://127.0.0.1:4173/?extensionUrl=/src/demo-extension.ts&target=order/card:common.before&fixture=order-basic
```

Extension entrypoint должен быть worker-compatible и вызвать
`runEndpoint(defineRunner(...))`:

```ts
import { defineRunner, runEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

runEndpoint(defineRunner({
  pages: [],
  widgets: [/* Vue widget component or runner map */],
}))
```

## Playwright и стенд

Основной Docker-first способ поднять стенд:

```bash
docker compose up v1-sandbox
```

То же самое через Docker/Makefile:

```bash
make sandbox.serve
```

После старта Vite стенд будет доступен по адресам:

- `http://127.0.0.1:4173`;
- `http://v1.embed-ui-sandbox.local` при настроенном OrbStack/Traefik.

Для произвольных workspace-скриптов есть универсальная команда:

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
- `cli='e2e/example.spec.ts'` — запустить только один spec-файл.

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
