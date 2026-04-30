import{S as l,A as o,_ as t,a as d}from"./UiSkeleton-DsUO4bLb.js";import{u as h,j as e}from"./index-DFg_Ho_i.js";import{S as p,A as x}from"./blocks-DBDDY4vL.js";import"./iframe-DnG3g5pW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";function a(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...h(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uiskeleton",children:"UiSkeleton"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"UiSkeleton"})," показывает placeholder-контент до загрузки реальных данных."]}),`
`,e.jsx(n.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"для текстовых строк, карточек и аватаров в состоянии загрузки;"}),`
`,e.jsx(n.li,{children:"когда важно сохранить будущую геометрию интерфейса;"}),`
`,e.jsx(n.li,{children:"когда спиннер недостаточно информативен."}),`
`]}),`
`,e.jsx(n.h2,{id:"импорт",children:"Импорт"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { UiSkeleton } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,e.jsx(n.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<UiSkeleton />
`})}),`
`,e.jsx(p,{of:r}),`
`,e.jsx(n.h2,{id:"формы",children:"Формы"}),`
`,e.jsx(n.p,{children:"Поддерживаются формы:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"rectangle"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"text"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"circle"})}),`
`]}),`
`,e.jsxs(n.p,{children:["Для ",e.jsx(n.code,{children:"circle"})," удобно явно задавать ",e.jsx(n.code,{children:"width"})," и ",e.jsx(n.code,{children:"height"}),", если нужен размер вне пресетов."]}),`
`,e.jsx(n.h2,{id:"анимация",children:"Анимация"}),`
`,e.jsx(n.p,{children:"Поддерживаются варианты:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"shimmer"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pulse"})}),`
`]}),`
`,e.jsx(n.h2,{id:"размеры",children:"Размеры"}),`
`,e.jsx(n.p,{children:"Поддерживаются размеры:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"sm"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"md"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"lg"})}),`
`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(x,{})]})}function j(s={}){const{wrapper:n}={...h(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}const C={title:"Components/UiSkeleton",component:t,args:{appearance:o.RECTANGLE,size:l.MD,animation:d.SHIMMER,width:null,height:null},argTypes:{appearance:{control:"select",options:Object.values(o)},size:{control:"select",options:Object.values(l)},animation:{control:"select",options:Object.values(d)}},render:s=>({components:{UiSkeleton:t},setup(){return{args:s}},template:`
      <div style="width: 320px">
          <UiSkeleton v-bind="args" />
      </div>
    `}),parameters:{docs:{page:j},layout:"centered"}},r={},i={args:{appearance:o.TEXT,size:l.SM}},c={args:{appearance:o.CIRCLE,size:l.SM,width:48,height:48}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.SM
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.CIRCLE,
    size: SIZE.SM,
    width: 48,
    height: 48
  }
}`,...c.parameters?.docs?.source}}};const M=["Sandbox","Text","Circle"];export{c as Circle,r as Sandbox,i as Text,M as __namedExportsOrder,C as default};
