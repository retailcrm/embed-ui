import{I as a}from"./add-7oY7PnN7.js";import{_ as r}from"./UiToolbarButton-otPYia_6.js";import{V as s}from"./UiButton-BCon8_Cd.js";import{u as i,j as o}from"./index-DFg_Ho_i.js";import"./iframe-DnG3g5pW.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./utils-BqzVSXwn.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";function c(n){const e={code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...i(),...n.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{id:"uitoolbarbutton",children:"UiToolbarButton"}),`
`,o.jsxs(e.p,{children:["Повторяет функционал стандартной кнопки ",o.jsx(e.code,{children:"UiButton"})," с некоторыми ограничениями:"]}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"appearance"})," – значение принудительно установлено в ",o.jsx(e.code,{children:"secondary"})," и не может быть изменено;"]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"size"})," – значение принудительно устанавливается на стороне CRM в зависимости от того, где расширение запускается;"]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"type"})," – значение принудительно установлено в ",o.jsx(e.code,{children:"button"})," и не может быть изменено;"]}),`
`]}),`
`,o.jsxs(e.p,{children:[`Данный тип кнопки нужен для корректной стилизации элементов, используемых на основном слое интерфейса,
элементов, размещенных не внутри некоторого модального элемента, вроде `,o.jsx(e.code,{children:"UiModalSidebar"})," или ",o.jsx(e.code,{children:"UiModalWindow"})]})]})}function d(n={}){const{wrapper:e}={...i(),...n.components};return e?o.jsx(e,{...n,children:o.jsx(c,{...n})}):c(n)}const T={title:"Components/UiToolbarButton",component:r,args:{variant:s.DEFAULT},argTypes:{href:{control:"text"},variant:{control:"select",options:Object.values(s)},default:{control:!1}},render:n=>({components:{IconAdd:a,UiToolbarButton:r},setup(){return{args:n}},template:`
      <UiToolbarButton v-bind="args">
          <IconAdd aria-hidden="true" /> Create
      </UiToolbarButton>
    `}),parameters:{docs:{page:d},layout:"centered"}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const M=["Sandbox"];export{t as Sandbox,M as __namedExportsOrder,T as default};
