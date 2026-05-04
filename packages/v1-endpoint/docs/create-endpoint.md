# `createEndpoint`

`createEndpoint` связывает runner и transport (`messenger`) и экспортирует
endpoint API (`run`, `release`, `reset`) через `@remote-ui/rpc`.

## Сигнатура

```ts
createEndpoint(
  runner: {
    page: PageRunner;
    widget: WidgetRunner;
  },
  messenger: MessageEndpoint
): Endpoint<RemoteApi>
```

## Поведение

При `run(...)`:

1. сбрасывает предыдущее монтирование для того же `id` (widget) или `code` (page),
2. поднимает endpoint root (`mountEndpointRoot`),
3. создаёт `pinia` и инжектит endpoint/context accessors,
4. вызывает нужный runner (`page.run` или `widget.run`),
5. сохраняет destroy-функцию в реестре.

При `release(...)`:

- вызывает destroy для конкретного `id` или `code`.

При `reset()`:

- вызывает destroy для всех активных page/widget инстансов.

## Пример

```ts
import { defineRunner, createEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

const runner = defineRunner({
  pages: [MyPageRoot],
  widgets: [MyWidgetRoot],
})

createEndpoint(runner, self as unknown as MessageEndpoint)
```

## Когда нужен именно `createEndpoint`

- Нужна кастомная интеграция transport-слоя.
- Нужно использовать endpoint не через стандартную точку входа веб-воркера.
