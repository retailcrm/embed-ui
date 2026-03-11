# @retailcrm/embed-ui

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui)

API и компоненты для создания расширений интерфейса RetailCRM

Витрина storybook для последней выпущенной версии: [embed-ui/v1-components/latest](https://retailcrm.github.io/embed-ui/v1-components/latest/index.html).

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
