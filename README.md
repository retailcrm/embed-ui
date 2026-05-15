# @retailcrm/embed-ui

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui)

API и компоненты для создания расширений интерфейса RetailCRM

Витрина storybook для последней выпущенной версии: [embed-ui/v1-components/latest](https://retailcrm.github.io/embed-ui/v1-components/latest/index.html).

## Пакеты `v1-*`

- `v1-components` — UI-компоненты и сопутствующая документация, [README.md пакета](./packages/v1-components/README.md).
- `v1-contexts` — реактивные контексты и доступ к данным RetailCRM JS API, [README.md пакета](./packages/v1-contexts/README.md).
- `v1-endpoint` — endpoint API для встраиваемых страниц и виджетов, [README.md пакета](./packages/v1-endpoint/README.md).
- `v1-testing` — тестовые утилиты и вспомогательные типы для интеграций, [README.md пакета](./packages/v1-testing/README.md).
- `v1-types` — базовые type declarations для публичного API, [README.md пакета](./packages/v1-types/README.md).

Для `v1-components` также доступен `npx`-скрипт, который может создать или дополнить локальный
`AGENTS.md` инструкциями по работе с `@retailcrm/embed-ui-v1-components`:

```bash
npx @retailcrm/embed-ui-v1-components init-agents
```

## CLI `@retailcrm/embed-ui`

Пакет поставляет бинарник `embed-ui`, который можно запускать через `npx`.
CLI умеет обновлять версии пакетов, добавлять пакеты в существующий проект и выполнять начальную инициализацию
фронтенда расширения.

```bash
npx @retailcrm/embed-ui --help
```

### Начальная Инициализация

Команда `init` создает или дополняет проект фронтенда расширения:

- добавляет `package.json`, если его еще нет;
- добавляет зависимости `@retailcrm/embed-ui*`, `vue`, `pinia`, `vue-i18n` и dev-зависимости для Vite, TypeScript и ESLint;
- создает `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `env.d.ts`;
- создает стартовые файлы во frontend-каталоге: endpoint worker, страницу настроек, виджет заказа, i18n JSON-сообщения;
- добавляет `extensionrc.json` и `scripts/publish-extension.mjs`;
- добавляет `AGENTS.md` и MCP-настройки пакетов, если они не отключены флагами.

```bash
npx @retailcrm/embed-ui init ./web --package-manager yarn
```

Если не указывать дополнительные флаги, `init` работает так:

- корень проекта — текущий рабочий каталог;
- frontend-каталог — позиционный аргумент команды, а если его нет, то `./src` для нового проекта или `./web`, если `./src` уже существует;
- версия пакетов — последняя опубликованная версия из npm;
- package manager — определяется по единственному lock-файлу в корне проекта, в интерактивном терминале запрашивается у пользователя, в неинтерактивном режиме используется `npm`;
- пакеты — `@retailcrm/embed-ui`, `v1-components`, `v1-contexts`, `v1-types` и `v1-endpoint`;
- установка зависимостей — запускается автоматически после изменения `package.json`;
- шаблон — создается стартовая конфигурация для страницы настроек и виджета `order/card:common.after`;
- каталоги — создаются `endpoint`, `pages`, `widgets`, `shared`, `i18n` и `i18n/locales` внутри frontend-каталога;
- `AGENTS.md` — создается или дополняется инструкциями корневого пакета и выбранных пакетов;
- MCP — добавляется `.mcp.json` для `v1-endpoint`;
- client configs для Cursor, Junie и VS Code — не создаются без `--mcp-client-configs`;
- существующие файлы не перезаписываются, а зависимости с потенциальным конфликтом не заменяются без явных force-флагов.

По умолчанию команда использует текущий рабочий каталог как корень проекта. Его можно задать явно:

```bash
npx @retailcrm/embed-ui init ./web --cwd ./my-project --package-manager npm
```

Если в проекте уже есть `src`, для нового фронтенда расширения удобнее использовать отдельный каталог, например
`./web`. CLI не перезаписывает существующие файлы без явного разрешения и выводит предупреждения о пропущенных шагах.

Полезные флаги:

- `--no-install` — не запускать установку зависимостей после изменения `package.json`.
- `--interactive` — задать основные параметры через вопросы в TTY, сохранив флаги как явные ограничения.
- `--version 0.9.21` — использовать указанную версию пакетов вместо последней версии из npm.
- `--exact` — записывать точные версии вместо диапазонов.
- `--packages embed-ui,components,contexts,types,endpoint` — явно выбрать пакеты для установки и настройки.
- `--force-deps` — заменить несовместимые версии зависимостей.
- `--fix-sections` — перенести зависимости в ожидаемые секции `dependencies`/`devDependencies`.
- `--force-files` — перезаписать генерируемые стартовые файлы.
- `--no-configs` — не создавать `tsconfig.json`, `vite.config.ts`, `eslint.config.js` и `env.d.ts`.
- `--no-template` — не создавать стартовые Vue-файлы и `extensionrc.json`.
- `--no-agents` — не создавать и не дополнять `AGENTS.md`.
- `--no-mcp` — не добавлять MCP-настройки пакетов.
- `--mcp-client-configs cursor,junie,vscode` — дополнительно создать project-level конфиги поддерживаемых AI-клиентов.

`--force` включает силовой режим для управляемых частей, но учитывает флаги `--no-*`. Например, можно обновить только
агентские инструкции и MCP-настройки без перегенерации стартовых файлов:

```bash
npx @retailcrm/embed-ui init ./web --force --no-install --no-template
```

### AGENTS.md И MCP

При `init` CLI добавляет общий раздел в `AGENTS.md`, а пакеты могут добавить свои инструкции. Сейчас это используют:

- `@retailcrm/embed-ui-v1-components` — добавляет порядок чтения README, AI-документации и YAML-профилей компонентов.
- `@retailcrm/embed-ui-v1-endpoint` — добавляет инструкции по целям виджетов и MCP-ресурсам.

Для `v1-endpoint` также создается `.mcp.json` с сервером `retailcrm-embed-ui-v1-endpoint`. Он отдает AI-friendly
описания целей виджетов через ресурсы:

- `embed-ui-v1-endpoint://targets`;
- `embed-ui-v1-endpoint://targets/<encoded-target>`.

Конфиги конкретных клиентов не создаются по умолчанию, потому что в них чаще бывают пользовательские правки.
Чтобы добавить только поддерживаемые project-level конфиги, укажите:

```bash
npx @retailcrm/embed-ui init ./web --no-install --mcp-client-configs cursor,junie,vscode
```

Повторный запуск без `--force` не дублирует управляемые секции и записи MCP. При `--force` обновляются только записи
этого пакета, ручные серверы и соседние разделы не удаляются.

### Обновление Версий

Можно запустить бинарник через `npx`, чтобы обновить пакеты `@retailcrm/embed-ui*` во всех `package.json`
текущего рабочего дерева или выбранного поддерева
(`dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`).

```bash
npx @retailcrm/embed-ui
npx @retailcrm/embed-ui --version 0.9.11
npx @retailcrm/embed-ui ./my-project 0.9.11
npx @retailcrm/embed-ui --target ./my-project --dry-run
```

По умолчанию используется последняя версия из npm. Флаг `--exact` переключает формат обновления на точную версию.
CLI сохраняет исходные отступы и переводы строк в каждом изменяемом `package.json`.

### Добавление Пакетов

Для точечного добавления пакетов только в один `package.json` есть флаг `--add`.
Если не передать `--packages`, CLI откроет интерактивный режим с выбором пакетов и кратким описанием.

```bash
npx @retailcrm/embed-ui --add
npx @retailcrm/embed-ui --add --packages components,contexts
npx @retailcrm/embed-ui --add --target ./my-project --version 0.9.11
```

Доступные идентификаторы пакетов: `embed-ui`, `components`, `contexts`, `types`, `endpoint`.
Пакет `testing` пока не добавляется через публичную инициализацию.

## Цели встраивания

Цели встраивания определяют места, где будет размещена разметка виджета, генерируемая расширением.

https://docs.retailcrm.ru/Developers/modules/PublishingModuleMarketplace/JsModulesTargets
