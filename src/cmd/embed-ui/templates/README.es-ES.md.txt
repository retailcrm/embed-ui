# Frontend de extension RetailCRM

Este proyecto fue generado por `embed-ui init`.

## Que Se Agrego

- `package.json` con scripts para Vite build, ESLint y publicacion de la extension.
- `extensionrc.json` con la fuente del manifiesto de la extension.
- `__SOURCE_ROOT__/endpoint/endpoint.worker.ts` con `defineRunner`, un runner de pagina y un runner de widget.
- `__SOURCE_ROOT__/pages/SettingsPage.vue` como pagina inicial de configuracion.
- `__SOURCE_ROOT__/widgets/OrderCommonAfterWidget.vue` como widget inicial del pedido.
- `__SOURCE_ROOT__/i18n/` con archivos JSON de mensajes compartidos.
- `scripts/publish-extension.mjs` para crear `dist/extension.zip` y publicar el modulo de integracion por RetailCRM API.
- `AGENTS.md` si las instrucciones para agentes estaban activadas durante init.

## Sustituya Los Valores Genericos

Revise estos valores generados antes de usar el proyecto en una integracion real:

- Codigo de extension en `extensionrc.json`: `retailcrm-extension-frontend`.
- Nombre de extension en `extensionrc.json`: `RetailCRM Extension Frontend`.
- Codigo de pagina: `__PAGE_CODE__`.
- Target del widget: `__WIDGET_TARGET__`.
- Controles de ejemplo y datos ficticios en `__SOURCE_ROOT__/pages/SettingsPage.vue`.
- Acciones toolbar de ejemplo y datos ficticios del pedido en `__SOURCE_ROOT__/widgets/OrderCommonAfterWidget.vue`.
- Mensajes compartidos en `__SOURCE_ROOT__/i18n/locales/*.json`.

La pagina y el widget generados son intencionalmente genericos. Mantenga la estructura que necesite, pero sustituya etiquetas, campos y datos ficticios por comportamiento real del producto.

## Nombres De Archivos Vue

`SettingsPage.vue` y `OrderCommonAfterWidget.vue` son nombres iniciales genericos. En codigo de producto, renombre los archivos Vue segun la funcion que cumplen en la extension y actualice los imports en `__SOURCE_ROOT__/endpoint/endpoint.worker.ts`.

Ejemplos del repositorio de extensiones RetailCRM:

- `ReturnsPage.vue` es una pagina completa de gestion de devoluciones.
- `TasksPage.vue` es una pagina de lista o espacio de trabajo de tareas.
- `SummaryPage.vue` es una pagina de resumen o dashboard.
- `RecordToCalendlyWidget.vue` es un widget enfocado en un escenario.

Use la misma idea para su codigo: `LoyaltySettingsPage.vue`, `OrderNotesWidget.vue`, `PaymentStatusSidebar.vue` u otro nombre que describa el escenario real.

## Comandos

```bash
__PACKAGE_MANAGER__ install
__PACKAGE_MANAGER_RUN__ eslint
__PACKAGE_MANAGER_RUN__ build
__PACKAGE_MANAGER_RUN__ publish-extension -- --archive-only
```

## Publicacion

Cree `.env` en la raiz del proyecto cuando quiera que `publish-extension` actualice RetailCRM:

```dotenv
CRM_API_HOST=https://example.retailcrm.pro
CRM_API_KEY=your-api-key
MODULE_URL=https://example.com
```

Ejecute `__PACKAGE_MANAGER_RUN__ build` antes de publicar. El modo archive-only crea `dist/extension.zip` sin enviar peticiones API.
