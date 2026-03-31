import{_ as c}from"./UiDate-DFtg3xl3.js";import{j as e}from"./jsx-runtime-oUFsCJCe.js";import{useMDXComponents as a}from"./index-nKJCzsSA.js";import{T as i}from"./ToReact-zb7Edybv.js";import{h as l,y as d,H as m,J as p,o as h}from"./iframe-7PfFZbMo.js";import"./composables-DmHLbFXN.js";import"./ru-WeKkgns0.js";import"./index-a22oIHiu.js";import"./preload-helper-PPVm8Dsz.js";const s=l({__name:"UiDate.example",setup(t){return(n,u)=>(h(),d(c,m(p(n.$attrs)),null,16))}});s.__docgenInfo={exportName:"default",displayName:"UiDate.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDate.example.vue"]};function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uidate",children:"UiDate"}),`
`,e.jsxs(n.p,{children:["Компонент ",e.jsx(n.code,{children:"UiDate"})," является обёрткой над HTML-элементом ",e.jsx(n.code,{children:"<time>"}),`.
Он отображает отформатированные значения даты или даты и времени и поддерживает локализацию.
Вы также можете включить или отключить отображение времени.`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"свойства",children:"Свойства"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"date"})," – объект ",e.jsx(n.code,{children:"Date"})," или строка в формате, распознаваемым методом ",e.jsx(n.code,{children:"Date.parse"}),`; значение даты и времени,
используемые для отображения;`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"locale"})," – локаль, используемая для форматирования; поддерживаются ",e.jsx(n.code,{children:"'en-GB'"}),", ",e.jsx(n.code,{children:"'es-ES'"}),", и ",e.jsx(n.code,{children:"'ru-RU'"}),`,
по-умолчанию `,e.jsx(n.code,{children:"'en-GB'"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"withTime"})," – флаг, указывающий, что необходимо также отобразить время; по-умолчанию ",e.jsx(n.code,{children:"false"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Этот пример отображает только дату, используя локаль по умолчанию (",e.jsx(n.code,{children:"en-GB"}),")."]}),`
`,e.jsx(i,{is:s,date:new Date}),`
`,e.jsx(n.h3,{id:"локализация-с-vue-i18n",children:"Локализация с vue-i18n"}),`
`,e.jsxs(n.p,{children:["Если ваше расширение использует ",e.jsx(n.a,{href:"https://github.com/intlify/vue-i18n",rel:"nofollow",children:"vue-i18n"}),", то ",e.jsx(n.code,{children:"UiDate"}),` компонент может
автоматически извлечь текущую используемую локаль и использовать её для форматирования. В этом случае можно не указывать
локаль отдельно.`]}),`
`,e.jsx(n.h2,{id:"применение",children:"Применение"}),`
`,e.jsx(n.h3,{id:"стандартное-применение",children:"Стандартное применение"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiDate :date="new Date()" locale="ru-RU" />
</template>

<script setup>
import { UiDate } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,e.jsx(n.p,{children:"Результат:"}),`
`,e.jsx(i,{is:s,date:new Date,locale:"ru-RU"}),`
`,e.jsx(n.h3,{id:"с-отображением-времени",children:"С отображением времени"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiDate :date="new Date()" locale="ru-RU" with-time />
</template>

<script setup>
import { UiDate } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,e.jsx(n.p,{children:"Результат:"}),`
`,e.jsx(i,{is:s,date:new Date,locale:"ru-RU",withTime:!0})]})}function x(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}const R={title:"Components/UiDate",component:c,args:{date:new Date("2024-05-30T15:30:00"),locale:"en-GB",withTime:!1},argTypes:{date:{control:"date"},locale:{control:"select",options:Object.values(["en-GB","es-ES","ru-RU"])},withTime:{control:"boolean"}},parameters:{docs:{page:x},layout:"centered"}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const T=["Sandbox"];export{r as Sandbox,T as __namedExportsOrder,R as default};
