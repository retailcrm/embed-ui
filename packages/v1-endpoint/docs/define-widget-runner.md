# `defineWidgetRunner`

`defineWidgetRunner` создаёт runner для remote-виджетов.
При запуске в компонент пробрасывается проп `target`.

## Перегрузки

```ts
defineWidgetRunner(component: Component, beforeMount?: (app, pinia) => void | Promise<void>): Runner
defineWidgetRunner(runners: Partial<Record<TargetName, Runner>>): Runner
```

## Вариант 1. Один компонент на все target

```ts
import { defineWidgetRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import WidgetRoot from './WidgetRoot.vue'

const widgetRunner = defineWidgetRunner(WidgetRoot)
```

Компонент получит `target` как prop:

```ts
// внутри WidgetRoot
defineProps<{
  target: string;
}>()
```

## Вариант 2. Разные раннеры по `target`

```ts
import { defineWidgetRunner } from '@retailcrm/embed-ui-v1-endpoint/remote'

import BeforeWidget from './BeforeWidget.vue'
import AfterWidget from './AfterWidget.vue'

const widgetRunner = defineWidgetRunner({
  'order/card:common.before': defineWidgetRunner(BeforeWidget),
  'order/card:common.after': defineWidgetRunner(AfterWidget),
})
```

Если для `target` нет раннера, будет warning в консоль и noop-destroy.

## `beforeMount`

`beforeMount` работает аналогично page-раннеру: выполняется перед mount и после подключения `pinia`.

```ts
const widgetRunner = defineWidgetRunner(WidgetRoot, async (app, pinia) => {
  // init code
})
```
