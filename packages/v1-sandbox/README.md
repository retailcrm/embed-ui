# `@retailcrm/embed-ui-v1-sandbox`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-sandbox.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-sandbox)

CRM-подобная песочница для JS-расширений RetailCRM Embed UI v1. Пакет позволяет
запускать и тестировать страничные и виджетные расширения без установки в
реальный инстанс CRM.

## Установка

npm:

```bash
npm i --save @retailcrm/embed-ui-v1-sandbox
```

yarn:

```bash
yarn add @retailcrm/embed-ui-v1-sandbox
```

## Применение в расширениях

Пакет покрывает два основных сценария:

- ручной предпросмотр расширения в браузерном sandbox-приложении;
- автоматизированные тесты расширения без CRM на unit, browser и e2e уровнях.

Для ручной проверки запустите собранное sandbox-приложение:

```bash
npx @retailcrm/embed-ui-v1-sandbox serve
```

Если sandbox должен быть доступен извне контейнера, явно укажите `host` и `port`:

```bash
embed-ui-v1-sandbox serve --host 0.0.0.0 --port 4173
```

Откройте URL из вывода команды, укажите URL расширения
`%extension-url%/extension/%extension-id%`, выберите режим и fixture, затем нажмите `Apply`.

## Применение в тестах

Используйте публичные subpath-импорты вместо импорта из `src/*`:

```ts
import { createSandboxController } from '@retailcrm/embed-ui-v1-sandbox/core'
import { createSandboxHttpMiddleware } from '@retailcrm/embed-ui-v1-sandbox/scenario'
import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'
```

> [!IMPORTANT]
> Browser-тесты подходят для проверки реального worker-расширения в Chromium,
> обычно с замоканным `host.httpCall`. E2E-тесты нужны для полного сценария:
> sandbox-приложение, delivery URL расширения, загрузка стилей и реальный proxy flow `host.httpCall`.

Пример запуска расширения в Playwright:

```ts
import { expect, test } from '@playwright/test'

import { launchSandboxExtension } from '@retailcrm/embed-ui-v1-sandbox/automation/playwright'

test('loads extension page in sandbox', async ({ page }) => {
  await page.goto('/')

  await launchSandboxExtension(page, {
    fixture: 'order-basic',
    manifestUrl: '%extension-url%/extension/%extension-id%',
    mode: 'page',
    pageCode: 'returns',
  })

  await expect(page.getByRole('heading', { name: 'Returns' })).toBeVisible()
})
```

## Документация пакета

Дополнительные материалы по пакету находятся в `docs/`:

- [`AGENTS.md`](./AGENTS.md) - инструкции для AI-агентов, использующих пакет в
  целевом проекте или тестовом наборе.
- [`docs/index.md`](./docs/index.md) - точка входа в документацию sandbox.
- [`docs/usage-guide.md`](./docs/usage-guide.md) - ручное использование sandbox,
  CLI, DevPanel, URL contract, fixtures, context и симуляция HostAPI.
- [`docs/strategy.md`](./docs/strategy.md) - выбор между unit, browser и e2e
  тестами, semantic HTML и ARIA principles.
- [`docs/examples.md`](./docs/examples.md) - практические примеры unit, browser,
  e2e и ручного предпросмотра.
- [`docs/api.md`](./docs/api.md) - публичные импорты, subpath-пути пакета, CLI и
  границы стабильности API.

## Публичная поверхность пакета

Основные публичные области API:

- CLI: `embed-ui-v1-sandbox serve`.
- `core`: `createSandboxController`, `createSandboxState`, `createSandboxHostApi`, `createSandboxRpc`.
- `scenario`: `createOrderSandboxController`, `createSandboxHttpMiddleware`,
  `updateSandboxLaunchQuery`, fixtures, targets и validation helpers.
- `automation/browser`: `mountSandbox`, `launchSandboxExtension`, `waitForSandboxLaunchBridge`.
- `automation/playwright`: `createSandboxPagePath`, `createSandboxWidgetPath`,
  `launchSandboxExtension`, `readSandboxSnapshot`, `waitForSandboxLaunchBridge`.
- `node`: `serveSandbox`.

См. [`docs/api.md`](./docs/api.md) для полного обзора публичного API.

## Примечания

Пакет поставляет собранное browser-приложение из `dist/app` и runtime-библиотеки
из `dist/*.js|*.cjs|*.d.ts`. Docker/Makefile команды для работы с репозиторием
описаны в корне монорепозитория, а не в README пакета.
