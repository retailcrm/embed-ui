# `createEndpoint`

`createEndpoint` связывает runner и transport (messenger), после чего
экспортирует endpoint API (`run`, `release`, `reset`) через `@remote-ui/rpc`.

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

## Что делает под капотом

При `run(...)`:

1. сбрасывает предыдущий mount для того же `id` (widget) или `code` (page),
2. поднимает remote root (`mountEndpointRoot`),
3. создаёт `pinia` и инжектит endpoint/context accessors,
4. вызывает нужный runner (`page.run` или `widget.run`),
5. сохраняет destroy-функцию в registry.

При `release(...)`:

- вызывает destroy для конкретного `id` или `code`.

При `reset()`:

- вызывает destroy для всех активных page/widget инстансов.

## Пример (низкоуровневый)

```ts
import { defineRunner, createEndpoint } from '@retailcrm/embed-ui-v1-endpoint/remote'

const runner = defineRunner({
  pages: [MyPageRoot],
  widgets: [MyWidgetRoot],
})

// messenger зависит от среды исполнения
createEndpoint(runner, self as unknown as MessageEndpoint)
```

## Когда нужен именно `createEndpoint`

- Нужна кастомная интеграция transport-слоя.
- Вы сами контролируете, где и как создаётся `MessageEndpoint`.
- Нужно использовать endpoint не через стандартный worker-entry сценарий.
