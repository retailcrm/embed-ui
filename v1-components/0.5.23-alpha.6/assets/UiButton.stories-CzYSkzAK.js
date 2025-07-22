import{I as f}from"./add-DFyhBIvo.js";import{_ as i,A as o,S as d,V as l}from"./UiButton-BNltvYIq.js";import{j as e}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as g}from"./index-g1djAheZ.js";import{T as s}from"./ToReact-CwpSuiUs.js";import{d as y,o as c,f as p,g as I,c as v,u as w,j as x,k as b,t as B,F as k,n as A,l as U}from"./vue.esm-bundler-DRrU9--T.js";import{I as D}from"./done-CfS3VgfI.js";import"./predicate-ClulhfEu.js";import"./composables-CTw0CB0X.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Dj9yGJcI.js";import"./preview-Dh5OBlxm.js";const n=y({__name:"UiButton.example",props:{text:{type:String,default:""},showIcon:{type:Boolean,default:!1}},setup(a){return(t,S)=>(c(),p(i,A(U(t.$attrs)),{default:I(()=>[a.text.length?(c(),v(k,{key:0},[a.showIcon?(c(),p(w(D),{key:0})):x("",!0),b(" "+B(a.text),1)],64)):x("",!0)]),_:1},16))}});n.__docgenInfo={exportName:"default",displayName:"UiButton.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"showIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiButton.example.vue"]};function u(a){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...g(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h1,{id:"uibutton",children:"UiButton"}),`
`,e.jsx(t.p,{children:"Стандартная кнопка в системе"}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(t.h3,{id:"внешний-вид",children:"Внешний вид"}),`
`,e.jsxs(t.p,{children:["Для кнопок предусмотрено три визуализации согласно их приоритетов на форме: ",e.jsx(t.code,{children:"outlined"}),", ",e.jsx(t.code,{children:"primary"}),", ",e.jsx(t.code,{children:"secondary"}),` и
`,e.jsx(t.code,{children:"tertiary"}),". Значением по-умолчанию установлено ",e.jsx(t.code,{children:"primary"}),"."]}),`
`,e.jsxs("div",{className:"flex-container gap-4",children:[e.jsx(s,{tag:"span",is:n,text:"Primary",appearance:"primary",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Secondary",appearance:"secondary",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Tertiary",appearance:"tertiary",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Outlined",appearance:"outlined",showIcon:!0})]}),`
`,e.jsx(t.h3,{id:"размеры",children:"Размеры"}),`
`,e.jsxs(t.p,{children:["Для кнопок предусмотрены токены размеров: ",e.jsx(t.code,{children:"lg"}),", ",e.jsx(t.code,{children:"md"}),",",e.jsx(t.code,{children:"sm"})," и ",e.jsx(t.code,{children:"xs"}),`. Представленные размеры влияют
на высоту, отступы, размер контента и иконок, а также на скругление рамки кнопки. По-умолчанию принят размер `,e.jsx(t.code,{children:"sm"}),"."]}),`
`,e.jsxs("div",{className:"flex-container gap-4",style:{alignItems:"center"},children:[e.jsx(s,{tag:"span",is:n,text:"LG",appearance:"secondary",size:"lg",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"MD",appearance:"secondary",size:"md",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"SM",appearance:"secondary",showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"XS",appearance:"secondary",size:"xs",showIcon:!0})]}),`
`,e.jsx(t.h3,{id:"цветовая-схема",children:"Цветовая схема"}),`
`,e.jsxs(t.p,{children:["Цветовая схема кнопки позволяет показать её роль на форме. В компоненте представлены три разновидности схем: ",e.jsx(t.code,{children:"default"}),`,
`,e.jsx(t.code,{children:"success"})," и ",e.jsx(t.code,{children:"danger"}),". Базовой схемой является ",e.jsx(t.code,{children:"default"}),"."]}),`
`,e.jsxs("div",{className:"flex-container gap-4",children:[e.jsx(s,{tag:"span",is:n,text:"Default"}),e.jsx(s,{tag:"span",is:n,text:"Success",variant:"success"}),e.jsx(s,{tag:"span",is:n,text:"Danger",variant:"danger"})]}),`
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
`,e.jsxs("div",{children:[e.jsx("i",{children:"Primary:"}),e.jsxs("div",{className:"flex-container gap-4 mx-auto my-2",children:[e.jsx(s,{tag:"span",is:n,text:"Active",active:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Disabled",disabled:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Locked",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Secondary:"}),e.jsxs("div",{className:"flex-container gap-4 mx-auto my-2",children:[e.jsx(s,{tag:"span",is:n,text:"Active",appearance:"secondary",active:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Disabled",appearance:"secondary",disabled:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Locked",appearance:"secondary",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Tertiary:"}),e.jsxs("div",{className:"flex-container gap-4 mx-auto my-2",children:[e.jsx(s,{tag:"span",is:n,text:"Active",appearance:"tertiary",active:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Disabled",appearance:"tertiary",disabled:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Locked",appearance:"tertiary",locked:!0,showIcon:!0})]}),e.jsx("i",{children:"Outlined:"}),e.jsxs("div",{className:"flex-container gap-4 mx-auto mt-2",children:[e.jsx(s,{tag:"span",is:n,text:"Active",appearance:"outlined",active:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Disabled",appearance:"outlined",disabled:!0,showIcon:!0}),e.jsx(s,{tag:"span",is:n,text:"Locked",appearance:"outlined",locked:!0,showIcon:!0})]})]}),`
`,e.jsx(t.h2,{id:"события",children:"События"}),`
`,e.jsxs(t.p,{children:["Компонент предоставляет нативные события ",e.jsx(t.code,{children:"click"}),", ",e.jsx(t.code,{children:"focus"})," и ",e.jsx(t.code,{children:"blur"}),"."]}),`
`,e.jsx(t.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(t.p,{children:["Для кастомизации контента кнопки выделен слот ",e.jsx(t.code,{children:"default"}),"."]}),`
`,e.jsx(t.h2,{id:"пример",children:"Пример"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<template>
    <UiButton variant="danger">
        <IconDelete /> Удалить
    </UiButton>
</template>

<script lang="ts" setup>
import IconDelete from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/delete-outlined.svg'
import { UiButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})})]})}function N(a={}){const{wrapper:t}={...g(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(u,{...a})}):u(a)}const X={title:"Components/UiButton",component:i,args:{appearance:o.PRIMARY,size:d.SM,variant:l.DEFAULT},argTypes:{href:{control:"text"},appearance:{control:"select",options:Object.values(o)},size:{control:"select",options:Object.values(d)},variant:{control:"select",options:Object.values(l)}},render:a=>({components:{IconAdd:f,UiButton:i},setup(){return{args:a}},template:`
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
    `}),parameters:{docs:{page:N},layout:"centered"}},r={};var h,m,j;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(j=(m=r.parameters)==null?void 0:m.docs)==null?void 0:j.source}}};const $=["Sandbox"];export{r as Sandbox,$ as __namedExportsOrder,X as default};
