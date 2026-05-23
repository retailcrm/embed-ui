# `@retailcrm/embed-ui-v1-contexts`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-contexts.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-contexts)

Логика реактивного контекста, используемого в JS-расширениях RetailCRM

## Установка

npm:

```bash
npm i --save @retailcrm/embed-ui-v1-contexts
```

yarn:
```bash
yarn add @retailcrm/embed-ui-v1-contexts
```

## AI-friendly profiles

Пакет генерирует AI-friendly profiles для predefined contexts, action scopes и custom contexts.
Они собираются из typed source metadata, а не редактируются вручную.

Generated profiles появляются в пакетных docs при сборке:

- `docs/contexts/*.yml` — profiles predefined contexts, например `order/card`;
- `docs/actions/*.yml` — profiles action scopes, например `order/card`;
- `docs/custom-contexts/*.yml` — profiles custom context entities, например `order`;
- `docs/*/index.json` — индексы generated resources.

Пакет также поставляет MCP stdio server `embed-ui-v1-contexts-mcp`, который отдает generated profiles как
MCP resources:

- `embed-ui-v1-contexts://contexts`;
- `embed-ui-v1-contexts://contexts/<encoded-context>`;
- `embed-ui-v1-contexts://actions`;
- `embed-ui-v1-contexts://actions/<encoded-scope>`;
- `embed-ui-v1-contexts://custom-contexts`;
- `embed-ui-v1-contexts://custom-contexts/<encoded-entity>`.

Пример Codex project-level MCP config:

```toml
[mcp_servers.v1-contexts]
command = "embed-ui-v1-contexts-mcp"
```

## AI и инициализация `AGENTS.md`

Чтобы агент понимал, когда использовать MCP-сервер и generated profiles пакета,
можно добавить в целевой проект секцию с инструкциями:

```bash
npx @retailcrm/embed-ui-v1-contexts init-agents
```

Если `AGENTS.md` ещё нет, команда создаст файл. Если файл уже есть, команда
допишет в конец английский блок для `@retailcrm/embed-ui-v1-contexts`, если
такого блока там ещё нет. С `--force` можно обновить уже существующий блок
пакета.

## Инициализация MCP-конфига

Пакет также может сам добавить project-level MCP-настройки в целевой проект:

```bash
npx @retailcrm/embed-ui-v1-contexts init-config
```

Команда создаёт или дополняет корневой `.mcp.json`, добавляет заметку в
`README.md` и не дублирует уже существующую настройку. Клиентские project-level
конфиги создаются только явно:

```bash
npx @retailcrm/embed-ui-v1-contexts init-config --mcp-client-configs codex,cursor,junie,vscode
```

Корневой `.mcp.json` рассчитан на Claude Code project scope и использует
`${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/embed-ui-v1-contexts-mcp`. Для Cursor
и VS Code генерируются client-specific project configs с `${workspaceFolder}`.

С `--force` можно обновить уже существующие управляемые записи. Команда
обновляет только запись `retailcrm-embed-ui-v1-contexts`, а остальные серверы и
пользовательские настройки клиентских конфигов оставляет без изменений.

Локальная генерация:

```bash
yarn workspace @retailcrm/embed-ui-v1-contexts run build:docs
```

Полная сборка workspace тоже запускает генерацию:

```bash
yarn workspace @retailcrm/embed-ui-v1-contexts run build
```

Release workflow перед публикацией выполняет `yarn workspaces foreach -A --topological-dev run build`,
поэтому profiles генерируются в CI и попадают в published package вместе с `docs`.
