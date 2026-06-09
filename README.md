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
- создает или дополняет `.gitignore` типовыми правилами для `node_modules`, `dist`, `coverage`, `.env` и логов;
- создает стартовые файлы во frontend-каталоге: endpoint worker, страницу настроек, виджет заказа, i18n JSON-сообщения;
- добавляет `extensionrc.json` и `scripts/publish-extension.mjs`;
- добавляет `AGENTS.md`, project-level skills и MCP-настройки пакетов, если они не отключены флагами;
- может инициализировать Git-репозиторий, если включить `--git` или выбрать это действие в интерактивном режиме.

```bash
npx @retailcrm/embed-ui init ./web --package-manager yarn
```

Если не указывать дополнительные флаги, `init` работает так:

- корень проекта — текущий рабочий каталог;
- frontend-каталог — позиционный аргумент команды, а если его нет, то `./src` для нового проекта или `./web`, если `./src` уже существует;
- версия пакетов — версия запущенного CLI;
- package manager — определяется по единственному lock-файлу в корне проекта, в интерактивном терминале запрашивается у пользователя, в неинтерактивном режиме используется `npm`;
- интерактивный выбор package manager показывает только найденные в `PATH` варианты, а явно выбранный недоступный manager останавливает `init` до записи файлов;
- пакеты — `@retailcrm/embed-ui`, `v1-components`, `v1-contexts`, `v1-types` и `v1-endpoint`;
- установка зависимостей — запускается автоматически после изменения `package.json`;
- шаблон — создается стартовая конфигурация для страницы настроек и виджета `order/card:common.after`;
- каталоги — создаются `endpoint`, `pages`, `widgets`, `shared`, `i18n` и `i18n/locales` внутри frontend-каталога;
- `AGENTS.md` — создается или дополняется инструкциями корневого пакета и выбранных пакетов;
- project-level skills — создаются в `.agents/skills/*` для выбранных пакетов;
- MCP — добавляется `.mcp.json` для выбранных пакетов с MCP (`v1-contexts` и `v1-endpoint`);
- project-level client configs для Codex CLI, Cursor, Junie и VS Code — не создаются без `--mcp-client-configs`;
- Git — в неинтерактивном режиме не инициализируется без `--git`, а в интерактивном режиме предлагается, если корень проекта не является Git-репозиторием;
- существующие файлы не перезаписываются, а зависимости с потенциальным конфликтом не заменяются без явных force-флагов.

По умолчанию команда использует текущий рабочий каталог как корень проекта. Его можно задать явно:

```bash
npx @retailcrm/embed-ui init ./web --cwd ./my-project --package-manager npm
```

Если в проекте уже есть `src`, для нового фронтенда расширения удобнее использовать отдельный каталог, например
`./web`. CLI не перезаписывает существующие файлы без явного разрешения и выводит предупреждения о пропущенных шагах.

Полезные флаги:

- `--no-install` — не запускать установку зависимостей после изменения `package.json`.
- `--interactive` — задать основные параметры через TTY-интерфейс со списками выбора, сохранив флаги как явные ограничения.
- `--verbose` — вывести подробный список изменений после `init`; без него CLI печатает краткую сводку.
- `--version 0.9.21` — использовать указанную версию пакетов вместо версии запущенного CLI.
- `--exact` — записывать точные версии вместо диапазонов.
- `--packages embed-ui,components,contexts,types,endpoint` — явно выбрать пакеты для установки и настройки.
- `--with components,endpoint` — добавить опубликованные пакеты к стандартному набору `init`.
- `--package-manager yarn|npm|pnpm|bun` — явно выбрать package manager для установки.
- `--src-dir ./frontend` — задать frontend source root относительно корня проекта.
- `--dirs endpoint,pages,widgets,shared,i18n` — задать набор стартовых каталогов; дополнительно поддерживаются `src` и `tests`.
- `--no-dirs` — не создавать стартовые каталоги.
- `--template order-card` — выбрать стартовый шаблон; сейчас поддерживается `order-card`.
- `--page-code settings` — задать код стартовой embedded-страницы.
- `--widget-target order/card:common.after` — задать стартовый target виджета.
- `--force` — включить общий force-режим для управляемых файлов, hook-команд и install.
- `--force-deps` — заменить несовместимые версии зависимостей.
- `--fix-sections` — перенести зависимости в ожидаемые секции `dependencies`/`devDependencies`.
- `--force-files` — перезаписать генерируемые стартовые файлы.
- `--no-configs` — не создавать `tsconfig.json`, `vite.config.ts`, `eslint.config.js` и `env.d.ts`.
- `--no-template` — не создавать стартовые Vue-файлы и `extensionrc.json`.
- `--no-agents` — не создавать и не дополнять `AGENTS.md`.
- `--force-agents` — обновить управляемую секцию `AGENTS.md` и прокинуть `--force` в package-level agent hooks.
- `--agents-only` — установить только agent-инструкции, без изменения зависимостей, шаблонов, skills и MCP.
- `--no-skills` — не создавать и не обновлять project-level skills в `.agents/skills/*`.
- `--force-skills` — обновить уже существующие управляемые project-level skills.
- `--skills-only` — установить только project-level skills, без изменения зависимостей, шаблонов и `AGENTS.md`.
- `--no-mcp` — не добавлять MCP-настройки пакетов.
- `--force-mcp` — прокинуть `--force` в package-level MCP config hooks.
- `--mcp-client-configs codex,cursor,junie,vscode` — дополнительно создать project-level конфиги поддерживаемых AI-клиентов.
- `--git` — выполнить `git init` в корне проекта, если каталог еще не является Git-репозиторием.

`--force` включает силовой режим для управляемых частей, но учитывает флаги `--no-*`. Например, можно обновить только
агентские инструкции и MCP-настройки без перегенерации стартовых файлов:

```bash
npx @retailcrm/embed-ui init ./web --force --no-install --no-template
```

### AGENTS.md, Skills И MCP

При `init` CLI добавляет общий раздел в `AGENTS.md`, project-level skills в `.agents/skills/*`, а пакеты могут
добавить свои инструкции. Сейчас это используют:

- `@retailcrm/embed-ui-v1-components` — добавляет порядок чтения README, AI-документации и YAML-профилей компонентов.
- `@retailcrm/embed-ui-v1-contexts` — добавляет workflow применения контекстов, actions, custom contexts и MCP-ресурсов.
- `@retailcrm/embed-ui-v1-endpoint` — добавляет инструкции по целям виджетов и MCP-ресурсам.

Project-level skills дополняют `AGENTS.md`: `AGENTS.md` задает базовые правила проекта, а skills описывают
повторяемые процедуры для конкретных задач. Чтобы установить или обновить только skills, используйте:

```bash
npx @retailcrm/embed-ui init-skills
```

Или в рамках init:

```bash
npx @retailcrm/embed-ui init ./web --skills-only
```

Для `v1-contexts` и `v1-endpoint`, если эти пакеты выбраны для установки, также создается `.mcp.json` с серверами
`retailcrm-embed-ui-v1-contexts` и `retailcrm-embed-ui-v1-endpoint`. Этот файл рассчитан на Claude Code project scope
и использует `${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/...`, чтобы серверы резолвились относительно открытого проекта.
MCP отдает AI-friendly описания через ресурсы:

- `embed-ui-v1-contexts://contexts`;
- `embed-ui-v1-contexts://contexts/<encoded-context>`;
- `embed-ui-v1-contexts://actions`;
- `embed-ui-v1-contexts://actions/<encoded-scope>`;
- `embed-ui-v1-contexts://custom-contexts`;
- `embed-ui-v1-contexts://custom-contexts/<encoded-entity>`;
- `embed-ui-v1-endpoint://targets`;
- `embed-ui-v1-endpoint://targets/<encoded-target>`.

Конфиги конкретных клиентов не создаются по умолчанию, потому что в них чаще бывают пользовательские правки.
Чтобы добавить только поддерживаемые project-level конфиги, укажите:

```bash
npx @retailcrm/embed-ui init ./web --no-install --mcp-client-configs codex,cursor,junie,vscode
```

Для Codex CLI создается `.codex/config.toml`. Codex подхватывает его только в trusted project, поэтому после генерации
проект нужно открыть/перезапустить в Codex и доверить ему проект, если клиент спросит. User-level подключение через
`codex mcp add` намеренно не выполняется автоматически: на одной машине могут быть проекты с разными версиями
`@retailcrm/embed-ui*`, а user-level серверы с одинаковыми MCP resource URI могут конфликтовать между собой.
Для Cursor и VS Code CLI генерирует project-level конфиги с `${workspaceFolder}/node_modules/.bin/...`; для Junie
остается относительный `./node_modules/.bin/...`.

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
