# `@retailcrm/embed-ui-v1-types`

[![npm version](https://img.shields.io/npm/v/@retailcrm/embed-ui-v1-types.svg)](https://www.npmjs.com/package/@retailcrm/embed-ui-v1-types)

Базовые TypeScript типы, используемые в JS-расширениях RetailCRM

## Установка

npm:

```bash
npm i --save @retailcrm/embed-ui-v1-types
```

yarn:
```bash
yarn add @retailcrm/embed-ui-v1-types
```

## `HostApi.httpCall`

`host.httpCall(path, payload)` вызывает backend action JS-расширения. Передавайте вторым аргументом
ровно тот POJO-объект или строку, которые ожидает backend API этого action:

```ts
await host.httpCall('/embed/api/admin/specialties/save', {
    id: null,
    name: 'Development',
})
```

CRM самостоятельно отправляет POST-запрос на backend модуля и кладет второй аргумент в
form-encoded параметр `payload`. Если передан объект, CRM сериализует его сама; если передана строка,
CRM передает строку как есть. Отдельная упаковка и `JSON.stringify` на стороне frontend обычно не нужны.

Ключ `payload` внутри второго аргумента используйте только если backend action действительно ожидает
объект такой формы:

```ts
await host.httpCall('/embed/api/admin/specialties/save', {
    payload: {
        id: null,
        name: 'Development',
    },
})
```

Если вызов работает не так, как ожидается, сначала проверьте Network и фактический запрос,
который UI отправил на backend модуля: path, form-encoded параметры и значение `payload`.

## `HostApi.onBeforeRouteLeave`

`host.onBeforeRouteLeave(hook)` регистрирует callback, через который расширение сообщает host,
готово ли оно к уходу с текущей страницы.

```ts
host.onBeforeRouteLeave(() => !formHasUnsavedChanges.value)
```

Если callback возвращает `true`, расширение подтверждает, что переход можно продолжить. Если callback
возвращает `false`, расширение сообщает, что переход сейчас нежелателен, например из-за несохраненных
изменений. Host может использовать этот результат, чтобы показать подтверждение или удержать текущий
URL, но это уведомительный механизм: окончательное решение о навигации остается на стороне host.
