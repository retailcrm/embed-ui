# `@retailcrm/embed-ui-v1-components`

UI-компоненты для JS-расширений RetailCRM.

Этот каталог нужен как точка входа в документацию по пакету `v1-components`: что он экспортирует, как его
использовать в расширениях и какие правила важно помнить при развитии библиотеки.

## Для кого этот пакет

- Для разработчиков JS-расширений RetailCRM, которые собирают интерфейс на Vue.
- Для разработчиков платформы, которые поддерживают host-реализацию компонентов внутри CRM.
- Для ИИ-ассистентов и автоматизаций, которым нужен компактный и точный контекст по публичному API пакета.

## Коротко о роли пакета

`v1-components` разделён на две части:

- `@retailcrm/embed-ui-v1-components/remote`:
  публичный API для расширений. Отсюда расширение импортирует компоненты, composable и утилиты.
- `@retailcrm/embed-ui-v1-components/host`:
  host-реализация, которую использует CRM для интерпретации remote-инструкций. Эту часть нельзя использовать
  как UI-библиотеку внутри кода расширения.

Также пакет экспортирует:

- `assets/*`:
  SVG и другие ресурсы для иконок и вспомогательной графики.
- `usePreview` и `ImageWorkersKey`:
  интеграцию с `@retailcrm/image-preview`.
- formatter helpers:
  `formatDate`, `formatDateTime`, `formatTime`.
- table helpers:
  общие типы и сущности таблиц, доступные из публичного API пакета.

## Базовый сценарий использования

Все UI-компоненты для расширения нужно импортировать из `remote`-entrypoint.

```vue
<template>
  <UiPageHeader title="История изменений" description="Показывает последние действия по заказу" />

  <UiField
    id="comment"
    label="Комментарий"
    hint="Текст увидит менеджер в CRM"
  >
    <UiTextbox v-model="comment" placeholder="Введите комментарий" />
  </UiField>

  <UiButton @click="submit">
    Сохранить
  </UiButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import {
  UiButton,
  UiField,
  UiPageHeader,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'

const comment = ref('')

const submit = () => {
  // логика сохранения
}
</script>
```

## Что важно помнить

- `remote` описывает интерфейс декларативно и передаёт инструкции host-слою.
- `host` отвечает за реальный рендеринг в CRM, стили, поведение и внутренние интеграции.
- Если компонент доступен расширению, его API должен быть согласован между `src/remote` и `src/host`.
- Для стандартного endpoint-сценария component schema должна быть зарегистрирована в `src/remote/endpoint.ts`.
- Storybook в этом пакете используется как живая витрина и точка проверки документации.

## Карта документации

- [`COMPONENTS.md`](./COMPONENTS.md):
  обзор публичных компонентов по группам.
- [`AI.md`](./AI.md):
  компактное описание пакета в формате, удобном для ИИ и автоматизаций.

## Связанные материалы в репозитории

- Корневой README монорепозитория:
  [`/README.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/README.md)
- Документация по endpoint API:
  [`/packages/v1-endpoint/docs/README.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-endpoint/docs/README.md)
- Документация по контекстам:
  [`/packages/v1-contexts/docs/ru/CONCEPT.md`](/Users/knigor/Desktop/Work/Embed-UI/embed-ui/packages/v1-contexts/docs/ru/CONCEPT.md)
