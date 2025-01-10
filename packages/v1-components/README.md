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
