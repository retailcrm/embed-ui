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

## Playwright и стенд

Для smoke/e2e у workspace уже есть минимальный стенд на Vite. Точка входа:
`packages/v1-sandbox/index.html`.

Локально поднять стенд и открыть его в браузере:

```bash
yarn workspace @retailcrm/embed-ui-v1-sandbox run dev:e2e
```

То же самое через Docker/Makefile:

```bash
make sandbox.serve
```

Если нужно пробросить дополнительные флаги в `vite`, можно передать их через
`cli`:

```bash
make sandbox.serve cli='--host 0.0.0.0 --port 4173'
```

Для произвольных workspace-скриптов есть универсальная команда:

```bash
make workspace.run workspace=@retailcrm/embed-ui-v1-sandbox script=dev:e2e
```

Она тоже поддерживает `cli`, например:

```bash
make workspace.run workspace=@retailcrm/embed-ui-v1-sandbox script=dev:e2e cli='--host 0.0.0.0 --port 4173'
```

После старта Vite стенд будет доступен по адресу
`http://127.0.0.1:4173`.

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

Полезные параметры:

- `workspace=...` — выбрать workspace, в котором лежит `vitest.config.playwright.ts`;
- `cli='--project chromium'` — передать флаги напрямую в `playwright test`;
- `cli='e2e/example.spec.ts'` — запустить только один spec-файл.

Открыть HTML-отчёт Playwright с опубликованным портом:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox
```

Дополнительные флаги для отчёта тоже передаются через `cli`, например:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox cli='--port 9324'
```

Пакет пока закладывает только фундамент. Следующий слой можно наращивать уже
поверх этого workspace: CRM layout emulator, data fixtures, сценарные пресеты и
UI-обвязку для preview shell.
