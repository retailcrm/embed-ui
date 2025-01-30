import{j as e}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as i}from"./index-g1djAheZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";function s(r){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"галерея-vue-компонентов-для-js-модулей",children:"Галерея Vue-компонентов для JS-модулей"}),`
`,e.jsx(n.p,{children:"В данной галерее представлены Vue-компоненты из интерфейса RetailCRM / Simla.com, которые доступны для использования в JS-модулях."}),`
`,e.jsx(n.h2,{id:"установка",children:"Установка"}),`
`,e.jsx(n.p,{children:"npm:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm i --save @retailcrm/embed-ui-v1-components
`})}),`
`,e.jsx(n.p,{children:"yarn:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`yarn add @retailcrm/embed-ui-v1-components
`})}),`
`,e.jsx(n.h2,{id:"применение-в-расширениях",children:"Применение в расширениях"}),`
`,e.jsxs(n.p,{children:["Все компоненты в расширениях надо импортировать из ",e.jsx(n.code,{children:"@retailcrm/embed-ui-v1-components/remote"})]}),`
`,e.jsxs(n.p,{children:["Пример импорта и использования кнопки ",e.jsx(n.code,{children:"UiButton"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiButton variant="danger">
        <IconDelete /> Удалить
    </UiButton>
</template>

<script lang="ts" setup>
import IconDelete from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/delete-outlined.svg'
import { UiButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"⚠ Важно"})}),`
`,e.jsxs(n.p,{children:[`Расширения используют определения из remote части для передачи системе инструкций, из чего собирать
интерфейс. Библиотека также содержит `,e.jsx(n.code,{children:"@retailcrm/embed-ui-v1-components/host"}),` – набор компонентов,
который будет использовать CRM при интерпретации инструкций от расширений. `,e.jsx(n.strong,{children:e.jsx(n.em,{children:"Не используйте"})}),` host компоненты
как часть кода расширения.`]}),`
`,e.jsx(n.h2,{id:"полезные-материалы",children:"Полезные материалы"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/retailcrm/embed-ui",rel:"nofollow",children:"@retailcrm/embed-ui"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://docs.retailcrm.ru/Developers/modules/PublishingModuleMarketplace/JsModules",rel:"nofollow",children:"Документация по разработке JS-модулей"})}),`
`,e.jsxs(n.li,{children:["Примеры JS-модулей ",e.jsx(n.a,{href:"https://github.com/retailcrm/core-ui-extensions-examples",rel:"nofollow",children:"@retailcrm/core-ui-extensions-examples"})]}),`
`]})]})}function c(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{c as default};
