import{_ as a,S as c}from"./UiTag-BJ-7XKIT.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as l}from"./index-Cdf3Trmt.js";import{T as t}from"./ToReact-rGZD6-Z2.js";import{g as x,q as m,w as u,x as g,y as p,o as d,c as h,v as j,z as b,A as f,F as k}from"./iframe-CzwIxcDt.js";import"./clear-CbqGf0q6.js";import"./plugin-yyqTwYeo.js";import"./index-BAxMPZdI.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";const r=x({__name:"UiTag.example",props:{text:{type:String,default:""}},setup(n){return(s,T)=>(d(),m(a,g(p(s.$attrs)),{default:u(()=>[n.text.length?(d(),h(k,{key:0},[b(f(n.text),1)],64)):j("",!0)]),_:1},16))}});r.__docgenInfo={exportName:"default",displayName:"UiTag.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTag.example.vue"]};function o(n){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"uitag",children:"UiTag"}),`
`,e.jsx(s.p,{children:"Тег, компонент визуального обозначения состояния"}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(s.h3,{id:"размеры",children:"Размеры"}),`
`,e.jsxs(s.p,{children:["Для тегов предусмотрены токены размеров: ",e.jsx(s.code,{children:"lg"}),", ",e.jsx(s.code,{children:"md"}),",",e.jsx(s.code,{children:"sm"})," и ",e.jsx(s.code,{children:"xs"}),`. Представленные размеры влияют
на высоту, отступы, размер контента и иконок.`]}),`
`,e.jsxs("p",{className:"d-flex gap-4",style:{alignItems:"center"},children:[e.jsx(t,{tag:"span",is:r,text:"lg",pinned:!0,removable:!0}),e.jsx(t,{tag:"span",is:r,text:"md",size:"md",pinned:!0,removable:!0}),e.jsx(t,{tag:"span",is:r,text:"sm",size:"sm",pinned:!0,removable:!0}),e.jsx(t,{tag:"span",is:r,text:"xs",size:"xs",pinned:!0,removable:!0})]}),`
`,e.jsx(s.h3,{id:"настраиваемый-внешний-вид",children:"Настраиваемый внешний вид"}),`
`,e.jsx(s.p,{children:"Изменение внешнего вида элемента осуществляется настройкой следующих свойств:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"background"})," — фоновый цвет тега. Задавать цвет можно с использованием любой доступной цветовой модели;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"saturated"})," — инверсия цвета текста и иконки в белой цвет;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"ticker"})," — анимация бегущей строки при наведении;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"interactive"})," — курсор и анимация при наведении."]}),`
`]}),`
`,e.jsxs("div",{className:"flex-column gap-3",children:[e.jsx("strong",{children:"Background:"}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(t,{is:r,text:"#19976E",background:"#19976E"}),e.jsx(t,{is:r,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)"}),e.jsx(t,{is:r,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)"})]}),e.jsx("strong",{children:"Saturated:"}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(t,{is:r,text:"#19976E",background:"#19976E",saturated:!0}),e.jsx(t,{is:r,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",saturated:!0}),e.jsx(t,{is:r,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",saturated:!0})]}),e.jsx("strong",{children:"Ticker:"}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(t,{is:r,text:"#19976E",background:"#19976E",style:{width:"80px"}}),e.jsx(t,{is:r,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",style:{width:"80px"}}),e.jsx(t,{is:r,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",style:{width:"80px"}})]}),e.jsx("strong",{children:"Interactive:"}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(t,{is:r,text:"#19976E",background:"#19976E",interactive:!0}),e.jsx(t,{is:r,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",interactive:!0}),e.jsx(t,{is:r,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",interactive:!0})]})]}),`
`,e.jsx(s.h3,{id:"события",children:"События"}),`
`,e.jsxs(s.p,{children:["Компонент предоставляет нативные события ",e.jsx(s.code,{children:"click"}),", ",e.jsx(s.code,{children:"focus"})," и ",e.jsx(s.code,{children:"blur"}),". Если для тега установлено свойство ",e.jsx(s.code,{children:"removable"}),`, то
клик по иконке удаления вызывает появление события `,e.jsx(s.code,{children:"remove"}),"."]}),`
`,e.jsx(s.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsx(s.p,{children:"Для адаптации компонента под более широкий спектр применения выделены слоты:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"icon"})," — иконка слева от основного контента тега;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"default"})," — основной контент тега;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"remove-icon"})," — иконка удаления, расположенная справа от основного контента."]}),`
`]}),`
`,e.jsx(s.h2,{id:"пример",children:"Пример"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<template>
    <UiTag background="#FEA530" saturated>
        VIP
    </UiTag>
</template>

<script lang="ts" setup>
import { UiTag } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})})]})}function v(n={}){const{wrapper:s}={...l(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(o,{...n})}):o(n)}const I={title:"Components/UiTag",component:a,args:{size:c.LG,background:"#66d2b6",saturated:!0},argTypes:{size:{control:"select",options:Object.values(c)},icon:{control:!1},default:{control:!1},"remove-icon":{control:!1}},render:n=>({components:{UiTag:a},setup(){return{args:n}},template:`
      <UiTag v-bind="args">
        Free text
      </UiTag>
    `}),parameters:{docs:{page:v},layout:"centered"}},i={};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source}}};const B=["Sandbox"];export{i as Sandbox,B as __namedExportsOrder,I as default};
