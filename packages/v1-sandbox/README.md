# `@retailcrm/embed-ui-v1-sandbox`

`@retailcrm/embed-ui-v1-sandbox` поднимает in-memory песочницу для превью,
standalone-тестирования и автоматизации JS-расширений без живой CRM.

Стартовый пакет покрывает базовый фундамент:

- реактивное состояние sandbox;
- host API emulator (`goTo`, `httpCall`, `replaceQuery`, `pushQuery`);
- типизированные context/custom accessors поверх `v1-types` и `v1-contexts`;
- global bridge для automation/AI через `globalThis`;
- RPC helper для подключения remote runtime в тестах и превью.

## Быстрый старт

```ts
import { createSandboxController, createSandboxRpc } from '@retailcrm/embed-ui-v1-sandbox'

const sandbox = createSandboxController({
  mode: 'preview',
  schemas: {
    article: {
      title: {
        accepts: (value: unknown): value is string => typeof value === 'string',
        defaults: () => 'Draft',
        readonly: false,
      },
    },
  },
})

const { remote } = createSandboxRpc(sandbox)

await remote.call.set('article', 'title', 'Preview title')
```

## Режимы

- `preview` — ручное превью и локальная отладка;
- `automation` — управление песочницей через bridge/API;
- `standalone-test` — сценарии для unit/integration/e2e без CRM.

Пакет пока закладывает только фундамент. Следующий слой можно наращивать уже
поверх этого workspace: CRM layout emulator, data fixtures, сценарные пресеты и
UI-обвязку для preview shell.
