# Frontend de extension RetailCRM

Este proyecto fue generado por `embed-ui init`.

## Que Se Agrego

- `package.json` con scripts para Vite build, ESLint y publicacion de la extension.
- `extensionrc.json` con la fuente del manifiesto de la extension.
- `__SOURCE_ROOT__/endpoint/endpoint.worker.ts` con `defineRunner`, un runner de pagina y un runner de widget.
- `__SOURCE_ROOT__/pages/SettingsPage.vue` como pagina inicial de configuracion.
- `__SOURCE_ROOT__/widgets/OrderCommonAfterWidget.vue` como widget inicial del pedido.
- `__SOURCE_ROOT__/i18n/` con archivos JSON de mensajes compartidos.
- `__SOURCE_ROOT__/sandbox/tests/` con pruebas iniciales unit, browser y e2e.
- `vitest.config.ts`, `vitest.config.browser.ts` y `vitest.config.playwright.ts` para ejecutar pruebas.
- `scripts/publish-extension.mjs` para crear `dist/extension.zip` y publicar el modulo de integracion por RetailCRM API.
- `scripts/serve-extension.mjs` para servir manifest, script y stylesheet compilados durante las pruebas e2e.
- `AGENTS.md` si las instrucciones para agentes estaban activadas durante init.

## Sustituya Los Valores Genericos

Revise estos valores generados antes de usar el proyecto en una integracion real:

- Codigo de extension en `extensionrc.json`: `retailcrm-extension-frontend`.
- Nombre de extension en `extensionrc.json`: `RetailCRM Extension Frontend`.
- Codigo de pagina: `__PAGE_CODE__`.
- Descriptor de pagina en `extensionrc.json`: mantenga `pages[]` como objeto con `code`, `menu` y `menuItemTitle`; la forma de cadena no sirve para publicar por la API RetailCRM.
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
__PACKAGE_MANAGER_RUN__ dev
__PACKAGE_MANAGER_RUN__ eslint
__PACKAGE_MANAGER_RUN__ build
__PACKAGE_MANAGER_RUN__ test:unit
__PACKAGE_MANAGER_RUN__ test:browser
__PACKAGE_MANAGER_RUN__ test:e2e
__PACKAGE_MANAGER_RUN__ extension:serve
__PACKAGE_MANAGER_RUN__ publish-extension -- --archive-only
```

## Desarrollo local

Utilice un solo comando para el primer inicio:

```bash
__PACKAGE_MANAGER_RUN__ dev
```

El comando comprueba los puertos `4173` y `4175`, compila la extensión e inicia el servidor
de la extensión junto con la sandbox. Los mensajes llevan los prefijos `[extension]` y
`[sandbox]`. Después del inicio, el comando muestra las URL listas para usar. `Ctrl+C`
detiene ambos procesos.

Para gestionar los procesos por separado, utilice dos terminales:

```bash
__PACKAGE_MANAGER_RUN__ build
__PACKAGE_MANAGER_RUN__ extension:serve
```

```bash
__PACKAGE_MANAGER_RUN__ sandbox:serve
```

## Pruebas

- `__PACKAGE_MANAGER_RUN__ test:unit` ejecuta pruebas unitarias rapidas sin navegador.
- `__PACKAGE_MANAGER_RUN__ test:browser` ejecuta la pagina y el widget iniciales en Chromium mediante Vitest Browser.
- `__PACKAGE_MANAGER_RUN__ test:e2e` compila la extension, inicia la sandbox app y el servidor local de extension, luego comprueba la extension con Playwright.
- `__PACKAGE_MANAGER_RUN__ extension:serve` inicia `http://127.0.0.1:4175` despues de compilar. Las pruebas construyen el manifest URL concreto como `http://127.0.0.1:4175/extension/<uuid>`.

Antes del primer lanzamiento browser/e2e, instale Chromium si hace falta:

```bash
__PACKAGE_MANAGER_RUN__ test:browsers:install
```

## Publicacion

Cree `.env` en la raiz del proyecto cuando quiera que `publish-extension` actualice RetailCRM:

```dotenv
CRM_API_HOST=https://example.retailcrm.pro
CRM_API_KEY=your-api-key
MODULE_URL=https://example.com
```

Ejecute `__PACKAGE_MANAGER_RUN__ build` antes de publicar. El modo archive-only crea `dist/extension.zip` sin enviar peticiones API.

Para comprobar localmente en CRM, `MODULE_URL` debe apuntar a un dev/static server. `__PACKAGE_MANAGER_RUN__ extension:serve`
inicia ese servidor local para el build actual de `dist` y resuelve `/extension/<uuid>`,
`/extension/<uuid>/script` y `/extension/<uuid>/stylesheet` desde `extensionrc.json`.
`publish-extension` registra estas URL en CRM, pero no arranca ese servidor.
