# Архитектура `@retailcrm/embed-ui`

## 1. Назначение

Репозиторий содержит библиотечный слой для JS-расширений RetailCRM:

- контракт и транспорт между `remote` (код расширения) и `host` (CRM-страница);
- UI-компоненты с разделением на remote-описания и host-реализации;
- реактивные контексты (предопределенные и пользовательские);
- вспомогательные типы и тестовые утилиты.

Ключевая идея: расширение не рендерит «реальный DOM» CRM напрямую.  
Оно отправляет инструкции рендера и вызовов в host-часть через RPC/remote-runtime.

## 2. Структура монорепозитория

Монорепозиторий на Yarn Workspaces (`packages/*`), Yarn `4.12.0`, linker `node-modules`.

### `src/` (корневой пакет `@retailcrm/embed-ui`)

- точка входа SDK для расширений;
- `createWidgetEndpoint(widget, messenger)` поднимает endpoint и lifecycle `run/release`;
- создает remote-root с whitelist host-компонентов (`createRoot`);
- подключает Pinia + плагины доступа к контекстам (`injectEndpoint`, `injectAccessor`);
- экспортирует публичный API контекстов и composables (`useField`, `useCustomField`, `useHost`, `useRouter`).

### `packages/v1-components`

- UI-библиотека разделена на два entrypoint:
- `src/host.ts`: host-компоненты для реального рендера в CRM;
- `src/remote.ts`: remote-компоненты (описания/схемы для передачи в host).
- Storybook живет здесь и используется как витрина компонентов и сценариев.

### `packages/v1-contexts`

- слой реактивных контекстов и action-вызовов;
- `src/host.ts`: сборка host-accessor’ов (`createGetter`, `createSetter`, `createContextAccessor`, `createCustomContextAccessor`) и типизированные ошибки (`HostError`, `LogicalError`, `RuntimeError`);
- `src/remote.ts`: Pinia-обертки для предопределенных контекстов (`defineContext`) и инвокаций (`defineActions`);
- `src/remote/custom.ts`: доступ к пользовательским полям и словарям.

### `packages/v1-types`

- базовые TS-контракты (контексты, поля, отклонения, action-схемы и пр.);
- используется всеми остальными workspace.

### `packages/v1-testing`

- тестовые утилиты для runtime-сценариев (RPC/polyfill и хелперы событий).

## 3. Runtime-модель host/remote

### 3.1 Поток инициализации виджета

1. CRM (host) создает `messenger` и вызывает `createWidgetEndpoint(...)` из корневого SDK.
2. SDK поднимает RPC endpoint и экспортирует методы lifecycle: `run(channel, target)`, `release()`.
3. При `run(...)` создается remote-root с допустимыми host-компонентами, инициализируется Pinia с endpoint-плагинами контекстов, после чего вызывается `widget.run(createApp, root, pinia, target)`.
4. При `release()` вызывается destroy-функция виджета и освобождаются RPC-ресурсы.

### 3.2 Каналы ответственности

- `remote`: бизнес-логика расширения, декларативная сборка UI через remote-компоненты, чтение/запись контекстов через Pinia stores.
- `host`: фактический рендер, геометрия, DOM, popper/positioning, интерактивность, предоставление данных контекста и invokable-методов (`goTo`, `httpCall`, domain actions).

## 4. Архитектура компонентов

### 4.1 Общий паттерн

Для большинства компонентов сохраняется 1:1 соответствие:

- remote-компонент описывает схему и события;
- host-компонент выполняет фактический рендер.

Примеры: `UiButton`, `UiCheckbox`, `UiTooltip`.

### 4.2 Важный частный случай: `UiSelect`

`UiSelect` — первый явно композиционный пример, где соответствие не 1:1:

- remote-слой содержит семейство: `UiSelect`, `UiSelectOption`, `UiSelectOptionGroup`, `UiSelectOptionGroupHeader`;
- host-рендер опирается на `UiSelectTrigger` + `UiSelectPopper` + menu/popper-примитивы;
- состояние выбора/фильтрации и регистрация опций координируются через `provide/inject`-ключи.

Следствие: host-реестр компонентов должен отражать не только «публичные remote-компоненты», но и необходимые host-примитивы, из которых они фактически собираются.

### 4.3 Реестр host-компонентов: что в него входит

Реестр в `src/index.ts` должен содержать только те host-компоненты, которые достижимы из remote-схемы рендера.

- часть host-компонентов может быть внутренней (не remote-публичной) и потому не обязана попадать в реестр root SDK;
- обратный случай тоже возможен: один remote-компонент может требовать несколько host-примитивов;
- пример host-only компонента: `UiToolbar` экспортируется в `v1-components/host`, но не участвует в текущем remote render graph корневого SDK.

## 5. Контексты и данные

### 5.1 Предопределенные контексты

- контекст задается описанием схемы полей;
- remote-store инициализируется через `endpoint.call.get(context, '~')`;
- подписки на изменения поля устанавливаются через `endpoint.call.on('change:field', ...)`;
- запись идет через `endpoint.call.set(...)` с валидацией по schema.

### 5.2 Пользовательские контексты (custom fields)

- схема контекста запрашивается динамически у host;
- значения и типы полей становятся известны после `initialize()`;
- чтение/запись выполняются через `getCustomField/setCustomField`;
- словари грузятся отдельным каналом `getCustomDictionary`.

### 5.3 Ошибки и отклонения

- host-часть разделяет логические и runtime-ошибки;
- remote-часть может получать `Rejection` через callback `onReject`;
- в composables заданы безопасные обработчики по умолчанию (логирование в `console.error`).

## 6. Storybook как архитектурная песочница

`packages/v1-components/storybook` выполняет две роли:

- документация и интерактивная проверка host-компонентов;
- демонстрация host/remote-связки (сейчас явно показана в `UiSelect`-истории через worker + endpoint + HostedTree/provider/receiver).

Текущее состояние: bridge-механика визуально раскрыта не во всех историях, что усложняет onboarding для новых участников.

## 7. Сборка, релиз, CI

- сборка корня: `vite build` + генерация meta (`scripts/build.meta.ts`);
- workspace-сборка в CI: `yarn workspaces foreach -A --topological-dev run build`;
- тестовый workflow: Node `22.x` и `24.x`, шаги build + eslint + test;
- release workflow: build/lint/test, bump/release scripts, публикация npm, деплой Storybook (`version` + обновление `latest`).

## 8. Дальнейшее развитие качества

Следующий этап развития проекта направлен на усиление автоматизированного контроля качества и формализацию ключевых архитектурных инвариантов.

## 9. Планы по усилению контроля качества

Ближайшие шаги:

1. Ввести обязательный typecheck в локальный и CI-пайплайн.
2. Расширить тесты на ключевые контракты host/remote и на синхронизацию реестров компонентов.
3. Добавить автоматические проверки целостности render graph (минимум smoke/contract test).
4. Расширить Storybook-документацию: явно показывать host/remote-binding не только для `UiSelect`.
5. После стабилизации перейти к автоматизации registry/provider (кодогенерация) как к следующему этапу эволюции.
