# `@retailcrm/embed-ui-v1-components`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-components.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-components)

Компоненты UI для использования в JS-расширениях RetailCRM

## Установка

npm:

```bash
npm i --save @retailcrm/embed-ui-v1-components
```

yarn:
```bash
yarn add @retailcrm/embed-ui-v1-components
```

## Применение в расширениях

Все компоненты в расширениях надо импортировать из `@retailcrm/embed-ui-v1-components/remote`

Пример импорта и использования кнопки `UiButton`

```html
<template>
    <UiButton variant="danger">
        <IconDelete /> Удалить
    </UiButton>
</template>

<script lang="ts" setup>
import IconDelete from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/delete-outlined.svg'
import { UiButton } from '@retailcrm/embed-ui-v1-components/remote'
</script>
```

> [!IMPORTANT]
> Расширения используют определения из remote части для передачи системе инструкций, из чего собирать
интерфейс. Библиотека также содержит `@retailcrm/embed-ui-v1-components/host` &ndash; набор компонентов,
который будет использовать CRM при интерпретации инструкций от расширений. **_Не используйте_** host компоненты
как часть кода расширения.

## Документация пакета

Дополнительные материалы по пакету находятся в `docs/`:

- [`AGENTS.md`](./AGENTS.md) — инструкции для AI-агентов, использующих пакет в целевом проекте.
- [`docs/README.md`](./docs/README.md) — обзор пакета и правил использования.
- [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) — карта публичных компонентов.
- [`docs/AI.md`](./docs/AI.md) — контекст для ИИ и автоматизаций.
- [`docs/PROFILES.md`](./docs/PROFILES.md) — AI-friendly YAML-профили компонентов.
- [`docs/FORMAT.md`](./docs/FORMAT.md) — формат описания компонента для AI-агентов.
- [`docs/AGENT-DESIGN-GUIDELINES.md`](./docs/AGENT-DESIGN-GUIDELINES.md) — правила построения страниц,
  модалок, шторок, фильтров и таблиц.

## AI и инициализация `AGENTS.md`

После установки пакет показывает подсказку, что внутри есть `README.md`, `AGENTS.md`,
AI-заметки и YAML-профили компонентов.

Если в целевом проекте еще нет `AGENTS.md`, можно сгенерировать стартовый файл командой:

```bash
npx @retailcrm/embed-ui-v1-components init-agents
```

Если `AGENTS.md` уже существует, команда допишет в конец инструкции для
`@retailcrm/embed-ui-v1-components`, если такого блока там еще нет. С `--force`
можно обновить уже существующий блок пакета.
