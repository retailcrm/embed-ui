import{_ as c}from"./UiImage-BgYH8-6t.js";import{j as e}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as l}from"./index-g1djAheZ.js";import"./vue.esm-bundler-BIIqx1uz.js";import"./preview-esf_-D9Q.js";import"./_commonjsHelpers-Cpj98o6Y.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uiimage",children:"UiImage"}),`
`,e.jsx(n.p,{children:"Компонент для изображений с возможностью оптимизации"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"свойства",children:"Свойства"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"alt"})," — альтернативный текст, это свойство работает также, как и нативный ",e.jsx(n.code,{children:"alt"})," тега ",e.jsx(n.code,{children:"<img />"}),`,
по-умолчанию равен пустой строке;`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"src"}),` — URL изображения, может использоваться как напрямую, так и будучи
обработанным с помощью утилиты `,e.jsx(n.code,{children:"@retailcrm/image-preview"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"resize"})," — размер, до которого надо уменьшить изображение, по-умолчанию ",e.jsx(n.code,{children:"90x90"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"crop"})," — параметр обрезки."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Свойства ",e.jsx(n.code,{children:"resize"})," и ",e.jsx(n.code,{children:"crop"})," могут не иметь значения, тогда они должны быть равны ",e.jsx(n.code,{children:"undefined"}),`. Если значение указано,
то оно должно быть строкой вида `,e.jsx(n.code,{children:"36x36"}),", ",e.jsx(n.code,{children:"72x-"}),", т.е. ",e.jsx(n.code,{children:"NxM"}),`, где
N — некоторое число (x-ось),
M — некоторое число (y-ось) или прочерк (дефис).`]}),`
`,e.jsx(n.h2,{id:"оптимизация",children:"Оптимизация"}),`
`,e.jsxs(n.p,{children:["Оптимизация достигается за счет изменения URL, переданного через ",e.jsx(n.code,{children:"src"}),". Если указано свойство ",e.jsx(n.code,{children:"resize"})," или ",e.jsx(n.code,{children:"crop"}),`
(или оба сразу), при наличии установленного массива `,e.jsx(n.code,{children:"workers"})," серверов обработки URL переделывается в нечто подобное:"]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"//worker1.retailcrm.tech/r/104x-/https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg"})}),`
`,e.jsxs("div",{className:"d-flex gap-2 my-4",children:[e.jsx("div",{children:e.jsx("img",{alt:"",src:"//worker1.retailcrm.tech/r/156x-/https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg"})}),e.jsx("div",{children:e.jsx("img",{alt:"",src:"//worker1.retailcrm.tech/r/104x-/https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg"})})]}),`
`,e.jsxs(n.p,{children:["При этом ",e.jsx(n.code,{children:"worker1.retailcrm.tech"}),` (или любой другой из массива) будет отдавать уменьшенное изображение вместо исходного,
в зависимости от исходного размера изображения разница в потреблении интернет-траффика может быть весьма и весьма
значительной.`]}),`
`,e.jsx(n.h2,{id:"пример",children:"Пример"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiImage
        src="https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg"
        resize="104x-"
    />
</template>
`})})]})}function h(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}const u={title:"Components/UiImage",component:c,args:{src:"https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg",resize:"200x-"},render:s=>({components:{UiImage:c},setup:()=>({args:s}),template:'<UiImage v-bind="args" />'}),parameters:{docs:{page:h},layout:"centered"}},r={};var o,t,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(d=(t=r.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const g=["Sandbox"];export{r as Sandbox,g as __namedExportsOrder,u as default};
