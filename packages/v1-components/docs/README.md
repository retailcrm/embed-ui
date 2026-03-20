# Public API Docs For `@retailcrm/embed-ui-v1-components`

Этот каталог содержит consumer-facing документацию по публичному API пакета
`@retailcrm/embed-ui-v1-components`.

Документация предназначена для проектов, которые устанавливают пакет как зависимость
и используют его публичные entrypoint'ы.

## Public Entrypoints

- `@retailcrm/embed-ui-v1-components/remote`:
  основной entrypoint для extension UI code
- `@retailcrm/embed-ui-v1-components/host`:
  entrypoint для runtime-side интеграций
- `@retailcrm/embed-ui-v1-components/assets/...`:
  иконки и другие статические ресурсы пакета

Если у вас обычный код расширения, почти всегда нужен именно `remote`.

## Basic Usage

```vue
<template>
  <UiPageHeader v-model:value="title" editable size="xl" />

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

const title = ref('Новая рассылка')
const comment = ref('')

const submit = () => {
  // application logic
}
</script>
```

## Public API Principles

- Import from public package entrypoints only.
- Do not import from repository-internal paths such as `src/*`.
- Prefer `remote` for extension code.
- Use `host` only when your application is the runtime side for this component layer.
- Treat this package as an installed dependency, not as a source tree.

## Documentation Map

- [`COMPONENTS.md`](./COMPONENTS.md):
  public components and helpers catalog
- [`AI.md`](./AI.md):
  compact public API context for AI assistants and automation
- [`../README.md`](../README.md):
  package README
- [`../AGENTS.md`](../AGENTS.md):
  package-level usage guidance for AI agents
