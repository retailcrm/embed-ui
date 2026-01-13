import{c as l,o as a,a as p,g as w,r as i,h as N,K as I,k as y,z as m,s as O,w as v,m as V,u as b,F,j as X,t as C}from"./iframe-D39tYAK0.js";import{S as j,_ as Z}from"./UiButton-DA_3skNz.js";import{_ as D}from"./UiTooltip-CTn_ZbiQ.js";import{j as o}from"./index-Djyvt97q.js";import{useMDXComponents as k}from"./index-Cdf3Trmt.js";import{T as H}from"./ToReact-CufppUms.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-B4JUJzYp.js";import"./UiPopper-BXPSOLxj.js";import"./index-B44Kv34C.js";const L={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"};function q(t,e){return a(),l("svg",L,[...e[0]||(e[0]=[p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m3.12-11.51a.5.5 0 0 1 .7 0l.5.53a.5.5 0 0 1 0 .71l-5.62 5.62a.48.48 0 0 1-.7 0l-2.35-2.37a.5.5 0 0 1 0-.71l.53-.53a.48.48 0 0 1 .7 0l1.5 1.49z","clip-rule":"evenodd"},null,-1)])])}const A={render:q},R={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function K(t,e){return a(),l("svg",R,[...e[0]||(e[0]=[p("path",{fill:"currentColor",d:"M18 16V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M4 4h12v12H4zm16 14V6a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2h12a2 2 0 0 0 2-2"},null,-1)])])}const P={render:K},G={class:"ui-v1-copy-button__tooltip"},J={class:"ui-v1-copy-button__icon"},Q={class:"ui-v1-copy-button__text"},W=["value"],f=w({__name:"UiCopyButton",props:{text:{type:String,required:!0},size:{type:String,default:j.XS},tooltipOptions:{type:Object,default:()=>({})}},emits:["error"],setup(t,{emit:e}){const s=t,g=i(null),T=N(()=>g),h=i(null),c=i(!1),u=i(!1),x=i(!1);let n=null;const M=e;I(()=>{x.value=navigator.clipboard&&"writeText"in navigator.clipboard});const U=async()=>{try{x.value?(await navigator.clipboard.writeText(s.text),u.value=!0):(h.value?.focus(),h.value?.select(),u.value=document.execCommand("copy"))}catch(r){M("error",r)}},z=()=>{c.value=!0,n&&(clearTimeout(n),n=null)},E=()=>{c.value=!1,n&&(clearTimeout(n),n=null),n=setTimeout(()=>u.value=!1,200)};return(r,_)=>(a(),l("div",{ref_key:"root",ref:g,class:"ui-v1-copy-button",onMouseenter:z,onMouseleave:E,onClick:U},[y(r.$slots,"trigger",{},()=>[m(Z,{size:t.size,appearance:"tertiary"},{default:v(()=>[m(b(P))]),_:1},8,["size"])]),m(D,V({visible:c.value,"onUpdate:visible":_[0]||(_[0]=$=>c.value=$),target:T.value,"target-triggers":[]},{delay:{hide:500},...t.tooltipOptions}),{default:v(()=>[p("div",G,[u.value?(a(),l(F,{key:0},[p("div",J,[m(b(A))]),p("div",Q,[y(r.$slots,"hint-copied")])],64)):y(r.$slots,"hint",{key:1})])]),_:3},16,["visible","target"]),x.value?O("",!0):(a(),l("input",{key:0,ref_key:"input",ref:h,value:t.text,class:"ui-v1-copy-button__area",type:"text"},null,8,W))],544))}});f.__docgenInfo={exportName:"default",displayName:"UiCopyButton",description:"",tags:{},props:[{name:"text",description:"Текст для копирования в буфер обмена",type:{name:"string"},required:!0},{name:"size",description:"Размер кнопки",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.XS"}},{name:"tooltipOptions",description:"Объект, содержащий параметры настройки Tooltip",type:{name:"TooltipOptions"},defaultValue:{func:!0,value:"() => ({})"}}],events:[{name:"error"}],slots:[{name:"trigger"},{name:"hint-copied"},{name:"hint"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/copy-button/UiCopyButton.vue"]};const S=w({__name:"ExampleBasic",setup(t){return(e,s)=>(a(),X(f,{text:"Текст для копирования",size:"sm"},{hint:v(()=>[...s[0]||(s[0]=[C(" Скопировать ",-1)])]),"hint-copied":v(()=>[...s[1]||(s[1]=[C(" Скопировано ",-1)])]),_:1}))}});S.__docgenInfo={exportName:"default",displayName:"ExampleBasic",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/copy-button/ExampleBasic.vue"]};function B(t){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...k(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{id:"uicopybutton",children:"UiCopyButton"}),`
`,o.jsx(e.p,{children:"Кнопки для копирования текста"}),`
`,o.jsx(e.h2,{id:"механика",children:"Механика"}),`
`,o.jsx(e.p,{children:`При клике на кнопку (по-умолчанию третичная) копируется заранее заготовленный текст. Кнопка при этом имеет всплывающую
подсказку, контент которой на некоторое время меняется после копирования текста в буфер обмена (индикация, что текст
скопирован).`}),`
`,o.jsx(e.h2,{id:"применение",children:"Применение"}),`
`,o.jsx(e.p,{children:"Код:"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<template>
    <UiCopyButton text="Текст для копирования" size="sm">
        <template #hint>
            Скопировать
        </template>

        <template #hint-copied>
            Скопировано
        </template>
    </UiCopyButton>
</template>

<script lang="ts" setup>
import { UiCopyButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,o.jsx(e.p,{children:"Результат:"}),`
`,o.jsx(H,{is:S})]})}function Y(t={}){const{wrapper:e}={...k(),...t.components};return e?o.jsx(e,{...t,children:o.jsx(B,{...t})}):B(t)}const ue={title:"Components/UiCopyButton",component:f,args:{text:"Long enough text worth to be copied"},argTypes:{size:{options:Object.values(j)}},render:t=>({components:{UiCopyButton:f},setup:()=>({args:t}),template:`
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `}),parameters:{docs:{page:Y},layout:"centered"}},d={};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};const me=["Sandbox"];export{d as Sandbox,me as __namedExportsOrder,ue as default};
