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
