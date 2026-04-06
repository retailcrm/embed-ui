import{S as l,A as o,_ as t,a as d}from"./UiSkeleton-CWlNiR8F.js";import{j as e}from"./jsx-runtime-ClSgB0tP.js";import{useMDXComponents as h}from"./index-BcU0IgrJ.js";import{S as p,A as x}from"./blocks-D9_kj3CA.js";import"./iframe-D1v8aj2J.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B4jHIdoR.js";function a(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...h(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uiskeleton",children:"UiSkeleton"}),`
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
`,e.jsx(p,{of:s}),`
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
`,e.jsx(x,{})]})}function j(r={}){const{wrapper:n}={...h(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}const M={title:"Components/UiSkeleton",component:t,args:{appearance:o.RECTANGLE,size:l.MD,animation:d.SHIMMER,width:null,height:null},argTypes:{appearance:{control:"select",options:Object.values(o)},size:{control:"select",options:Object.values(l)},animation:{control:"select",options:Object.values(d)}},render:r=>({components:{UiSkeleton:t},setup(){return{args:r}},template:`
      <div style="width: 320px">
          <UiSkeleton v-bind="args" />
      </div>
    `}),parameters:{docs:{page:j},layout:"centered"}},s={},i={args:{appearance:o.TEXT,size:l.SM}},c={args:{appearance:o.CIRCLE,size:l.SM,width:48,height:48}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const f=["Sandbox","Text","Circle"];export{c as Circle,s as Sandbox,i as Text,f as __namedExportsOrder,M as default};
