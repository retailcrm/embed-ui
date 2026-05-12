# Фронтенд расширения RetailCRM

Проект создан командой `embed-ui init`.

## Что Добавлено

- `package.json` со скриптами для сборки Vite, ESLint и публикации расширения.
- `extensionrc.json` с исходным описанием манифеста расширения.
- `__SOURCE_ROOT__/endpoint/endpoint.worker.ts` с `defineRunner`, одним runner страницы и одним runner виджета.
- `__SOURCE_ROOT__/pages/SettingsPage.vue` как стартовая страница настроек.
- `__SOURCE_ROOT__/widgets/OrderCommonAfterWidget.vue` как стартовый виджет заказа.
- `__SOURCE_ROOT__/i18n/` с общими JSON-файлами переводов.
- `scripts/publish-extension.mjs` для создания `dist/extension.zip` и публикации интеграционного модуля через RetailCRM API.
- `AGENTS.md`, если при инициализации были включены инструкции для агентов.

## Замените Generic Значения

Перед использованием проекта в реальной интеграции проверьте сгенерированные общие значения:

- Код расширения в `extensionrc.json`: `retailcrm-extension-frontend`.
- Название расширения в `extensionrc.json`: `RetailCRM Extension Frontend`.
- Код страницы: `__PAGE_CODE__`.
- Цель виджета: `__WIDGET_TARGET__`.
- Демонстрационные контролы и ненастоящие данные в `__SOURCE_ROOT__/pages/SettingsPage.vue`.
- Демонстрационные toolbar-действия и ненастоящие данные заказа в `__SOURCE_ROOT__/widgets/OrderCommonAfterWidget.vue`.
- Общие сообщения в `__SOURCE_ROOT__/i18n/locales/*.json`.

Сгенерированные страница и виджет намеренно сделаны универсальными. Оставьте нужную структуру, но замените примерные подписи, поля и ненастоящие данные на реальное поведение продукта.

## Имена Vue-Файлов

`SettingsPage.vue` и `OrderCommonAfterWidget.vue` — универсальные стартовые имена. В продуктовом коде переименуйте Vue-файлы по роли, которую они выполняют в расширении, и обновите импорты в `__SOURCE_ROOT__/endpoint/endpoint.worker.ts`.

Примеры из репозитория расширений RetailCRM:

- `ReturnsPage.vue` — полноценная страница управления возвратами.
- `TasksPage.vue` — страница списка задач или рабочей области задач.
- `SummaryPage.vue` — страница сводки или дашборда.
- `RecordToCalendlyWidget.vue` — сфокусированный виджет под один сценарий.

Используйте тот же принцип: `LoyaltySettingsPage.vue`, `OrderNotesWidget.vue`, `PaymentStatusSidebar.vue` или другое имя, которое описывает реальный сценарий.

## Команды

```bash
__PACKAGE_MANAGER__ install
__PACKAGE_MANAGER_RUN__ eslint
__PACKAGE_MANAGER_RUN__ build
__PACKAGE_MANAGER_RUN__ publish-extension -- --archive-only
```

## Публикация

Создайте `.env` в корне проекта, когда потребуется обновлять RetailCRM через `publish-extension`:

```dotenv
CRM_API_HOST=https://example.retailcrm.pro
CRM_API_KEY=your-api-key
MODULE_URL=https://example.com
```

Перед публикацией выполните `__PACKAGE_MANAGER_RUN__ build`. Режим archive-only создает `dist/extension.zip` без API-запросов.
