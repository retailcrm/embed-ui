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
2. удерживает переданный channel на время жизни запуска,
3. поднимает endpoint root (`mountEndpointRoot`),
4. создаёт `pinia` и инжектит endpoint/context accessors,
5. вызывает нужный runner (`page.run` или `widget.run`),
6. сохраняет destroy-функцию в реестре.

Если монтирование завершается с ошибкой, endpoint освобождает удержанный channel.

При `release(...)`:

- отменяет ещё не завершившееся монтирование либо вызывает destroy для активного
  `id` или `code`,
- освобождает удержанный channel,
- не допускает позднего mount после отмены.

При `reset()`:

- отменяет все незавершённые монтирования и вызывает destroy для всех активных
  page/widget инстансов.

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
