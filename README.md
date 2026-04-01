# @retailcrm/embed-ui

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui)

API и компоненты для создания расширений интерфейса RetailCRM

Витрина storybook для последней выпущенной версии: [embed-ui/v1-components/latest](https://retailcrm.github.io/embed-ui/v1-components/latest/index.html).

## Пакеты `v1-*`

- `v1-components` — UI-компоненты и сопутствующая документация, [README.md пакета](./packages/v1-components/README.md).
- `v1-contexts` — реактивные контексты и доступ к данным RetailCRM JS API, [README.md пакета](./packages/v1-contexts/README.md).
- `v1-endpoint` — endpoint API для remote-страниц и виджетов, [README.md пакета](./packages/v1-endpoint/README.md).
- `v1-testing` — тестовые утилиты и вспомогательные типы для интеграций, [README.md пакета](./packages/v1-testing/README.md).
- `v1-types` — базовые type declarations для публичного API, [README.md пакета](./packages/v1-types/README.md).

Для `v1-components` также доступен `npx`-скрипт, который может создать или дополнить локальный
`AGENTS.md` инструкциями по работе с `@retailcrm/embed-ui-v1-components`:

```bash
npx @retailcrm/embed-ui-v1-components init-agents
```

## Обновление версий в целевом проекте

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

Для точечного добавления пакетов только в один `package.json` есть флаг `--add`.
Если не передать `--packages`, CLI откроет интерактивный режим с выбором пакетов и кратким описанием.

```bash
npx @retailcrm/embed-ui --add
npx @retailcrm/embed-ui --add --packages components,contexts
npx @retailcrm/embed-ui --add --target ./my-project --version 0.9.11
```

## Цели встраивания

Цели встраивания определяют места, где будет размещена разметка виджета, генерируемая расширением.

https://docs.retailcrm.ru/Developers/modules/PublishingModuleMarketplace/JsModulesTargets
