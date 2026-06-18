# v1-sandbox: как пользоваться песочницей

`v1-sandbox` — это локальная CRM-подобная среда для запуска JS-расширений без установки в настоящую CRM. Песочница загружает внешнее расширение по URL, монтирует его в выбранное место встраивания или страницу, отдаёт fixture-backed context и симулирует HostAPI.

## Быстрый старт

1. Поднимите sandbox:

```bash
docker compose up v1-sandbox
```

2. Откройте страницу:

```text
%crm-url%
```

`%crm-url%` зависит от локальной container/DNS-настройки окружения. Под Linux Docker используется Traefik и домен верхнего уровня `.test`; для OrbStack на macOS используется `.local` из доменного пространства имён.

3. Поднимите отдельно проект расширения. Он должен отдавать frontend-модуль по HTTP. Обычно URL выглядит так:

```text
%extension-url%/extension/%extension-id%
```

4. В песочнице нажмите иконку `</>` в нижней части тёмного rail. Откроется панель `Управление песочницей`.

5. В поле `Manifest / URL расширения` вставьте URL расширения.

6. Выберите режим:

- `Виджеты` — расширение монтируется в один или несколько `order/card:*` targets.
- `Страница` — расширение монтируется как page runner по `pageCode`.

7. Нажмите `Применить`. Песочница обновит URL и запустит расширение.

## Что вставлять в Manifest / URL расширения

Основной вариант — URL descriptor/entrypoint расширения:

```text
%extension-url%/extension/%extension-id%
```

Sandbox умеет загрузить:

- JSON manifest/descriptor;
- HTML entrypoint, из которого берётся первый `<script src>` из `<head>`;
- прямой JS script.

Если расширение отдаёт core-style script отдельно, доставка обычно выглядит так:

```text
%extension-url%/extension/%extension-id%/script
```

Но в поле панели обычно вставляется базовый URL расширения:

```text
%extension-url%/extension/%extension-id%
```

## Запуск виджета

Используйте режим `Виджеты`, если расширение регистрирует `widgets` через `defineRunner`.

В панели:

1. Вставьте `Manifest / URL расширения`.
2. Выберите `Режим: Виджеты`.
3. Выберите `Фикстура`.
4. Отметьте нужные `Места встраивания виджетов`.
5. Нажмите `Применить`.

Поддержанные targets текущего этапа:

- `order/card:common.before`;
- `order/card:common.after`;
- `order/card:delivery.before`;
- `order/card:payment.before`.

Targets — это CRM-слоты. Если отметить два targets, песочница создаст два widget instance и вызовет runner для каждого выбранного места.

Пример URL для прямого открытия:

```text
%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

## Запуск страницы

Используйте режим `Страница`, если расширение регистрирует `pages` через `defineRunner`.

В панели:

1. Вставьте `Manifest / URL расширения`.
2. Выберите `Режим: Страница`.
3. В поле `Код страницы` укажите page code из manifest/runner.
4. Выберите `Фикстура`.
5. Нажмите `Применить`.

Важно: page code — это не `uuid` расширения и не `code` модуля. Это значение из массива `pages`.

Например, для manifest:

```json
{
  "uuid": "05a9f990-7cfc-46c2-af0f-3abfd3d4c334",
  "pages": [
    { "code": "board" },
    { "code": "summary" }
  ]
}
```

В поле `Manifest / URL расширения` нужно вставить:

```text
%extension-url%/extension/05a9f990-7cfc-46c2-af0f-3abfd3d4c334
```

А в поле `Код страницы` указать одно из:

```text
board
summary
```

Пример URL для прямого открытия:

```text
%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%&fixture=order-basic
```

## Фикстуры и Context JSON

Фикстура задаёт состояние CRM, которое увидит расширение через context API. Сейчас доступны:

- `order-basic` — базовый заказ;
- `order-with-delivery` — заказ с доставкой;
- `order-readonly-error` — readonly/error-like заказ.

В `Context JSON` можно временно изменить context текущего запуска без правки кода.

Пример: поменять номер заказа:

```json
{
  "order/card": {
    "number": "999C"
  }
}
```

На практике удобнее не удалять весь JSON, а изменить нужное поле в уже показанном объекте.

После изменения нажмите `Применить контекст`. Sandbox применит patch к текущему context и перезапустит расширение, чтобы оно прочитало новые данные.

Кнопка `Сбросить состояние` возвращает context, custom fields, HostAPI state и location к исходной фикстуре.

## HostAPI simulation

Песочница отдаёт расширению HostAPI:

- `httpCall`;
- `getLocation`;
- `goTo`;
- `pushQuery`;
- `replaceQuery`;
- `onBeforeRouteLeave`.

`httpCall` проходит через middleware внутри sandbox. Для order-сценариев сейчас локально симулируются:

- `/returns`;
- `/returns-count`;
- `/receipts`;
- `/receipts-count`.

Это значит, что расширение может вызвать `httpCall('/returns', payload)`, а ответ придёт из fixture-backed данных, без настоящей CRM.

Состояние для автотестов доступно в браузере:

```ts
window.__CRM_EMBED_SANDBOX__.snapshot()
```

Через snapshot можно проверить:

- какие `httpCall` были выполнены;
- какой текущий `host.location`;
- какие navigation actions были вызваны;
- какой context сейчас активен.

## Как понять, что расширение подключилось

Проверьте три места:

1. На странице появился UI расширения в выбранном target или page area.
2. В DevTools Network есть запросы к extension server: manifest/entrypoint/script/stylesheet.
3. В консоли нет ошибок запуска runner.

Если страница пустая:

- проверьте, что `Manifest / URL расширения` не пустой;
- для `Страница` проверьте правильный `Код страницы`;
- для `Виджеты` проверьте, что выбран target, который расширение реально регистрирует;
- если расширение legacy iframe, запускайте его только в режиме `Виджеты`;
- если Network показывает CORS-ошибку, extension server должен разрешать origin `%crm-url%`.

## Playwright

Запуск e2e через Docker:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox
```

Запуск одного файла:

```bash
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox cli='e2e/sandbox-extension.e2e.ts'
```

`sandbox-extension.e2e.ts` проверяет реальное расширение только если задан
внешний URL:

```bash
SANDBOX_EXTENSION_URL=%extension-url%/extension/%extension-id% \
make tests-playwright workspace=@retailcrm/embed-ui-v1-sandbox cli='e2e/sandbox-extension.e2e.ts'
```

Дополнительные параметры:

- `SANDBOX_EXTENSION_PAGE_CODE` — page code расширения, по умолчанию `returns`;
- `SANDBOX_EXTENSION_TARGET` — widget target, по умолчанию `order/card:common.after`.

Если `SANDBOX_EXTENSION_URL` не задан, real-extension сценарий пропускается.

Открыть HTML report:

```bash
make playwright-report workspace=@retailcrm/embed-ui-v1-sandbox
```

Playwright проверяет:

- загрузку shell;
- открытие control panel;
- обновление публичного URL contract из control panel;
- запуск внешнего extension URL, если задан `SANDBOX_EXTENSION_URL`;
- действие пользователя внутри расширения;
- работу `httpCall` через sandbox middleware;
- изменение context через JSON editor;
- reset состояния.

## Полезные URL-шаблоны

Виджеты:

```text
%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.after&fixture=order-basic
```

Несколько виджетов:

```text
%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=widget&targets=order/card:common.before,order/card:common.after&fixture=order-basic
```

Страница:

```text
%crm-url%/?manifestUrl=%extension-url%/extension/%extension-id%&mode=page&pageCode=%page-code%&fixture=order-basic
```

Где:

- `%crm-url%` — адрес sandbox/CRM-оболочки из локальной container/DNS-настройки окружения.
  Под Linux Docker используется Traefik и домен верхнего уровня `.test`;
  для OrbStack на macOS используется `.local` из доменного пространства имён;
- `%extension-url%` — origin внешнего extension server;
- `%extension-id%` — UUID/ID расширения на extension server;
- `%page-code%` — code страницы из manifest/runner.
