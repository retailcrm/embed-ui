import{I as f}from"./add-D57zt9Wz.js";import{_ as o,A as c,S as d,V as l}from"./UiButton-QJF5E-PL.js";import{j as e}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as g}from"./index-BjypYOp6.js";import{T as n}from"./ToReact-Dm3IsGyL.js";import{o as i,c as y,a as v,e as w,f as p,g as I,u as b,k as x,j as B,t as k,F as A,n as D,l as S}from"./vue.esm-bundler-BmdTWJX9.js";import"./predicate-D9CE3zPC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";const U={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function _(a,t){return i(),y("svg",U,t[0]||(t[0]=[v("path",{fill:"currentColor","fill-rule":"evenodd",d:"M19.793 6.965a.77.77 0 0 1-.022 1.075l-9.815 9.607a1.224 1.224 0 0 1-1.714.006l-4.01-3.878a.77.77 0 0 1-.028-1.074l.684-.736a.735.735 0 0 1 1.053-.028l3.15 3.046 8.96-8.771a.735.735 0 0 1 1.054.022z","clip-rule":"evenodd"},null,-1)]))}const C={render:_},s=w({__name:"UiButton.example",props:{text:{type:String,default:""},showIcon:{type:Boolean,default:!1}},setup(a){return(t,T)=>(i(),p(o,D(S(t.$attrs)),{default:I(()=>[a.text.length?(i(),y(A,{key:0},[a.showIcon?(i(),p(b(C),{key:0})):x("",!0),B(" "+k(a.text),1)],64)):x("",!0)]),_:1},16))}});s.__docgenInfo={exportName:"default",displayName:"UiButton.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"showIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiButton.example.vue"]};function u(a){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...g(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h1,{id:"uibutton",children:"UiButton"}),`
`,e.jsx(t.p,{children:"Стандартная кнопка в системе"}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(t.h3,{id:"внешний-вид",children:"Внешний вид"}),`
`,e.jsxs(t.p,{children:["Для кнопок предусмотрено три визуализации согласно их приоритетов на форме: ",e.jsx(t.code,{children:"outlined"}),", ",e.jsx(t.code,{children:"primary"}),", ",e.jsx(t.code,{children:"secondary"}),` и
`,e.jsx(t.code,{children:"tertiary"}),". Значением по-умолчанию установлено ",e.jsx(t.code,{children:"primary"}),"."]}),`
`,e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx(n,{tag:"span",is:s,text:"Primary",appearance:"primary",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Secondary",appearance:"secondary",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Tertiary",appearance:"tertiary",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Outlined",appearance:"outlined",showIcon:!0})]}),`
`,e.jsx(t.h3,{id:"размеры",children:"Размеры"}),`
`,e.jsxs(t.p,{children:["Для кнопок предусмотрены токены размеров: ",e.jsx(t.code,{children:"lg"}),", ",e.jsx(t.code,{children:"md"}),",",e.jsx(t.code,{children:"sm"})," и ",e.jsx(t.code,{children:"xs"}),`. Представленные размеры влияют
на высоту, отступы, размер контента и иконок, а также на скругление рамки кнопки. По-умолчанию принят размер `,e.jsx(t.code,{children:"sm"}),"."]}),`
`,e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsx(n,{tag:"span",is:s,text:"LG",appearance:"secondary",size:"lg",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"MD",appearance:"secondary",size:"md",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"SM",appearance:"secondary",showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"XS",appearance:"secondary",size:"xs",showIcon:!0})]}),`
`,e.jsx(t.h3,{id:"цветовая-схема",children:"Цветовая схема"}),`
`,e.jsxs(t.p,{children:["Цветовая схема кнопки позволяет показать её роль на форме. В компоненте представлены три разновидности схем: ",e.jsx(t.code,{children:"default"}),`,
`,e.jsx(t.code,{children:"success"})," и ",e.jsx(t.code,{children:"danger"}),". Базовой схемой является ",e.jsx(t.code,{children:"default"}),"."]}),`
`,e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx(n,{tag:"span",is:s,text:"Default"}),e.jsx(n,{tag:"span",is:s,text:"Success",variant:"success"}),e.jsx(n,{tag:"span",is:s,text:"Danger",variant:"danger"})]}),`
`,e.jsx(t.h3,{id:"тип-кнопки",children:"Тип кнопки"}),`
`,e.jsx(t.p,{children:`Данное свойство позволяет задать наименование html-тега, которое будет служить обёрткой для кнопки. Доступными
являются все базовые теги.`}),`
`,e.jsx(t.h3,{id:"ссылка",children:"Ссылка"}),`
`,e.jsxs(t.p,{children:["Если для кнопки задано свойство ",e.jsx(t.code,{children:"href"}),", то её можно использовать как ссылку с переходом на указанный ресурс."]}),`
`,e.jsx(t.h3,{id:"состояния",children:"Состояния"}),`
`,e.jsx(t.p,{children:"Для кнопки доступно три состояния:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"active"})," — кнопка активна;"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"disabled"})," — кнопка отключена;"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"locked"})," — кнопка заблокирована."]}),`
`]}),`
`,e.jsxs("div",{children:[e.jsx("i",{children:"Primary:"}),e.jsxs("div",{style:{display:"flex",gap:"16px",margin:"8px auto"},children:[e.jsx(n,{tag:"span",is:s,text:"Active",active:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Disabled",disabled:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Locked",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Secondary:"}),e.jsxs("div",{style:{display:"flex",gap:"16px",margin:"8px auto"},children:[e.jsx(n,{tag:"span",is:s,text:"Active",appearance:"secondary",active:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Disabled",appearance:"secondary",disabled:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Locked",appearance:"secondary",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Tertiary:"}),e.jsxs("div",{style:{display:"flex",gap:"16px",margin:"8px auto"},children:[e.jsx(n,{tag:"span",is:s,text:"Active",appearance:"tertiary",active:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Disabled",appearance:"tertiary",disabled:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Locked",appearance:"tertiary",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Outlined:"}),e.jsxs("div",{style:{display:"flex",gap:"16px",marginTop:"8px"},children:[e.jsx(n,{tag:"span",is:s,text:"Active",appearance:"outlined",active:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Disabled",appearance:"outlined",disabled:!0,showIcon:!0}),e.jsx(n,{tag:"span",is:s,text:"Locked",appearance:"outlined",locked:!0,showIcon:!0})]})]}),`
`,e.jsx(t.h2,{id:"события",children:"События"}),`
`,e.jsxs(t.p,{children:["Компонент предоставляет нативные события ",e.jsx(t.code,{children:"click"}),", ",e.jsx(t.code,{children:"focus"})," и ",e.jsx(t.code,{children:"blur"}),"."]}),`
`,e.jsx(t.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(t.p,{children:["Для кастомизации контента кнопки выделен слот ",e.jsx(t.code,{children:"default"}),"."]})]})}function M(a={}){const{wrapper:t}={...g(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(u,{...a})}):u(a)}const X={title:"Components/UiButton",component:o,args:{appearance:c.PRIMARY,size:d.SM,variant:l.DEFAULT},argTypes:{href:{control:"text"},appearance:{control:"select",options:Object.values(c)},size:{control:"select",options:Object.values(d)},variant:{control:"select",options:Object.values(l)}},render:a=>({components:{IconAdd:f,UiButton:o},setup(){return{args:a}},template:`
      <h3>Button with text</h3>

      <UiButton v-bind="args">
          Create
      </UiButton>

      <h3>Button with text & leading icon</h3>

      <UiButton v-bind="args">
          <IconAdd aria-hidden="true" /> Create
      </UiButton>

      <h3>Button with icon</h3>

      <UiButton v-bind="args">
          <IconAdd aria-label="Create" />
      </UiButton>
    `}),parameters:{docs:{page:M},layout:"centered"}},r={};var h,j,m;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(m=(j=r.parameters)==null?void 0:j.docs)==null?void 0:m.source}}};const $=["Sandbox"];export{r as Sandbox,$ as __namedExportsOrder,X as default};
