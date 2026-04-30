import{_ as t}from"./UiToolbarLink-LECLOXM2.js";import{A as s}from"./UiLink-CJ6v87MN.js";import{u as a,j as e}from"./index-DFg_Ho_i.js";import"./iframe-DnG3g5pW.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./utils-BqzVSXwn.js";import"./composables-CfEvSTVp.js";function i(n){const o={code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"uitoolbarlink",children:"UiToolbarLink"}),`
`,e.jsxs(o.p,{children:["Повторяет функционал стандартной ссылки ",e.jsx(o.code,{children:"UiLink"})," с некоторыми ограничениями:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"size"})," – значение принудительно устанавливается на стороне CRM в зависимости от того, где расширение запускается;"]}),`
`]}),`
`,e.jsxs(o.p,{children:[`Данный тип ссылки нужен для корректной стилизации элементов, используемых на основном слое интерфейса, элементов,
размещенных не внутри некоторого модального элемента, вроде `,e.jsx(o.code,{children:"UiModalSidebar"})," или ",e.jsx(o.code,{children:"UiModalWindow"})]})]})}function c(n={}){const{wrapper:o}={...a(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(i,{...n})}):i(n)}const b={title:"Components/UiToolbarLink",component:t,args:{appearance:s.DEFAULT},argTypes:{appearance:{control:"select",options:Object.values(s)},default:{control:!1},icon:{control:!1}},render:n=>({components:{UiToolbarLink:t},setup(){return{args:n}},template:`
      <UiToolbarLink v-bind="args">
          Hyperlink
      </UiToolbarLink>
    `}),parameters:{docs:{page:c},layout:"centered"}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const f=["Sandbox"];export{r as Sandbox,f as __namedExportsOrder,b as default};
